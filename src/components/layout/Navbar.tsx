'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import { localePath, stripLocale, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

const NAV_ROUTES = [
  { key: 'home',     href: '/' },
  { key: 'about',    href: '/about' },
  { key: 'impact',   href: '/impact' },
  { key: 'shop',     href: '/shop' },
  { key: 'blog',     href: '/blog' },
  { key: 'careers',  href: '/careers' },
  { key: 'contact',  href: '/contact' },
] as const

interface NavbarProps {
  logoUrl?: string
  locale: Locale
  t: Dictionary['nav']
  phone?: string
}

export default function Navbar({ logoUrl, locale, t, phone }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname() ?? '/'
  const currentPath = stripLocale(pathname).path

  const tel = phone ?? '+255 768 500 555'

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
    if (href === '/') return currentPath === '/'
    return currentPath.startsWith(href)
  }

  return (
    <>
      <header
        // Unscrolled/unopened, this floats transparent over the homepage hero,
        // which is a fixed-dark photo band regardless of theme — pin dark so
        // the nav text stays readable there. Once scrolled/open it gets a
        // real (theme-reactive) background via .nav-scrolled, so drop the pin.
        data-theme={(scrolled || menuOpen) ? undefined : 'dark'}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
          (scrolled || menuOpen) && 'nav-scrolled'
        )}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-[68px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href={localePath(locale, '/')} className="flex-shrink-0 flex items-center gap-3">
            <Image
              src={logoUrl ?? '/images/logo/Country-Materials-Logo.png'}
              alt={t.logoAlt}
              width={180}
              height={48}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label={t.primaryNav}>
            {NAV_ROUTES.map((link) => (
              <Link
                key={link.href}
                href={localePath(locale, link.href)}
                className={cn(
                  'text-[13.5px] font-semibold tracking-wide transition-colors duration-200 cursor-pointer',
                  isActive(link.href)
                    ? 'text-gold-light'
                    : 'text-inverse/70 hover:text-inverse'
                )}
              >
                {t[link.key]}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-5">
            <ThemeToggle label={t.switchTheme} />
            <LanguageToggle locale={locale} label={t.switchLanguage} />
            <a
              href={`tel:${tel.replace(/\s/g, '')}`}
              className="text-[13px] font-medium text-inverse/60 hover:text-inverse/90 transition-colors duration-200"
            >
              {tel}
            </a>
            <Link
              href={localePath(locale, '/contact')}
              className="inline-flex items-center bg-gold hover:bg-gold-light text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              {t.getQuote}
            </Link>
          </div>

          {/* Mobile: language + theme toggles sit outside the drawer so they're reachable without opening it */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle label={t.switchTheme} />
            <LanguageToggle locale={locale} label={t.switchLanguage} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center text-inverse cursor-pointer rounded-lg hover:bg-inverse/10 transition-colors duration-200"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
              )}
            </button>
          </div>
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
          <nav className="flex flex-col" aria-label={t.mobileNav}>
            {NAV_ROUTES.map((link) => (
              <Link
                key={link.href}
                href={localePath(locale, link.href)}
                className={cn(
                  'text-2xl font-bold py-5 border-b border-inverse/10 transition-colors duration-200 cursor-pointer',
                  isActive(link.href) ? 'text-gold-light' : 'text-inverse/80 hover:text-inverse'
                )}
              >
                {t[link.key]}
              </Link>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <a href={`tel:${tel.replace(/\s/g, '')}`} className="text-inverse/60 text-sm font-medium hover:text-inverse/85 transition-colors">
                {tel}
              </a>
              <a href="mailto:info@countrymaterial.com" className="text-inverse/60 text-sm font-medium hover:text-inverse/85 transition-colors">
                info@countrymaterial.com
              </a>
            </div>
            <LanguageToggle locale={locale} label={t.switchLanguage} variant="full" className="py-1" />
            <Link
              href={localePath(locale, '/contact')}
              className="inline-flex items-center justify-center bg-gold hover:bg-gold-light text-white text-base font-semibold px-6 py-4 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              {t.getQuote}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
