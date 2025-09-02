import type {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://modu-review.com',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: 'https://modu-review.com/search',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    },
    {
      url: 'https://modu-review.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];
}
