'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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
  const n = parseFloat(String(v ?? ''))
  return isFinite(n) ? n : fallback
}
function int(v: FormDataEntryValue | null, fallback = 0): number {
  const n = parseInt(String(v ?? ''), 10)
  return isFinite(n) ? n : fallback
}
function str(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? '').trim()
  return s === '' ? null : s
}

export async function createJob(formData: FormData) {
  const { orgId, userId, supabase } = await ctx()
  const ref = str(formData.get('ref'))
  if (!ref) return { error: 'A job reference is needed.' }

  const { error } = await supabase.from('jobs').insert({
    org_id: orgId, created_by: userId, ref,
    contractor: str(formData.get('contractor')),
    contractor_email: str(formData.get('contractor_email')),
    contract_value: num(formData.get('contract_value')),
    certified: num(formData.get('certified')),
    retention_pct: num(formData.get('retention_pct'), 5),
    cap_pct: num(formData.get('cap_pct'), 5),
    pc_date: str(formData.get('pc_date')),
    defects_months: int(formData.get('defects_months'), 12),
    notes: str(formData.get('notes')),
  })
  if (error) return { error: error.message }
  revalidatePath('/app')
  return { ok: true }
}

export async function updateJob(id: string, formData: FormData) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('jobs').update({
    ref: str(formData.get('ref')),
    contractor: str(formData.get('contractor')),
    contractor_email: str(formData.get('contractor_email')),
    contract_value: num(formData.get('contract_value')),
    certified: num(formData.get('certified')),
    retention_pct: num(formData.get('retention_pct'), 5),
    cap_pct: num(formData.get('cap_pct'), 5),
    pc_date: str(formData.get('pc_date')),
    defects_months: int(formData.get('defects_months'), 12),
    notes: str(formData.get('notes')),
  }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/app')
  return { ok: true }
}

export async function setReleased(id: string, stage: 'first' | 'final', released: boolean) {
  const { supabase } = await ctx()
  const today = new Date().toISOString().slice(0, 10)
  const patch = stage === 'first'
    ? { first_released: released, first_released_on: released ? today : null }
    : { final_released: released, final_released_on: released ? today : null }
  const { error } = await supabase.from('jobs').update(patch).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/app')
  return { ok: true }
}

export async function archiveJob(id: string) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('jobs').update({ archived: true }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/app')
  return { ok: true }
}

export async function addReceipt(jobId: string, formData: FormData) {
  const { supabase } = await ctx()
  const amount = num(formData.get('amount'))
  if (amount <= 0) return { error: 'Enter an amount received.' }
  const receivedOn = str(formData.get('received_on'))
  if (!receivedOn) return { error: 'Enter the date it arrived.' }

  const { error } = await supabase.from('receipts').insert({
    job_id: jobId,
    stage: String(formData.get('stage') || 'first'),
    amount,
    received_on: receivedOn,
    notes: str(formData.get('notes')),
  })
  if (error) return { error: error.message }
  revalidatePath('/app')
  return { ok: true }
}

export async function deleteReceipt(id: string) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('receipts').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/app')
  return { ok: true }
}

export async function logApplication(input: {
  contractor: string
  jobIds: string[]
  totalClaimed: number
  totalInterest: number
}) {
  const { orgId, userId, supabase } = await ctx()
  const { error } = await supabase.from('applications').insert({
    org_id: orgId,
    created_by: userId,
    contractor: input.contractor,
    job_ids: input.jobIds,
    total_claimed: input.totalClaimed,
    total_interest: input.totalInterest,
    sent_on: new Date().toISOString().slice(0, 10),
  })
  if (error) return { error: error.message }
  revalidatePath('/app')
  return { ok: true }
}

export async function saveProfile(formData: FormData): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  await supabase.from('profiles').upsert({
    id: user.id,
    company_name: str(formData.get('company_name')),
    contact_name: str(formData.get('contact_name')),
    address: str(formData.get('address')),
    phone: str(formData.get('phone')),
  })

  const { data: m } = await supabase
    .from('organisation_members').select('org_id').eq('user_id', user.id).limit(1).single()

  if (m) {
    await supabase.from('organisations').update({
      reminder_email: str(formData.get('reminder_email')),
      reminders_enabled: formData.get('reminders_enabled') === 'on',
    }).eq('id', m.org_id)
  }

  revalidatePath('/app/settings')
  redirect('/app/settings?saved=1')
}
