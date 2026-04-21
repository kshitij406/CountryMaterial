'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/shop' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
]

interface NavbarProps {
  logoUrl?: string
  companyName?: string
}

export default function Navbar({ logoUrl, companyName: _companyName }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleClientsClick(e: React.MouseEvent) {
    e.preventDefault()
    setMenuOpen(false)
    if (pathname === '/') {
      document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/')
      setTimeout(() => {
        document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth' })
      }, 600)
    }
  }

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const linkClass = (href: string) => cn(
    'relative font-condensed text-[13px] tracking-[0.22em] uppercase py-1',
    'after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold',
    'after:transition-all after:duration-300',
    isActive(href)
      ? 'text-gold after:w-full'
      : 'text-cream/80 hover:text-cream after:w-0 hover:after:w-full'
  )

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b',
        scrolled || !isHome
          ? 'bg-navy/92 backdrop-blur-[14px] border-gold/[0.18] py-3.5'
          : 'bg-transparent border-transparent py-[22px]'
      )}
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5" aria-label="Country Materials Ltd">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Country Materials Ltd"
              width={120}
              height={46}
              className="h-9 w-auto object-contain"
              priority
            />
          ) : (
            <>
              <div className="relative w-[34px] h-[34px] border border-gold/80 grid place-items-center flex-shrink-0">
                <div className="absolute inset-[6px] border border-gold/80 rotate-45" />
              </div>
              <span className="font-display text-[20px] tracking-[0.18em] text-cream hidden sm:block">
                COUNTRY<span className="text-gold">·</span>MATERIALS
              </span>
            </>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}

          {/* Clients scroll link */}
          <button onClick={handleClientsClick} className={cn(
            'relative font-condensed text-[13px] tracking-[0.22em] uppercase py-1',
            'after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold',
            'after:transition-all after:duration-300',
            'text-cream/80 hover:text-cream after:w-0 hover:after:w-full'
          )}>
            Clients
          </button>

          <Link
            href="/contact"
            className="group relative ml-2 overflow-hidden px-[26px] py-3 bg-gold text-navy font-condensed text-[13px] tracking-[0.22em] uppercase font-semibold"
          >
            <span className="relative z-10">Request a Quote</span>
            <span
              className="absolute inset-0 bg-gold-light -translate-x-full group-hover:translate-x-0 transition-transform duration-400"
              style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
            />
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          aria-label="Toggle menu"
        >
          <span className={cn('block h-0.5 bg-white transition-all duration-300', menuOpen && 'rotate-45 translate-y-[7px]')} />
          <span className={cn('block h-0.5 bg-white transition-all duration-300', menuOpen && 'opacity-0')} />
          <span className={cn('block h-0.5 bg-white transition-all duration-300', menuOpen && '-rotate-45 -translate-y-[7px]')} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 top-[62px] bg-navy transition-all duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col px-8 pt-10 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-display text-[clamp(32px,8vw,48px)] py-3 border-b tracking-[0.04em] uppercase',
                'border-gold/15 transition-colors duration-200',
                isActive(link.href) ? 'text-gold' : 'text-cream/80 hover:text-cream'
              )}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleClientsClick}
            className="font-display text-[clamp(32px,8vw,48px)] py-3 border-b tracking-[0.04em] uppercase border-gold/15 text-cream/80 hover:text-cream text-left"
          >
            Clients
          </button>
          <Link
            href="/contact"
            className="mt-8 w-full text-center py-4 bg-gold text-navy font-condensed font-semibold text-[15px] tracking-[0.22em] uppercase"
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  )
}
