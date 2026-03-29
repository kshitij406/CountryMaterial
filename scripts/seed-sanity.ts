/**
 * Country Materials — Sanity Seed Script
 *
 * Populates the Sanity dataset with all initial content.
 * Safe to re-run — uses createOrReplace (idempotent).
 *
 * Usage:
 *   pnpm tsx scripts/seed-sanity.ts
 *
 * Requirements:
 *   pnpm add -D tsx   (if not already installed)
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ─── Document Definitions ────────────────────────────────────────────────────

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  companyName: 'Country Materials Ltd',
  phone: '+255 768 500 555',
  email: 'info@countrymaterial.com',
  address: 'Babecov Complex, Buguruni Mandela Road',
  poBox: '2140',
  city: 'Dar es Salaam',
  country: 'Tanzania',
  socialLinks: {},
}

const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heading: 'Building Stronger Foundations for Tanzania',
  intro:
    'A Dar es Salaam-based company committed to quality materials, responsible waste management, and reliable logistics.',
  vision:
    'Become a leading Steel Waste Management company in the region with presence across the country.',
  mission:
    'Bridge the gap between scrap informal vendors, steel manufacturers and constructors through a steel waste management company.',
  values: [
    { _key: 'val1', title: 'Quality Excellence', description: 'Uncompromising standards across every product and service we deliver.' },
    { _key: 'val2', title: 'Community & Environmental Responsibility', description: 'We measure success not just in profit, but in the positive impact we leave on communities and the environment.' },
    { _key: 'val3', title: 'Team Collaboration', description: 'Our strength lies in the collective effort of our team and the partnerships we build with clients and suppliers.' },
  ],
  whyChooseUs: [
    { _key: 'why1', icon: '◈', title: 'Quality Assurance', description: 'Every product we supply meets rigorous quality standards. We partner only with certified manufacturers and maintain strict sourcing criteria.' },
    { _key: 'why2', icon: '◉', title: 'Innovation', description: 'We continuously adopt modern practices — from waste-to-energy solutions to digital logistics management — to deliver smarter outcomes.' },
    { _key: 'why3', icon: '◎', title: 'Customer-Centric Approach', description: 'Our clients are partners. We listen, adapt, and go the extra mile to ensure every engagement exceeds expectations.' },
    { _key: 'why4', icon: '◆', title: 'Sustainability', description: 'Through responsible waste management and environmentally conscious operations, we are actively building a greener Tanzania.' },
  ],
}

const serviceTransportation = {
  _id: 'service-transportation',
  _type: 'service',
  title: 'Transportation & Logistics',
  slug: { _type: 'slug', current: 'transportation' },
  excerpt: 'End-to-end freight forwarding, warehousing, and last-mile distribution across Tanzania and the region.',
  displayOrder: 1,
  contentSections: [
    {
      _key: 'cs1',
      heading: 'Reliable Freight Solutions',
      body: [{ _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'Our transportation division provides reliable, efficient movement of goods across Tanzania. From bulk freight to time-sensitive deliveries, we offer a full spectrum of logistics services backed by an experienced team and a growing fleet.' }] }],
    },
    {
      _key: 'cs2',
      heading: 'Warehousing & Distribution',
      body: [{ _type: 'block', _key: 'b2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's2', marks: [], text: 'Our secure warehousing facilities in Dar es Salaam provide short and long-term storage for construction materials, steel products, and general cargo. We manage inventory tracking, palletization, and distribution coordination.' }] }],
    },
  ],
}

const serviceHardware = {
  _id: 'service-hardware',
  _type: 'service',
  title: 'Hardware & Steel Materials',
  slug: { _type: 'slug', current: 'hardware' },
  excerpt: 'Quality construction materials — color paints, hardware supplies, and high-tensile reinforcement bars.',
  displayOrder: 2,
  contentSections: [
    {
      _key: 'cs1',
      heading: 'Premium Construction Materials',
      body: [{ _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'We supply a comprehensive range of hardware materials for construction, industrial, and commercial projects. Our stock includes BS 500 high-tensile reinforcement bars, color paints, and essential hardware — all sourced from certified manufacturers and available at competitive prices.' }] }],
    },
    {
      _key: 'cs2',
      heading: 'BS 500 Steel Reinforcement',
      body: [{ _type: 'block', _key: 'b2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's2', marks: [], text: 'Our high-tensile deformed steel bars conform to British Standard BS 500, making them suitable for all structural reinforcement applications in residential, commercial, and civil construction projects across Tanzania.' }] }],
    },
  ],
}

const serviceWasteManagement = {
  _id: 'service-waste-management',
  _type: 'service',
  title: 'Waste Management',
  slug: { _type: 'slug', current: 'waste-management' },
  excerpt: 'Comprehensive scrap collection, sorting, recycling, and waste-to-energy services for industry and communities.',
  displayOrder: 3,
  contentSections: [
    {
      _key: 'cs1',
      heading: 'Industrial Scrap Collection',
      body: [{ _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'Our waste management division handles collection, sorting, recycling, and waste-to-energy processing. We bridge the gap between informal scrap vendors, industrial generators, and recycling facilities — creating an efficient, transparent, and environmentally responsible value chain for steel and industrial waste in Tanzania.' }] }],
    },
    {
      _key: 'cs2',
      heading: 'Recycling & Waste-to-Energy',
      body: [{ _type: 'block', _key: 'b2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's2', marks: [], text: 'We process collected waste through modern sorting, recycling, and where appropriate, conversion to energy. Our waste-to-energy programme is designed to reduce landfill burden and generate value from materials that would otherwise be discarded.' }] }],
    },
  ],
}

const categoryBuildingMaterials = {
  _id: 'productCategory-building-materials',
  _type: 'productCategory',
  name: 'Building Materials',
  slug: { _type: 'slug', current: 'building-materials' },
}

const categorySteelMetals = {
  _id: 'productCategory-steel-metals',
  _type: 'productCategory',
  name: 'Steel & Metals',
  slug: { _type: 'slug', current: 'steel-metals' },
}

const productGypsumBoard = {
  _id: 'product-gypsum-board',
  _type: 'product',
  name: 'Gypsum Board',
  slug: { _type: 'slug', current: 'gypsum-board' },
  price: 13000,
  hasVariants: false,
  inStock: true,
  description: 'Standard gypsum wallboard for interior partitions, ceilings, and dry-wall systems. Available in standard sheet sizes.',
  category: { _type: 'reference', _ref: 'productCategory-building-materials' },
}

const productMarineBoard = {
  _id: 'product-marine-board',
  _type: 'product',
  name: 'Marine Board',
  slug: { _type: 'slug', current: 'marine-board' },
  price: 38000,
  hasVariants: false,
  inStock: true,
  description: 'High-grade marine plywood engineered for moisture resistance. Ideal for formwork, flooring, and demanding construction environments.',
  category: { _type: 'reference', _ref: 'productCategory-building-materials' },
}

const productRebarBS500 = {
  _id: 'product-rebar-bs500',
  _type: 'product',
  name: 'High Tensile Reinforcement Bars BS 500',
  slug: { _type: 'slug', current: 'rebar-bs500' },
  hasVariants: true,
  priceRange: '11,666 – 120,000',
  inStock: true,
  description: 'British Standard BS 500 compliant high-tensile deformed steel bars for structural reinforcement. Available in multiple diameters from 6mm to 32mm.',
  category: { _type: 'reference', _ref: 'productCategory-steel-metals' },
}

const careerLogistics = {
  _id: 'career-logistics-coordinator',
  _type: 'career',
  title: 'Logistics Coordinator',
  slug: { _type: 'slug', current: 'logistics-coordinator' },
  department: 'Transportation',
  location: 'Dar es Salaam',
  employmentType: 'full-time',
  requirements: [
    'Diploma or degree in Logistics, Supply Chain, or related field',
    'Minimum 2 years experience in logistics or freight forwarding',
    'Strong organizational and communication skills',
    'Proficiency in Microsoft Office Suite',
    'Valid driving licence preferred',
  ],
  description: [{ _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'We are looking for a detail-oriented Logistics Coordinator to join our transportation team. You will be responsible for coordinating freight movements, managing driver schedules, and ensuring on-time delivery of materials across Dar es Salaam.' }] }],
  closingDate: '2026-04-30',
  expired: false,
}

const careerWasteSupervisor = {
  _id: 'career-waste-supervisor',
  _type: 'career',
  title: 'Waste Collection Supervisor',
  slug: { _type: 'slug', current: 'waste-collection-supervisor' },
  department: 'Waste Management',
  location: 'Dar es Salaam',
  employmentType: 'full-time',
  requirements: [
    'Certificate or diploma in Environmental Science, Public Health, or related field',
    'Experience supervising field teams',
    'Knowledge of waste management regulations in Tanzania',
    'Physical fitness and willingness to work outdoors',
    'Leadership skills and ability to manage a team of 5–10',
  ],
  description: [{ _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'We are seeking an experienced Waste Collection Supervisor to oversee our field collection teams. You will manage daily route planning, ensure compliance with health and safety regulations, and maintain quality control across all collection activities.' }] }],
  closingDate: '2026-04-15',
  expired: false,
}

const homepage = {
  _id: 'homepage',
  _type: 'homepage',
  heroHeading: "Building Tanzania's Industrial Future",
  heroSubheading: 'Premium hardware materials, waste management, and logistics solutions for a growing nation.',
  introHeading: "Tanzania's Trusted Partner in Industrial Solutions",
  introBody: 'Country Materials Ltd is a Dar es Salaam-based company dedicated to bridging the gap between scrap informal vendors, steel manufacturers, and constructors. We operate across hardware supply, waste management, and transportation — serving businesses and communities with reliability and purpose.',
  vision: 'Become a leading Steel Waste Management company in the region with presence across the country.',
  mission: 'Bridge the gap between scrap informal vendors, steel manufacturers and constructors through a steel waste management company.',
  values: [
    { _key: 'val1', icon: '◈', title: 'Quality Excellence', description: 'We source and supply materials that meet rigorous standards, ensuring every project is built to last.' },
    { _key: 'val2', icon: '◉', title: 'Community & Environmental Responsibility', description: 'Our waste management work actively reduces industrial pollution and supports sustainable development in Tanzania.' },
    { _key: 'val3', icon: '◎', title: 'Team Collaboration', description: 'We operate as a unified team with partners, suppliers, and clients to deliver seamless, reliable outcomes.' },
  ],
  ctaHeading: 'Ready to Work With Us?',
  ctaSubtext: 'Whether you need construction materials, waste management services, or reliable logistics — we are here to deliver.',
  ctaButtonText: 'Contact Us Today',
  featuredServices: [
    { _type: 'reference', _key: 'fs1', _ref: 'service-transportation' },
    { _type: 'reference', _key: 'fs2', _ref: 'service-hardware' },
    { _type: 'reference', _key: 'fs3', _ref: 'service-waste-management' },
  ],
  partnerLogos: [
    { _key: 'p1', name: 'Lake Steel' },
    { _key: 'p2', name: 'Kamal Steel' },
    { _key: 'p3', name: 'Lodhia' },
    { _key: 'p4', name: 'Steelmast' },
    { _key: 'p5', name: 'Metro Group' },
    { _key: 'p6', name: 'Sita Steel' },
  ],
}

// ─── Seed Runner ─────────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Seeding Country Materials Sanity dataset...\n')

  // Order matters: base documents first, then documents that reference them
  const batches = [
    // Batch 1: no cross-references
    [siteSettings, aboutPage, serviceTransportation, serviceHardware, serviceWasteManagement, categoryBuildingMaterials, categorySteelMetals],
    // Batch 2: references batch 1
    [productGypsumBoard, productMarineBoard, productRebarBS500, careerLogistics, careerWasteSupervisor, homepage],
  ]

  for (const [batchIndex, batch] of batches.entries()) {
    console.log(`📦 Batch ${batchIndex + 1} (${batch.length} documents)...`)

    const transaction = client.transaction()
    for (const doc of batch) {
      transaction.createOrReplace(doc as any)
    }

    try {
      await transaction.commit({ visibility: 'async' })
      console.log(`   ✅ Created/replaced ${batch.length} documents`)
    } catch (err: any) {
      console.error(`   ❌ Batch ${batchIndex + 1} failed:`, err.message)
      process.exit(1)
    }
  }

  console.log('\n✨ Seed complete!')
  console.log('   → Visit /studio to review and edit content')
  console.log('   → Visit / to see the live site with seeded data\n')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
