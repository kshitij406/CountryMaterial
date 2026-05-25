'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Impact',   href: '/impact' },
  { label: 'Products', href: '/shop' },
  { label: 'Services', href: '/services' },
  { label: 'Careers',  href: '/careers' },
  { label: 'Contact',  href: '/contact' },
]

interface NavbarProps {
  logoUrl?: string
  companyName?: string
}

export default function Navbar({ logoUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
          (scrolled || menuOpen) && 'nav-scrolled'
        )}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-[68px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3">
            <Image
              src={logoUrl ?? '/images/logo/Country-Materials-Logo.png'}
              alt="Country Materials Limited"
              width={180}
              height={48}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-[13.5px] font-semibold tracking-wide transition-colors duration-200 cursor-pointer',
                  isActive(link.href)
                    ? 'text-gold-light'
                    : 'text-white/70 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+255768500555"
              className="text-[13px] font-medium text-white/50 hover:text-white/90 transition-colors duration-200"
            >
              +255 768 500 555
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center bg-gold hover:bg-gold-light text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white cursor-pointer rounded-lg hover:bg-white/10 transition-colors duration-200"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-navy flex flex-col lg:hidden transition-transform duration-300',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-hidden={!menuOpen}
      >
        <div className="h-[68px] flex-shrink-0" />
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-2xl font-bold py-5 border-b border-white/10 transition-colors duration-200 cursor-pointer',
                  isActive(link.href) ? 'text-gold-light' : 'text-white/80 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <a href="tel:+255768500555" className="text-white/50 text-sm font-medium hover:text-white/80 transition-colors">
                +255 768 500 555
              </a>
              <a href="mailto:info@countrymaterial.com" className="text-white/50 text-sm font-medium hover:text-white/80 transition-colors">
                info@countrymaterial.com
              </a>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-gold hover:bg-gold-light text-white text-base font-semibold px-6 py-4 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
