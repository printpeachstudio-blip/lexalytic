import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.lexalytic.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://www.lexalytic.com/services/power-bi', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.lexalytic.com/services/excel-automation', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.lexalytic.com/services/vba-development', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.lexalytic.com/services/power-automate', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.lexalytic.com/services/python-automation', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.lexalytic.com/services/google-sheets', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.lexalytic.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.lexalytic.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://www.lexalytic.com/blog/power-bi-consultant-cost-uk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.lexalytic.com/blog/how-to-automate-excel-reports', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.lexalytic.com/blog/power-bi-vs-excel', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.lexalytic.com/blog/when-your-business-has-outgrown-excel', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.lexalytic.com/blog/how-to-reduce-manual-data-entry-uk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.lexalytic.com/blog/what-is-data-cleansing-uk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.lexalytic.com/blog/excel-automation-cost-uk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.lexalytic.com/blog/5-signs-manual-reporting-is-costing-your-business', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
