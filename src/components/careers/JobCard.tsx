import Link from 'next/link'
import type { Career } from '@/types'

interface JobCardProps {
  job: Career
}

const TYPE_LABEL: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  contract: 'Contract',
  internship: 'Internship',
}

function extractExcerpt(
  blocks?: Array<{ _type: string; children?: Array<{ text: string }> }>,
): string {
  if (!blocks?.length) return ''
  const first = blocks.find((b) => b._type === 'block')
  if (!first?.children) return ''
  const text = first.children.map((c) => c.text).join('')
  return text.length > 200 ? `${text.slice(0, 197)}…` : text
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function JobCard({ job }: JobCardProps) {
  const excerpt = job.excerpt ?? extractExcerpt(job.description)
  const applyHref = `/contact?role=${job.slug.current}`
  const typeLabel = job.employmentType ? (TYPE_LABEL[job.employmentType] ?? job.employmentType) : null

  return (
    <div
      data-reveal
      className="bg-white border border-sand hover:border-gold/40 hover:shadow-lg hover:shadow-navy/5 transition-all duration-300 flex flex-col"
    >
      <div className="p-7 flex flex-col flex-1">

        {/* Department badge + employment type */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {job.department && (
            <span className="font-body text-xs bg-gold text-navy px-3 py-1 tracking-wider uppercase font-semibold">
              {job.department}
            </span>
          )}
          {typeLabel && (
            <span className="font-body text-xs border border-sand text-slate/70 px-3 py-1 tracking-wider uppercase">
              {typeLabel}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl text-navy mb-3 leading-snug">{job.title}</h3>

        {/* Meta row — location + closing date */}
        <div className="flex flex-wrap gap-4 mb-4">
          {job.location && (
            <span className="font-body text-xs text-slate/60 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
          )}
          {job.closingDate && (
            <span className="font-body text-xs text-slate/60 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Closes {formatDate(job.closingDate)}
            </span>
          )}
        </div>

        {/* Short description */}
        {excerpt && (
          <p className="font-body text-sm text-slate/70 leading-relaxed mb-6 flex-1">{excerpt}</p>
        )}

        {/* CTA */}
        <div className="mt-auto pt-5 border-t border-sand">
          <Link
            href={applyHref}
            className="inline-flex items-center gap-2 px-7 py-3 bg-gold hover:bg-gold-light text-navy font-body text-sm font-semibold tracking-wide transition-colors duration-200"
          >
            Apply Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  )
}
