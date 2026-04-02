import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import { client, urlFor } from '@/sanity/lib/client'
import { postBySlugQuery, allPostsQuery } from '@/sanity/lib/queries'
import AnimatedSection from '@/components/animations/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'

export const revalidate = 30

export async function generateStaticParams() {
  const posts = await client.fetch(allPostsQuery).catch(() => [])
  return posts.map((p: any) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug }).catch(() => null)
  return {
    title: post?.title ?? 'Post — Country Materials Ltd',
    description: post?.excerpt ?? '',
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  News: 'bg-navy text-white',
  Announcement: 'bg-gold text-navy',
  Update: 'bg-cream text-navy border border-sand',
}

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="font-body text-slate leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-heading text-3xl text-navy mt-10 mb-4 leading-snug">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-heading text-2xl text-navy mt-8 mb-3 leading-snug">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gold pl-6 my-6 font-body text-slate/75 italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="font-body text-slate leading-relaxed mb-5 ml-5 list-disc space-y-1">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="font-body text-slate leading-relaxed mb-5 ml-5 list-decimal space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-navy">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-navy transition-colors">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(900).url()}
            alt={value.alt ?? ''}
            className="w-full object-cover"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center font-body text-xs text-slate/50 tracking-wide">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug }).catch(() => null)
  if (!post) notFound()

  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(600).url()
    : null
  const badgeClass = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.News

  return (
    <main className="bg-white">
      {/* Cover image */}
      {imageUrl && (
        <div className="relative h-[40vh] min-h-[280px] max-h-[480px] overflow-hidden bg-navy">
          <img src={imageUrl} alt={post.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
        </div>
      )}

      {/* Article */}
      <div className={`max-w-3xl mx-auto px-6 lg:px-10 ${imageUrl ? '-mt-24 relative z-10' : 'pt-32'} pb-24`}>
        <AnimatedSection>
          {/* Back link */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-gold hover:text-navy transition-colors duration-200 mb-8"
          >
            <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            All News
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.category && (
              <span className={`font-body text-xs px-3 py-1 tracking-wider uppercase font-semibold ${badgeClass}`}>
                {post.category}
              </span>
            )}
            {post.publishedAt && (
              <span className="font-body text-xs text-slate/50 uppercase tracking-widest">
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.author && (
              <span className="font-body text-xs text-slate/50">by {post.author}</span>
            )}
          </div>

          <h1 className="font-heading text-4xl lg:text-5xl text-navy leading-tight mb-8">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="font-body text-lg text-slate/70 leading-relaxed mb-10 pb-10 border-b border-sand">
              {post.excerpt}
            </p>
          )}
        </AnimatedSection>

        {/* Body */}
        {post.body && (
          <AnimatedSection delay={0.1}>
            <PortableText value={post.body} components={ptComponents} />
          </AnimatedSection>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-sand">
          <SectionLabel className="mb-4">Country Materials Ltd</SectionLabel>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wide text-gold hover:text-navy transition-colors duration-200"
          >
            ← Back to all news
          </Link>
        </div>
      </div>
    </main>
  )
}
