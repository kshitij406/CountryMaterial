'use client'

import { useState } from 'react'

interface Career {
  _id: string
  title: string
  department?: string
  location?: string
  employmentType?: string
  description?: Array<{ _type: string; children?: Array<{ text: string }> }>
  requirements?: string[]
  closingDate?: string
}

export default function JobListing({ job }: { job: Career }) {
  const [open, setOpen] = useState(false)

  const typeLabel: Record<string, string> = {
    'full-time': 'Full-Time',
    'part-time': 'Part-Time',
    contract: 'Contract',
    internship: 'Internship',
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="border border-sand bg-white hover:border-gold/40 transition-colors duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-7 py-6 flex items-start justify-between gap-4"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            {job.department && (
              <span className="font-body text-xs text-gold tracking-widest uppercase">
                {job.department}
              </span>
            )}
          </div>
          <h3 className="font-heading text-xl text-navy">{job.title}</h3>
          <div className="flex flex-wrap gap-4 mt-3">
            {job.location && (
              <span className="font-body text-xs text-slate/60 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
            )}
            {job.employmentType && (
              <span className="font-body text-xs text-slate/60 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {typeLabel[job.employmentType] ?? job.employmentType}
              </span>
            )}
            {job.closingDate && (
              <span className="font-body text-xs text-slate/60 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Closes {formatDate(job.closingDate)}
              </span>
            )}
          </div>
        </div>
        <div className={`shrink-0 w-8 h-8 border border-sand flex items-center justify-center text-navy transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-7 pb-8 border-t border-sand">
          {job.requirements && job.requirements.length > 0 && (
            <div className="mt-6">
              <h4 className="font-body text-xs text-slate/60 tracking-widest uppercase mb-4">Requirements</h4>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="font-body text-sm text-slate flex items-start gap-3">
                    <span className="text-gold mt-0.5 shrink-0">›</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <a
              href={`mailto:info@countrymaterial.com?subject=Application: ${encodeURIComponent(job.title)}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-gold-light text-navy font-body font-semibold text-sm tracking-wide transition-colors duration-200"
            >
              Apply for This Role
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
