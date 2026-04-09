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
  ]
}
