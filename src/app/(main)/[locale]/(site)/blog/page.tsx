import type { Metadata } from 'next'
import Link from 'next/link'
import { client, urlFor } from '@/sanity/lib/client'
import { allPostsQuery } from '@/sanity/lib/queries'
import CtaBanner from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/metadata'
import { getDictionary, isLocale, defaultLocale } from '@/i18n'
import { localePath } from '@/i18n/config'

export const revalidate = 30

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).blog
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/blog',
    locale,
  })
}

function formatDate(dateStr: string | null | undefined, dateLocale: string) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const dict = getDictionary(locale)
  const t = dict.blog

  const posts = await client.fetch(allPostsQuery, { locale }).catch(() => [] as any[])

  const featured = posts[0] ?? null
  const rest = posts.slice(1)

  const featuredImage = featured?.coverImage
    ? urlFor(featured.coverImage).width(1200).height(640).auto('format').url()
    : null

  return (
    <>
      <section data-theme="dark" className="relative overflow-hidden pt-[150px] pb-[90px] px-8 lg:px-16 bg-navy" style={{ borderBottom: '1px solid rgba(216,224,231,.4)' }}>
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-7">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-white/90">{t.eyebrow}</span>
          </div>
          <h1 className="font-display text-[clamp(44px,7vw,102px)] leading-[0.9] tracking-[0.03em] uppercase text-white">
            {t.headingPlain} <span className="text-gold-light">{t.headingAccent}</span>
          </h1>
          <p className="mt-8 font-barlow text-[17px] text-white/75 max-w-xl leading-[1.65]">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="relative py-[100px] px-8 lg:px-16 bg-white" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="max-w-[1440px] mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-24 reveal bg-cream" style={{ border: '1px solid #D8E0E7' }}>
              <div className="font-display text-[56px] text-gold/20 mb-4">◈</div>
              <p className="font-barlow text-[16px] text-slate/60">{t.empty}</p>
            </div>
          ) : (
            <>
              {featured && (
                <Link
                  href={localePath(locale, `/blog/${featured.slug.current}`)}
                  className="group grid lg:grid-cols-2 mb-16 reveal overflow-hidden"
                  style={{ border: '1px solid #D8E0E7' }}
                >
                  <div className="relative h-64 lg:h-auto overflow-hidden" style={{ background: '#EEF2F5' }}>
                    {featuredImage ? (
                      <img
                        src={featuredImage}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-[80px] text-gold/20">◈</span>
                      </div>
                    )}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(31,51,71,0.18), transparent)' }} />
                  </div>

                  <div className="p-10 lg:p-14 flex flex-col justify-center bg-cream" style={{ borderLeft: '1px solid #D8E0E7' }}>
                    <div className="flex items-center gap-3.5 mb-6">
                      <span className="font-condensed text-[11px] tracking-[0.18em] uppercase text-gold">{t.featured}</span>
                      {featured.category && (
                        <span className="font-condensed text-[10px] tracking-[0.15em] uppercase px-3 py-1 text-white bg-gold">
                          {featured.category}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-[clamp(28px,3.5vw,48px)] leading-[0.95] tracking-[0.03em] uppercase text-slate group-hover:text-gold transition-colors duration-300 mb-5">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="font-barlow text-[15px] text-slate/70 leading-[1.65] mb-8 line-clamp-3">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      {featured.publishedAt && (
                        <span className="font-condensed text-[11px] tracking-[0.15em] uppercase text-slate/55">
                          {formatDate(featured.publishedAt, t.dateLocale)}
                        </span>
                      )}
                      <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                        {t.readArticle}
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
                  {rest.map((post: any) => {
                    const imageUrl = post.coverImage
                      ? urlFor(post.coverImage).width(600).height(400).auto('format').url()
                      : null

                    return (
                      <Link
                        key={post._id}
                        href={localePath(locale, `/blog/${post.slug.current}`)}
                        className="group flex flex-col bg-white"
                        style={{ border: '1px solid #D8E0E7' }}
                      >
                        <div className="relative h-44 overflow-hidden shrink-0" style={{ background: '#EEF2F5' }}>
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="font-display text-[48px] text-gold/20">◈</span>
                            </div>
                          )}
                          {post.category && (
                            <span className="absolute top-3 left-3 font-condensed text-[10px] tracking-[0.15em] uppercase px-3 py-1 text-white bg-gold">
                              {post.category}
                            </span>
                          )}
                        </div>

                        <div className="p-8 flex flex-col flex-1 bg-cream">
                          {post.publishedAt && (
                            <p className="font-condensed text-[10px] tracking-[0.18em] uppercase text-slate/50 mb-3">
                              {formatDate(post.publishedAt, t.dateLocale)}
                              {post.author && <span> · {post.author}</span>}
                            </p>
                          )}
                          <h2 className="font-display text-[clamp(18px,1.8vw,24px)] leading-[0.95] tracking-[0.03em] uppercase text-slate group-hover:text-gold transition-colors duration-200 mb-3 flex-1">
                            {post.title}
                          </h2>
                          {post.excerpt && (
                            <p className="font-barlow text-[14px] text-slate/65 leading-[1.65] line-clamp-2 mb-5">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="pt-5 flex items-center gap-2 font-condensed text-[11px] tracking-[0.18em] uppercase text-gold" style={{ borderTop: '1px solid #D8E0E7' }}>
                            {t.readMore}
                            <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CtaBanner locale={locale} t={dict.ctaBanner} />
    </>
  )
}
