import groq from 'groq'
import { client } from './client'

/**
 * Kiswahili is stored inline: every translatable field has a `<field>Sw`
 * sibling in the same document. Queries take a $locale param and return the
 * Kiswahili value only when the locale is 'sw' AND the sibling is filled in,
 * so a blank Sw field falls back to English automatically.
 *
 * `L('heroHeading')` emits:
 *   "heroHeading": select($locale == "sw" && defined(heroHeadingSw) => heroHeadingSw, heroHeading)
 */
const L = (field: string) =>
  `"${field}": select($locale == "sw" && defined(${field}Sw) => ${field}Sw, ${field})`

const trTitle       = L('title')
const trName        = L('name')
const trExcerpt     = L('excerpt')
const trDescription = L('description')
const trBody        = L('body')
const trField       = L

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    founded,
    logo,
    phone,
    email,
    whatsapp,
    address,
    poBox,
    city,
    country,
    regions,
    businessHours,
    shopPageTitle,
    shopPageSubtitle,
    socialLinks,
    floatingVideo {
      "videoUrl": video.asset->url,
      label
    },
    erpIntegration {
      catalogUrl,
      catalogLabel,
      erpApiEnabled,
      erpLastSyncedAt
    }
  }
`

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    ${trField('heroHeading')},
    ${trField('heroSubheading')},
    heroVideo { asset-> { url } },
    "heroImageUrl": heroImage.asset->url,

    tickerItems[] { num, ${L('label')} },

    featuredServices[]-> {
      _id,
      title,
      slug,
      excerpt,
      icon,
      displayOrder,
      "cardImageUrl": cardImage.asset->url,
      specChips
    },

    ${trField('aboutHeading')},
    ${trField('aboutLead')},
    ${trField('aboutBody')},
    founderInitials,
    founderName,
    ${trField('founderRole')},
    "aboutImageUrl": aboutImage.asset->url,
    processSteps[] { ${L('label')}, ${L('note')} },

    stats[] { count, suffix, ${L('label')}, ${L('sub')} },

    featuredProducts[]-> {
      _id,
      name,
      slug,
      price,
      priceRange,
      hasVariants,
      inStock,
      description,
      grade,
      unit,
      standards,
      specSheet,
      category-> { name },
      "images": images[]{ "asset": asset->{ url } }
    },

    partnerLogos[] {
      name,
      sub,
      "logoUrl": logo.asset->url
    },
    becomeVendorHref,

    ${trField('announcementTag')},
    ${trField('announcementHeading')},
    ${trField('announcementBody')},
    "announcementImageUrl": announcementImage.asset->url,
    ${trField('announcementCtaLabel')},
    announcementCtaHref,

    ${trField('contactHeading')},
    ${trField('contactEyebrow')},
    ${trField('contactPrimaryLabel')},
    ${trField('contactSecondaryLabel')},
  }
`

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    ${trTitle},
    slug,
    category,
    publishedAt,
    ${trExcerpt},
    "coverImageUrl": coverImage.asset->url
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    ${trField('heading')},
    ${trField('intro')},
    ${trField('body')},
    ${trField('vision')},
    ${trField('mission')},
    values[] { icon, ${L('title')}, ${L('description')} },
    whyChooseUs[] { icon, ${L('title')}, ${L('description')} },
    images,
    "heroImageUrl": heroImage.asset->url,
    processSteps[] {
      stepNumber,
      ${L('title')},
      ${L('description')},
      "imageUrl": image.asset->url
    }
  }
`

export const allServicesQuery = groq`
  *[_type == "service"] | order(displayOrder asc) {
    _id,
    ${trTitle},
    slug,
    ${trExcerpt},
    icon,
    coverImage,
    displayOrder,
    "cardImageUrl": cardImage.asset->url,
    specChips
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    ${trTitle},
    slug,
    ${trExcerpt},
    coverImage,
    contentSections,
    features,
    highlights,
    displayOrder
  }
`

export const allProductsQuery = groq`
  *[_type == "product"] | order(_createdAt asc) {
    _id,
    ${trName},
    slug,
    price,
    priceRange,
    category-> { ${trName}, slug },
    "images": images[]{ "asset": asset->{ url } },
    ${trDescription},
    inStock,
    hasVariants,
    grade,
    unit,
    standards,
    specSheet
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    ${trName},
    slug,
    price,
    priceRange,
    category-> { ${trName}, slug },
    "images": images[]{ "asset": asset->{ url } },
    ${trDescription},
    inStock,
    hasVariants,
    grade,
    unit,
    standards,
    specSheet
  }
`

export const allProductSlugsQuery = groq`
  *[_type == "product"] { "slug": slug.current }
`

export const productCategoriesQuery = groq`
  *[_type == "productCategory"] | order(name asc) {
    _id,
    ${trName},
    slug
  }
`

// Alias used by the shop page
export const allProductCategoriesQuery = productCategoriesQuery

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    ${trTitle},
    slug,
    category,
    publishedAt,
    author,
    ${trExcerpt},
    coverImage
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    ${trTitle},
    slug,
    category,
    publishedAt,
    author,
    ${trExcerpt},
    coverImage,
    ${trBody}
  }
`

export const openCareersQuery = groq`
  *[_type == "career" && expired != true] | order(_createdAt desc) {
    _id,
    ${trTitle},
    slug,
    ${trExcerpt},
    department,
    location,
    employmentType,
    ${trDescription},
    requirements,
    closingDate,
    expired
  }
`

export const careerBySlugQuery = groq`
  *[_type == "career" && slug.current == $slug][0] {
    _id,
    ${trTitle},
    slug,
    ${trExcerpt},
    department,
    location,
    employmentType,
    ${trDescription},
    requirements,
    closingDate,
    expired
  }
`

export const allCareerSlugsQuery = groq`
  *[_type == "career"] { "slug": slug.current }
`

export const legalPageQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0]{
    ${trTitle}, lastUpdated, ${trBody}
  }
`

export const impactPageQuery = groq`
  *[_type == "impactPage"][0]{
    tonnesRecycled, reportingYear, manualOverrides,
    ${trField('heroHeading')},
    ${trField('heroSubtitle')},
    ${trField('methodologyNote')},
    impactStories[] { _key, stat, icon, ${L('label')}, ${L('description')} },
    sdgGoals
  }
`

// ── Tagged fetch helpers (Next.js App Router cache tagging) ───────────────────

export function getSiteSettings(locale: string = 'en') {
  return client.fetch(siteSettingsQuery, { locale }, { next: { tags: ['siteSettings'] } })
}

export function getProducts(locale: string = 'en') {
  return client.fetch(allProductsQuery, { locale }, { next: { tags: ['products'] } })
}

export function getProductCategories(locale: string = 'en') {
  return client.fetch(productCategoriesQuery, { locale }, { next: { tags: ['products'] } })
}
