import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog' },
  title: 'Blog | Data Automation & Power BI Insights | Lexalytic',
  description: 'Practical guides on Power BI, Excel automation, Python, and business reporting - written from 15 years of real project experience.',
}

const posts = [
  {
    slug: 'hidden-costs-of-a-renovation-uk',
    title: 'The Renovation Costs That Are Not in the Builder Quote',
    excerpt: 'VAT, contingency, the structural engineer, Building Control, the party wall surveyor and somewhere to live. Together they add thirty to fifty per cent.',
    date: 'November 2026',
    readTime: '8 min read',
    tag: 'Homeowners',
  },
  {
    slug: 'service-charge-18-month-rule',
    title: 'The Service Charge Rule Almost No Leaseholder Knows About',
    excerpt: 'Costs incurred more than eighteen months before the demand arrives are generally not recoverable. A bill for work done two years ago is frequently unenforceable in full.',
    date: 'October 2026',
    readTime: '7 min read',
    tag: 'Leasehold',
  },
  {
    slug: 'restaurant-below-benchmark-gross-profit',
    title: 'Your Gross Profit Is Below Benchmark. That Is Not The Same As Being Wrong.',
    excerpt: 'HMRC compares filed restaurant returns against expected profit benchmarks automatically. Delivery commission, discounting and waste all depress margin legitimately.',
    date: 'November 2026',
    readTime: '8 min read',
    tag: 'Hospitality',
  },
  {
    slug: 'what-deliveroo-commission-really-costs',
    title: 'What Deliveroo Actually Costs You Per Dish',
    excerpt: 'A twelve pound dish returns around eight pounds forty after commission, before VAT and packaging. Most kitchens price delivery identically to dine-in.',
    date: 'October 2026',
    readTime: '7 min read',
    tag: 'Hospitality',
  },
  {
    slug: 'recruitment-rebate-liability-nobody-measures',
    title: 'The Recruitment Liability Almost Nobody Measures',
    excerpt: 'Every permanent placement inside its rebate window is money you have billed and could still be asked to return. Most agencies have never put a number on it.',
    date: 'November 2026',
    readTime: '8 min read',
    tag: 'Recruitment',
  },
  {
    slug: 'main-contractor-not-released-retention',
    title: 'The Main Contractor Has Not Released Your Retention. What You Can Actually Do.',
    excerpt: 'Retention that has passed its release date is a debt, not a favour. Your rights under the Construction Act, the interest you can charge, and the adjudication route that gets a decision in 28 days.',
    date: 'October 2026',
    readTime: '8 min read',
    tag: 'Construction',
  },
  {
    slug: 'hmo-licence-inspection-what-to-expect',
    title: 'What Actually Happens at an HMO Licence Inspection',
    excerpt: 'What a council officer checks during an HMO licence inspection, the failures that come up most often, and how to prepare so the visit does not produce a schedule of works.',
    date: 'October 2026',
    readTime: '7 min read',
    tag: 'Property',
  },
  {
    slug: 'rent-repayment-orders-doubled-2026',
    title: 'Rent Repayment Orders Doubled in May 2026. What Landlords Need to Know',
    excerpt: 'The Renters Rights Act doubled the maximum rent repayment order from 12 to 24 months. What changed, who is newly exposed, and what the combined penalty looks like.',
    date: 'September 2026',
    readTime: '7 min read',
    tag: 'Property',
  },
  {
    slug: 'excel-strips-leading-zeros-company-numbers',
    title: 'Why Excel Deletes the First Digit of Your Company Numbers',
    excerpt: 'Excel strips leading zeros from anything it reads as a number, quietly corrupting UK company registration numbers, sort codes and phone numbers. Why it happens and how to stop it.',
    date: 'September 2026',
    readTime: '7 min read',
    tag: 'Data Quality',
  },
  {
    slug: 'client-document-sharing-portal-uk',
    title: 'Client Document Sharing Portal UK - Moving Beyond Email and Shared Folders',
    excerpt: 'Why UK professional services firms are replacing email and Dropbox with proper client document portals. What changes, what it costs, and how to make the switch.',
    date: 'December 2026',
    readTime: '8 min read',
    tag: 'Client Portals',
  },
  {
    slug: 'secure-client-portal-small-business-uk',
    title: 'Secure Client Portal for UK Small Businesses - Do You Need One and What Should It Do',
    excerpt: 'A practical guide for UK small businesses on whether a client portal is worth building, what it should include, and what the alternatives cost over time.',
    date: 'November 2026',
    readTime: '8 min read',
    tag: 'Client Portals',
  },
  {
    slug: 'client-portal-for-accountants-uk',
    title: 'Client Portal for Accountants UK - What to Look For and What It Should Cost',
    excerpt: 'A practical guide for UK accountants and bookkeepers on choosing or building a client portal. What the platforms cost, where they fall short, and when bespoke makes sense.',
    date: 'October 2026',
    readTime: '8 min read',
    tag: 'Client Portals',
  },
  {
    slug: 'wedding-photographer-client-communication-uk',
    title: 'How Wedding Photographers Can Automate Client Communication Without Losing the Personal Touch',
    excerpt: 'A practical guide for UK wedding photographers on automating repetitive client communication.',
    date: 'June 2027',
    readTime: '8 min read',
    tag: 'Wedding Business',
  },
  {
    slug: 'wedding-supplier-crm-uk',
    title: 'Wedding Supplier CRM UK - What Small Businesses Actually Need to Track',
    excerpt: 'Client management for UK wedding suppliers.',
    date: 'June 2027',
    readTime: '8 min read',
    tag: 'Wedding Business',
  },
  {
    slug: 'grassroots-football-club-admin-uk',
    title: 'How to Run a Grassroots Football Club Without the Admin Chaos',
    excerpt: 'Practical guide to football club administration for UK grassroots clubs.',
    date: 'May 2027',
    readTime: '8 min read',
    tag: 'Sports Club',
  },
  {
    slug: 'reduce-manual-data-entry-uk-business',
    title: 'How to Reduce Manual Data Entry in Your UK Business - Practical Steps That Work',
    excerpt: 'Practical steps for UK businesses to reduce manual data entry.',
    date: 'May 2027',
    readTime: '8 min read',
    tag: 'Data Automation',
  },
  {
    slug: 'sports-club-membership-management-uk',
    title: 'Sports Club Membership Management Software UK - What Grassroots Clubs Actually Need',
    excerpt: 'Membership management for UK grassroots sports clubs.',
    date: 'May 2027',
    readTime: '8 min read',
    tag: 'Sports Club',
  },
  {
    slug: 'custom-crm-for-uk-small-business',
    title: 'Custom CRM for UK Small Businesses - When to Build Instead of Buy',
    excerpt: 'The practical decision framework for UK small businesses considering a custom CRM.',
    date: 'April 2027',
    readTime: '8 min read',
    tag: 'Custom Software',
  },
  {
    slug: 'personal-trainer-invoicing-uk',
    title: 'How to Invoice Clients as a Personal Trainer in the UK - The Simple Way',
    excerpt: 'Invoicing for UK personal trainers. The practical setup for getting paid on time.',
    date: 'April 2027',
    readTime: '8 min read',
    tag: 'Fitness Business',
  },
  {
    slug: 'pt-business-tools-uk',
    title: 'PT Business Tools UK - What You Actually Need vs What Gets Marketed at You',
    excerpt: 'A direct guide for UK personal trainers on which business tools are worth paying for.',
    date: 'April 2027',
    readTime: '8 min read',
    tag: 'Fitness Business',
  },
  {
    slug: 'bespoke-website-vs-wordpress-uk',
    title: 'Bespoke Website vs WordPress for UK Businesses in 2027 - The Honest Comparison',
    excerpt: 'An honest comparison of bespoke website development versus WordPress for UK businesses.',
    date: 'April 2027',
    readTime: '8 min read',
    tag: 'Website Development',
  },
  {
    slug: 'personal-trainer-client-management-uk',
    title: 'Personal Trainer Client Management Software UK - What Actually Works in 2027',
    excerpt: 'The honest guide to client management software for UK personal trainers.',
    date: 'March 2027',
    readTime: '8 min read',
    tag: 'Fitness Business',
  },
  {
    slug: 'ai-powered-proposal-generator-uk',
    title: 'AI Proposal Generator for UK Businesses - How to Automate Your First Draft',
    excerpt: 'How UK professional services firms are using AI to generate first draft proposals in minutes.',
    date: 'March 2027',
    readTime: '8 min read',
    tag: 'AI Tools',
  },
  {
    slug: 'hmo-licence-compliance-uk',
    title: 'HMO Licence Compliance for UK Landlords - What You Need to Track and When',
    excerpt: 'HMO licence compliance involves more ongoing obligations than most landlords realise.',
    date: 'March 2027',
    readTime: '8 min read',
    tag: 'Property',
  },
  {
    slug: 'small-business-kpi-dashboard-uk',
    title: 'KPI Dashboard for Small UK Businesses - What to Track and How to Build It',
    excerpt: 'A practical guide to building a KPI dashboard for a small UK business.',
    date: 'February 2027',
    readTime: '8 min read',
    tag: 'Business Intelligence',
  },
  {
    slug: 'hmo-rent-tracking-uk',
    title: 'How to Track Room-by-Room Rent for HMO Properties Without Losing Your Mind',
    excerpt: 'HMO rent tracking is more complex than standard buy-to-let. Here is how to do it properly.',
    date: 'February 2027',
    readTime: '8 min read',
    tag: 'Property',
  },
  {
    slug: 'xero-to-excel-automated-reports',
    title: 'How to Get Your Xero Data Into Excel Automatically Without Exporting Every Week',
    excerpt: 'A practical guide to connecting Xero directly to Excel so your reports update automatically.',
    date: 'February 2027',
    readTime: '8 min read',
    tag: 'Excel Automation',
  },
  {
    slug: 'hmo-management-software-uk',
    title: 'HMO Management Software UK - What Actually Exists and What It Costs',
    excerpt: 'A practical guide to HMO management software for UK landlords in 2027.',
    date: 'February 2027',
    readTime: '8 min read',
    tag: 'Property',
  },
  {
    slug: 'data-cleansing-services-uk-businesses',
    title: 'Data Cleansing Services for UK Businesses - What Is Involved and What It Costs',
    excerpt: 'What data cleansing actually involves for UK businesses, what it costs, and how to know whether you need a service or can do it yourself.',
    date: 'February 2027',
    readTime: '8 min read',
    tag: 'Data Cleansing',
  },
  {
    slug: 'data-driven-decision-making-uk-sme',
    title: 'Data-Driven Decision Making for UK Small Businesses - Where to Start',
    excerpt: 'Data-driven decision making is not just for large businesses. Here is a practical starting point for UK SMEs that want better information without a data team.',
    date: 'January 2027',
    readTime: '8 min read',
    tag: 'Business Intelligence',
  },
  {
    slug: 'what-makes-a-good-brief-for-a-developer',
    title: 'What Makes a Good Brief for a Developer? (UK Business Guide)',
    excerpt: 'A good brief gets you a better product at a lower cost. Here is exactly what to include when briefing a developer for a UK business project.',
    date: 'January 2027',
    readTime: '8 min read',
    tag: 'Working with Developers',
  },
  {
    slug: 'google-sheets-automation-uk-business',
    title: 'Google Sheets Automation for UK Businesses - What Is Possible in 2027',
    excerpt: 'Google Sheets is more powerful than most businesses realise. Here is what is possible with automation, Apps Script, and API connections for UK businesses.',
    date: 'January 2027',
    readTime: '8 min read',
    tag: 'Google Sheets',
  },
  {
    slug: 'power-automate-vs-zapier-uk-business',
    title: 'Power Automate vs Zapier for UK Businesses - Which Should You Use?',
    excerpt: 'Power Automate and Zapier both automate workflows but they suit different businesses. Here is an honest comparison for UK business owners.',
    date: 'January 2027',
    readTime: '8 min read',
    tag: 'Workflow Automation',
  },
  {
    slug: 'custom-software-cost-uk-small-business',
    title: 'What Does Custom Software Actually Cost for a UK Small Business?',
    excerpt: 'Transparent guide to UK custom software costs in 2027 - what drives the price, what to expect at different budget levels, and how to get a fair quote.',
    date: 'January 2027',
    readTime: '8 min read',
    tag: 'Custom Software',
  },
  {
    slug: 'how-long-does-a-website-take-to-build-uk',
    title: 'How Long Does It Take to Build a Website in the UK? (Honest Answer)',
    excerpt: 'From briefing to launch - realistic timelines for UK website projects, why they often take longer than expected, and how to keep yours on track.',
    date: 'January 2027',
    readTime: '8 min read',
    tag: 'Website Development',
  },
  {
    slug: 'ai-tools-for-uk-small-business-2027',
    title: 'AI Tools for UK Small Businesses in 2027 - What Actually Works',
    excerpt: 'Beyond ChatGPT - the AI tools UK small businesses are actually using in 2027 to save time, reduce costs, and automate repetitive work.',
    date: 'January 2027',
    readTime: '8 min read',
    tag: 'AI Tools',
  },
  {
    slug: 'what-is-a-bespoke-website-uk',
    title: 'What Is a Bespoke Website and Is It Worth It for UK Businesses?',
    excerpt: 'Bespoke websites cost more than templates. Here is exactly what you get for the premium and when it is worth paying it for your UK business.',
    date: 'January 2027',
    readTime: '8 min read',
    tag: 'Website Development',
  },
  {
    slug: 'how-to-choose-a-web-developer-uk',
    title: 'How to Choose a Web Developer in the UK (Without Getting Burned)',
    excerpt: 'Choosing the wrong web developer is expensive. Here is what to look for, what to ask, and the red flags to avoid when hiring a UK web developer.',
    date: 'January 2027',
    readTime: '8 min read',
    tag: 'Website Development',
  },
  {
    slug: 'staff-costs-eating-profit-how-to-track',
    title: 'Why Your Staff Costs Are Eating Your Profit - And How to Track It',
    excerpt: 'Staff costs are typically the biggest expense in any service business. Most owners know roughly what they pay out but very few can see how those costs relate to revenue each person generates.',
    date: 'September 2026',
    readTime: '10 min read',
    tag: 'Business Finance',
  },
  {
    slug: 'how-to-plan-your-digital-tools-for-2027',
    title: 'How to Plan Your Digital Tools for 2027 - A UK Small Business Guide',
    excerpt: 'Most UK businesses drift into their software stack. Here is how to audit what you have, identify the gaps, and plan the tools your business actually needs for 2027.',
    date: 'December 2026',
    readTime: '10 min read',
    tag: 'Custom Business Tools',
  },
  {
    slug: 'what-can-you-build-with-ai-in-2027-uk-business',
    title: 'What Can You Actually Build With AI in 2027 - A UK Business Guide',
    excerpt: 'AI capabilities have expanded significantly. Here is a practical guide to what UK businesses can actually build with AI in 2027 - and what is still hype.',
    date: 'December 2026',
    readTime: '10 min read',
    tag: 'AI-Powered Tools',
  },
  {
    slug: 'how-to-brief-a-developer-uk-small-business',
    title: 'How to Brief a Developer - A UK Small Business Guide',
    excerpt: 'Most development projects go wrong because the brief was not clear enough. Here is how to write a brief that gets you what you actually need, without paying for what you do not.',
    date: 'December 2026',
    readTime: '10 min read',
    tag: 'Custom Business Tools',
  },
  {
    slug: 'five-signs-your-business-has-outgrown-off-the-shelf-software',
    title: 'Five Signs Your Business Has Outgrown Off-the-Shelf Software',
    excerpt: 'Off-the-shelf software works until it does not. Here are the five signs that your business has reached the point where generic tools are costing more than they save.',
    date: 'November 2026',
    readTime: '10 min read',
    tag: 'Custom Business Tools',
  },
  {
    slug: 'how-we-built-cvcraft-ai-from-scratch',
    title: 'How We Built CVCraft AI - An AI Product From Idea to Launch',
    excerpt: 'CVCraft AI is an AI-powered CV rewriting service we built and operate. Here is exactly how we built it - the decisions, the tools, the process, and what it cost.',
    date: 'November 2026',
    readTime: '10 min read',
    tag: 'AI-Powered Tools',
  },
  {
    slug: 'what-to-look-for-in-a-uk-website-developer',
    title: 'What to Look for in a UK Website Developer (And the Red Flags to Avoid)',
    excerpt: 'Finding a good website developer in the UK is harder than it should be. Here is what to look for, what to ask, and the red flags that should make you walk away.',
    date: 'November 2026',
    readTime: '10 min read',
    tag: 'Website Development',
  },
  {
    slug: 'how-to-know-when-your-business-needs-custom-software',
    title: 'How to Know When Your Business Needs Custom Software Instead of a SaaS Tool',
    excerpt: 'Most UK businesses default to SaaS tools. But there is a point where generic software costs more than building something custom. Here is the framework for knowing when you have reached it.',
    date: 'November 2026',
    readTime: '10 min read',
    tag: 'Custom Business Tools',
  },
  {
    slug: 'bespoke-software-vs-off-the-shelf-uk-small-business',
    title: 'Bespoke Software vs Off-the-Shelf - The Honest UK Small Business Guide',
    excerpt: 'Most UK small businesses default to off-the-shelf software. Sometimes that is right. Sometimes it costs more than building something custom. Here is the honest framework for deciding which.',
    date: 'September 2026',
    readTime: '10 min read',
    tag: 'Custom Business Tools',
  },
  {
    slug: 'what-is-an-ai-powered-business-tool-uk',
    title: 'What Is an AI-Powered Business Tool - And Does Your Business Need One?',
    excerpt: 'An AI-powered business tool is not ChatGPT with a different interface. It is a custom application with AI built into a specific business workflow. Here is what that actually means and when it makes sense.',
    date: 'September 2026',
    readTime: '10 min read',
    tag: 'AI-Powered Tools',
  },
  {
    slug: 'custom-crm-vs-salesforce-hubspot-uk-small-business',
    title: 'Custom CRM vs Salesforce vs HubSpot - Which Is Right for a Small UK Business?',
    excerpt: 'Salesforce and HubSpot are powerful but built for much larger businesses. For UK SMEs, a custom CRM is often cheaper, simpler, and fits better. Here is an honest comparison of all three options.',
    date: 'September 2026',
    readTime: '10 min read',
    tag: 'Custom Business Tools',
  },
  {
    slug: 'why-we-build-websites-in-nextjs-not-wordpress',
    title: 'Why We Build Websites in Next.js Not WordPress (And Why It Matters)',
    excerpt: 'Most UK web agencies build in WordPress. We build in Next.js. Here is why that decision affects your site speed, SEO rankings, security, and long-term cost - and when each approach makes sense.',
    date: 'September 2026',
    readTime: '10 min read',
    tag: 'Website Development',
  },
  {
    slug: 'excel-automation-construction-companies-uk',
    title: 'Excel Automation for Construction Companies UK',
    excerpt: 'Construction businesses run on spreadsheets. Here is how to automate job cost tracking and project reporting so you can see profitability without rebuilding spreadsheets every week.',
    date: 'September 2026',
    readTime: '10 min read',
    tag: 'Excel Automation',
  },
  {
    slug: 'replace-spreadsheet-with-business-tool',
    title: 'How to Replace Your Spreadsheet with a Proper Business Tool',
    excerpt: 'The spreadsheet doing a job it was never designed for is one of the most common sources of operational friction in UK small businesses. Here is how to know when to replace it and what to replace it with.',
    date: 'August 2026',
    readTime: '10 min read',
    tag: 'Custom Business Tools',
  },
  {
    slug: 'why-uk-businesses-building-custom-tools',
    title: 'Why UK Small Businesses Are Building Custom Tools Instead of Buying Software',
    excerpt: 'Monthly SaaS fees are climbing. Off-the-shelf software keeps drifting away from what businesses actually need. Here is why more UK businesses are choosing to build custom tools instead.',
    date: 'August 2026',
    readTime: '10 min read',
    tag: 'Custom Business Tools',
  },
  {
    slug: 'what-is-power-query-uk-business',
    title: 'What Is Power Query - and How Can It Save Your Business Time?',
    excerpt: 'Power Query is built into Excel and Power BI and most UK businesses have never used it. Here is what it does and how it eliminates hours of manual data work every month.',
    date: 'September 2026',
    readTime: '10 min read',
    tag: 'Excel Automation',
  },
  {
    slug: 'track-business-performance-without-data-team',
    title: 'How to Track Business Performance Without a Data Team',
    excerpt: 'You do not need a data analyst or expensive software to get a clear view of how your business is performing. Here is how small UK businesses are doing it.',
    date: 'September 2026',
    readTime: '10 min read',
    tag: 'Business Intelligence',
  },
  {
    slug: 'how-to-tell-if-your-business-is-profitable',
    title: 'How to Tell If Your Business Is Actually Profitable (Not Just Busy)',
    excerpt: 'Busy does not mean profitable. Many UK business owners discover too late that their busiest months were actually their least profitable. Here is how to see the real picture.',
    date: 'August 2026',
    readTime: '10 min read',
    tag: 'Business Finance',
  },
  {
    slug: 'automate-month-end-reporting-uk',
    title: 'How to Automate Your Month-End Reporting (UK Guide 2026)',
    excerpt: 'Month-end reporting does not have to take days. Here is how UK finance teams are cutting their reporting time by 80% using automation without changing their accounting software.',
    date: 'August 2026',
    readTime: '10 min read',
    tag: 'Finance',
  },
  {
    slug: 'kpi-dashboard-small-business-uk',
    title: 'How to Build a KPI Dashboard for Your Small Business (UK Guide 2026)',
    excerpt: 'Most small business owners are making decisions based on instinct or a report someone compiled last week. A KPI dashboard gives you a live view of the numbers that actually matter.',
    date: 'August 2026',
    readTime: '11 min read',
    tag: 'Power BI',
  },
  {
    slug: 'late-payments-uk-business-data-fix',
    title: 'Why UK Businesses Lose £17,000 a Year to Late Payments - And How Better Data Fixes It',
    excerpt: 'Late payments are pushing 38 UK businesses into closure every day. Most are making the problem worse by tracking invoices manually. Here is what better data actually looks like.',
    date: 'August 2026',
    readTime: '11 min read',
    tag: 'Cash Flow',
  },
  {
    slug: 'finance-team-manual-reporting-fix',
    title: 'My Finance Team Is Spending Hours on Manual Reporting - How Do I Fix It?',
    excerpt: 'If your finance team is rebuilding the same reports every month and spending days on work that should take minutes, here is what is causing it and how to fix it properly.',
    date: 'July 2026',
    readTime: '10 min read',
    tag: 'Finance',
  },
  {
    slug: 'sage-vs-xero-automated-reporting',
    title: 'Sage vs Xero: Which Is Better for Automated Reporting? (UK 2026)',
    excerpt: 'Both Sage and Xero are excellent accounting tools. But for connecting your financial data to Excel and Power BI, they are not equal. An honest comparison.',
    date: 'June 2026',
    readTime: '10 min read',
    tag: 'Reporting',
  },
  {
    slug: 'connect-xero-to-excel-automate-reports',
    title: 'How to Connect Xero to Excel and Automate Your Reports (UK Guide 2026)',
    excerpt: 'Most Xero users spend more time than they should manually exporting data and reformatting it in Excel. Here is how to connect them properly so the data flows automatically.',
    date: 'June 2026',
    readTime: '10 min read',
    tag: 'Excel Automation',
  },
  {
    slug: 'when-your-business-has-outgrown-excel',
    title: 'When Your Business Has Outgrown Excel - And What To Do Next',
    excerpt: 'Excel is not the problem. Excel doing a job it was never designed to do - that is the problem. Here is how to tell the difference, and what actually needs to change.',
    date: 'May 2026',
    readTime: '10 min read',
    tag: 'Excel Automation',
  },
  {
    slug: 'how-to-reduce-manual-data-entry-uk',
    title: 'How to Reduce Manual Data Entry in Your Business (UK Guide 2026)',
    excerpt: 'Manual data entry is one of the most expensive habits a business can have. Here is a practical guide to reducing it - without expensive software or a big IT project.',
    date: 'May 2026',
    readTime: '11 min read',
    tag: 'Data Automation',
  },
  {
    slug: 'what-is-data-cleansing-uk',
    title: 'What Is Data Cleansing - and Why Does Bad Data Cost UK Businesses So Much?',
    excerpt: 'Most businesses know their data is messy. Very few realise how much that messiness is actually costing them - in wasted time, wrong decisions, and automation projects that fail before they start.',
    date: 'May 2026',
    readTime: '10 min read',
    tag: 'Data Quality',
  },
  {
    slug: 'excel-automation-cost-uk',
    title: 'How Much Does Excel Automation Cost in the UK? (2026 Guide)',
    excerpt: 'A straight answer - with real UK project costs, what drives the price up or down, and how to work out whether automation will pay for itself in your business.',
    date: 'May 2026',
    readTime: '9 min read',
    tag: 'Excel Automation',
  },
  {
    slug: '5-signs-manual-reporting-is-costing-your-business',
    title: '5 Signs Manual Reporting Is Costing Your Business Money',
    excerpt: 'Most businesses know their reporting process is painful. What they do not realise is exactly how much it is costing them - in time, in errors, and in decisions made on data that is already out of date.',
    date: 'April 2026',
    readTime: '10 min read',
    tag: 'Data Automation',
  },
  {
    slug: 'power-bi-vs-excel',
    title: 'Power BI vs Excel: Which Should Your Business Use in 2026?',
    excerpt: 'The honest answer - when Excel is still the right tool, when Power BI is genuinely worth it, and what most UK businesses actually need.',
    date: 'April 2026',
    readTime: '9 min read',
    tag: 'Power BI',
  },
  {
    slug: 'how-to-automate-excel-reports',
    title: 'How to Automate Excel Reports (Without Knowing How to Code)',
    excerpt: 'If your team is still rebuilding the same report every week, this guide is for you. What actually works, what does not, and how to choose the right approach for your business.',
    date: 'April 2026',
    readTime: '9 min read',
    tag: 'Excel Automation',
  },
  {
    slug: 'power-bi-consultant-cost-uk',
    title: 'How Much Does a Power BI Consultant Cost in the UK?',
    excerpt: 'A straight answer - with real UK prices, what affects the cost, and how to make sure you are not overpaying for something simpler than you think.',
    date: 'April 2026',
    readTime: '8 min read',
    tag: 'Power BI',
  },
]


const structuredData = {"@context":"https://schema.org","@type":"Blog","name":"Lexalytic Blog","description":"Practical guides on Power BI, Excel automation, Python, and business reporting from a UK data automation consultant.","url":"https://www.lexalytic.com/blog","publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}

export default function BlogIndex() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>← Home</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call →</Link>
          </div>
        </div>
      </nav>

      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="section-label">Blog</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px', letterSpacing: '-0.02em' }}>Data automation insights</h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-3)', fontWeight: '300' }}>Practical guides on Power BI, Excel automation, Python, and business reporting - written from 15 years of real project experience.</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          {posts.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`} style={{ display: 'block', textDecoration: 'none', marginBottom: '20px' }}>
              <div style={{ padding: '32px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '3px 10px', borderRadius: '100px' }}>{post.tag}</span>
                  <span style={{ fontSize: '13px', color: 'var(--ink-4)' }}>{post.date} · {post.readTime}</span>
                </div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--ink)' }}>{post.title}</h2>
                <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.7', margin: 0 }}>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ background: 'var(--bg-dark-3)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--white)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>© 2026 Lexalytic. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  )
}
