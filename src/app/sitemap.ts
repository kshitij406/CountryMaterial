import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import groq from 'groq'
import { locales, localePath } from '@/i18n/config'
import { localeAlternates } from '@/lib/metadata'

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

  const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { path: '/',               priority: 1.0, changeFrequency: 'monthly' },
    { path: '/about',          priority: 0.8, changeFrequency: 'monthly' },
    { path: '/shop',           priority: 0.8, changeFrequency: 'monthly' },
    { path: '/careers',        priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact',        priority: 0.8, changeFrequency: 'monthly' },
    { path: '/impact',         priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog',           priority: 0.7, changeFrequency: 'weekly'  },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'monthly' },
    { path: '/terms',          priority: 0.3, changeFrequency: 'monthly' },
    { path: '/cookies',        priority: 0.3, changeFrequency: 'monthly' },
    ...services.map((s) => ({ path: `/services/${s.slug.current}`, priority: 0.8, changeFrequency: 'monthly' as const })),
    ...posts.map((p)    => ({ path: `/blog/${p.slug.current}`,     priority: 0.7, changeFrequency: 'monthly' as const })),
    ...careers.map((c)  => ({ path: `/careers/${c.slug.current}`,  priority: 0.7, changeFrequency: 'monthly' as const })),
  ]

  // Every route is emitted once per locale, each entry carrying the full
  // hreflang set so Google pairs the English and Kiswahili versions.
  return routes.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: `${BASE}${localePath(locale, path)}`,
      priority,
      changeFrequency,
      alternates: { languages: localeAlternates(path) },
    }))
  )
}
