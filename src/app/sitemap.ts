import { MetadataRoute } from 'next'

// TODO: 배포 후 실제 도메인으로 교체
const baseUrl = 'https://your-domain.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}
