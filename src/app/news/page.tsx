import type { Metadata } from 'next'
import Link from 'next/link'
import { client, urlFor } from '@/sanity/lib/client'
import { allPostsQuery } from '@/sanity/lib/queries'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/animations/AnimatedSection'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 30

export const metadata: Metadata = {
  title: 'News & Announcements — Country Materials Ltd',
  description: 'Latest news, updates, and announcements from Country Materials Ltd.',
}

const CATEGORY_COLORS: Record<string, string> = {
  News: 'bg-navy text-white',
  Announcement: 'bg-gold text-navy',
  Update: 'bg-white/20 text-white border border-white/30',
}

const CATEGORY_COLORS_LIGHT: Record<string, string> = {
  News: 'bg-navy text-white',
  Announcement: 'bg-gold text-navy',
  Update: 'bg-sand text-navy',
}

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
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
      <PageHeader
        label="Latest from Country Materials"
        title="News & Announcements"
        subtitle="Stay up to date with our latest developments, product updates, and company announcements."
        theme="charcoal"
      />

      <section className="bg-white py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">

          {posts.length === 0 ? (
            <AnimatedSection className="text-center py-24">
              <p className="font-body text-slate/60 text-lg">No posts yet — check back soon.</p>
            </AnimatedSection>
          ) : (
            <>
              {/* ── Featured post — full-width horizontal card ── */}
              {featured && (
                <AnimatedSection className="mb-14">
                  <Link
                    href={`/news/${featured.slug.current}`}
                    className="group grid lg:grid-cols-2 bg-navy overflow-hidden hover:shadow-2xl hover:shadow-navy/20 transition-shadow duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <img
                        src={featuredImage ?? '/images/intro-main.svg'}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-navy/30 to-transparent lg:from-transparent lg:to-navy/60" />
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-body text-xs text-gold tracking-widest uppercase">
                          Featured
                        </span>
                        {featured.category && (
                          <span className={`font-body text-xs px-3 py-1 tracking-wider uppercase font-semibold ${CATEGORY_COLORS[featured.category] ?? CATEGORY_COLORS.News}`}>
                            {featured.category}
                          </span>
                        )}
                      </div>
                      <h2 className="font-heading text-3xl lg:text-4xl text-white leading-tight mb-4 group-hover:text-gold transition-colors duration-300">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="font-body text-white/60 leading-relaxed mb-6 line-clamp-3">
                          {featured.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        {featured.publishedAt && (
                          <span className="font-body text-xs text-white/40 tracking-widest uppercase">
                            {formatDate(featured.publishedAt)}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-widest uppercase text-gold">
                          Read Article
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              )}

              {/* ── Rest of posts — 3-column grid ── */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post: any, i: number) => {
                    const imageUrl = post.coverImage
                      ? urlFor(post.coverImage).width(600).height(400).url()
                      : null
                    const badgeClass = CATEGORY_COLORS_LIGHT[post.category] ?? CATEGORY_COLORS_LIGHT.News

                    return (
                      <AnimatedSection key={post._id} delay={i * 0.06}>
                        <Link
                          href={`/news/${post.slug.current}`}
                          className="group flex flex-col bg-white border border-sand hover:border-gold/40 hover:shadow-xl hover:shadow-navy/8 transition-all duration-300 h-full"
                        >
                          <div className="relative h-44 overflow-hidden shrink-0">
                            <img
                              src={imageUrl ?? '/images/intro-main.svg'}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {post.category && (
                              <span className={`absolute top-3 left-3 font-body text-xs px-3 py-1 tracking-wider uppercase font-semibold ${badgeClass}`}>
                                {post.category}
                              </span>
                            )}
                          </div>

                          <div className="p-6 flex flex-col flex-1">
                            {post.publishedAt && (
                              <p className="font-body text-xs text-slate/45 uppercase tracking-widest mb-3">
                                {formatDate(post.publishedAt)}
                                {post.author && <span> · {post.author}</span>}
                              </p>
                            )}
                            <h2 className="font-heading text-lg text-navy leading-snug mb-3 group-hover:text-gold transition-colors duration-200 flex-1">
                              {post.title}
                            </h2>
                            {post.excerpt && (
                              <p className="font-body text-sm text-slate/65 leading-relaxed line-clamp-2 mb-4">
                                {post.excerpt}
                              </p>
                            )}
                            <div className="pt-4 border-t border-sand flex items-center gap-1.5 font-body text-xs font-semibold tracking-widest uppercase text-gold group-hover:text-navy transition-colors duration-200">
                              Read More
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      </AnimatedSection>
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
