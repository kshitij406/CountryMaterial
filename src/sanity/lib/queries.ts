import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    logo,
    phone,
    email,
    address,
    poBox,
    city,
    country,
    businessHours,
    shopPageTitle,
    shopPageSubtitle,
    socialLinks
  }
`

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroHeading,
    heroSubheading,
    heroVideo { asset-> { url } },

    tickerItems,

    featuredServices[]-> {
      _id,
      title,
      slug,
      excerpt,
      icon,
      displayOrder
    },

    aboutHeading,
    aboutLead,
    aboutBody,
    founderInitials,
    founderName,
    founderRole,

    stats,

    featuredProducts[]-> {
      _id,
      name,
      slug,
      price,
      priceRange,
      hasVariants,
      inStock,
      description,
      category-> { name },
      "images": images[]{ "asset": asset->{ url } }
    },

    partnerLogos[] {
      name,
      sub,
      "logoUrl": logo.asset->url
    },

    contactHeading,
    contactEyebrow,
    contactPrimaryLabel,
    contactSecondaryLabel,
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heading,
    intro,
    body,
    vision,
    mission,
    values,
    whyChooseUs,
    images
  }
`

export const allServicesQuery = groq`
  *[_type == "service"] | order(displayOrder asc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    displayOrder
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
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
    name,
    slug,
    price,
    priceRange,
    category-> { name, slug },
    "images": images[]{ "asset": asset->{ url } },
    description,
    inStock,
    hasVariants
  }
`

export const productCategoriesQuery = groq`
  *[_type == "productCategory"] | order(name asc) {
    _id,
    name,
    slug
  }
`

// Alias used by the shop page
export const allProductCategoriesQuery = productCategoriesQuery

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    publishedAt,
    author,
    excerpt,
    coverImage
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    author,
    excerpt,
    coverImage,
    body
  }
`

export const openCareersQuery = groq`
  *[_type == "career" && expired != true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    department,
    location,
    employmentType,
    description,
    requirements,
    closingDate,
    expired
  }
`
