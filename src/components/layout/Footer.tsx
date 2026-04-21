import Link from 'next/link'
import Image from 'next/image'

const divisions = [
  { label: 'Steel & Rebar',      href: '/services/steel' },
  { label: 'Hardware',           href: '/services/hardware' },
  { label: 'Waste Management',   href: '/services/waste-management' },
  { label: 'Logistics',          href: '/services/logistics' },
]

const company = [
  { label: 'About',      href: '/about' },
  { label: 'Leadership', href: '/about#leadership' },
  { label: 'Careers',    href: '/careers' },
  { label: 'Press',      href: '/news' },
]

const support = [
  { label: 'Tender Desk',    href: '/contact' },
  { label: 'Catalogue',      href: '/shop' },
  { label: 'Delivery',       href: '/services' },
  { label: 'Certifications', href: '/about' },
]

const yards = [
  { label: 'Dar es Salaam', href: '/contact' },
  { label: 'Arusha',        href: '/contact' },
  { label: 'Mwanza',        href: '/contact' },
  { label: 'Dodoma',        href: '/contact' },
]

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

export default function Footer({ contact }: { contact?: FooterContact }) {
  const phone = contact?.phone ?? '+255 768 500 555'
  const email = contact?.email ?? 'info@countrymaterial.com'
  const social = contact?.socialLinks

  return (
    <footer style={{ background: '#05101f', borderTop: '1px solid rgba(200,150,46,.2)' }}>
      {/* Main grid */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-20 pb-16">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-12"
          style={{ paddingBottom: 64, borderBottom: '1px solid rgba(200,150,46,.15)' }}
        >
          {/* Brand */}
          <div>
            <div className="mb-5">
              <Image
                src="/images/country-materials-logo.svg"
                alt="Country Materials Ltd"
                width={220}
                height={64}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="font-barlow text-[14px] text-cream/55 leading-[1.6] max-w-[320px] mt-5">
              Steel, hardware, waste and logistics for the infrastructure Africa is building. Founded Dar es Salaam, 1997.
            </p>
          </div>

          {/* Divisions */}
          <FooterColumn title="Divisions" links={divisions} />

          {/* Company */}
          <FooterColumn title="Company" links={company} />

          {/* Support */}
          <FooterColumn title="Support" links={support} />

          {/* Yards */}
          <FooterColumn title="Yards" links={yards} />
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 flex-wrap">
          <span className="font-space text-[11px] text-cream/40 tracking-[0.1em]">
            © 1997–{new Date().getFullYear()} COUNTRY MATERIALS LTD · TIN 102-447-991
          </span>

          {/* Social links */}
          <div className="flex gap-3">
            {social?.linkedin && (
              <SocialLink href={social.linkedin} label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v16H4zM6 0a2 2 0 110 4 2 2 0 010-4zM10 8h4v2a4 4 0 018 0v10h-4v-8a2 2 0 00-4 0v8h-4z" /></svg>
              </SocialLink>
            )}
            {social?.instagram && (
              <SocialLink href={social.instagram} label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" /></svg>
              </SocialLink>
            )}
            {social?.twitter && (
              <SocialLink href={social.twitter} label="X / Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3l8 9.5L3.5 21H6l6-6.5L17 21h4l-8.5-10L20 3h-2.5l-5.5 6L7 3z" /></svg>
              </SocialLink>
            )}
            {social?.facebook && (
              <SocialLink href={social.facebook} label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </SocialLink>
            )}
            {/* Fallback icons if no social links configured */}
            {!social?.linkedin && !social?.instagram && !social?.twitter && !social?.facebook && (
              <>
                <SocialLink href="#" label="LinkedIn"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v16H4zM6 0a2 2 0 110 4 2 2 0 010-4zM10 8h4v2a4 4 0 018 0v10h-4v-8a2 2 0 00-4 0v8h-4z" /></svg></SocialLink>
                <SocialLink href="#" label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" /></svg></SocialLink>
                <SocialLink href="#" label="X / Twitter"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3l8 9.5L3.5 21H6l6-6.5L17 21h4l-8.5-10L20 3h-2.5l-5.5 6L7 3z" /></svg></SocialLink>
              </>
            )}
          </div>

          {/* Contact quick links */}
          <div className="flex gap-6 font-condensed text-[12px] tracking-[0.15em] uppercase">
            <a href={`tel:${phone.replace(/[\s-]/g, '')}`} className="text-cream/40 hover:text-gold transition-colors duration-200">{phone}</a>
            <a href={`mailto:${email}`} className="text-cream/40 hover:text-gold transition-colors duration-200">{email}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 className="font-condensed text-[12px] tracking-[0.22em] uppercase text-gold mb-6">{title}</h5>
      <ul className="flex flex-col gap-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-barlow text-[15px] text-cream/65 hover:text-gold transition-colors duration-200"
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
      className="w-[38px] h-[38px] grid place-items-center text-gold transition-all duration-300 hover:bg-gold hover:text-navy"
      style={{ border: '1px solid rgba(200,150,46,.3)' }}
    >
      {children}
    </a>
  )
}
