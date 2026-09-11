// Everything each industry hub needs. Adding an industry means adding an entry here.

export interface IndustryTool {
  name: string
  href: string
  line: string
}

export interface IndustryProduct {
  name: string
  status: 'live' | 'building' | 'considering'
  href?: string
  price?: string
  does: string[]
}

export interface IndustryService {
  name: string
  href: string
  line: string
}

export interface Industry {
  slug: string
  name: string
  who: string
  tileLine: string
  headline: string
  intro: string
  problems: [string, string][]
  tools: IndustryTool[]
  product?: IndustryProduct
  services: IndustryService[]
  reading: [string, string][]
  keywords: string
  metaDescription: string
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'construction',
    name: 'Construction',
    who: 'Subcontractors, trades and small main contractors',
    tileLine: 'Retention that gets forgotten, job costs that arrive too late, and CIS.',
    headline: 'The money is earned. Getting hold of it is the problem.',
    intro: 'Construction businesses lose money in places that have nothing to do with how well the work was done. Retention that nobody applied for. A job that looked profitable until the variations were priced properly. Deduction that carried on past the cap because it was a running total nobody checked.',
    problems: [
      ['Retention gets forgotten, not disputed',
       'The second half falls due twelve months after practical completion, by which point the job is closed, the file is archived and the person who would have chased it is on three other sites. It is rarely a dispute. The date passed and nobody applied.'],
      ['Job costing arrives after the job',
       'Most small contractors find out whether a job made money when the final account is agreed. By then the same mistake has been repeated on the next two.'],
      ['Deduction past the cap',
       'Retention accumulates from each certificate until it hits the ceiling in the contract, usually five per cent, at which point it should stop. In practice it often does not, because nobody is comparing the running total to the limit.'],
      ['CIS and subcontractor admin',
       'Verification, deduction statements, monthly returns and the reconciliation at year end. All of it necessary, none of it billable.'],
    ],
    tools: [
      { name: 'Retention tracker', href: '/tools/retention-tracker',
        line: 'What is held across every job, whether deduction has passed the cap, and when each half falls due. Exports to your calendar.' },
      { name: 'Reporting cost calculator', href: '/tools/reporting-cost',
        line: 'What the manual side of this actually costs, by role, using true employment cost rather than salary.' },
      { name: 'Build cost estimator', href: '/tools/build-estimator',
        line: 'What a custom system would cost, itemised, with a reason against every line.' },
    ],
    product: {
      name: 'Retention Manager',
      status: 'live',
      href: '/retention-manager',
      price: 'From £19 a month',
      does: [
        'Emails at 90, 30 and 7 days before each release, then when overdue',
        'Formal applications for release with follow up wording',
        'Statutory interest calculated on anything late',
        'Part payments and certificate history',
        'Over-deduction flagged against the contractual cap',
      ],
    },
    services: [
      { name: 'Custom business tools', href: '/services/custom-business-tools',
        line: 'Job trackers, valuation tools and applications for payment built around how you actually work.' },
      { name: 'Excel automation', href: '/services/excel-automation',
        line: 'The spreadsheets that run the business, automated rather than replaced.' },
      { name: 'Power BI', href: '/services/power-bi',
        line: 'Job profitability and cash position on a dashboard that updates itself.' },
    ],
    reading: [
      ['The main contractor has not released your retention', '/blog/main-contractor-not-released-retention'],
      ['Excel automation for construction companies', '/blog/excel-automation-construction-companies-uk'],
      ['How to see which jobs and clients are profitable', '/blog/how-to-see-which-jobs-clients-are-profitable'],
    ],
    keywords: 'construction software UK, retention tracking construction, subcontractor software UK, CIS automation, job costing software small builders, construction business intelligence',
    metaDescription: 'Software and free tools for UK construction businesses. Track retention across every job, see which jobs made money, and automate the admin that is necessary but not billable.',
  },

  {
    slug: 'property',
    name: 'Property and lettings',
    who: 'HMO landlords, portfolio landlords and letting agents',
    tileLine: 'Licensing that changed in 2026, certificates that lapse, and rent by the room.',
    headline: 'The rules did not change in 2026. What it costs to get them wrong did.',
    intro: 'A licence lasts five years but the certificates underneath it renew on their own cycles. Most landlords who fall foul of that are not ignoring it, they have simply lost track of which date falls when across several properties.',
    problems: [
      ['A lapsed gas certificate is a criminal offence',
       'Not a licence breach, not a civil penalty. Letting without a valid certificate is prosecutable, and it is the single date most likely to be missed because it renews annually while everything around it runs on longer cycles.'],
      ['Rent repayment orders doubled',
       'For offences on or after 1 May 2026 the maximum is two years of rent rather than one, the window for claiming doubled to two years, and the Act extended liability to superior landlords in rent to rent arrangements.'],
      ['Licensing is not just the national threshold',
       'More than seventy councils operate additional licensing covering smaller HMOs, and selective licensing covers every private rental in a designated area. A scheme can cover one street and not the next.'],
      ['Room level income is invisible in most systems',
       'Landlord software is built for single lets. Arrears by room, void by room and utility apportionment all end up in a spreadsheet.'],
    ],
    tools: [
      { name: 'HMO licence checker', href: '/tools/hmo-licence-checker',
        line: 'Four questions and you know whether a property needs a mandatory licence, what it costs and what the penalty is without one. Includes a room size calculator.' },
      { name: 'HMO compliance tracker', href: '/tools/hmo-compliance-tracker',
        line: 'Every certificate renewal date across the portfolio, with what is overdue and what is coming. Exports to your calendar.' },
      { name: 'Data health check', href: '/tools/data-health-check',
        line: 'Check a tenant or supplier list for the errors that break systems before you import it.' },
    ],
    product: {
      name: 'HMO Portfolio Manager',
      status: 'live',
      href: '/margin-manager',
      does: [
        'Every certificate date across the whole portfolio, with email reminders',
        'Room by room rent, arrears and voids',
        'Licence conditions and expiry per council',
        'Tenant records and compliance documents in one place',
        'Yield and cash flow per property against what you projected',
      ],
    },
    services: [
      { name: 'Custom business tools', href: '/services/custom-business-tools',
        line: 'Portfolio systems built around room level letting rather than single lets.' },
      { name: 'Client portals', href: '/services/client-portals',
        line: 'A branded portal for tenants or landlords to submit documents and see what is outstanding.' },
      { name: 'Excel automation', href: '/services/excel-automation',
        line: 'The rent spreadsheet, automated, before it gets any bigger.' },
    ],
    reading: [
      ['Rent repayment orders doubled in May 2026', '/blog/rent-repayment-orders-doubled-2026'],
      ['What actually happens at an HMO licence inspection', '/blog/hmo-licence-inspection-what-to-expect'],
      ['HMO management software for UK landlords', '/blog/hmo-management-software-uk'],
    ],
    keywords: 'HMO software UK, landlord compliance software, HMO licence checker, HMO certificate tracking, portfolio landlord software UK, room by room rent tracking',
    metaDescription: 'Software and free tools for UK HMO landlords and letting agents. Check licensing, track every certificate renewal, and manage rent by the room rather than by the property.',
  },

  {
    slug: 'recruitment',
    name: 'Recruitment',
    who: 'Perm desks, agency owners and in-house talent teams',
    tileLine: 'Billed revenue that can still be clawed back, and margin nobody measures.',
    headline: 'How much of last month could you still be asked to give back?',
    intro: 'Every permanent placement inside its rebate window is revenue you have invoiced and could still be asked to return. Individually nobody worries about it. Across a desk it is a real number, and it clusters in exactly the wrong way.',
    problems: [
      ['Rebate exposure is never quantified',
       'A desk with twelve live placements at an average nine thousand pound fee is carrying something like forty three thousand pounds of contingent liability. Most agency owners have never put a number on it.'],
      ['It clusters rather than spreading',
       'A strong month produces a batch of start dates that move through their windows together. Six placements into the same client, made the same fortnight, reach week four on the same day. One candidate leaving is absorbed. Six is a month.'],
      ['The invoice condition nobody uses',
       'Rebate clauses are almost always conditional on the invoice being settled within terms. A client who paid sixty days late on thirty day terms may have no entitlement at all, and most agencies process the refund without checking.'],
      ['Consultant margin lives in the CRM and nowhere else',
       'Placement to cash, margin by consultant and time to fill all exist as data in Bullhorn or Vincere, and get rebuilt by hand in a spreadsheet before every management meeting.'],
    ],
    tools: [
      { name: 'Rebate exposure tracker', href: '/tools/rebate-exposure',
        line: 'What is refundable today across the whole desk, when each placement becomes safe, and where an unpaid invoice changes the position.' },
      { name: 'Reporting cost calculator', href: '/tools/reporting-cost',
        line: 'What rebuilding those reports by hand actually costs, by role.' },
      { name: 'Data health check', href: '/tools/data-health-check',
        line: 'Check a candidate or client list before importing it. Finds dissolved companies, invalid emails and duplicates.' },
    ],
    product: {
      name: 'Desk Exposure Manager',
      status: 'considering',
      does: [
        'Live rebate exposure across the desk, kept current',
        'Alerts before a cluster of placements reaches the same milestone',
        'Unpaid invoices flagged against rebate entitlement',
        'Consultant margin and placement to cash',
        'Reporting an invoice finance provider or board will accept',
      ],
    },
    services: [
      { name: 'Power BI', href: '/services/power-bi',
        line: 'Reporting built on top of your CRM rather than typed in twice.' },
      { name: 'Custom business tools', href: '/services/custom-business-tools',
        line: 'Whatever your CRM does not do, built around your desk structure.' },
      { name: 'Excel automation', href: '/services/excel-automation',
        line: 'The management pack, produced automatically instead of the night before.' },
    ],
    reading: [
      ['The recruitment liability almost nobody measures', '/blog/recruitment-rebate-liability-nobody-measures'],
      ['Excel reporting for recruitment agencies', '/blog/excel-reporting-recruitment-agencies-uk'],
    ],
    keywords: 'recruitment agency software UK, rebate exposure tracking, recruitment reporting Bullhorn, consultant margin reporting, placement to cash recruitment',
    metaDescription: 'Software and free tools for UK recruitment agencies. Track rebate exposure across the desk, see consultant margin properly, and stop rebuilding the management pack by hand.',
  },

  {
    slug: 'professional-services',
    name: 'Professional services',
    who: 'Agencies, consultancies, accountancy and law firms',
    tileLine: 'Work delivered but not billed, and cash earned but not collected.',
    headline: 'How much could you release this month without winning any new work?',
    intro: 'Lock-up is work you have delivered but not invoiced, plus work you have invoiced but not collected. Most firms measure the second half and never the first, because unbilled time sits in a time recording system rather than on a balance sheet.',
    problems: [
      ['The WIP half is invisible',
       'Every lock-up calculator asks for a work in progress figure, which is the one number a small firm cannot produce. It exists as unbilled hours in a system, not as a balance.'],
      ['Chasing harder does not fix a billing lag',
       'If more is stuck before the invoice goes out than after it, credit control is the wrong lever. Most firms reach for it anyway because debtors are the half they can see.'],
      ['Client concentration hides in the locked up cash',
       'One client can account for a third of everything tied up, which is a concentration risk as well as a cash problem, and it does not show in a revenue report.'],
      ['The wrong person does the reporting',
       'A partner on a high hourly rate rebuilding a spreadsheet costs considerably more than the same work done further down. Nobody calculates it because the time is not billed.'],
    ],
    tools: [
      { name: 'Lock-up and cash release tracker', href: '/tools/lockup-tracker',
        line: 'Builds lock-up from job level, so you get the number without needing a WIP balance, then names which jobs to bill and which invoices to chase.' },
      { name: 'Reporting cost calculator', href: '/tools/reporting-cost',
        line: 'What manual reporting costs by role, using true employment cost, and how fast automating it would pay back.' },
      { name: 'Data health check', href: '/tools/data-health-check',
        line: 'Check a client list for dissolved companies, invalid VAT numbers and duplicates.' },
    ],
    product: {
      name: 'Practice Cash Manager',
      status: 'considering',
      does: [
        'Lock-up split into work in progress and debtors, kept current',
        'Which jobs to bill this week, ranked by what each releases',
        'Which invoices to chase, with statutory interest calculated',
        'Client concentration in the locked up cash',
        'Connected to your time recording rather than typed in twice',
      ],
    },
    services: [
      { name: 'Client portals', href: '/services/client-portals',
        line: 'Clients upload documents, sign engagement letters and pay, under your brand.' },
      { name: 'Power BI', href: '/services/power-bi',
        line: 'Lock-up, WIP ageing and client profitability on a dashboard that refreshes itself.' },
      { name: 'Custom business tools', href: '/services/custom-business-tools',
        line: 'Matter and job management built around how your firm actually works.' },
    ],
    reading: [
      ['Client portal for accountants', '/blog/client-portal-for-accountants-uk'],
      ['Secure client portal for UK small businesses', '/blog/secure-client-portal-small-business-uk'],
      ['Data automation for professional services', '/blog/data-automation-professional-services'],
    ],
    keywords: 'professional services software UK, lock-up days accountancy, WIP tracking law firm, client portal accountants, agency cash flow software UK',
    metaDescription: 'Software and free tools for UK professional services firms. Work out lock-up from job level, see which jobs to bill first, and give clients a portal under your own brand.',
  },

  {
    slug: 'hospitality',
    name: 'Hospitality',
    who: 'Restaurants, takeaways, pubs and cafes',
    tileLine: 'Margins measured in single digits, delivery commission eating a third, and benchmarks you get judged against.',
    headline: 'Three pence of profit on a pint, and everyone wants a share',
    intro: 'Wet-led pubs made around 3p profit for every pound spent on a pint in 2026, down from 5p the year before. Full service restaurants run at 3 to 6 per cent net. At those margins a supplier price rise that goes unnoticed for six weeks is not an annoyance, it is the year.',
    problems: [
      ['Delivery commission is invisible in the accounts',
       'Platforms take 25 to 35 per cent, so a £12 dish returns £8.40. It does not show in cost of sales, so gross profit looks fine while net quietly disappears. Delivery menus need 8 to 12 points more margin to break even and most operators price them identically.'],
      ['Costing by hand cannot keep up',
       'Manual dish costing runs around 28 minutes per menu item and prices move weekly. A dish costed at 30 per cent food cost in January can be running at 36 by March with nobody aware. The gap between theoretical and actual should stay under two points.'],
      ['You get benchmarked whether you like it or not',
       'HMRC publishes expected profit figures for restaurants and compares filed returns against them automatically. A business can be entirely straight and still sit below the range because of delivery mix, discounting and waste. The difficulty is evidencing that after the fact.'],
      ['A tie removes the obvious lever',
       'Tied tenants buy at pubco prices, which costs 8 to 12 points of gross profit against free of tie. Every piece of advice about switching suppliers and negotiating harder is useless to roughly ten thousand tenants who have no supplier to switch.'],
    ],
    tools: [
      { name: 'Restaurant benchmark check', href: '/tools/restaurant-benchmark-check',
        line: 'Where you sit against the published profit benchmarks, how much of any gap delivery, discounting and waste account for, and what records would evidence it.' },
      { name: 'Delivery margin calculator', href: '/tools/delivery-margin',
        line: 'Which dishes lose money once the platform takes its cut, what you would need to charge to break even, and what to charge to match dine-in.' },
      { name: 'GP calculator with wastage', href: '/tools/pub-gp-calculator',
        line: 'Gross profit across the whole range at once, with wastage applied by product type and VAT handled the right way round.' },
      { name: 'Labour by session', href: '/tools/labour-by-session',
        line: 'Which trading sessions contribute and which merely cover themselves, using what an hour actually costs rather than the rate.' },
      { name: 'Reporting cost calculator', href: '/tools/reporting-cost',
        line: 'What the manual side of running the numbers actually costs, by role, at true employment cost.' },
      { name: 'Data health check', href: '/tools/data-health-check',
        line: 'Check a supplier or customer list before it goes into anything. Runs in your browser, nothing uploaded.' },
    ],
    product: {
      name: 'Margin and Evidence Manager',
      status: 'considering',
      does: [
        'Recipe costing that updates every dish when an ingredient price moves',
        'Delivery margin by dish, so you can see which ones lose money on platform',
        'Stocktake variance tracked over time rather than counted and forgotten',
        'Menu engineering, sorting dishes into what earns and what does not',
        'A dated waste, comp and discount log that doubles as evidence',
        'Platform income reconciled against what the platforms report to HMRC',
      ],
    },
    services: [
      { name: 'Power BI', href: '/services/power-bi',
        line: 'Margin, labour and covers across several sites on one dashboard.' },
      { name: 'Custom business tools', href: '/services/custom-business-tools',
        line: 'Rota, stock or costing systems built around how your kitchen actually runs.' },
      { name: 'Excel automation', href: '/services/excel-automation',
        line: 'The costing spreadsheet one person maintains, turned into something the business owns.' },
    ],
    reading: [],
    keywords: 'restaurant software UK, pub margin software, takeaway profit margin, delivery commission profitability, restaurant GP benchmark UK, hospitality cost control software',
    metaDescription: 'Software and free tools for UK restaurants, pubs and takeaways. See where you sit against published profit benchmarks, work out which dishes lose money on delivery, and keep the records that evidence a low margin.',
  },

  {
    slug: 'healthcare',
    name: 'Healthcare',
    who: 'Pharmacies, dental practices, clinics and care providers',
    tileLine: 'Rotas, locum cost, compliance dates and data that cannot leave the building.',
    headline: 'Regulated, rota driven, and running on spreadsheets',
    intro: 'Healthcare businesses carry more compliance obligation than almost any other small business, and usually less software to handle it. Most of what needs tracking ends up in a spreadsheet that one person understands.',
    problems: [
      ['Locum cost is only visible after the fact',
       'Rates vary by day, by notice and by agency. Most practices know what they spent last month and not what they are committed to next.'],
      ['Compliance dates across staff and premises',
       'Registrations, DBS checks, training renewals, equipment servicing and inspections all renew on different cycles and get tracked separately.'],
      ['Rota and cover in one place, cost in another',
       'Who is working is managed in one system, what they cost sits in payroll, and the two only meet at month end.'],
      ['Patient data cannot go anywhere',
       'Which rules out most off the shelf reporting tools and means anything built has to keep the data where it already is.'],
    ],
    tools: [
      { name: 'Reporting cost calculator', href: '/tools/reporting-cost',
        line: 'What the manual admin actually costs, by role, using true employment cost.' },
      { name: 'Data health check', href: '/tools/data-health-check',
        line: 'Check a supplier or staff list for errors before importing. Runs entirely in your browser, nothing uploaded.' },
      { name: 'Build cost estimator', href: '/tools/build-estimator',
        line: 'What a rota, locum or compliance system would cost to build properly.' },
    ],
    services: [
      { name: 'Custom business tools', href: '/services/custom-business-tools',
        line: 'Rota, locum management and compliance tracking built around your practice.' },
      { name: 'Power BI', href: '/services/power-bi',
        line: 'Reporting that keeps sensitive data inside your own environment.' },
      { name: 'Excel automation', href: '/services/excel-automation',
        line: 'The spreadsheet one person understands, made into something the practice owns.' },
    ],
    reading: [
      ['Locum management tool for a pharmacy group', '/case-studies/locum-management-tool-pharmacy'],
    ],
    keywords: 'healthcare software UK, pharmacy locum management, dental practice software UK, clinic rota software, healthcare compliance tracking UK',
    metaDescription: 'Software and free tools for UK healthcare businesses. Locum and rota management, compliance date tracking, and reporting that keeps sensitive data where it belongs.',
  },
]

export function getIndustry(slug: string) {
  return INDUSTRIES.find(i => i.slug === slug)
}
