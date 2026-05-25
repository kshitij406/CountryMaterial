'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'cm_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="cookie-banner fixed bottom-0 left-0 right-0 z-50 px-6 py-5 sm:px-10"
      style={{ background: '#0B1D3A', borderTop: '1px solid rgba(200,150,46,0.18)' }}
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
        {/* Message */}
        <p className="flex-1 text-[14px] text-white/70 leading-relaxed">
          We use cookies to improve your experience.{' '}
          Read our{' '}
          <Link
            href="/cookies"
            className="underline underline-offset-2 text-white/90 hover:text-gold transition-colors duration-200"
          >
            Cookie Policy
          </Link>
          .
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2.5 text-[13px] font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 text-[13px] font-semibold transition-colors duration-200 cursor-pointer"
            style={{ background: '#C8962E', color: '#0B1D3A' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#DBA840' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#C8962E' }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
