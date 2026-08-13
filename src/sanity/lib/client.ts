import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export const client = createClient({
  projectId: projectId || 'unconfigured',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01',
  useCdn: process.env.NODE_ENV === 'production',
  // Suppress fetches entirely when env is not configured (build-time safety)
  token: undefined,
})

/**
 * Every localized query in queries.ts references $locale. Defaulting it here
 * means any call site that has no locale in scope keeps returning English
 * instead of throwing on a missing GROQ param.
 *
 * ponytail: one wrapper instead of threading a param through ~20 call sites.
 * Pages that render Kiswahili pass { locale } explicitly and it wins over this.
 */
const baseFetch = client.fetch.bind(client)
client.fetch = ((query: string, params?: Record<string, unknown>, options?: unknown) =>
  baseFetch(query, { locale: 'en', ...(params ?? {}) }, options as never)) as typeof client.fetch

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
