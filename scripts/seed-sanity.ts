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
 *   SANITY_API_TOKEN must be set in .env.local with write access.
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function block(key: string, text: string) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, marks: [], text }],
  }
}

// ─── Site Settings ────────────────────────────────────────────────────────────

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  companyName: 'Country Materials Ltd',
  phone: '+255 768 500 555',
  email: 'info@countrymaterials.co.tz',
  address: 'Babecov Complex, Buguruni Mandela Road',
  poBox: '2140',
  city: 'Dar es Salaam',
  country: 'Tanzania',
  businessHours: 'Monday – Friday: 8:00 AM – 5:00 PM\nSaturday: 8:00 AM – 1:00 PM',
  shopPageTitle: 'Quality Materials\nfrom Country Materials',
  shopPageSubtitle: 'Browse our full range of construction materials, steel products, and hardware supplies. All prices in Tanzanian Shillings.',
  socialLinks: {
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
  },
}

// ─── About Page ───────────────────────────────────────────────────────────────

const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heading: 'Building Stronger Foundations for Tanzania',
  intro: 'A Dar es Salaam-based company committed to quality materials, responsible waste management, and reliable logistics since 1997.',
  vision: 'Become the leading integrated steel, hardware, and waste management company in East Africa — with a presence in every major Tanzanian city and growing operations across the region.',
  mission: 'Bridge the gap between scrap informal vendors, steel manufacturers, and constructors through a professional, transparent, and environmentally responsible service model.',
  body: [
    block('b1', 'Country Materials Ltd was established to bridge a critical gap in Tanzania\'s industrial landscape — connecting scrap informal vendors, steel manufacturers, and constructors through a unified, professional service model.'),
    block('b2', 'Headquartered at Babecov Complex on Buguruni Mandela Road in Dar es Salaam, we operate across three complementary business lines: hardware supply, waste management, and transportation logistics.'),
    block('b3', 'Our partnerships with Tanzania\'s leading steel companies — Lake Steel, Kamal Steel, Steelmast, and others — reflect the trust the industry places in our ability to deliver consistently and professionally across more than two decades.'),
  ],
  values: [
    { _key: 'val1', title: 'Quality Excellence', description: 'Uncompromising standards across every product and service we deliver. We source only from certified manufacturers and hold every shipment to the same high bar.' },
    { _key: 'val2', title: 'Environmental Responsibility', description: 'We measure success not just in profit, but in the positive impact we leave on communities and the environment. Sustainable operations are core to how we work.' },
    { _key: 'val3', title: 'Team Collaboration', description: 'Our strength lies in the collective effort of our team and the partnerships we build with clients and suppliers. Every relationship is built on trust and transparency.' },
  ],
  whyChooseUs: [
    { _key: 'why1', title: 'Quality Assurance', description: 'Every product we supply meets rigorous quality standards. We partner only with certified manufacturers and maintain strict sourcing criteria across our entire product range.' },
    { _key: 'why2', title: 'Innovation', description: 'We continuously adopt modern practices — from waste-to-energy solutions to digital logistics management — to deliver smarter, more efficient outcomes for our clients.' },
    { _key: 'why3', title: 'Customer-Centric Approach', description: 'Our clients are partners. We listen, adapt, and go the extra mile to ensure every engagement exceeds expectations. Long-term relationships are our standard.' },
    { _key: 'why4', title: 'Sustainability', description: 'Through responsible waste management and environmentally conscious operations, we are actively building a greener Tanzania — one project at a time.' },
  ],
}

// ─── Services ─────────────────────────────────────────────────────────────────

const serviceTransportation = {
  _id: 'service-transportation',
  _type: 'service',
  title: 'Transportation & Logistics',
  slug: { _type: 'slug', current: 'transportation' },
  excerpt: 'End-to-end freight forwarding, warehousing, and last-mile distribution across Tanzania and the region.',
  icon: 'logistics',
  displayOrder: 1,
  features: [
    'Freight forwarding — domestic and regional',
    'Warehousing and storage solutions',
    'Last-mile delivery across Dar es Salaam',
    'Heavy-load transportation for construction materials',
    'Supply chain coordination and tracking',
    'Cross-border logistics support to Uganda, Rwanda, and DRC',
  ],
  highlights: [
    { _key: 'h1', stat: '100+', label: 'Deliveries Per Month' },
    { _key: 'h2', stat: '10+', label: 'Routes Covered' },
    { _key: 'h3', stat: '99%', label: 'On-Time Rate' },
  ],
  contentSections: [
    {
      _key: 'cs1',
      heading: 'Reliable Freight Solutions',
      body: [block('b1', 'Our transportation division provides reliable, efficient movement of goods across Tanzania. From bulk freight to time-sensitive deliveries, we offer a full spectrum of logistics services backed by an experienced team and a growing fleet.')],
    },
    {
      _key: 'cs2',
      heading: 'Warehousing & Distribution',
      body: [block('b2', 'Our secure warehousing facilities in Dar es Salaam provide short and long-term storage for construction materials, steel products, and general cargo. We manage inventory tracking, palletization, and distribution coordination.')],
    },
  ],
}

const serviceHardware = {
  _id: 'service-hardware',
  _type: 'service',
  title: 'Hardware & Steel Materials',
  slug: { _type: 'slug', current: 'hardware' },
  excerpt: 'Quality construction materials — color paints, hardware supplies, and high-tensile reinforcement bars sourced from certified manufacturers.',
  icon: 'steel',
  displayOrder: 2,
  features: [
    'High Tensile Reinforcement Bars — BS 500 compliant',
    'Color paints — interior and exterior grades',
    'Gypsum boards and ceiling materials',
    'Marine plywood and timber products',
    'General hardware supplies and fasteners',
    'Bulk and project-quantity procurement',
  ],
  highlights: [
    { _key: 'h1', stat: '50+', label: 'Products Stocked' },
    { _key: 'h2', stat: '6+', label: 'Partner Manufacturers' },
    { _key: 'h3', stat: 'BS 500', label: 'Steel Standard' },
  ],
  contentSections: [
    {
      _key: 'cs1',
      heading: 'Premium Construction Materials',
      body: [block('b1', 'We supply a comprehensive range of hardware materials for construction, industrial, and commercial projects. Our stock includes BS 500 high-tensile reinforcement bars, color paints, and essential hardware — all sourced from certified manufacturers and available at competitive prices.')],
    },
    {
      _key: 'cs2',
      heading: 'BS 500 Steel Reinforcement',
      body: [block('b2', 'Our high-tensile deformed steel bars conform to British Standard BS 500, making them suitable for all structural reinforcement applications in residential, commercial, and civil construction projects across Tanzania.')],
    },
  ],
}

const serviceWasteManagement = {
  _id: 'service-waste-management',
  _type: 'service',
  title: 'Waste Management',
  slug: { _type: 'slug', current: 'waste-management' },
  excerpt: 'Comprehensive scrap collection, sorting, recycling, and waste-to-energy services for industry and communities across Tanzania.',
  icon: 'waste',
  displayOrder: 3,
  features: [
    'Scrap metal collection and aggregation',
    'Industrial waste sorting and processing',
    'Steel recycling and material recovery',
    'Waste-to-energy program development',
    'Community waste collection partnerships',
    'Compliance documentation and environmental reporting',
  ],
  highlights: [
    { _key: 'h1', stat: '5,000+', label: 'Tonnes Processed / yr' },
    { _key: 'h2', stat: 'Zero', label: 'Waste-to-Landfill Goal' },
    { _key: 'h3', stat: 'CO₂', label: 'Reduction Focus' },
  ],
  contentSections: [
    {
      _key: 'cs1',
      heading: 'Industrial Scrap Collection',
      body: [block('b1', 'Our waste management division handles collection, sorting, recycling, and waste-to-energy processing. We bridge the gap between informal scrap vendors, industrial generators, and recycling facilities — creating an efficient, transparent, and environmentally responsible value chain for steel and industrial waste in Tanzania.')],
    },
    {
      _key: 'cs2',
      heading: 'Recycling & Waste-to-Energy',
      body: [block('b2', 'We process collected waste through modern sorting, recycling, and where appropriate, conversion to energy. Our waste-to-energy programme is designed to reduce landfill burden and generate value from materials that would otherwise be discarded — supporting a circular economy in Tanzania.')],
    },
  ],
}

// ─── Product Categories ───────────────────────────────────────────────────────

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

const categoryPaints = {
  _id: 'productCategory-paints',
  _type: 'productCategory',
  name: 'Paints & Coatings',
  slug: { _type: 'slug', current: 'paints-coatings' },
}

// ─── Products ─────────────────────────────────────────────────────────────────

const productGypsumBoard = {
  _id: 'product-gypsum-board',
  _type: 'product',
  name: 'Gypsum Board',
  slug: { _type: 'slug', current: 'gypsum-board' },
  price: 13000,
  hasVariants: false,
  inStock: true,
  description: 'Standard gypsum wallboard for interior partitions, ceilings, and dry-wall systems. Available in standard sheet sizes (2400×1200mm, 9.5mm thick).',
  category: { _type: 'reference', _ref: 'productCategory-building-materials' },
}

const productMarineBoard = {
  _id: 'product-marine-board',
  _type: 'product',
  name: 'Marine Plywood Board',
  slug: { _type: 'slug', current: 'marine-board' },
  price: 38000,
  hasVariants: false,
  inStock: true,
  description: 'High-grade marine plywood engineered for moisture resistance. Ideal for formwork, flooring, and demanding construction environments. Available in 4×8 ft sheets.',
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
  description: 'British Standard BS 500 compliant high-tensile deformed steel bars for structural reinforcement. Available in diameters: 6mm, 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm.',
  category: { _type: 'reference', _ref: 'productCategory-steel-metals' },
}

const productMildSteel = {
  _id: 'product-mild-steel-bars',
  _type: 'product',
  name: 'Mild Steel Round Bars',
  slug: { _type: 'slug', current: 'mild-steel-bars' },
  hasVariants: true,
  priceRange: '8,000 – 95,000',
  inStock: true,
  description: 'Mild steel round bars suitable for general fabrication, construction, and light structural applications. Multiple diameters available from 6mm to 40mm.',
  category: { _type: 'reference', _ref: 'productCategory-steel-metals' },
}

const productColorPaint = {
  _id: 'product-color-paint',
  _type: 'product',
  name: 'Interior & Exterior Color Paint',
  slug: { _type: 'slug', current: 'color-paint' },
  price: 45000,
  hasVariants: false,
  inStock: true,
  description: 'Premium quality interior and exterior wall paint. Excellent coverage, weather resistance, and colour retention. Available in a wide range of colours. Price per 4-litre tin.',
  category: { _type: 'reference', _ref: 'productCategory-paints' },
}

const productCeilingBoard = {
  _id: 'product-ceiling-board',
  _type: 'product',
  name: 'PVC Ceiling Boards',
  slug: { _type: 'slug', current: 'ceiling-board' },
  price: 18500,
  hasVariants: false,
  inStock: true,
  description: 'Lightweight PVC ceiling boards suitable for residential and commercial interiors. Moisture-resistant, easy to install, and available in standard white finish. Price per panel.',
  category: { _type: 'reference', _ref: 'productCategory-building-materials' },
}

// ─── Careers ──────────────────────────────────────────────────────────────────

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
  description: [block('b1', 'We are looking for a detail-oriented Logistics Coordinator to join our transportation team. You will be responsible for coordinating freight movements, managing driver schedules, and ensuring on-time delivery of construction materials and steel products across Dar es Salaam and the wider Tanzania region.')],
  closingDate: '2026-05-30',
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
    'Minimum 2 years experience supervising field teams',
    'Knowledge of waste management regulations in Tanzania',
    'Physical fitness and willingness to work outdoors',
    'Strong leadership skills — ability to manage a team of 5–10 staff',
  ],
  description: [block('b1', 'We are seeking an experienced Waste Collection Supervisor to oversee our field collection teams across Dar es Salaam. You will manage daily route planning, ensure compliance with health and safety regulations, coordinate with industrial clients, and maintain quality control across all collection activities.')],
  closingDate: '2026-05-15',
  expired: false,
}

const careerSalesExecutive = {
  _id: 'career-sales-executive',
  _type: 'career',
  title: 'Sales Executive — Steel & Hardware',
  slug: { _type: 'slug', current: 'sales-executive-steel' },
  department: 'Sales',
  location: 'Dar es Salaam',
  employmentType: 'full-time',
  requirements: [
    'Diploma or degree in Sales, Business, or Engineering',
    'Minimum 3 years experience in B2B or construction materials sales',
    'Existing network of contractors, developers, or construction companies preferred',
    'Strong negotiation and closing skills',
    'Proficiency in Swahili and English — spoken and written',
  ],
  description: [block('b1', 'We are growing our sales team and looking for a driven Sales Executive to manage and grow accounts in the construction and contracting sector. You will be responsible for prospecting new clients, managing existing relationships, preparing quotations, and meeting monthly revenue targets across our steel and hardware product lines.')],
  closingDate: '2026-06-01',
  expired: false,
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

const homepage = {
  _id: 'homepage',
  _type: 'homepage',

  // Hero
  heroHeading: 'Built for Africa.\nBuilt to Last.',
  heroSubheading: 'Premium steel, hardware, waste management, and logistics solutions for Tanzania\'s growing infrastructure.',

  // Ticker
  tickerItems: [
    { _key: 't1', num: '50,000+', label: 'Tonnes / yr' },
    { _key: 't2', num: '1,200+', label: 'Active Clients' },
    { _key: 't3', num: '29', label: 'Years Operating' },
    { _key: 't4', num: '14', label: 'Cities Served' },
    { _key: 't5', num: 'BS 500', label: 'Steel Standard' },
    { _key: 't6', num: 'ISO', label: 'Certified Quality' },
    { _key: 't7', num: '3', label: 'Service Divisions' },
    { _key: 't8', num: '1997', label: 'Founded' },
  ],

  // Featured services (references)
  featuredServices: [
    { _type: 'reference', _key: 'fs1', _ref: 'service-transportation' },
    { _type: 'reference', _key: 'fs2', _ref: 'service-hardware' },
    { _type: 'reference', _key: 'fs3', _ref: 'service-waste-management' },
  ],

  // About strip
  aboutHeading: 'Three decades.\nOne standard.',
  aboutLead: 'Founded in Dar es Salaam in 1997, Country Materials Ltd has spent over two decades building the infrastructure that builds Tanzania. We are a vertically integrated operation — steel, hardware, waste, and logistics — under one trusted name.',
  aboutBody: 'Our partnerships with Tanzania\'s leading steel manufacturers, government contractors, and development organisations reflect the trust that comes from 29 years of consistent, professional delivery. We do not chase trends — we build legacies.',
  founderInitials: 'HM',
  founderName: 'Hamisi Mwangi',
  founderRole: 'Founder & Chairman',

  // Stats
  stats: [
    { _key: 's1', count: 29,    suffix: '',  label: 'Years in Operation', sub: 'Since 1997, under one family stewardship.' },
    { _key: 's2', count: 50000, suffix: '+', label: 'Tonnes Delivered',   sub: 'Of certified steel, annually, across the region.' },
    { _key: 's3', count: 1200,  suffix: '+', label: 'Active Clients',     sub: 'Contractors, ministries, mines, and developers.' },
    { _key: 's4', count: 14,    suffix: '',  label: 'Cities Served',      sub: 'Across Tanzania, Zambia, DRC, and Rwanda.' },
  ],

  // Featured products (references)
  featuredProducts: [
    { _type: 'reference', _key: 'fp1', _ref: 'product-rebar-bs500' },
    { _type: 'reference', _key: 'fp2', _ref: 'product-mild-steel-bars' },
    { _type: 'reference', _key: 'fp3', _ref: 'product-gypsum-board' },
    { _type: 'reference', _key: 'fp4', _ref: 'product-marine-board' },
    { _type: 'reference', _key: 'fp5', _ref: 'product-color-paint' },
    { _type: 'reference', _key: 'fp6', _ref: 'product-ceiling-board' },
  ],

  // Partner logos
  partnerLogos: [
    { _key: 'p1',  name: 'CRJE',          sub: 'East Africa' },
    { _key: 'p2',  name: 'SHELTER AFRIQUE', sub: 'Finance' },
    { _key: 'p3',  name: 'TAZARA',        sub: 'Rail' },
    { _key: 'p4',  name: 'GEITA GOLD',    sub: 'Mining' },
    { _key: 'p5',  name: 'TANROADS',      sub: 'Infrastructure' },
    { _key: 'p6',  name: 'AZANIA BANK',   sub: 'Banking' },
    { _key: 'p7',  name: 'CHINA RAILWAY', sub: 'Engineering' },
    { _key: 'p8',  name: 'DANGOTE',       sub: 'Cement' },
    { _key: 'p9',  name: 'TPDC',          sub: 'Energy' },
    { _key: 'p10', name: 'NAT. HOUSING',  sub: 'Development' },
    { _key: 'p11', name: 'SUMATRA',       sub: 'Logistics' },
    { _key: 'p12', name: 'LAKE STEEL',    sub: 'Manufacturing' },
  ],

  // Contact CTA
  contactHeading: 'Price your\nproject.',
  contactEyebrow: 'Speak to us',
  contactPrimaryLabel: 'Request a Quote',
  contactSecondaryLabel: 'Visit a Yard',
}

// ─── Seed Runner ─────────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Seeding Country Materials Sanity dataset...\n')

  // Order matters: base documents first, then references
  const batches = [
    {
      label: 'Site Settings & About Page',
      docs: [siteSettings, aboutPage],
    },
    {
      label: 'Services (3)',
      docs: [serviceTransportation, serviceHardware, serviceWasteManagement],
    },
    {
      label: 'Product Categories (3)',
      docs: [categoryBuildingMaterials, categorySteelMetals, categoryPaints],
    },
    {
      label: 'Products (6)',
      docs: [productGypsumBoard, productMarineBoard, productRebarBS500, productMildSteel, productColorPaint, productCeilingBoard],
    },
    {
      label: 'Careers (3)',
      docs: [careerLogistics, careerWasteSupervisor, careerSalesExecutive],
    },
    {
      label: 'Homepage (all fields)',
      docs: [homepage],
    },
  ]

  for (const batch of batches) {
    console.log(`📦 ${batch.label} (${batch.docs.length} document${batch.docs.length > 1 ? 's' : ''})...`)
    const transaction = client.transaction()
    for (const doc of batch.docs) {
      transaction.createOrReplace(doc as any)
    }
    try {
      await transaction.commit({ visibility: 'async' })
      console.log(`   ✅ Done`)
    } catch (err: any) {
      console.error(`   ❌ Failed:`, err.message)
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
