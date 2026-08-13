import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { serviceBySlugQuery, allServicesQuery } from '@/sanity/lib/queries'
import CtaBanner from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/metadata'
import { getDictionary, isLocale, defaultLocale } from '@/i18n'
import { localePath } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

export const revalidate = 60

/** Stat figures are language-independent; their labels come from the dictionary. */
const HIGHLIGHT_STATS: Record<string, string[]> = {
  transportation:      ['30+', '5', '24hrs'],
  hardware:            ['5,000+', '100%', '320+'],
  steel:               ['BS 500', '50,000+', '320+'],
  'waste-management':  ['50,000+', '5,000+', '104'],
}

function staticService(slug: string, t: Dictionary['serviceDetail']) {
  const s = t.statics[slug]
  if (!s) return undefined
  const stats = HIGHLIGHT_STATS[slug] ?? []
  return {
    title: s.title,
    label: s.label,
    excerpt: s.excerpt,
    intro: s.intro,
    features: [...s.features],
    highlights: s.highlightLabels.map((label, i) => ({ stat: stats[i] ?? '', label })),
  }
}

export async function generateStaticParams() {
  const services = await client.fetch(allServicesQuery).catch(() => null)

  const slugs = new Set<string>()
  for (const s of services ?? []) {
    const slug = s?.slug?.current
    if (slug) slugs.add(slug)
  }
  for (const slug of Object.keys(HIGHLIGHT_STATS)) slugs.add(slug)
  return Array.from(slugs).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string }
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).serviceDetail
  const sanity = await client.fetch(serviceBySlugQuery, { slug: params.slug, locale }).catch(() => null)
  const fallback = staticService(params.slug, t)
  const name = sanity?.title ?? fallback?.title
  const excerpt = sanity?.excerpt ?? fallback?.excerpt
  if (!name) return {}
  return buildMetadata({
    title: `${name} | Country Materials Ltd`,
    description: excerpt ?? t.metaFallback,
    path: `/services/${params.slug}`,
    locale,
  })
}

function ptToText(blocks: any[]): string {
  if (!blocks?.length) return ''
  return blocks.map((b: any) => b.children?.map((c: any) => c.text).join('') ?? '').join('\n\n')
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const dict = getDictionary(locale)
  const t = dict.serviceDetail

  const sanity = await client.fetch(serviceBySlugQuery, { slug: params.slug, locale }).catch(() => null)
  const fallback = staticService(params.slug, t)

  if (!sanity && !fallback) notFound()

  const title = sanity?.title ?? fallback?.title
  const excerpt = sanity?.excerpt ?? fallback?.excerpt
  const label = fallback?.label ?? title
  const intro = sanity?.contentSections?.[0]?.body
    ? ptToText(sanity.contentSections[0].body)
    : fallback?.intro ?? ''

  const features: string[] = sanity?.features?.length ? sanity.features : (fallback?.features ?? [])
  const highlights: Array<{ stat: string; label: string }> =
    sanity?.highlights?.length ? sanity.highlights : (fallback?.highlights ?? [])

  const sanitySection = sanity?.contentSections?.length > 1 ? sanity.contentSections[1] : null
  const section2Text = sanitySection?.body ? ptToText(sanitySection.body) : null

  return (
    <>
      <section className="relative overflow-hidden pt-[150px] pb-[90px] px-8 lg:px-16 bg-navy" style={{ borderBottom: '1px solid rgba(216,224,231,.4)' }}>
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-7">
            <Link href={localePath(locale, '/services')} className="font-condensed text-[12px] tracking-[0.18em] uppercase text-white/70 hover:text-white transition-colors duration-200">{t.breadcrumb}</Link>
            <span className="text-white/40">/</span>
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold-light">{label}</span>
          </div>
          <h1 className="font-display text-[clamp(44px,7vw,98px)] leading-[0.9] tracking-[0.03em] uppercase text-white max-w-4xl">
            {title}
          </h1>
          {excerpt && (
            <p className="mt-8 font-barlow text-[17px] text-white/75 max-w-2xl leading-[1.65]">{excerpt}</p>
          )}
        </div>
      </section>

      <section className="relative py-[100px] px-8 lg:px-16 bg-white" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <div className="flex items-center gap-3.5 mb-7">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">{t.overview}</span>
            </div>
            <h2 className="font-display text-[clamp(32px,3.5vw,56px)] leading-[0.95] tracking-[0.03em] uppercase text-slate mb-8">
              {t.coversPre} <span className="text-gold">{t.coversAccent}</span>
            </h2>
            <p className="font-barlow text-[16px] text-slate/75 leading-[1.7] mb-5">{intro}</p>
            {section2Text && (
              <p className="font-barlow text-[16px] text-slate/75 leading-[1.7] mb-8">{section2Text}</p>
            )}
            <Link
              href={localePath(locale, '/contact')}
              className="group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[16px] bg-gold text-white font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
            >
              <span className="relative z-10">{t.requestQuote}</span>
              <svg className="relative z-10 w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
              <span className="absolute inset-0 bg-gold-dim -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
            </Link>
          </div>

          {features.length > 0 && (
            <div className="reveal p-8 bg-cream" style={{ border: '1px solid #D8E0E7' }}>
              <h3 className="font-display text-[clamp(20px,2vw,28px)] leading-[1] tracking-[0.04em] uppercase text-slate mb-8">
                {t.keyPre} <span className="text-gold">{t.keyAccent}</span>
              </h3>
              <ul style={{ borderTop: '1px solid #D8E0E7' }}>
                {features.map((f, i) => (
                  <li key={`${f}-${i}`} className="flex items-start gap-5 py-4" style={{ borderBottom: '1px solid #D8E0E7' }}>
                    <span className="shrink-0 w-6 h-6 grid place-items-center bg-gold text-white font-space text-[11px] font-semibold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="font-barlow text-[15px] text-slate/75 leading-[1.6]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {highlights.length > 0 && (
        <section className="relative py-[80px] px-8 lg:px-16 bg-charcoal" style={{ borderBottom: '1px solid #D8E0E7' }}>
          <div className="relative max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            {highlights.map((item, i) => (
              <div key={`${item.stat}-${item.label}-${i}`} className="text-center py-10 bg-white" style={{ border: '1px solid #D8E0E7' }}>
                <div className="font-display text-[clamp(40px,5vw,72px)] leading-none text-gold mb-2">{item.stat}</div>
                <div className="font-condensed text-[11px] tracking-[0.22em] uppercase text-slate/60">{item.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBanner
        heading={t.ctaHeading}
        subtext={t.ctaSubtext}
        primaryLabel={t.ctaPrimary}
        primaryHref={localePath(locale, '/contact')}
        secondaryLabel={t.ctaSecondary}
        secondaryHref={localePath(locale, '/services')}
        locale={locale}
        t={dict.ctaBanner}
      />
    </>
  )
}
