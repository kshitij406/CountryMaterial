'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Shop', href: '/shop' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navBg = isHomePage
    ? scrolled
      ? 'bg-navy/95 backdrop-blur-md shadow-lg shadow-navy/30'
      : 'bg-transparent'
    : 'bg-navy'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        navBg
      )}
    >
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col leading-none">
              <span className="font-heading text-white text-xl tracking-tight">Country</span>
              <span className="font-heading text-gold text-xl tracking-tight">Materials</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-body text-sm tracking-wide transition-colors duration-200 relative',
                  'after:absolute after:bottom-[-3px] after:left-0 after:h-0.5 after:bg-gold',
                  'after:transition-all after:duration-300',
                  pathname === link.href
                    ? 'text-gold after:w-full'
                    : 'text-white/80 hover:text-white after:w-0 hover:after:w-full'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-navy font-body text-sm font-semibold tracking-wide transition-colors duration-200"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            aria-label="Toggle menu"
          >
            <span className={cn('block h-0.5 bg-white transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('block h-0.5 bg-white transition-all duration-300', menuOpen && 'opacity-0')} />
            <span className={cn('block h-0.5 bg-white transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 top-[66px] bg-navy transition-all duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col px-6 pt-8 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-heading text-3xl py-3 border-b border-white/10 transition-colors duration-200',
                pathname === link.href ? 'text-gold' : 'text-white/80 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-6 w-full text-center px-5 py-4 bg-gold text-navy font-body font-semibold text-lg"
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  )
}
