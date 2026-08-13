/**
 * The Studio is its own root layout: it sits outside the [locale] tree so the
 * CMS is never localized and never loads the site fonts or globals.
 */
export const metadata = {
  title: 'Studio | Country Materials Ltd',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
