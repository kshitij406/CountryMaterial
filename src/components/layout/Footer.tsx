import Link from 'next/link'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Online Shop', href: '/shop' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
]

const services = [
  { label: 'Transportation & Logistics', href: '/services/transportation' },
  { label: 'Hardware Materials', href: '/services/hardware' },
  { label: 'Waste Management', href: '/services/waste-management' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      {/* Main footer */}
      <div className="max-w-container mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col leading-none mb-5">
              <span className="font-heading text-white text-2xl">Country</span>
              <span className="font-heading text-gold text-2xl">Materials</span>
            </div>
            <p className="font-body text-sm leading-relaxed mb-6 max-w-xs">
              A leading provider of hardware materials, waste management solutions, and logistics
              services in Dar es Salaam, Tanzania.
            </p>
            <div className="flex gap-3">
              {/* Social icons — placeholder SVGs */}
              {['facebook', 'twitter', 'linkedin'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors duration-200"
                >
                  <span className="text-xs uppercase font-semibold">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-white text-lg mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm hover:text-gold hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    <span className="text-gold text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-white text-lg mb-5">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm hover:text-gold hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    <span className="text-gold text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-white text-lg mb-5">Get in Touch</h4>
            <address className="not-italic font-body text-sm space-y-3">
              <p className="leading-relaxed">
                Babecov Complex, Buguruni Mandela Road<br />
                P.O. Box 2140<br />
                Dar es Salaam, Tanzania
              </p>
              <p>
                <a href="tel:+255768500555" className="hover:text-gold transition-colors duration-200">
                  +255 768 500 555
                </a>
              </p>
              <p>
                <a href="mailto:info@countrymaterial.com" className="hover:text-gold transition-colors duration-200">
                  info@countrymaterial.com
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs">
            &copy; {new Date().getFullYear()} Country Materials Ltd. All rights reserved.
          </p>
          <p className="font-body text-xs">
            Dar es Salaam, Tanzania
          </p>
        </div>
      </div>
    </footer>
  )
}
