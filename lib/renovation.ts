/**
 * Renovation cost bands, UK 2026.
 *
 * Drawn from published guides including Checkatrade, FMB, BCIS-derived
 * figures and several 2026 builder price guides. They disagree with each
 * other considerably, which is worth saying out loud rather than pretending
 * to a precision nobody has. A kitchen is quoted anywhere from £5,000 to
 * £85,000 across sources. The bands below are the middle of that spread.
 *
 * LAST REVIEWED: 11 September 2026
 */

export type Spec = 'budget' | 'mid' | 'premium'

export interface Element {
  id: string
  label: string
  group: string
  note: string
  budget: [number, number]
  mid: [number, number]
  premium: [number, number]
  /** Things this element commonly triggers that are priced separately. */
  triggers?: string[]
}

export const ELEMENTS: Element[] = [
  // Rooms
  { id: 'kitchen', label: 'Kitchen', group: 'Rooms',
    note: 'Supply and fit. A layout change costs considerably more than a swap, because the services move with it.',
    budget: [8000, 12000], mid: [12000, 20000], premium: [20000, 40000],
    triggers: ['electrics', 'plumbing', 'plastering', 'flooring'] },
  { id: 'bathroom', label: 'Family bathroom', group: 'Rooms',
    note: 'Full strip out and replace. Moving the soil pipe is the expensive decision.',
    budget: [5000, 8000], mid: [8000, 15000], premium: [15000, 25000],
    triggers: ['plumbing', 'plastering', 'tiling'] },
  { id: 'ensuite', label: 'Ensuite or shower room', group: 'Rooms',
    note: 'Smaller, but the cost per square metre is higher than a family bathroom.',
    budget: [4500, 7500], mid: [8500, 13500], premium: [16000, 28000],
    triggers: ['plumbing', 'plastering'] },

  // Services
  { id: 'rewire', label: 'Full rewire', group: 'Services',
    note: 'Three bed house, new consumer unit, Part P certified. Needs replastering after, which is often quoted separately.',
    budget: [4000, 6500], mid: [6500, 11000], premium: [11000, 18000],
    triggers: ['plastering', 'decorating'] },
  { id: 'plumbing', label: 'Replumb and central heating', group: 'Services',
    note: 'All pipework renewed plus boiler, radiators and controls. A heat pump costs more before grants.',
    budget: [4000, 8000], mid: [8000, 14000], premium: [14000, 24000] },
  { id: 'boiler', label: 'Boiler replacement only', group: 'Services',
    note: 'Straight combi swap. A system change or a move costs more.',
    budget: [2200, 2800], mid: [2800, 3800], premium: [3800, 5500] },

  // Fabric
  { id: 'windows', label: 'Windows, whole house', group: 'Fabric',
    note: 'The material decides this. uPVC at the bottom, aluminium in the middle, timber at the top.',
    budget: [8500, 14500], mid: [18000, 32000], premium: [35000, 60000] },
  { id: 'roof', label: 'New roof', group: 'Fabric',
    note: 'Three bed semi, pitched. Scaffold is usually separate and runs for the whole job.',
    budget: [5500, 7500], mid: [7500, 12000], premium: [12000, 18000],
    triggers: ['scaffold'] },
  { id: 'insulation', label: 'External wall insulation', group: 'Fabric',
    note: 'Changes the external appearance, so a conservation area or an article 4 direction matters here.',
    budget: [8000, 14000], mid: [14000, 22000], premium: [22000, 40000],
    triggers: ['scaffold'] },

  // Finishes
  { id: 'plastering', label: 'Replastering', group: 'Finishes',
    note: 'A skim over sound plaster is a fraction of hacking off and starting again. Older properties often need the latter.',
    budget: [4000, 7000], mid: [7000, 14000], premium: [16000, 32000] },
  { id: 'decorating', label: 'Full redecoration', group: 'Finishes',
    note: 'Walls, ceilings and woodwork throughout.',
    budget: [3000, 6000], mid: [6000, 12000], premium: [12000, 22000] },
  { id: 'flooring', label: 'Flooring throughout', group: 'Finishes',
    note: 'Engineered timber and stone sit at the top, carpet and vinyl at the bottom.',
    budget: [3500, 8000], mid: [8000, 16000], premium: [16000, 30000] },
  { id: 'tiling', label: 'Tiling', group: 'Finishes',
    note: 'Usually priced with the room rather than separately, so watch for it appearing twice.',
    budget: [1500, 3000], mid: [3000, 6000], premium: [6000, 14000] },

  // Structural
  { id: 'ext_single', label: 'Single storey extension, around 20m²', group: 'Structural',
    note: 'Steel, glazing and the roof decide the number. A large rooflight or bifolds move it a long way.',
    budget: [42000, 52000], mid: [55000, 68000], premium: [72000, 90000],
    triggers: ['structural_engineer', 'building_control', 'party_wall', 'scaffold', 'planning'] },
  { id: 'ext_double', label: 'Two storey extension, around 40m²', group: 'Structural',
    note: 'Not double the price of a single storey, because the foundations and roof are shared.',
    budget: [65000, 80000], mid: [85000, 110000], premium: [115000, 150000],
    triggers: ['structural_engineer', 'building_control', 'party_wall', 'scaffold', 'planning', 'architect'] },
  { id: 'loft_velux', label: 'Loft conversion, rooflight', group: 'Structural',
    note: 'The cheapest conversion because the roof structure barely changes. Head height decides whether it is possible at all.',
    budget: [22000, 35000], mid: [28000, 40000], premium: [35000, 50000],
    triggers: ['structural_engineer', 'building_control', 'party_wall'] },
  { id: 'loft_dormer', label: 'Loft conversion, dormer', group: 'Structural',
    note: 'Adds usable floor area by changing the roof. Usually permitted development at the rear, rarely at the front.',
    budget: [35000, 55000], mid: [42000, 60000], premium: [55000, 75000],
    triggers: ['structural_engineer', 'building_control', 'party_wall', 'scaffold', 'planning'] },
  { id: 'knockthrough', label: 'Removing a wall', group: 'Structural',
    note: 'The steel is cheap. The engineer, the building control sign off and the making good are not.',
    budget: [2500, 4500], mid: [4500, 8000], premium: [8000, 15000],
    triggers: ['structural_engineer', 'building_control', 'plastering'] },

  // Outside
  { id: 'driveway', label: 'Driveway', group: 'Outside',
    note: 'Block paving costs more than tarmac. Drainage matters, since a non permeable surface over 5m² usually needs planning permission.',
    budget: [3000, 5000], mid: [5000, 10000], premium: [10000, 18000] },
  { id: 'landscaping', label: 'Garden and landscaping', group: 'Outside',
    note: 'Almost always the thing that gets cut when the budget runs out.',
    budget: [3000, 8000], mid: [8000, 20000], premium: [20000, 50000] },
]

/**
 * The costs that do not appear on a builder's quote and catch people out.
 * This list is the point of the tool.
 */
export interface Hidden {
  id: string
  label: string
  low: number
  high: number
  when: string
  detail: string
  /** true where the cost is a percentage of the build rather than fixed */
  pctOfBuild?: [number, number]
}

export const HIDDEN: Hidden[] = [
  { id: 'vat', label: 'VAT', low: 0, high: 0, pctOfBuild: [20, 20],
    when: 'Almost always',
    detail: 'A quote from a VAT registered builder may be shown excluding VAT. On a £60,000 job that is £12,000 you had not counted. Ask explicitly whether the figure includes it. Some work on properties empty for over two years qualifies for 5 per cent, and a new build is zero rated, but a normal renovation is not.' },
  { id: 'contingency', label: 'Contingency', low: 0, high: 0, pctOfBuild: [10, 20],
    when: 'Always',
    detail: 'Ten per cent on a modern house, closer to twenty on anything pre-1960. Joists, wiring, damp and drainage are the usual surprises. A project without a contingency line is a project that will go over, because the contingency is not optional, only the planning for it is.' },
  { id: 'architect', label: 'Architect or designer', low: 0, high: 0, pctOfBuild: [5, 12],
    when: 'Extensions and structural work',
    detail: 'Commonly 5 to 12 per cent of build cost, depending on how far they take it. Drawings for planning only sit at the bottom, full service including tender and site visits at the top.' },
  { id: 'structural_engineer', label: 'Structural engineer', low: 500, high: 1500,
    when: 'Anything structural',
    detail: 'Calculations for steels, foundations or a loft floor. Building Control will want them before work starts, not after.' },
  { id: 'building_control', label: 'Building Control', low: 500, high: 1200,
    when: 'Most structural and services work',
    detail: 'Either your council or an approved inspector. Separate from planning permission and frequently confused with it. Covers plan checking and site inspections.' },
  { id: 'planning', label: 'Planning application', low: 258, high: 600,
    when: 'Where permitted development does not cover it',
    detail: 'A householder application in England is a few hundred pounds in fees, but the drawings behind it are the real cost. A lawful development certificate, worth having even when you do not need permission, is about half the fee.' },
  { id: 'party_wall', label: 'Party wall surveyor', low: 1000, high: 3000,
    when: 'Work on or near a shared wall',
    detail: 'If your neighbour dissents, you pay for their surveyor as well as your own, so budget for two. Serving notice properly and early is the cheapest way to avoid this escalating. A schedule of condition protects you as much as them.' },
  { id: 'asbestos', label: 'Asbestos survey and removal', low: 200, high: 2500,
    when: 'Properties built before 2000',
    detail: 'A survey is a few hundred. Removal is licensed work and costs considerably more. Artex ceilings, garage roofs and old floor tiles are the usual finds.' },
  { id: 'scaffold', label: 'Scaffold', low: 800, high: 4000,
    when: 'Roof, upper floor and external work',
    detail: 'Often quoted for a fixed period. If the job overruns, the scaffold hire keeps running and that is charged to you. Ask what period the quote assumes.' },
  { id: 'skip', label: 'Skips, permits and parking', low: 300, high: 1500,
    when: 'Most projects',
    detail: 'A skip on the road needs a council permit. Suspending parking bays costs more, and in some boroughs considerably more.' },
  { id: 'damp', label: 'Damp and timber treatment', low: 2500, high: 15000,
    when: 'Found once work starts, in older properties',
    detail: 'Rarely known in advance, which is exactly why the contingency exists. Rising and penetrating damp and timber rot in suspended floors are the common ones.' },
  { id: 'drainage', label: 'Drainage diversion', low: 1500, high: 6000,
    when: 'Extensions over or near a sewer',
    detail: 'Building over or close to a public sewer needs agreement from the water company. That takes time as well as money, so it is worth checking the position early.' },
  { id: 'accommodation', label: 'Somewhere else to live', low: 0, high: 0,
    when: 'Full renovations',
    detail: 'A full gut is not habitable. Rent, storage and the cost of running two homes at once for the duration. People budget for the build and forget they still need somewhere to sleep.' },
  { id: 'furnishing', label: 'Everything that goes in it afterwards', low: 0, high: 0,
    when: 'Always',
    detail: 'Blinds, curtains, light fittings, furniture, white goods. The build ends and the spending does not. This is regularly a five figure sum that nobody planned for.' },
]

export const REGIONS: { id: string; label: string; multiplier: number; note: string }[] = [
  { id: 'london', label: 'London', multiplier: 1.32,
    note: 'Labour runs 20 to 30 per cent above the Midlands and North, plus restricted access, permits and parking.' },
  { id: 'southeast', label: 'South East', multiplier: 1.18,
    note: 'Close behind London on labour, without quite the same access problems.' },
  { id: 'southwest', label: 'South West', multiplier: 1.05, note: 'Around the national average, higher in the tourist belt.' },
  { id: 'east', label: 'East of England', multiplier: 1.08, note: 'Pulled up by proximity to London.' },
  { id: 'midlands', label: 'Midlands', multiplier: 1.0, note: 'Roughly the national baseline.' },
  { id: 'north', label: 'North of England', multiplier: 0.94, note: 'Below the national average on labour.' },
  { id: 'wales', label: 'Wales', multiplier: 0.95, note: 'Below average, though rural access can add cost.' },
  { id: 'scotland', label: 'Scotland', multiplier: 0.97,
    note: 'Different building standards and a building warrant rather than building regulations approval.' },
  { id: 'ni', label: 'Northern Ireland', multiplier: 0.88, note: 'The lowest labour rates in the UK.' },
]

export const AGES: { id: string; label: string; contingency: number; note: string }[] = [
  { id: 'pre1919', label: 'Before 1919', contingency: 20,
    note: 'Solid walls, lath and plaster, lime mortar and no damp proof course. The most surprises, and the most likely to need specialist trades.' },
  { id: '1919_1944', label: '1919 to 1944', contingency: 18,
    note: 'Often the original wiring and plumbing runs. Asbestos is common from this period onward.' },
  { id: '1945_1979', label: '1945 to 1979', contingency: 15,
    note: 'Asbestos is very likely. Artex ceilings, garage roofs and floor tiles are the usual places.' },
  { id: '1980_1999', label: '1980 to 1999', contingency: 12,
    note: 'Fewer structural surprises, but services are now at the end of their life.' },
  { id: 'post2000', label: '2000 onwards', contingency: 10,
    note: 'The fewest surprises. Asbestos was banned in 1999, so a survey is rarely needed.' },
]

export function money(n: number): string {
  return '£' + Math.round(n).toLocaleString('en-GB')
}
