import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { openCareersQuery } from '@/sanity/lib/queries'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/animations/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import JobListing from '@/components/sections/JobListing'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the Country Materials team. Explore open positions in logistics, hardware, waste management, and operations in Dar es Salaam.',
}

const fallbackJobs = [
  {
    _id: 'fallback-1',
    title: 'Logistics Coordinator',
    department: 'Transportation',
    location: 'Dar es Salaam',
    employmentType: 'full-time',
    description: [],
    requirements: [
      'Diploma or degree in Logistics, Supply Chain, or related field',
      'Minimum 2 years experience in logistics or freight forwarding',
      'Strong organizational and communication skills',
      'Proficiency in Microsoft Office Suite',
      'Valid driving licence preferred',
    ],
    closingDate: '2026-04-30',
  },
  {
    _id: 'fallback-2',
    title: 'Waste Collection Supervisor',
    department: 'Waste Management',
    location: 'Dar es Salaam',
    employmentType: 'full-time',
    description: [],
    requirements: [
      'Certificate or diploma in Environmental Science, Public Health, or related field',
      'Experience supervising field teams',
      'Knowledge of waste management regulations in Tanzania',
      'Physical fitness and willingness to work outdoors',
      'Leadership skills and ability to manage a team of 5–10',
    ],
    closingDate: '2026-04-15',
  },
]

export default async function CareersPage() {
  const jobs = await client.fetch(openCareersQuery).catch(() => null)
  const displayJobs = jobs?.length ? jobs : fallbackJobs

  return (
    <>
      <PageHeader
        label="Join Our Team"
        title="Build Your Career with Country Materials"
        subtitle="We are growing and looking for driven, capable people to join us in building Tanzania's industrial future."
      />

      {/* Culture section */}
      <section className="bg-white py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-section">
            <AnimatedSection>
              <SectionLabel className="mb-5">Why Work Here</SectionLabel>
              <h2 className="font-heading text-4xl lg:text-5xl text-navy leading-tight mb-6">
                A Team That Takes Its Work Seriously
              </h2>
              <p className="font-body text-slate leading-relaxed mb-5">
                At Country Materials, we believe that the best businesses are built by the best teams.
                We invest in our people, provide real responsibility, and create an environment where
                your contributions have visible impact.
              </p>
              <p className="font-body text-slate leading-relaxed">
                Based in Dar es Salaam, we are a growing company with ambitions to expand across the
                region. Joining us now means growing alongside us.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: '🏆', title: 'Merit-Based Growth', desc: 'Performance is recognized and rewarded.' },
                { icon: '🤝', title: 'Collaborative Culture', desc: 'Teamwork is at the core of how we operate.' },
                { icon: '🌍', title: 'Regional Impact', desc: 'Work that matters to Tanzania and the region.' },
                { icon: '📈', title: 'Growing Company', desc: 'Join early and grow with us as we expand.' },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.07}>
                  <div className="bg-cream border border-sand p-6 h-full">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h4 className="font-heading text-base text-navy mb-1.5">{item.title}</h4>
                    <p className="font-body text-xs text-slate/70 leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Job listings */}
          <div>
            <AnimatedSection className="mb-10">
              <SectionLabel className="mb-4">Open Positions</SectionLabel>
              <h2 className="font-heading text-4xl text-navy leading-tight">
                Current Opportunities
              </h2>
            </AnimatedSection>

            {displayJobs.length > 0 ? (
              <div className="space-y-4">
                {displayJobs.map((job: any) => (
                  <AnimatedSection key={job._id}>
                    <JobListing job={job} />
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="bg-cream border border-sand px-8 py-16 text-center">
                <div className="text-5xl mb-5">📭</div>
                <h3 className="font-heading text-2xl text-navy mb-3">No Open Positions Right Now</h3>
                <p className="font-body text-slate/70 max-w-md mx-auto mb-6">
                  We are not actively hiring at the moment, but we always welcome expressions of
                  interest from talented individuals.
                </p>
                <a
                  href="mailto:info@countrymaterial.com?subject=General Career Inquiry"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold hover:bg-gold-light text-navy font-body font-semibold text-sm tracking-wide transition-colors duration-200"
                >
                  Send a General Application
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Don't See the Right Role?"
        subtext="Send us your CV and a brief note about what you are looking for. We will keep your profile on file."
        primaryLabel="Send Your CV"
        primaryHref="mailto:info@countrymaterial.com?subject=General Career Application"
        secondaryLabel="About the Company"
        secondaryHref="/about"
      />
    </>
  )
}
