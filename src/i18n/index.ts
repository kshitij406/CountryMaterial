import { en, type Dictionary } from './dictionaries/en'
import { sw } from './dictionaries/sw'
import { defaultLocale, type Locale } from './config'

const dictionaries: Record<Locale, Dictionary> = { en, sw }

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}

export type { Dictionary }
export * from './config'
