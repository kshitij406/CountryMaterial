import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { openCareersQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import type { Career } from '@/types'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)
  const company = settings?.companyName ?? 'Country Materials'
  return {
    title: 'Careers',
    description: `Join the ${company} team. Explore open positions in logistics, hardware, waste management, and operations in ${settings?.city ?? 'Dar es Salaam'}.`,
  }
}

const fallbackJobs: Career[] = [
  {
    _id: 'fallback-1',
    title: 'Logistics Coordinator',
    slug: { current: 'logistics-coordinator' },
    department: 'Transportation',
    location: 'Dar es Salaam',
    employmentType: 'full-time',
    description: [{ _type: 'block', children: [{ text: 'Coordinate day-to-day freight forwarding operations, manage carrier relationships, and ensure on-time delivery across our logistics network.' }] }],
    requirements: ['Diploma or degree in Logistics, Supply Chain, or related field', 'Minimum 2 years experience in logistics or freight forwarding', 'Strong organizational and communication skills'],
    closingDate: '2026-04-30',
  },
  {
    _id: 'fallback-2',
    title: 'Waste Collection Supervisor',
    slug: { current: 'waste-collection-supervisor' },
    department: 'Waste Management',
    location: 'Dar es Salaam',
    employmentType: 'full-time',
    description: [{ _type: 'block', children: [{ text: 'Oversee scrap collection teams, ensure compliance with waste management regulations, and coordinate with industrial clients and recycling facilities.' }] }],
    requirements: ['Certificate or diploma in Environmental Science, Public Health, or related field', 'Experience supervising field teams', 'Knowledge of waste management regulations in Tanzania'],
    closingDate: '2026-04-15',
  },
]

const WHY_ITEMS = [
  { title: 'Merit-Based Growth', desc: 'Performance is recognized and rewarded with real advancement opportunities.' },
  { title: 'Collaborative Culture', desc: 'Teamwork is at the core of how we operate - no silo, no politics.' },
  { title: 'Regional Impact', desc: 'Work that matters to Tanzania and the region. Your output is visible.' },
  { title: 'Growing Company', desc: 'Join early and grow with us as we expand across the region.' },
]

export default async function CareersPage() {
  const [rawJobs, settings] = await Promise.all([
    client.fetch(openCareersQuery).catch(() => null),
    client.fetch(siteSettingsQuery).catch(() => null),
  ])

  const jobs: Career[] = rawJobs?.length ? rawJobs : fallbackJobs
  const company = settings?.companyName ?? 'Country Materials'

  return (
    <>
      <section className="relative overflow-hidden pt-[150px] pb-[90px] px-8 lg:px-16 bg-navy" style={{ borderBottom: '1px solid rgba(216,224,231,.4)' }}>
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-7">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-white/90">Join Our Team</span>
          </div>
          <h1 className="font-display text-[clamp(44px,7vw,102px)] leading-[0.9] tracking-[0.03em] uppercase text-white max-w-4xl">
            Build Your Career with <span className="text-gold-light">{company}</span>
          </h1>
          <p className="mt-8 font-barlow text-[17px] text-white/75 max-w-2xl leading-[1.65]">
            We are growing and looking for driven, capable people to join us in building Tanzania&apos;s industrial future.
          </p>
        </div>
      </section>

      <section className="relative py-[100px] px-8 lg:px-16 bg-white" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-14 reveal">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="block h-px w-10 bg-gold" />
                <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Why Work Here</span>
              </div>
              <h2 className="font-display text-[clamp(36px,4vw,64px)] leading-[0.9] tracking-[0.03em] uppercase text-slate">
                A Team That Takes Its <span className="text-gold">Work</span> Seriously
              </h2>
            </div>
            <span className="font-space text-[12px] text-gold/70 tracking-[0.2em]">{'// CULTURE'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 stagger">
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="p-8 bg-charcoal" style={{ border: '1px solid #D8E0E7' }}>
                <span className="font-space text-[11px] text-gold/50 tracking-[0.2em]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[clamp(22px,2vw,30px)] leading-[1] tracking-[0.04em] uppercase text-slate mt-3 mb-3">{item.title}</h3>
                <p className="font-barlow text-[15px] text-slate/85 leading-[1.65]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 reveal">
            <p className="font-barlow text-[16px] text-slate/75 leading-[1.7] max-w-2xl">
              Based in {settings?.city ?? 'Dar es Salaam'}, we are a growing company with ambitions to expand across the region.
              Joining us now means growing alongside us.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-[100px] px-8 lg:px-16 bg-charcoal" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-14 reveal">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="block h-px w-10 bg-gold" />
                <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Open Positions</span>
              </div>
              <h2 className="font-display text-[clamp(36px,4vw,64px)] leading-[0.9] tracking-[0.03em] uppercase text-slate">
                Current <span className="text-gold">Opportunities</span>
              </h2>
            </div>
            <span className="font-space text-[12px] text-gold/70 tracking-[0.2em]">{`// ${jobs.length} OPEN ROLES`}</span>
          </div>

          <div className="space-y-4 stagger">
            {jobs.map((job, i) => (
              <Link
                key={job._id}
                href={`/careers/${job.slug.current}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-6 py-7 px-6 hover:pl-8 transition-all duration-300 bg-white"
                style={{ border: '1px solid #D8E0E7' }}
              >
                <span className="font-space text-[12px] text-gold/55 tracking-[0.2em] shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-[clamp(20px,2vw,28px)] leading-[1] tracking-[0.04em] uppercase text-slate group-hover:text-gold transition-colors duration-200 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {job.department && (
                      <span className="font-condensed text-[11px] tracking-[0.15em] uppercase text-gold/80">{job.department}</span>
                    )}
                    {job.location && (
                      <span className="font-condensed text-[11px] tracking-[0.15em] uppercase text-slate/55">- {job.location}</span>
                    )}
                    {job.employmentType && (
                      <span className="font-condensed text-[11px] tracking-[0.15em] uppercase text-slate/55">{job.employmentType.replace('-', ' ')}</span>
                    )}
                  </div>
                </div>
                {job.closingDate && (
                  <span className="font-barlow text-[13px] text-slate/55 shrink-0">
                    Closes {new Date(job.closingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                )}
                <svg className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors duration-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-20 reveal bg-white" style={{ border: '1px solid #D8E0E7' }}>
              <div className="font-display text-[56px] text-gold/20 mb-4">◈</div>
              <h3 className="font-display text-[28px] tracking-[0.04em] uppercase text-slate mb-3">No Open Positions Right Now</h3>
              <p className="font-barlow text-[15px] text-slate/65 max-w-md mx-auto mb-8">
                We are not actively hiring at the moment, but we always welcome expressions of interest from talented individuals.
              </p>
            </div>
          )}
        </div>
      </section>

      <CtaBanner
        heading="Do You Not See the\nRight Role?"
        subtext="Send us your CV and a brief note about what you are looking for. We will keep your profile on file."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="About the Company"
        secondaryHref="/about"
      />
    </>
  )
}
