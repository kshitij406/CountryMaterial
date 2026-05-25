import Image from 'next/image'
import Link from 'next/link'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  publishedAt?: string
  excerpt?: string
  coverImageUrl?: string | null
}

interface AnnouncementProps {
  tag?: string | null
  heading?: string | null
  body?: string | null
  imageUrl?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

interface LatestSectionProps {
  announcement?: AnnouncementProps | null
  posts?: Post[]
}

const DEFAULT_ANNOUNCEMENT: AnnouncementProps = {
  tag: 'Upcoming · Next Decade',
  heading: 'Next Decade Development Plan',
  body: 'The upcoming Factory by COUNTRY MATERIALS will be a state of the art facility with the latest machinery to produce Virgin Steel in Tanzania. It will be the second best facility after South Africa on the African continent to produce virgin steel from iron ore. This type of production requires no mixing and produces superior quality steel billets. It aligns with our vision to provide Tanzanians with the best quality products that uplift local standards and compete against imported products.',
  imageUrl: null,
  ctaLabel: 'Learn more',
  ctaHref: '/about',
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function LatestSection({ announcement, posts }: LatestSectionProps) {
  const ann = {
    tag:      announcement?.tag      ?? DEFAULT_ANNOUNCEMENT.tag,
    heading:  announcement?.heading  ?? DEFAULT_ANNOUNCEMENT.heading,
    body:     announcement?.body     ?? DEFAULT_ANNOUNCEMENT.body,
    imageUrl: announcement?.imageUrl ?? DEFAULT_ANNOUNCEMENT.imageUrl,
    ctaLabel: announcement?.ctaLabel ?? DEFAULT_ANNOUNCEMENT.ctaLabel,
    ctaHref:  announcement?.ctaHref  ?? DEFAULT_ANNOUNCEMENT.ctaHref,
  }

  const hasPosts = (posts?.length ?? 0) > 0

  return (
    <section className="relative bg-white py-20 sm:py-24 lg:py-[120px] px-5 sm:px-8 lg:px-16" id="latest">
      <span className="absolute top-10 sm:top-14 right-5 sm:right-8 lg:right-16 font-space text-[11px] sm:text-[12px] text-gold tracking-[0.2em]">
        07 / UPCOMING
      </span>

      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 mb-12 sm:mb-16 items-end reveal">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Latest & Upcoming</span>
            </div>
            <h2 className="font-display text-[clamp(34px,6.5vw,88px)] leading-[0.9] tracking-[0.03em] uppercase text-slate">
              What's next for<br />
              <span className="text-gold">Country Materials.</span>
            </h2>
          </div>
          <p className="font-barlow text-[15px] sm:text-[17px] text-slate/72 max-w-[520px]">
            From planned infrastructure to industry announcements — here's where we're headed over the next decade.
          </p>
        </div>

        {/* Main layout: featured announcement + optional posts */}
        <div className={`grid gap-5 stagger ${hasPosts ? 'lg:grid-cols-[1.6fr_1fr]' : 'lg:grid-cols-1'}`}>

          {/* ── Featured announcement card ──────────────────────────────── */}
          <div
            className="relative overflow-hidden flex flex-col bg-navy-deep min-h-[480px] lg:min-h-[560px]"
            style={{ border: '1px solid rgba(46,111,163,.18)' }}
          >
            {/* Background image */}
            {ann.imageUrl ? (
              <div className="absolute inset-0">
                <Image src={ann.imageUrl!} alt="Country Materials factory" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,30,45,.95) 0%, rgba(15,30,45,.75) 50%, rgba(15,30,45,.55) 100%)' }} />
              </div>
            ) : (
              <>
                {/* Gradient fallback when no image */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, #0F1E2D 0%, #1F3347 60%, #2D475F 100%)' }} />
                {/* Rebar grid overlay */}
                <div className="absolute inset-0 bg-rebar-grid-dark" />
                <div className="absolute inset-0 bg-steel-lines" />
              </>
            )}

            <div className="absolute inset-0 grain-overlay" style={{ opacity: 0.025 }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-8 sm:p-10 lg:p-14">
              {/* Top: tag + section label */}
              <div className="flex items-start justify-between flex-wrap gap-4">
                <span
                  className="inline-flex items-center gap-2 font-space text-[9px] tracking-[0.22em] uppercase text-amber px-3 py-1.5"
                  style={{ border: '1px solid rgba(201,168,76,.35)', background: 'rgba(201,168,76,.08)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0 animate-pulse" />
                  {ann.tag}
                </span>
                <span className="font-space text-[10px] tracking-[0.2em] text-white/35">CM · 2025</span>
              </div>

              {/* Bottom: heading + body + CTA */}
              <div className="mt-auto">
                {/* Decorative rule */}
                <div className="w-12 h-px bg-gold/50 mb-6" />

                <h3 className="font-display text-[clamp(28px,4vw,52px)] leading-[0.92] tracking-[0.04em] uppercase text-cream mb-6">
                  {ann.heading}
                </h3>

                <p className="font-barlow text-[15px] sm:text-[16px] text-cream/65 leading-[1.72] max-w-[680px] mb-8">
                  {ann.body}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  {ann.ctaHref && (
                    <Link
                      href={ann.ctaHref}
                      className="group relative inline-flex items-center gap-3 overflow-hidden px-7 py-3.5 bg-gold text-white font-condensed text-[12px] tracking-[0.22em] uppercase font-semibold"
                    >
                      <span className="relative z-10">{ann.ctaLabel ?? 'Learn more'}</span>
                      <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                      <span className="absolute inset-0 bg-gold-dim -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
                    </Link>
                  )}

                  {/* Spec chips */}
                  <div className="flex flex-wrap gap-2">
                    {['Virgin Steel', 'Iron Ore Input', 'No Mixing Required', '2nd in Africa'].map((chip) => (
                      <span
                        key={chip}
                        className="font-condensed font-semibold text-[9px] tracking-[0.18em] uppercase px-2.5 py-1.5 text-cream/60"
                        style={{ border: '1px solid rgba(255,255,255,.15)' }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── News posts sidebar ─────────────────────────────────────── */}
          {hasPosts && (
            <div className="flex flex-col gap-5">
              {posts!.slice(0, 3).map((post) => (
                <Link
                  key={post._id}
                  href={`/news/${post.slug.current}`}
                  className="group flex flex-col overflow-hidden bg-white hover:border-gold/50 transition-all duration-300"
                  style={{ border: '1px solid #D8E0E7' }}
                >
                  {post.coverImageUrl && (
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={post.coverImageUrl!}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(23,40,56,.5) 0%, transparent 60%)' }} />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span className="font-condensed text-[9px] tracking-[0.18em] uppercase text-gold">{post.category}</span>
                      )}
                      {post.publishedAt && (
                        <span className="font-space text-[9px] text-slate/40">{formatDate(post.publishedAt)}</span>
                      )}
                    </div>
                    <h4 className="font-display text-[clamp(18px,1.6vw,22px)] leading-[1.0] tracking-[0.03em] uppercase text-slate group-hover:text-gold transition-colors duration-200 mb-2">
                      {post.title}
                    </h4>
                    {post.excerpt && (
                      <p className="font-barlow text-[13px] text-slate/60 leading-[1.6] line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="mt-auto pt-4 inline-flex items-center gap-2 font-condensed text-[11px] tracking-[0.2em] uppercase text-gold">
                      <span>Read more</span>
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}

              <Link
                href="/news"
                className="text-center py-3.5 font-condensed text-[12px] tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors duration-200"
                style={{ border: '1px solid #D8E0E7' }}
              >
                All news & announcements →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
