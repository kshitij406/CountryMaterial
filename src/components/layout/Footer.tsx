import Link from 'next/link'
import Image from 'next/image'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

// Branch names are place names — they read the same in both languages.
const BRANCH_CITIES = ['Mbeya', 'Dodoma', 'Kahama', 'Pwani · Kilimanjaro']

interface SocialLinks {
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
}

interface FooterContact {
  address?: string
  poBox?: string
  city?: string
  country?: string
  phone?: string
  email?: string
  socialLinks?: SocialLinks
}

export default function Footer({
  contact,
  locale,
  t,
}: {
  contact?: FooterContact
  locale: Locale
  t: Dictionary['footer']
}) {
  const phone = contact?.phone ?? '+255 768 500 555'
  const email = contact?.email ?? 'info@countrymaterial.com'
  const social = contact?.socialLinks
  const to = (path: string) => localePath(locale, path)

  const colCompany = [
    { label: t.aboutUs,        href: to('/about') },
    { label: t.ourImpact,      href: to('/impact') },
    { label: t.operations,     href: to('/about') + '#operations' },
    { label: t.certifications, href: to('/about') + '#certifications' },
    { label: t.careers,        href: to('/careers') },
  ]

  const colServices = [
    { label: t.scrapCollection,    href: to('/services/waste-management') },
    { label: t.steelManufacturing, href: to('/services/steel') },
    { label: t.rebarBillets,       href: to('/shop') },
    { label: t.fleetLogistics,     href: to('/services/transportation') },
  ]

  const colBranches = [
    { label: t.hq, href: to('/contact') },
    ...BRANCH_CITIES.map((city) => ({ label: city, href: to('/contact') })),
  ]

  return (
    <footer style={{ background: '#0B1D3A', borderTop: '1px solid rgba(200,150,46,0.12)' }}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 pb-14" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

          {/* Brand column */}
          <div>
            <div className="mb-6">
              <Image
                src="/images/logo/Country-Materials-Logo.png"
                alt="Country Materials Limited"
                width={200}
                height={56}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-[14px] text-white/40 leading-relaxed max-w-xs">
              {t.tagline}
            </p>
            <div className="mt-7 flex flex-col gap-2">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-[13px] text-white/50 hover:text-white transition-colors duration-200">
                {phone}
              </a>
              <a href={`mailto:${email}`} className="text-[13px] text-white/50 hover:text-white transition-colors duration-200">
                {email}
              </a>
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-2.5">
              {social?.linkedin && <SocialLink href={social.linkedin} label="LinkedIn"><LinkedInIcon /></SocialLink>}
              {social?.instagram && <SocialLink href={social.instagram} label="Instagram"><InstagramIcon /></SocialLink>}
              {social?.twitter && <SocialLink href={social.twitter} label="X / Twitter"><XIcon /></SocialLink>}
              {social?.facebook && <SocialLink href={social.facebook} label="Facebook"><FacebookIcon /></SocialLink>}
              {!social?.linkedin && !social?.instagram && !social?.twitter && !social?.facebook && (
                <>
                  <SocialLink href="#" label="LinkedIn"><LinkedInIcon /></SocialLink>
                  <SocialLink href="#" label="Instagram"><InstagramIcon /></SocialLink>
                  <SocialLink href="#" label="X"><XIcon /></SocialLink>
                </>
              )}
            </div>
          </div>

          <FooterColumn title={t.company}  links={colCompany} />
          <FooterColumn title={t.services} links={colServices} />
          <FooterColumn title={t.branches} links={colBranches} />
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="font-mono tracking-widest uppercase text-white/60">
            © {new Date().getFullYear()} Country Materials Ltd. {t.rights}
            <span className="text-white/20 mx-1.5" aria-hidden="true">·</span>
            Crafted by{' '}
            <a
              href="https://kshitijj.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              Kshitij Jha
            </a>
          </span>
          <div className="flex items-center gap-1.5 text-white/60">
            <Link
              href={to('/privacy-policy')}
              className="hover:text-white transition-colors duration-200"
            >
              {t.privacy}
            </Link>
            <span className="text-white/20" aria-hidden="true">·</span>
            <Link
              href={to('/terms')}
              className="hover:text-white transition-colors duration-200"
            >
              {t.terms}
            </Link>
            <span className="text-white/20" aria-hidden="true">·</span>
            <Link
              href={to('/cookies')}
              className="hover:text-white transition-colors duration-200"
            >
              {t.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 className="text-[10px] font-bold tracking-[0.22em] uppercase text-gold mb-5">{title}</h5>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[14px] text-white/45 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:text-gold hover:border-gold/40 transition-all duration-200 cursor-pointer"
    >
      {children}
    </a>
  )
}

function LinkedInIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
}

function InstagramIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none"/></svg>
}

function XIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
}

function FacebookIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
}
