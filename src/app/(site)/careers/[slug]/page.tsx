import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { careerBySlugQuery, allCareerSlugsQuery } from '@/sanity/lib/queries'
import type { Career } from '@/types'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allCareerSlugsQuery).catch(() => [])
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await client.fetch<Career>(careerBySlugQuery, { slug: params.slug }).catch(() => null)
  if (!job) return { title: 'Job Not Found | Country Materials Ltd' }
  return buildMetadata({
    title: `${job.title} | Country Materials Ltd`,
    description:
      job.excerpt ??
      `Apply for the ${job.title} position at Country Materials Ltd. Based in ${job.location ?? 'Dar es Salaam'}, Tanzania.`,
    path: `/careers/${params.slug}`,
  })
}

function renderBlocks(blocks?: Career['description']) {
  if (!blocks?.length) return null
  return blocks.map((block, i) => {
    const text = block.children?.map((c) => c.text).join('') ?? ''
    if (!text.trim()) return null
    return (
      <p key={i} className="font-barlow text-[17px] text-slate/80 leading-[1.75] mb-5">
        {text}
      </p>
    )
  })
}

const FALLBACK_JOB: Career = {
  _id: 'fallback-logistics',
  title: 'Logistics Coordinator',
  slug: { current: 'logistics-coordinator' },
  department: 'Transportation',
  location: 'Dar es Salaam',
  employmentType: 'full-time',
  description: [
    { _type: 'block', children: [{ text: 'Coordinate day-to-day freight forwarding operations, manage carrier relationships, and ensure on-time delivery across our logistics network.' }] },
    { _type: 'block', children: [{ text: 'You will work closely with our operations and warehouse teams to plan and execute shipments, resolve delivery issues, and maintain accurate records.' }] },
  ],
  requirements: [
    'Diploma or degree in Logistics, Supply Chain, or related field',
    'Minimum 2 years experience in logistics or freight forwarding',
    'Strong organizational and communication skills',
    'Familiarity with import/export documentation',
  ],
  closingDate: '2026-06-30',
}

export default async function CareerDetailPage({ params }: { params: { slug: string } }) {
  const job = await client.fetch<Career>(careerBySlugQuery, { slug: params.slug }).catch(() => null)

  if (!job && params.slug !== FALLBACK_JOB.slug.current) notFound()
  const post = job ?? FALLBACK_JOB

  const closingLabel = post.closingDate
    ? new Date(post.closingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const isClosed = post.expired || (post.closingDate ? new Date(post.closingDate) < new Date() : false)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[150px] pb-[90px] px-8 lg:px-16 bg-navy" style={{ borderBottom: '1px solid rgba(216,224,231,.4)' }}>
        <div className="relative max-w-[1440px] mx-auto">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 font-condensed text-[12px] tracking-[0.18em] uppercase text-white/55 hover:text-white/90 transition-colors mb-8"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All Positions
          </Link>

          {isClosed && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-amber/15 border border-amber/30" style={{ borderRadius: 2 }}>
              <span className="font-condensed text-[11px] tracking-[0.18em] uppercase text-amber">Position Closed</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 mb-6">
            {post.department && (
              <span className="font-condensed text-[11px] tracking-[0.18em] uppercase text-gold/80 px-3 py-1 bg-gold/10 border border-gold/20" style={{ borderRadius: 2 }}>
                {post.department}
              </span>
            )}
            {post.employmentType && (
              <span className="font-condensed text-[11px] tracking-[0.18em] uppercase text-white/55 px-3 py-1 bg-white/5 border border-white/10" style={{ borderRadius: 2 }}>
                {post.employmentType.replace('-', ' ')}
              </span>
            )}
            {post.location && (
              <span className="font-condensed text-[11px] tracking-[0.18em] uppercase text-white/55 px-3 py-1 bg-white/5 border border-white/10" style={{ borderRadius: 2 }}>
                {post.location}
              </span>
            )}
          </div>

          <h1 className="font-display text-[clamp(44px,7vw,102px)] leading-[0.9] tracking-[0.03em] uppercase text-white max-w-4xl">
            {post.title}
          </h1>

          {closingLabel && !isClosed && (
            <p className="mt-7 font-barlow text-[14px] text-white/50">
              Applications close <span className="text-white/75">{closingLabel}</span>
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="relative py-[100px] px-8 lg:px-16 bg-white" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">

            {/* Main content */}
            <div>
              {/* Description */}
              {post.description?.length ? (
                <div className="mb-14 reveal">
                  <div className="flex items-center gap-3.5 mb-7">
                    <span className="block h-px w-10 bg-gold" />
                    <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">About the Role</span>
                  </div>
                  <div>{renderBlocks(post.description)}</div>
                </div>
              ) : null}

              {/* Requirements */}
              {post.requirements?.length ? (
                <div className="reveal">
                  <div className="flex items-center gap-3.5 mb-7">
                    <span className="block h-px w-10 bg-gold" />
                    <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Requirements</span>
                  </div>
                  <ul className="space-y-3">
                    {post.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="mt-[7px] shrink-0 block w-1.5 h-1.5 bg-gold" />
                        <span className="font-barlow text-[16px] text-slate/80 leading-[1.65]">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {/* Sidebar */}
            <div className="reveal">
              <div className="p-8 bg-charcoal sticky top-28" style={{ border: '1px solid #D8E0E7' }}>
                <h3 className="font-display text-[22px] tracking-[0.04em] uppercase text-slate mb-6">
                  {isClosed ? 'This Role is Closed' : 'Apply for This Role'}
                </h3>

                {isClosed ? (
                  <p className="font-barlow text-[14px] text-slate/60 leading-[1.65] mb-6">
                    This position is no longer accepting applications. Check our other open roles or send a general enquiry.
                  </p>
                ) : (
                  <p className="font-barlow text-[14px] text-slate/65 leading-[1.65] mb-6">
                    Send your CV and a cover letter referencing <strong className="text-slate font-semibold">{post.title}</strong> in the subject line.
                  </p>
                )}

                <Link
                  href={`/contact?role=${encodeURIComponent(post.title)}`}
                  className="block w-full text-center py-3.5 px-6 font-condensed text-[12px] tracking-[0.18em] uppercase bg-gold text-white hover:bg-gold-light transition-colors duration-200"
                  style={{ borderRadius: 2 }}
                >
                  {isClosed ? 'General Enquiry' : 'Apply Now'}
                </Link>

                <Link
                  href="/careers"
                  className="block w-full text-center py-3.5 px-6 mt-3 font-condensed text-[12px] tracking-[0.18em] uppercase text-gold border border-gold/40 hover:border-gold hover:bg-gold/5 transition-all duration-200"
                  style={{ borderRadius: 2 }}
                >
                  All Open Positions
                </Link>

                {closingLabel && !isClosed && (
                  <div className="mt-6 pt-6 border-t border-sand">
                    <span className="font-space text-[11px] text-slate/40 tracking-[0.15em] uppercase block mb-1">Closing Date</span>
                    <span className="font-barlow text-[14px] text-slate/70">{closingLabel}</span>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-sand space-y-3">
                  {post.department && (
                    <div>
                      <span className="font-space text-[11px] text-slate/40 tracking-[0.15em] uppercase block mb-1">Department</span>
                      <span className="font-barlow text-[14px] text-slate/70">{post.department}</span>
                    </div>
                  )}
                  {post.location && (
                    <div>
                      <span className="font-space text-[11px] text-slate/40 tracking-[0.15em] uppercase block mb-1">Location</span>
                      <span className="font-barlow text-[14px] text-slate/70">{post.location}</span>
                    </div>
                  )}
                  {post.employmentType && (
                    <div>
                      <span className="font-space text-[11px] text-slate/40 tracking-[0.15em] uppercase block mb-1">Type</span>
                      <span className="font-barlow text-[14px] text-slate/70 capitalize">{post.employmentType.replace('-', ' ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
