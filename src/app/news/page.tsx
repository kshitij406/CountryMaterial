import type { Metadata } from 'next'
import Link from 'next/link'
import { client, urlFor } from '@/sanity/lib/client'
import { allPostsQuery } from '@/sanity/lib/queries'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 30

export const metadata: Metadata = {
  title: 'News & Announcements — Country Materials Ltd',
  description: 'Latest news, updates, and announcements from Country Materials Ltd.',
}

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function NewsPage() {
  const posts = await client.fetch(allPostsQuery).catch(() => [] as any[])

  const featured = posts[0] ?? null
  const rest = posts.slice(1)

  const featuredImage = featured?.coverImage
    ? urlFor(featured.coverImage).width(1200).height(640).url()
    : null

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-[160px] pb-[100px] px-8 lg:px-16"
        style={{ background: '#05101f', borderBottom: '1px solid rgba(200,150,46,.2)' }}
      >
        <div aria-hidden className="grain-overlay absolute inset-0 pointer-events-none z-0" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'repeating-linear-gradient(90deg,transparent 0 120px,rgba(200,150,46,.04) 120px 121px)' }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 60%,rgba(200,150,46,.1),transparent 55%)' }}
        />
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-7">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Latest from Country Materials</span>
          </div>
          <h1 className="font-display text-[clamp(48px,7vw,112px)] leading-[0.9] tracking-[0.03em] uppercase text-cream">
            News &<br /><span className="text-gold">Announcements</span>
          </h1>
          <p className="mt-8 font-barlow text-[17px] text-cream/55 max-w-xl leading-[1.65]">
            Stay up to date with our latest developments, product updates, and company announcements.
          </p>
        </div>
      </section>

      <section
        className="relative py-[120px] px-8 lg:px-16"
        style={{ background: '#0B1D3A', borderBottom: '1px solid rgba(200,150,46,.15)' }}
      >
        <div className="max-w-[1440px] mx-auto">

          {posts.length === 0 ? (
            <div className="text-center py-24 reveal" style={{ border: '1px solid rgba(200,150,46,.2)' }}>
              <div className="font-display text-[56px] text-gold/20 mb-4">◈</div>
              <p className="font-barlow text-[16px] text-cream/45">No posts yet — check back soon.</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <Link
                  href={`/news/${featured.slug.current}`}
                  className="group grid lg:grid-cols-2 mb-16 reveal overflow-hidden"
                  style={{ border: '1px solid rgba(200,150,46,.2)' }}
                >
                  <div className="relative h-64 lg:h-auto overflow-hidden" style={{ background: '#05101f' }}>
                    {featuredImage ? (
                      <img
                        src={featuredImage}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-[80px] text-gold/10">◈</span>
                      </div>
                    )}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,16,31,0.3), transparent)' }} />
                  </div>

                  <div
                    className="p-10 lg:p-14 flex flex-col justify-center"
                    style={{ background: '#05101f', borderLeft: '1px solid rgba(200,150,46,.2)' }}
                  >
                    <div className="flex items-center gap-3.5 mb-6">
                      <span className="font-condensed text-[11px] tracking-[0.18em] uppercase text-gold">Featured</span>
                      {featured.category && (
                        <span
                          className="font-condensed text-[10px] tracking-[0.15em] uppercase px-3 py-1 text-navy bg-gold"
                        >
                          {featured.category}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-[clamp(28px,3.5vw,48px)] leading-[0.95] tracking-[0.03em] uppercase text-cream group-hover:text-gold transition-colors duration-300 mb-5">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="font-barlow text-[15px] text-cream/50 leading-[1.65] mb-8 line-clamp-3">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      {featured.publishedAt && (
                        <span className="font-condensed text-[11px] tracking-[0.15em] uppercase text-cream/35">
                          {formatDate(featured.publishedAt)}
                        </span>
                      )}
                      <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                        Read Article
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest of posts */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 stagger" style={{ borderTop: '1px solid rgba(200,150,46,.2)', borderLeft: '1px solid rgba(200,150,46,.2)' }}>
                  {rest.map((post: any) => {
                    const imageUrl = post.coverImage
                      ? urlFor(post.coverImage).width(600).height(400).url()
                      : null

                    return (
                      <Link
                        key={post._id}
                        href={`/news/${post.slug.current}`}
                        className="group flex flex-col"
                        style={{ borderRight: '1px solid rgba(200,150,46,.2)', borderBottom: '1px solid rgba(200,150,46,.2)' }}
                      >
                        <div className="relative h-44 overflow-hidden shrink-0" style={{ background: '#05101f' }}>
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="font-display text-[48px] text-gold/10">◈</span>
                            </div>
                          )}
                          {post.category && (
                            <span className="absolute top-3 left-3 font-condensed text-[10px] tracking-[0.15em] uppercase px-3 py-1 text-navy bg-gold">
                              {post.category}
                            </span>
                          )}
                        </div>

                        <div className="p-8 flex flex-col flex-1" style={{ background: '#05101f' }}>
                          {post.publishedAt && (
                            <p className="font-condensed text-[10px] tracking-[0.18em] uppercase text-cream/30 mb-3">
                              {formatDate(post.publishedAt)}
                              {post.author && <span> · {post.author}</span>}
                            </p>
                          )}
                          <h2 className="font-display text-[clamp(18px,1.8vw,24px)] leading-[0.95] tracking-[0.03em] uppercase text-cream group-hover:text-gold transition-colors duration-200 mb-3 flex-1">
                            {post.title}
                          </h2>
                          {post.excerpt && (
                            <p className="font-barlow text-[14px] text-cream/40 leading-[1.65] line-clamp-2 mb-5">
                              {post.excerpt}
                            </p>
                          )}
                          <div
                            className="pt-5 flex items-center gap-2 font-condensed text-[11px] tracking-[0.18em] uppercase text-gold"
                            style={{ borderTop: '1px solid rgba(200,150,46,.15)' }}
                          >
                            Read More
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

      <CtaBanner />
    </>
  )
}
