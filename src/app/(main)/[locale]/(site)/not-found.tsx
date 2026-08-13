'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getDictionary } from '@/i18n'
import { localePath, stripLocale } from '@/i18n/config'

/**
 * Next.js does not pass `params` to not-found.tsx, so the locale is read from
 * the URL instead. Keeping this a client component is the documented workaround.
 */
export default function NotFound() {
  const pathname = usePathname() ?? '/'
  const { locale } = stripLocale(pathname)
  const t = getDictionary(locale).notFound

  return (
    <div
      className="min-h-screen flex items-center justify-center px-8 not-found-fade"
      style={{ background: '#0B1D3A' }}
    >
      <div className="text-center max-w-lg">
        <div
          className="font-mono font-bold leading-none mb-4 select-none"
          style={{ fontSize: 'clamp(96px,16vw,160px)', color: '#C8962E' }}
          aria-hidden="true"
        >
          404
        </div>

        <div
          className="w-16 h-px mx-auto mb-8"
          style={{ background: 'rgba(200,150,46,0.4)' }}
        />

        <h1 className="font-black text-[clamp(28px,4vw,48px)] leading-tight tracking-tight text-white mb-5">
          {t.heading}
        </h1>
        <p className="text-[15px] leading-relaxed mb-10" style={{ color: '#8896A7' }}>
          {t.body}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={localePath(locale, '/')}
            className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-[14px] transition-colors duration-200"
            style={{ background: '#C8962E', color: '#0B1D3A' }}
          >
            {t.goHome}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href={localePath(locale, '/contact')}
            className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-[14px] text-white/80 hover:text-white transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          >
            {t.contactUs}
          </Link>
        </div>
      </div>
    </div>
  )
}
