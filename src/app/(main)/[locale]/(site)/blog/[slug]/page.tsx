import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '@/sanity/lib/client'
import { postBySlugQuery, allPostsQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/lib/metadata'
import { getDictionary, isLocale, defaultLocale } from '@/i18n'
import { localePath } from '@/i18n/config'

export const revalidate = 30

export async function generateStaticParams() {
  const posts = await client.fetch(allPostsQuery).catch(() => [])
  return posts.map((p: any) => ({ slug: p.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string }
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).blog
  const post = await client.fetch(postBySlugQuery, { slug: params.slug, locale }).catch(() => null)
  if (!post?.title) return { title: t.metaTitle }
  return buildMetadata({
    title: `${post.title} | Country Materials Ltd`,
    description: post.excerpt ?? t.postFallbackDescription,
    path: `/blog/${params.slug}`,
    locale,
  })
}

function formatDate(dateStr: string | null | undefined, dateLocale: string) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })
}

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="font-barlow text-[16px] text-slate/75 leading-[1.75] mb-5">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-display text-[clamp(28px,3vw,40px)] leading-[0.95] tracking-[0.04em] uppercase text-slate mt-12 mb-5">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-display text-[clamp(22px,2.5vw,32px)] leading-[1] tracking-[0.04em] uppercase text-slate mt-10 mb-4">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 py-6 px-8 font-barlow text-[16px] text-slate/70 italic leading-[1.75]" style={{ borderLeft: '3px solid #2E6FA3', background: 'rgba(46,111,163,.08)' }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="font-barlow text-[16px] text-slate/75 leading-[1.75] mb-5 ml-5 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="font-barlow text-[16px] text-slate/75 leading-[1.75] mb-5 ml-5 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-slate">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-gold-dim transition-colors">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10">
          <div className="relative w-full" style={{ aspectRatio: '16/9', border: '1px solid #D8E0E7' }}>
            <Image src={urlFor(value).width(900).auto('format').url()} alt={value.alt ?? ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 768px" />
          </div>
          {value.caption && (
            <figcaption className="mt-3 font-condensed text-[11px] tracking-[0.15em] uppercase text-slate/55 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).blog

  const post = await client.fetch(postBySlugQuery, { slug: params.slug, locale }).catch(() => null)
  if (!post) notFound()

  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1440).height(640).auto('format').url()
    : null

  return (
    <main style={{ background: '#F7F9FB', minHeight: '100vh' }}>
      {imageUrl && (
        <div className="relative h-[45vh] min-h-[300px] max-h-[560px] overflow-hidden" style={{ background: '#EEF2F5' }}>
          <Image src={imageUrl} alt={post.title} fill className="object-cover opacity-80" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(247,249,251,1) 0%, rgba(247,249,251,0) 60%)' }} />
        </div>
      )}

      <div className={`max-w-3xl mx-auto px-8 lg:px-10 ${imageUrl ? '-mt-20 relative z-10' : 'pt-[140px]'} pb-24`}>
        <Link
          href={localePath(locale, '/blog')}
          className="inline-flex items-center gap-2 font-condensed text-[11px] tracking-[0.18em] uppercase text-gold/80 hover:text-gold transition-colors duration-200 mb-10"
        >
          <svg className="w-3.5 h-3.5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
          {t.allPosts}
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          {post.category && (
            <span className="font-condensed text-[10px] tracking-[0.15em] uppercase px-3 py-1 text-white bg-gold">
              {post.category}
            </span>
          )}
          {post.publishedAt && (
            <span className="font-condensed text-[11px] tracking-[0.15em] uppercase text-slate/55">
              {formatDate(post.publishedAt, t.dateLocale)}
            </span>
          )}
          {post.author && (
            <span className="font-barlow text-[13px] text-slate/55">{t.by} {post.author}</span>
          )}
        </div>

        <h1 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.92] tracking-[0.03em] uppercase text-slate mb-8">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="font-barlow text-[18px] text-slate/70 leading-[1.65] mb-10 pb-10" style={{ borderBottom: '1px solid #D8E0E7' }}>
            {post.excerpt}
          </p>
        )}

        {post.body && <PortableText value={post.body} components={ptComponents} />}

        <div className="mt-16 pt-8 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: '1px solid #D8E0E7' }}>
          <span className="font-condensed text-[11px] tracking-[0.18em] uppercase text-gold/80">Country Materials Limited</span>
          <Link
            href={localePath(locale, '/blog')}
            className="inline-flex items-center gap-2 font-condensed text-[12px] tracking-[0.18em] uppercase text-gold hover:gap-4 transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            {t.backToBlog}
          </Link>
        </div>
      </div>
    </main>
  )
}
