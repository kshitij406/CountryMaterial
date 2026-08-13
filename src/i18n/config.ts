export const locales = ['en', 'sw'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/** BCP-47 tags for <html lang> and og:locale. */
export const htmlLang: Record<Locale, string> = { en: 'en-TZ', sw: 'sw-TZ' }
export const ogLocale: Record<Locale, string> = { en: 'en_TZ', sw: 'sw_TZ' }

export const localeNames: Record<Locale, string> = { en: 'English', sw: 'Kiswahili' }
export const localeShortNames: Record<Locale, string> = { en: 'EN', sw: 'SW' }

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

/**
 * Build an href for a locale. English is the default and stays unprefixed so
 * already-indexed URLs keep working; Kiswahili lives under /sw.
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return locale === defaultLocale ? clean || '/' : `/${locale}${clean}`
}

/**
 * Split a pathname into its locale and the unprefixed route.
 *
 * Strips the default locale too: English pages render at /en on the server but
 * are served unprefixed in the browser, so both must reduce to the same path or
 * active-link state differs between the prerender and the hydrated page.
 */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split('/')
  const maybeLocale = segments[1]
  if (isLocale(maybeLocale)) {
    const rest = segments.slice(2).join('/')
    return { locale: maybeLocale, path: rest ? `/${rest}` : '/' }
  }
  return { locale: defaultLocale, path: pathname || '/' }
}
