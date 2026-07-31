import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/animations/PageTransition'
import RevealObserver from '@/components/animations/RevealObserver'
import FloatingActions from '@/components/FloatingActions'
import { client, urlFor } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)

  const logoUrl = settings?.logo?.asset
    ? urlFor(settings.logo).width(240).auto('format').url()
    : undefined

  const contact = {
    address:     settings?.address,
    poBox:       settings?.poBox,
    city:        settings?.city,
    country:     settings?.country,
    phone:       settings?.phone,
    email:       settings?.email,
    socialLinks: settings?.socialLinks,
  }

  return (
    <>
      <RevealObserver />
      <Navbar logoUrl={logoUrl} companyName={settings?.companyName} />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer contact={contact} />
      <FloatingActions whatsapp={settings?.whatsapp} video={settings?.floatingVideo} />
    </>
  )
}
