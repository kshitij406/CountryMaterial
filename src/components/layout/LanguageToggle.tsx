'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  localeNames,
  localeShortNames,
  localePath,
  locales,
  stripLocale,
  type Locale,
} from '@/i18n/config'
import { cn } from '@/lib/utils'

/**
 * Links to the current route in the other language. usePathname returns the
 * browser URL, which stays unprefixed for English because middleware rewrites
 * rather than redirects — so stripLocale gives the shared route either way.
 */
export default function LanguageToggle({
  locale,
  label,
  className,
  variant = 'compact',
}: {
  locale: Locale
  label: string
  className?: string
  variant?: 'compact' | 'full'
}) {
  const pathname = usePathname() ?? '/'
  const { path } = stripLocale(pathname)

  return (
    <div className={cn('flex items-center', className)} role="group" aria-label={label}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && (
            <span className="text-white/20 mx-1.5" aria-hidden="true">
              /
            </span>
          )}
          <Link
            href={localePath(l, path)}
            hrefLang={l}
            aria-current={l === locale ? 'true' : undefined}
            className={cn(
              'font-semibold tracking-wide transition-colors duration-200 cursor-pointer',
              variant === 'full' ? 'text-[15px]' : 'text-[12px]',
              l === locale ? 'text-gold-light' : 'text-white/50 hover:text-white'
            )}
          >
            {variant === 'full' ? localeNames[l] : localeShortNames[l]}
          </Link>
        </span>
      ))}
    </div>
  )
}
