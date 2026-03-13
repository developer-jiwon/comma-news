import { MetadataRoute } from 'next'

// TODO: 배포 후 실제 도메인으로 교체
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://your-domain.com/sitemap.xml',
  }
}
