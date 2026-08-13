import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/i18n/config'

/**
 * English is served unprefixed so URLs that are already indexed keep working:
 *   /about      -> rewritten internally to /en/about
 *   /sw/about   -> passes through to the [locale] segment as-is
 *   /en/about   -> redirected to /about so the two never both index
 *
 * ponytail: no Accept-Language sniffing. The toggle is explicit, which keeps
 * crawlers on the canonical English tree and avoids redirect loops. Add
 * cookie-based redirect only if returning-visitor stickiness is actually asked for.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const prefix = `/${defaultLocale}`
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.slice(prefix.length) || '/'
    return NextResponse.redirect(url, 308)
  }

  const alreadyLocalized = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )
  if (alreadyLocalized) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = `${prefix}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip API routes, the Sanity Studio, Next internals, and anything with a file
  // extension (robots.txt, sitemap.xml, /images/*).
  matcher: ['/((?!api|studio|_next|.*\\..*).*)'],
}
