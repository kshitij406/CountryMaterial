import groq from 'groq'

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
    socialLinks
  }
`

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroHeading,
    heroSubheading,
    heroVideo { asset-> { url } },
    "heroImageUrl": heroImage.asset->url,

    tickerItems,

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

    aboutHeading,
    aboutLead,
    aboutBody,
    founderInitials,
    founderName,
    founderRole,
    "aboutImageUrl": aboutImage.asset->url,
    processSteps,

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

    announcementTag,
    announcementHeading,
    announcementBody,
    "announcementImageUrl": announcementImage.asset->url,
    announcementCtaLabel,
    announcementCtaHref,

    contactHeading,
    contactEyebrow,
    contactPrimaryLabel,
    contactSecondaryLabel,
  }
`

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    excerpt,
    "coverImageUrl": coverImage.asset->url
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
    images,
    "heroImageUrl": heroImage.asset->url,
    processSteps[] {
      stepNumber,
      title,
      description,
      "imageUrl": image.asset->url
    }
  }
`

export const allServicesQuery = groq`
  *[_type == "service"] | order(displayOrder asc) {
    _id,
    title,
    slug,
    excerpt,
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
    hasVariants,
    grade,
    unit,
    standards,
    specSheet
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

export const careerBySlugQuery = groq`
  *[_type == "career" && slug.current == $slug][0] {
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

export const allCareerSlugsQuery = groq`
  *[_type == "career"] { "slug": slug.current }
`

export const legalPageQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0]{
    title, lastUpdated, body
  }
`

export const impactPageQuery = groq`
  *[_type == "impactPage"][0]{
    tonnesRecycled, reportingYear, manualOverrides,
    heroHeading, heroSubtitle, methodologyNote,
    impactStories, sdgGoals
  }
`
