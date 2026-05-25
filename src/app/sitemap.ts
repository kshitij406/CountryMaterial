import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import groq from 'groq'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://countrymaterials.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services: { slug: { current: string } }[] = await client
    .fetch(groq`*[_type == "service" && defined(slug.current)] { slug }`)
    .catch(() => [])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,               priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE}/about`,          priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/services`,       priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/shop`,           priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/careers`,        priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`,        priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/impact`,         priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/privacy-policy`, priority: 0.3, changeFrequency: 'monthly' },
    { url: `${BASE}/terms`,          priority: 0.3, changeFrequency: 'monthly' },
    { url: `${BASE}/cookies`,        priority: 0.3, changeFrequency: 'monthly' },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.slug.current}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
