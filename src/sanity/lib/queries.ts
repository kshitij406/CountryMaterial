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
    socialLinks
  }
`

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroHeading,
    heroSubheading,
    heroImages,
    introHeading,
    introBody,
    vision,
    mission,
    values,
    ctaHeading,
    ctaSubtext,
    ctaButtonText,
    featuredServices[]-> {
      _id,
      title,
      slug,
      excerpt,
      coverImage
    },
    partnerLogos
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
    images,
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

export const openCareersQuery = groq`
  *[_type == "career" && expired != true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    department,
    location,
    employmentType,
    description,
    requirements,
    closingDate,
    expired
  }
`
