import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import groq from 'groq'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://countrymaterials.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, careers] = await Promise.all([
    client
      .fetch<{ slug: { current: string } }[]>(
        groq`*[_type == "service" && defined(slug.current)] { slug }`
      )
      .catch(() => [] as { slug: { current: string } }[]),
    client
      .fetch<{ slug: { current: string } }[]>(
        groq`*[_type == "post" && defined(slug.current)] { slug }`
      )
      .catch(() => [] as { slug: { current: string } }[]),
    client
      .fetch<{ slug: { current: string } }[]>(
        groq`*[_type == "career" && defined(slug.current)] { slug }`
      )
      .catch(() => [] as { slug: { current: string } }[]),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,               priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE}/about`,          priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/shop`,           priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/careers`,        priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`,        priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/impact`,         priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/blog`,           priority: 0.7, changeFrequency: 'weekly'  },
    { url: `${BASE}/privacy-policy`, priority: 0.3, changeFrequency: 'monthly' },
    { url: `${BASE}/terms`,          priority: 0.3, changeFrequency: 'monthly' },
    { url: `${BASE}/cookies`,        priority: 0.3, changeFrequency: 'monthly' },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.slug.current}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug.current}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const careerRoutes: MetadataRoute.Sitemap = careers.map((c) => ({
    url: `${BASE}/careers/${c.slug.current}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...careerRoutes]
}
