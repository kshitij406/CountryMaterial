import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://countrymaterials.com'

// AI/LLM crawlers and bulk scrapers — blocked outright, distinct from the
// general '*' rule below which still lets normal search engines index the
// site. List names as published by each operator; update as new ones show up.
const AI_AND_SCRAPER_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'PerplexityBot',
  'Perplexity-User',
  'Bytespider',
  'Amazonbot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  'cohere-ai',
  'Diffbot',
  'Omgili',
  'Omgilibot',
  'YouBot',
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
  'DotBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api'],
      },
      {
        userAgent: AI_AND_SCRAPER_BOTS,
        disallow: '/',
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
