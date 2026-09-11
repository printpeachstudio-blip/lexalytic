// Shared types and maths for the hospitality margin product.

export const NI_RATE = 0.15
export const NI_THRESHOLD_HOURLY = 2.56
export const PENSION_RATE = 0.03
export const HOLIDAY_UPLIFT = 0.1207

export interface Site {
  id: string
  org_id: string
  name: string
  concept: 'casual' | 'qsr' | 'pub' | 'fine' | 'cafe'
  vat_registered: boolean
  fixed_weekly: number
  target_gp: number | null
  archived: boolean
}

export interface Supplier {
  id: string
  site_id: string
  name: string
  account_ref: string | null
  is_tied: boolean
}

export interface Ingredient {
  id: string
  site_id: string
  supplier_id: string | null
  name: string
  pack_size: number
  pack_unit: string
  recipe_unit: string
  units_per_pack: number
  current_price: number
  allergens: string[]
  archived: boolean
  updated_at: string
}

export interface PriceRow {
  id: string
  ingredient_id: string
  price: number
  effective_on: string
  source: string | null
}

export interface Dish {
  id: string
  site_id: string
  name: string
  category: string | null
  is_component: boolean
  batch_yield: number
  menu_price: number
  delivery_price: number | null
  archived: boolean
  unit_cost: number
  net_menu_price: number
  gp_pct: number | null
}

export interface DishLine {
  id: string
  dish_id: string
  ingredient_id: string | null
  component_id: string | null
  quantity: number
}

export interface Channel {
  id: string
  site_id: string
  name: string
  commission_pct: number
  packaging_cost: number
  active: boolean
}

export interface SessionRow {
  id: string
  site_id: string
  trade_date: string
  daypart: string
  sales: number
  staff_hours: number
  avg_rate: number
  covers: number | null
  notes: string | null
  true_hourly: number
  labour_cost: number
  labour_pct: number | null
}

export interface EventRow {
  id: string
  site_id: string
  occurred_on: string
  kind: 'waste' | 'comp' | 'discount' | 'staff_meal' | 'breakage' | 'training' | 'other'
  description: string
  value: number
  dish_id: string | null
  signed_off: string | null
}

export interface Stocktake {
  id: string
  site_id: string
  taken_on: string
  opening_value: number
  purchases: number
  closing_value: number
  sales_at_cost: number
  notes: string | null
  actual_usage: number
  variance: number
  variance_pct: number | null
}

export interface DishSale {
  id: string
  dish_id: string
  period_start: string
  period_end: string
  dine_in_qty: number
  delivery_qty: number
}

export const CONCEPTS = {
  casual: { label: 'Full service or casual dining', gpLow: 65, gpHigh: 70, netLow: 3, netHigh: 6 },
  qsr: { label: 'Quick service or takeaway', gpLow: 65, gpHigh: 70, netLow: 6, netHigh: 9 },
  pub: { label: 'Pub or bar', gpLow: 70, gpHigh: 80, netLow: 7, netHigh: 15 },
  fine: { label: 'Fine dining', gpLow: 65, gpHigh: 70, netLow: 5, netHigh: 15 },
  cafe: { label: 'Cafe or coffee shop', gpLow: 65, gpHigh: 75, netLow: 4, netHigh: 10 },
}

export const EVENT_KINDS = {
  waste: 'Waste or spoilage',
  comp: 'Comped to a customer',
  discount: 'Discount or offer',
  staff_meal: 'Staff meal',
  breakage: 'Breakage',
  training: 'Training or tasting',
  other: 'Other',
}

export function money(n: number): string {
  return '£' + Math.round(Number(n)).toLocaleString('en-GB')
}
export function money2(n: number): string {
  return '£' + Number(n).toLocaleString('en-GB',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
export function pct(n: number | null): string {
  return n === null || isNaN(n) ? '—' : Number(n).toFixed(1) + '%'
}
export function fmtDate(d: string | null): string {
  if (!d) return '—'
  const date = new Date(d + 'T00:00:00')
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
export function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function trueHourly(rate: number): number {
  const gross = rate * (1 + HOLIDAY_UPLIFT)
  const ni = Math.max(0, gross - NI_THRESHOLD_HOURLY) * NI_RATE
  return gross + ni + gross * PENSION_RATE
}

// What a dish actually returns on a given channel, once VAT,
// commission and packaging are taken off in the right order.
export function channelMargin(
  dish: Dish, channel: Channel, vatRegistered: boolean
): { received: number; margin: number; marginPct: number; breakEven: number } {
  const price = Number(dish.delivery_price ?? dish.menu_price)
  const net = vatRegistered ? price / 1.2 : price
  const received = net * (1 - Number(channel.commission_pct) / 100)
  const cost = Number(dish.unit_cost) + Number(channel.packaging_cost)
  const margin = received - cost
  const breakEven = Number(channel.commission_pct) < 100
    ? (cost / (1 - Number(channel.commission_pct) / 100)) * (vatRegistered ? 1.2 : 1)
    : 0
  return { received, margin, marginPct: net > 0 ? (margin / net) * 100 : 0, breakEven }
}

// Menu engineering. Compares each dish against the average on both axes.
export type Quadrant = 'star' | 'plough' | 'puzzle' | 'dog'

export const QUADRANTS: Record<Quadrant, { label: string; action: string; color: string }> = {
  star:   { label: 'Star', action: 'Sells well and earns well. Protect the recipe and the price.', color: '#3F6B4C' },
  plough: { label: 'Plough horse', action: 'Popular but thin. A small price rise here is worth more than anywhere else.', color: '#8F6318' },
  puzzle: { label: 'Puzzle', action: 'Earns well but nobody orders it. Move it up the menu or describe it better.', color: '#57514A' },
  dog:    { label: 'Dog', action: 'Neither sells nor earns. Usually the first thing to come off.', color: '#A13B2A' },
}

export function classify(
  gpPct: number, volume: number, avgGp: number, avgVolume: number
): Quadrant {
  const highGp = gpPct >= avgGp
  const highVol = volume >= avgVolume
  if (highGp && highVol) return 'star'
  if (!highGp && highVol) return 'plough'
  if (highGp && !highVol) return 'puzzle'
  return 'dog'
}
