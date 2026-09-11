'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function ctx() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not signed in')
  const { data } = await supabase
    .from('organisation_members').select('org_id').eq('user_id', user.id).limit(1).single()
  if (!data) throw new Error('No organisation')
  return { orgId: data.org_id as string, userId: user.id, supabase }
}

function num(v: FormDataEntryValue | null, fallback = 0): number {
  const n = parseFloat(String(v ?? '')); return isFinite(n) ? n : fallback
}
function int(v: FormDataEntryValue | null, fallback = 0): number {
  const n = parseInt(String(v ?? ''), 10); return isFinite(n) ? n : fallback
}
function str(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? '').trim(); return s === '' ? null : s
}

const R = (p: string) => { revalidatePath(p) }
const refreshAll = () => {
  R('/margin'); R('/margin/dishes'); R('/margin/ingredients')
  R('/margin/sessions'); R('/margin/events'); R('/margin/stock')
}

// ---------- sites ----------

export async function createSite(formData: FormData) {
  const { orgId, supabase } = await ctx()
  const name = str(formData.get('name'))
  if (!name) return { error: 'Give the site a name.' }

  const { data, error } = await supabase.from('sites').insert({
    org_id: orgId,
    name,
    concept: String(formData.get('concept') || 'casual'),
    vat_registered: formData.get('vat_registered') !== 'off',
    fixed_weekly: num(formData.get('fixed_weekly')),
  }).select('id').single()

  if (error) return { error: error.message }

  // Every site starts with the common delivery channels, since almost
  // everyone is on at least one and typing them in is friction.
  if (data) {
    await supabase.from('channels').insert([
      { site_id: data.id, name: 'Deliveroo', commission_pct: 30, packaging_cost: 0.45 },
      { site_id: data.id, name: 'Uber Eats', commission_pct: 30, packaging_cost: 0.45 },
      { site_id: data.id, name: 'Just Eat', commission_pct: 14, packaging_cost: 0.45, active: false },
    ])
  }

  refreshAll()
  return { ok: true, id: data?.id }
}

export async function updateSite(id: string, formData: FormData) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('sites').update({
    name: str(formData.get('name')),
    concept: String(formData.get('concept') || 'casual'),
    vat_registered: formData.get('vat_registered') !== 'off',
    fixed_weekly: num(formData.get('fixed_weekly')),
    target_gp: formData.get('target_gp') ? num(formData.get('target_gp')) : null,
  }).eq('id', id)
  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

// ---------- ingredients ----------

export async function saveIngredient(siteId: string, id: string | null, formData: FormData) {
  const { supabase } = await ctx()
  const name = str(formData.get('name'))
  if (!name) return { error: 'Give the ingredient a name.' }

  const price = num(formData.get('current_price'))
  const payload = {
    site_id: siteId,
    name,
    supplier_id: str(formData.get('supplier_id')),
    pack_size: num(formData.get('pack_size'), 1),
    pack_unit: String(formData.get('pack_unit') || 'kg'),
    recipe_unit: String(formData.get('recipe_unit') || 'g'),
    units_per_pack: num(formData.get('units_per_pack'), 1000),
    current_price: price,
  }

  if (id) {
    // Only log a price row if it actually moved
    const { data: existing } = await supabase
      .from('ingredients').select('current_price').eq('id', id).single()

    const { error } = await supabase.from('ingredients').update(payload).eq('id', id)
    if (error) return { error: error.message }

    if (existing && Math.abs(Number(existing.current_price) - price) > 0.0001) {
      await supabase.from('ingredient_prices').insert({
        ingredient_id: id, price, source: 'Edited in app',
      })
    }
  } else {
    const { data, error } = await supabase.from('ingredients').insert(payload).select('id').single()
    if (error) return { error: error.message }
    if (data) {
      await supabase.from('ingredient_prices').insert({
        ingredient_id: data.id, price, source: 'Opening price',
      })
    }
  }

  refreshAll()
  return { ok: true }
}

export async function archiveIngredient(id: string) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('ingredients').update({ archived: true }).eq('id', id)
  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

// Bulk price rise, for when a supplier moves everything at once
export async function applyPriceRise(supplierId: string, pctRise: number) {
  const { supabase } = await ctx()
  const { data: items, error } = await supabase
    .from('ingredients').select('id, current_price')
    .eq('supplier_id', supplierId).eq('archived', false)
  if (error) return { error: error.message }
  if (!items?.length) return { error: 'Nothing to update for that supplier.' }

  for (const it of items) {
    const next = Math.round(Number(it.current_price) * (1 + pctRise / 100) * 10000) / 10000
    await supabase.from('ingredients').update({ current_price: next }).eq('id', it.id)
    await supabase.from('ingredient_prices').insert({
      ingredient_id: it.id, price: next, source: `Supplier increase ${pctRise}%`,
    })
  }

  refreshAll()
  return { ok: true, count: items.length }
}

// ---------- suppliers ----------

export async function saveSupplier(siteId: string, id: string | null, formData: FormData) {
  const { supabase } = await ctx()
  const name = str(formData.get('name'))
  if (!name) return { error: 'Give the supplier a name.' }
  const payload = {
    site_id: siteId, name,
    account_ref: str(formData.get('account_ref')),
    is_tied: formData.get('is_tied') === 'on',
  }
  const { error } = id
    ? await supabase.from('suppliers').update(payload).eq('id', id)
    : await supabase.from('suppliers').insert(payload)
  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

// ---------- dishes ----------

export async function saveDish(siteId: string, id: string | null, formData: FormData) {
  const { supabase } = await ctx()
  const name = str(formData.get('name'))
  if (!name) return { error: 'Give the dish a name.' }

  const payload = {
    site_id: siteId, name,
    category: str(formData.get('category')),
    is_component: formData.get('is_component') === 'on',
    batch_yield: num(formData.get('batch_yield'), 1),
    menu_price: num(formData.get('menu_price')),
    delivery_price: formData.get('delivery_price') ? num(formData.get('delivery_price')) : null,
  }

  const { data, error } = id
    ? await supabase.from('dishes').update(payload).eq('id', id).select('id').single()
    : await supabase.from('dishes').insert(payload).select('id').single()

  if (error) return { error: error.message }
  refreshAll()
  return { ok: true, id: data?.id }
}

export async function archiveDish(id: string) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('dishes').update({ archived: true }).eq('id', id)
  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

export async function addDishLine(
  dishId: string, target: { ingredientId?: string; componentId?: string }, quantity: number
) {
  const { supabase } = await ctx()
  if (!target.ingredientId && !target.componentId) return { error: 'Pick an ingredient or a component.' }
  if (target.componentId === dishId) return { error: 'A dish cannot contain itself.' }

  const { error } = await supabase.from('dish_lines').insert({
    dish_id: dishId,
    ingredient_id: target.ingredientId ?? null,
    component_id: target.componentId ?? null,
    quantity,
  })
  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

export async function updateDishLine(id: string, quantity: number) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('dish_lines').update({ quantity }).eq('id', id)
  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

export async function removeDishLine(id: string) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('dish_lines').delete().eq('id', id)
  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

export async function saveDishSales(dishId: string, formData: FormData) {
  const { supabase } = await ctx()
  const start = str(formData.get('period_start'))
  const end = str(formData.get('period_end'))
  if (!start || !end) return { error: 'Give the period a start and an end.' }

  const { error } = await supabase.from('dish_sales').upsert({
    dish_id: dishId,
    period_start: start,
    period_end: end,
    dine_in_qty: int(formData.get('dine_in_qty')),
    delivery_qty: int(formData.get('delivery_qty')),
  }, { onConflict: 'dish_id,period_start,period_end' })

  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

// ---------- channels ----------

export async function saveChannel(siteId: string, id: string | null, formData: FormData) {
  const { supabase } = await ctx()
  const name = str(formData.get('name'))
  if (!name) return { error: 'Give the channel a name.' }
  const payload = {
    site_id: siteId, name,
    commission_pct: num(formData.get('commission_pct'), 30),
    packaging_cost: num(formData.get('packaging_cost')),
    active: formData.get('active') !== 'off',
  }
  const { error } = id
    ? await supabase.from('channels').update(payload).eq('id', id)
    : await supabase.from('channels').insert(payload)
  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

// ---------- sessions ----------

export async function saveSession(siteId: string, formData: FormData) {
  const { supabase } = await ctx()
  const date = str(formData.get('trade_date'))
  if (!date) return { error: 'Pick a date.' }

  const { error } = await supabase.from('sessions').upsert({
    site_id: siteId,
    trade_date: date,
    daypart: String(formData.get('daypart') || 'evening'),
    sales: num(formData.get('sales')),
    staff_hours: num(formData.get('staff_hours')),
    avg_rate: num(formData.get('avg_rate')),
    covers: formData.get('covers') ? int(formData.get('covers')) : null,
    notes: str(formData.get('notes')),
  }, { onConflict: 'site_id,trade_date,daypart' })

  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

export async function deleteSession(id: string) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('sessions').delete().eq('id', id)
  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

// ---------- events, the evidence log ----------

export async function saveEvent(siteId: string, formData: FormData) {
  const { userId, supabase } = await ctx()
  const description = str(formData.get('description'))
  if (!description) return { error: 'Say what happened.' }

  const { error } = await supabase.from('events').insert({
    site_id: siteId,
    occurred_on: str(formData.get('occurred_on')) || new Date().toISOString().slice(0, 10),
    kind: String(formData.get('kind') || 'waste'),
    description,
    value: num(formData.get('value')),
    dish_id: str(formData.get('dish_id')),
    signed_off: str(formData.get('signed_off')),
    created_by: userId,
  })

  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

export async function deleteEvent(id: string) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

// ---------- stocktakes ----------

export async function saveStocktake(siteId: string, formData: FormData) {
  const { userId, supabase } = await ctx()
  const date = str(formData.get('taken_on'))
  if (!date) return { error: 'Pick a date.' }

  const { error } = await supabase.from('stocktakes').upsert({
    site_id: siteId,
    taken_on: date,
    opening_value: num(formData.get('opening_value')),
    purchases: num(formData.get('purchases')),
    closing_value: num(formData.get('closing_value')),
    sales_at_cost: num(formData.get('sales_at_cost')),
    notes: str(formData.get('notes')),
    created_by: userId,
  }, { onConflict: 'site_id,taken_on' })

  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

export async function deleteStocktake(id: string) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('stocktakes').delete().eq('id', id)
  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

// ---------- periods, for benchmark tracking ----------

export async function savePeriod(siteId: string, formData: FormData) {
  const { supabase } = await ctx()
  const start = str(formData.get('period_start'))
  const end = str(formData.get('period_end'))
  if (!start || !end) return { error: 'Give the period a start and an end.' }

  const { error } = await supabase.from('periods').upsert({
    site_id: siteId,
    period_start: start,
    period_end: end,
    turnover: num(formData.get('turnover')),
    cost_of_sales: num(formData.get('cost_of_sales')),
    wages: num(formData.get('wages')),
    other_costs: num(formData.get('other_costs')),
    cash_pct: num(formData.get('cash_pct')),
  }, { onConflict: 'site_id,period_start,period_end' })

  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}

// ---------- platform statements ----------

export async function saveStatement(channelId: string, formData: FormData) {
  const { supabase } = await ctx()
  const start = str(formData.get('period_start'))
  const end = str(formData.get('period_end'))
  if (!start || !end) return { error: 'Give the statement a period.' }

  const { error } = await supabase.from('channel_statements').upsert({
    channel_id: channelId,
    period_start: start,
    period_end: end,
    gross_sales: num(formData.get('gross_sales')),
    commission: num(formData.get('commission')),
    other_fees: num(formData.get('other_fees')),
    net_received: num(formData.get('net_received')),
    our_recorded: formData.get('our_recorded') ? num(formData.get('our_recorded')) : null,
  }, { onConflict: 'channel_id,period_start,period_end' })

  if (error) return { error: error.message }
  refreshAll()
  return { ok: true }
}
