/**
 * The three additions, kept deliberately plain. Anyone might use this,
 * including people who have never managed building work before, so
 * nothing here assumes they know what retention or Part P means.
 */

export interface Stage {
  id: string
  label: string
  when: string
  pct: number
  note: string
}

/** A normal payment pattern for domestic work. */
export function stagesFor(hasStructural: boolean): Stage[] {
  if (hasStructural) {
    return [
      { id: 'deposit', label: 'Deposit', when: 'Before anything starts', pct: 10,
        note: 'This covers materials they have to order up front. Ten per cent is normal. A builder asking for a third or a half before starting is the single commonest warning sign, and you have very little protection if they disappear with it.' },
      { id: 'foundations', label: 'Groundwork and foundations done', when: 'Usually week 2 to 4', pct: 20,
        note: 'Pay when the work is finished and signed off, not when it starts.' },
      { id: 'structure', label: 'Walls and roof up, watertight', when: 'Usually week 5 to 8', pct: 25,
        note: 'The point where the building is weatherproof. An obvious, visible milestone.' },
      { id: 'first_fix', label: 'First fix done', when: 'Usually week 8 to 12', pct: 20,
        note: 'Wiring and pipework in the walls, before the plastering covers it. Take photographs of everything at this point. You will want them if anything ever needs finding again.' },
      { id: 'second_fix', label: 'Second fix and plastering done', when: 'Usually week 12 to 16', pct: 15,
        note: 'Sockets, switches, radiators, doors, skirting. The room starts looking finished.' },
      { id: 'completion', label: 'Everything finished', when: 'The end', pct: 5,
        note: 'The last payment, less anything held back. Do not hand this over until you have walked round with your snagging list.' },
    ]
  }
  return [
    { id: 'deposit', label: 'Deposit', when: 'Before anything starts', pct: 15,
      note: 'Covers materials ordered up front. A builder asking for a third or more before starting is the commonest warning sign there is.' },
    { id: 'halfway', label: 'Roughly halfway', when: 'Agreed point in the middle', pct: 40,
      note: 'Tie this to something you can see rather than to a date. A date passes whether the work happened or not.' },
    { id: 'nearly', label: 'Main work finished', when: 'Before the final touches', pct: 35,
      note: 'Everything substantial done, with only making good and finishing left.' },
    { id: 'completion', label: 'Everything finished', when: 'The end', pct: 10,
      note: 'The last payment, less anything held back. Walk round with the snagging list before you pay it.' },
  ]
}

export interface SnagItem { area: string; checks: string[] }

const SNAGS: Record<string, SnagItem> = {
  kitchen: { area: 'Kitchen', checks: [
    'Every cupboard door opens fully and lines up with the ones next to it',
    'Drawers close softly and do not catch',
    'Worktop joints are tight and sealed, especially around the sink',
    'Every appliance is plugged in and actually works, including the extractor',
    'Taps run hot and cold the right way round, with no drips',
    'Sealant along the worktop and splashback is neat and unbroken',
    'The waste under the sink does not leak when you run it for a minute',
  ]},
  bathroom: { area: 'Bathroom', checks: [
    'The shower tray and bath drain fully, with no water left standing',
    'Sealant around the bath, tray and basin is continuous with no gaps',
    'The extractor fan comes on and actually pulls, test it with tissue paper',
    'Tiles are level, grout is even, no cracked or hollow sounding tiles',
    'The toilet flushes properly and the cistern refills without running on',
    'Radiator or towel rail heats up evenly',
    'No leaks under the basin or behind the toilet after running everything',
  ]},
  ensuite: { area: 'Ensuite', checks: [
    'Shower drains fully with no standing water',
    'Extractor works and vents outside rather than into the loft',
    'Sealant is continuous around the tray and basin',
    'Door clears the fittings when it opens',
  ]},
  rewire: { area: 'Electrics', checks: [
    'Every socket and switch works, test them all rather than a sample',
    'Sockets and switches sit flush to the wall and are straight',
    'The consumer unit is labelled so you know which switch does what',
    'You have the electrical installation certificate, this matters when you sell',
    'Outside lights and any garden sockets work',
    'Nothing trips when you run several things at once',
  ]},
  plumbing: { area: 'Heating and plumbing', checks: [
    'Every radiator heats evenly from top to bottom',
    'The system has been balanced, radiators furthest from the boiler still get hot',
    'No air in the system, bleed valves work',
    'Hot water reaches every tap at a reasonable temperature',
    'The boiler has been registered and you have the paperwork',
    'No drips at any joint after everything has run for a while',
  ]},
  plastering: { area: 'Walls and ceilings', checks: [
    'Hold a light close to the wall and look along it, ripples show up this way',
    'Corners are straight and edges are crisp',
    'No cracks at the joins, particularly where new meets old',
    'Around windows and doors is neat with no gaps',
  ]},
  decorating: { area: 'Decoration', checks: [
    'Paint covers evenly with no patches showing through',
    'Cutting in around edges and ceilings is clean',
    'No paint on the glass, handles, sockets or floor',
    'Doors and skirting are finished on all visible sides',
  ]},
  flooring: { area: 'Flooring', checks: [
    'No gaps at the edges or between boards',
    'Nothing creaks or moves when you walk on it',
    'Thresholds between rooms are fitted and level',
    'Skirting or beading covers the expansion gap neatly',
  ]},
  windows: { area: 'Windows', checks: [
    'Every window opens, closes and locks properly',
    'No draughts around the frames',
    'Trickle vents work if fitted',
    'You have the FENSA or equivalent certificate, you will need it when you sell',
    'Sealant outside is continuous',
  ]},
  roof: { area: 'Roof', checks: [
    'Look from the ground with binoculars, tiles should be even with no gaps',
    'Flashing around chimneys and joins is neat and sealed',
    'Gutters run the right way and do not pool water',
    'The loft is dry after heavy rain, check a few days later',
  ]},
  ext_single: { area: 'Extension', checks: [
    'Floor is level throughout, roll something round across it',
    'Doors and windows open and close without catching',
    'Roof and gutters shed water away from the building',
    'The join between old and new is neat inside and out',
    'You have the building control completion certificate, this is essential when you sell',
    'Outside ground levels do not bridge the damp proof course',
  ]},
  ext_double: { area: 'Extension', checks: [
    'Floors level on both storeys',
    'Stairs feel solid with even rises',
    'Doors and windows all operate freely',
    'Building control completion certificate received',
    'The join between old and new is neat at every level',
  ]},
  loft_velux: { area: 'Loft conversion', checks: [
    'Stairs are safe and comply, with a handrail',
    'Rooflights open, close and lock',
    'Fire doors fitted where required, these are a building regs matter',
    'Building control completion certificate received',
    'Insulation is complete, the room should hold heat',
  ]},
  loft_dormer: { area: 'Loft conversion', checks: [
    'Stairs are safe with a handrail and even rises',
    'Dormer is watertight, check the loft after rain',
    'Fire doors fitted where required',
    'Building control completion certificate received',
    'Windows open and lock properly',
  ]},
  knockthrough: { area: 'Where the wall was', checks: [
    'The beam is boxed in neatly and finished',
    'No cracking above or beside the opening after a few weeks',
    'Floor is level across the join',
    'Building control have signed it off',
  ]},
  driveway: { area: 'Driveway', checks: [
    'Water runs away from the house rather than towards it',
    'Surface is even with no dips that hold water',
    'Edges are fixed and do not move underfoot',
  ]},
  landscaping: { area: 'Garden', checks: [
    'Levels drain away from the building',
    'Paving is even and stable',
    'Nothing bridges the damp proof course',
  ]},
}

export function snagsFor(ids: string[]): SnagItem[] {
  const out: SnagItem[] = []
  const seen = new Set<string>()
  ids.forEach(id => {
    const s = SNAGS[id]
    if (s && !seen.has(s.area)) { out.push(s); seen.add(s.area) }
  })
  // Always worth checking
  out.push({ area: 'Everywhere', checks: [
    'Walk round in daylight, then again with the lights on at night',
    'Every door opens fully without catching the floor or the wall',
    'Nothing has been left damaged, chipped or scratched',
    'The site has been cleared and rubbish taken away',
    'You have keys to everything, including any new locks',
  ]})
  return out
}

export interface Paper {
  id: string
  label: string
  who: string
  why: string
  trigger: string[]
}

/**
 * The documents people forget to collect. These matter years later,
 * because a buyer's solicitor asks for them and a missing certificate
 * can hold up a sale.
 */
export const PAPERWORK: Paper[] = [
  { id: 'bc', label: 'Building control completion certificate',
    who: 'Your council or the approved inspector',
    why: 'The single most important one. A buyer\u2019s solicitor will ask for it on any structural work, and not having it can delay or collapse a sale years later. Chase it, because it is not always sent automatically.',
    trigger: ['ext_single', 'ext_double', 'loft_velux', 'loft_dormer', 'knockthrough'] },
  { id: 'eic', label: 'Electrical installation certificate',
    who: 'Your electrician',
    why: 'Proves the work meets Part P of the building regulations. Needed when you sell, and needed if you ever claim on insurance after an electrical fault.',
    trigger: ['rewire', 'kitchen', 'bathroom', 'ensuite'] },
  { id: 'gas', label: 'Gas safety and boiler registration',
    who: 'Your Gas Safe engineer',
    why: 'The installation has to be notified to Gas Safe. You should receive a building regulations compliance certificate within about a month, and the boiler warranty usually depends on it.',
    trigger: ['plumbing', 'boiler'] },
  { id: 'fensa', label: 'FENSA or CERTASS certificate',
    who: 'Your window installer',
    why: 'Windows are covered by building regulations. Without this a buyer\u2019s solicitor will want an indemnity policy, which is a small cost but an avoidable irritation.',
    trigger: ['windows'] },
  { id: 'pw', label: 'Party wall award and schedule of condition',
    who: 'The party wall surveyor',
    why: 'Keep both. The schedule of condition photographs protect you if a neighbour claims damage later, and the award is worth having on file permanently.',
    trigger: ['ext_single', 'ext_double', 'loft_dormer'] },
  { id: 'planning', label: 'Planning permission or lawful development certificate',
    who: 'Your council',
    why: 'If you relied on permitted development rather than applying, a lawful development certificate is worth getting anyway. It costs about half a planning fee and removes any argument when you sell.',
    trigger: ['ext_single', 'ext_double', 'loft_dormer', 'driveway'] },
  { id: 'structural', label: 'Structural engineer calculations',
    who: 'The engineer',
    why: 'Keep them with the building control certificate. Occasionally asked for, and impossible to recreate.',
    trigger: ['ext_single', 'ext_double', 'loft_velux', 'loft_dormer', 'knockthrough'] },
  { id: 'warranties', label: 'Warranties and guarantees',
    who: 'Whoever supplied or fitted it',
    why: 'Boiler, roof, damp treatment, windows, appliances, and any insurance backed guarantee on the workmanship. Put them all in one folder now, because you will not find them in five years otherwise.',
    trigger: ['*'] },
  { id: 'photos', label: 'Your own photographs before plastering',
    who: 'You',
    why: 'Not a certificate, but the most useful thing you will own. Photograph every wall before it is covered, so you know where the pipes and cables run. Anyone who drills into a wall later will thank you.',
    trigger: ['*'] },
]

export function paperworkFor(ids: string[]): Paper[] {
  return PAPERWORK.filter(p =>
    p.trigger.includes('*') || p.trigger.some(t => ids.includes(t)))
}
