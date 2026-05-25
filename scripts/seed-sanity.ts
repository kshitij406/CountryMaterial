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
  companyName: 'Country Materials Limited',
  founded: 2022,
  phone: '+255 768 500 555',
  email: 'info@countrymaterial.com',
  whatsapp: '255768500555',
  address: 'Babecov Complex, Buguruni Mandela Road',
  poBox: '2140',
  city: 'Dar es Salaam',
  country: 'Tanzania',
  regions: ['Dar es Salaam', 'Mbeya', 'Dodoma', 'Kahama', 'Pwani', 'Kilimanjaro'],
  businessHours: '24 Hours',
  shopPageTitle: 'Certified Steel\nfrom Country Materials',
  shopPageSubtitle: 'Browse our product lines including BS 500 certified steel / TMT rebar and steel billets. Full specs, sizes, MOQ, and pricing TBC.',
  socialLinks: {
    facebook: 'https://www.facebook.com/countrymaterials',
    linkedin: 'https://www.linkedin.com/company/country-materials',
    instagram: 'https://www.instagram.com/countrymaterials',
    twitter: 'https://x.com/countrymaterials',
  },
}

// ─── About Page ───────────────────────────────────────────────────────────────

const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heading: "Building Tanzania's Circular Steel Future",
  intro: 'Country Materials Limited is a regenerative steel recycler integrating scrap vendors, manufacturers, and construction into a circular supply chain — turning waste into certified steel that builds Tanzania.',
  vision: "To build Africa's most trusted circular steel ecosystem, making quality construction materials accessible while transforming waste into opportunity for millions.",
  mission: 'We transform scrap metal into high-quality, certified steel, enabling affordable construction while empowering informal scrap vendors and driving sustainable industrial growth across Africa.',
  body: [
    block('b1', 'Country Materials Limited is a regenerative steel recycler integrating scrap vendors, manufacturers, and construction into a circular supply chain powered by technology.'),
    block('b2', 'Headquartered at Babecov Complex on Buguruni Mandela Road in Dar es Salaam, we operate across scrap collection, recycling, and certified steel supply.'),
    block('b3', 'Our proprietary mobile platform has digitized 5,000+ vendors, strengthening sourcing transparency and enabling BS 500 certified steel at competitive local pricing.'),
  ],
  values: [
    { _key: 'val1', icon: '🤝', title: 'People', description: 'We exist to uplift the communities we serve by creating dignified employment, empowering scrap vendors, and building inclusive economic opportunities across the value chain.' },
    { _key: 'val2', icon: '🌍', title: 'Planet', description: 'We are committed to transforming waste into value, reducing environmental harm, and building a business that improves lives while advancing a sustainable, circular future.' },
    { _key: 'val3', icon: '🔗', title: 'Partnership', description: 'We believe lasting impact is built together. We collaborate with vendors, industry players, and communities to create trust, shared value, and scalable solutions.' },
  ],
  whyChooseUs: [
    { _key: 'why1', title: 'Fully Integrated Circular Model', description: '100% locally sourced scrap and an end-to-end operating model that reduces friction across collection, processing, and supply.' },
    { _key: 'why2', title: 'Proprietary Vendor Platform', description: 'A mobile platform digitizing 5,000+ vendors to improve transparency, traceability, and access to consistent scrap supply.' },
    { _key: 'why3', title: 'BS 500 Certified Steel', description: 'Certified steel products delivered with clear specifications and competitive local pricing.' },
    { _key: 'why4', title: 'Future Capacity Expansion', description: 'A state-of-the-art virgin steel factory is planned (details TBC) to scale output and broaden the product range.' },
  ],
}

// ─── Services ─────────────────────────────────────────────────────────────────

const serviceTransportation = {
  _id: 'service-transportation',
  _type: 'service',
  title: 'Transportation & Logistics',
  slug: { _type: 'slug', current: 'transportation' },
  excerpt: 'Fleet operations supporting scrap movement, yard logistics, and dispatch coordination across Tanzania.',
  icon: 'logistics',
  displayOrder: 4,
  features: [
    'Scrap collection and dispatch coordination',
    'In-house fleet operations (30+ vehicles)',
    'Inter-branch transfers and route planning',
    'Yard logistics support and scheduling',
    'Project delivery coordination (where applicable)',
  ],
  highlights: [
    { _key: 'h1', stat: '30+', label: 'In-House Vehicles' },
    { _key: 'h2', stat: '5', label: 'Branches' },
    { _key: 'h3', stat: '24hrs', label: 'Operations' },
  ],
  contentSections: [
    {
      _key: 'cs1',
      heading: 'Operational Logistics',
      body: [block('b1', 'Our logistics capability supports scrap movement, yard operations, and dispatch coordination across branches and client sites. We focus on reliability, safety, and consistent throughput.')],
    },
    {
      _key: 'cs2',
      heading: 'Fleet and Branch Network',
      body: [block('b2', 'With 30+ in-house vehicles and branches in Mbeya, Dodoma, Kahama, Pwani, and Kilimanjaro, we support efficient movement of materials and reliable service coverage.')],
    },
  ],
}

const serviceSteel = {
  _id: 'service-steel',
  _type: 'service',
  title: 'Certified Steel Products',
  slug: { _type: 'slug', current: 'steel' },
  excerpt: 'BS 500 certified steel and TMT rebar for reliable construction. Billets and finished products supported by traceable sourcing.',
  icon: 'steel',
  displayOrder: 2,
  features: [
    'BS 500 certified steel / TMT rebar',
    'Steel billets and finished steel products',
    'Clear specifications and traceable sourcing',
    'Project coordination for supply planning (TBC)',
  ],
  highlights: [
    { _key: 'h1', stat: 'BS 500', label: 'Certified Steel' },
    { _key: 'h2', stat: '50,000+', label: 'Metric Tons Recycled' },
    { _key: 'h3', stat: '320+', label: 'Clients' },
  ],
  contentSections: [
    {
      _key: 'cs1',
      heading: 'Certified Output',
      body: [block('b1', 'We transform locally sourced scrap into high-quality, BS 500 certified steel products that support affordable construction and long-term durability.')],
    },
    {
      _key: 'cs2',
      heading: 'Specifications (TBC)',
      body: [block('b2', 'Full specifications, sizes, MOQ, and pricing are available on request (TBC).')],
    },
  ],
}

const serviceHardware = {
  _id: 'service-hardware',
  _type: 'service',
  title: 'Vendor Platform & Procurement',
  slug: { _type: 'slug', current: 'hardware' },
  excerpt: 'Proprietary mobile platform digitizing 5,000+ scrap vendors to improve transparency, pricing, and sourcing efficiency.',
  icon: 'hardware',
  displayOrder: 3,
  features: [
    'Digitized vendor onboarding and management',
    'Transparent sourcing and procurement workflows',
    'Vendor access and participation enablement',
    'Supply coordination from collection to processing',
  ],
  highlights: [
    { _key: 'h1', stat: '5,000+', label: 'Vendors' },
    { _key: 'h2', stat: '320+', label: 'Clients' },
    { _key: 'h3', stat: '100%', label: 'Local Scrap' },
  ],
  contentSections: [
    {
      _key: 'cs1',
      heading: 'Technology-Powered Sourcing',
      body: [block('b1', 'Our proprietary mobile platform connects scrap vendors to a transparent, reliable sourcing process. Digitization improves consistency, traceability, and access across the value chain.')],
    },
    {
      _key: 'cs2',
      heading: 'Empowering Vendors',
      body: [block('b2', 'By bringing informal scrap vendors onto a shared platform, we expand economic opportunity while strengthening input quality for certified steel production.')],
    },
  ],
}

const serviceWasteManagement = {
  _id: 'service-waste-management',
  _type: 'service',
  title: 'Waste Management',
  slug: { _type: 'slug', current: 'waste-management' },
  excerpt: 'Scrap collection, sorting, and recycling that turns local waste into high-quality, certified steel.',
  icon: 'waste',
  displayOrder: 1,
  features: [
    'Scrap metal collection and aggregation',
    'Industrial waste sorting and processing',
    'Steel recycling and material recovery',
    'Waste-to-energy program development',
    'Community waste collection partnerships',
    'Compliance documentation and environmental reporting',
  ],
  highlights: [
    { _key: 'h1', stat: '50,000+', label: 'Metric Tons Recycled' },
    { _key: 'h2', stat: '5,000+', label: 'Vendors on Platform' },
    { _key: 'h3', stat: 'BS 500', label: 'Certified Steel' },
  ],
  contentSections: [
    {
      _key: 'cs1',
      heading: 'Industrial Scrap Collection',
      body: [block('b1', 'Our recycling operations bridge informal scrap vendors, industrial generators, and steel production into a single circular supply chain. The result is a more efficient, transparent, and environmentally responsible model for steel in Tanzania and beyond.')],
    },
    {
      _key: 'cs2',
      heading: 'Certified Output',
      body: [block('b2', 'We transform scrap into high-quality, BS 500 certified steel products that support affordable construction and long-term durability. Full specifications, sizes, MOQ, and pricing are available on request (TBC).')],
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

const productRebar8mm = {
  _id: 'product-tmt-rebar-8mm',
  _type: 'product',
  name: 'TMT Rebar — 8mm',
  slug: { _type: 'slug', current: 'tmt-rebar-8mm' },
  grade: 'BS 500B',
  unit: 'Per tonne',
  inStock: true,
  hasVariants: false,
  description: 'High-strength 8mm deformed rebar for slab reinforcement, columns, and foundations. Produced from 100% recycled scrap and BS 500B certified.',
  standards: ['BS 500B', 'TBS 1257', 'ISO 9001'],
  specSheet: [
    { _key: 'sp1', key: 'Diameter', value: '8mm' },
    { _key: 'sp2', key: 'Length', value: '12m standard' },
    { _key: 'sp3', key: 'Yield Strength', value: '≥ 500 N/mm²' },
    { _key: 'sp4', key: 'Weight', value: '~0.395 kg/m' },
  ],
  category: { _type: 'reference', _ref: 'productCategory-steel-metals' },
}

const productRebar10mm = {
  _id: 'product-tmt-rebar-10mm',
  _type: 'product',
  name: 'TMT Rebar — 10mm',
  slug: { _type: 'slug', current: 'tmt-rebar-10mm' },
  grade: 'BS 500B',
  unit: 'Per tonne',
  inStock: true,
  hasVariants: false,
  description: 'Standard 10mm deformed rebar for residential and commercial concrete reinforcement. Available in 12m lengths with mill certificates.',
  standards: ['BS 500B', 'TBS 1257', 'ISO 9001'],
  specSheet: [
    { _key: 'sp1', key: 'Diameter', value: '10mm' },
    { _key: 'sp2', key: 'Length', value: '12m standard' },
    { _key: 'sp3', key: 'Yield Strength', value: '≥ 500 N/mm²' },
    { _key: 'sp4', key: 'Weight', value: '~0.617 kg/m' },
  ],
  category: { _type: 'reference', _ref: 'productCategory-steel-metals' },
}

const productRebar12mm = {
  _id: 'product-tmt-rebar-12mm',
  _type: 'product',
  name: 'TMT Rebar — 12mm',
  slug: { _type: 'slug', current: 'tmt-rebar-12mm' },
  grade: 'BS 500B',
  unit: 'Per tonne',
  inStock: true,
  hasVariants: false,
  description: '12mm TMT rebar for medium and heavy construction. Consistent rib pattern ensures superior concrete bond strength.',
  standards: ['BS 500B', 'TBS 1257', 'ISO 9001'],
  specSheet: [
    { _key: 'sp1', key: 'Diameter', value: '12mm' },
    { _key: 'sp2', key: 'Length', value: '12m standard' },
    { _key: 'sp3', key: 'Yield Strength', value: '≥ 500 N/mm²' },
    { _key: 'sp4', key: 'Weight', value: '~0.888 kg/m' },
  ],
  category: { _type: 'reference', _ref: 'productCategory-steel-metals' },
}

const productRebar16mm = {
  _id: 'product-tmt-rebar-16mm',
  _type: 'product',
  name: 'TMT Rebar — 16mm',
  slug: { _type: 'slug', current: 'tmt-rebar-16mm' },
  grade: 'BS 500B',
  unit: 'Per tonne',
  inStock: true,
  hasVariants: false,
  description: 'Heavy-duty 16mm deformed rebar for bridges, high-rises, and infrastructure projects. ISO-process controlled with per-batch lab testing.',
  standards: ['BS 500B', 'TBS 1257', 'ISO 9001'],
  specSheet: [
    { _key: 'sp1', key: 'Diameter', value: '16mm' },
    { _key: 'sp2', key: 'Length', value: '12m standard' },
    { _key: 'sp3', key: 'Yield Strength', value: '≥ 500 N/mm²' },
    { _key: 'sp4', key: 'Weight', value: '~1.579 kg/m' },
  ],
  category: { _type: 'reference', _ref: 'productCategory-steel-metals' },
}

const productSteelBillets = {
  _id: 'product-steel-billets',
  _type: 'product',
  name: 'Steel Billets',
  slug: { _type: 'slug', current: 'steel-billets' },
  grade: 'Q235',
  unit: 'Per tonne',
  inStock: true,
  hasVariants: false,
  description: 'Square billets produced from 100% recycled scrap in our electric arc furnace. Used as rolling mill feedstock or direct fabrication input. Chemistry-tested per heat.',
  standards: ['BS EN 10025', 'ISO 9001'],
  specSheet: [
    { _key: 'sp1', key: 'Section', value: '100 / 125mm sq.' },
    { _key: 'sp2', key: 'Length', value: '6–12m cut lengths' },
    { _key: 'sp3', key: 'Grade', value: 'Q235' },
    { _key: 'sp4', key: 'Source', value: '100% recycled scrap' },
  ],
  category: { _type: 'reference', _ref: 'productCategory-steel-metals' },
}

const productRebar20mm = {
  _id: 'product-tmt-rebar-20mm',
  _type: 'product',
  name: 'TMT Rebar — 20mm',
  slug: { _type: 'slug', current: 'tmt-rebar-20mm' },
  grade: 'BS 500B',
  unit: 'Per tonne',
  inStock: true,
  hasVariants: false,
  description: 'Extra-heavy 20mm TMT rebar for pile caps, retaining walls, and large infrastructure. Bulk pricing available on request.',
  standards: ['BS 500B', 'TBS 1257', 'ISO 9001'],
  specSheet: [
    { _key: 'sp1', key: 'Diameter', value: '20mm' },
    { _key: 'sp2', key: 'Length', value: '12m standard' },
    { _key: 'sp3', key: 'Yield Strength', value: '≥ 500 N/mm²' },
    { _key: 'sp4', key: 'Weight', value: '~2.466 kg/m' },
  ],
  category: { _type: 'reference', _ref: 'productCategory-steel-metals' },
}

// ─── Careers ──────────────────────────────────────────────────────────────────

const careerLogistics = {
  _id: 'career-logistics-coordinator',
  _type: 'career',
  title: 'Logistics Coordinator',
  slug: { _type: 'slug', current: 'logistics-coordinator' },
  excerpt: 'Coordinate freight movement, dispatch planning, and route efficiency for construction material deliveries across Tanzania.',
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
  excerpt: 'Lead field collection teams and ensure safe, compliant, high-quality waste operations for industrial clients.',
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
  excerpt: 'Drive B2B growth across steel and hardware accounts by building contractor relationships and closing project deals.',
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
  heroSubheading: 'Regenerative steel recycling and certified steel supply powered by technology.',

  // Ticker
  tickerItems: [
    { _key: 't1', num: '50,000+', label: 'Metric tons recycled' },
    { _key: 't2', num: '320+', label: 'Active clients' },
    { _key: 't3', num: '5,000+', label: 'Vendors on platform' },
    { _key: 't4', num: '30+', label: 'In-house vehicles' },
    { _key: 't5', num: '104', label: 'Staff' },
    { _key: 't6', num: 'BS 500', label: 'Certified steel' },
    { _key: 't7', num: '5', label: 'Branches' },
    { _key: 't8', num: '2022', label: 'Founded' },
  ],

  // Featured services (references)
  featuredServices: [
    { _type: 'reference', _key: 'fs1', _ref: 'service-transportation' },
    { _type: 'reference', _key: 'fs2', _ref: 'service-steel' },
    { _type: 'reference', _key: 'fs3', _ref: 'service-hardware' },
    { _type: 'reference', _key: 'fs4', _ref: 'service-waste-management' },
  ],

  // About strip
  aboutHeading: 'Circular steel.\nReal impact.',
  aboutLead: 'Regenerative steel recycler integrating scrap vendors, manufacturers, and construction into a circular supply chain powered by technology.',
  aboutBody: 'We transform scrap metal into high-quality, certified steel for affordable construction while empowering informal scrap vendors and driving sustainable industrial growth across Africa.',
  founderInitials: 'CM',
  founderName: 'Country Materials',
  founderRole: 'People · Planet · Partnership',

  // Stats
  stats: [
    { _key: 's1', count: 50000, suffix: '+', label: 'Metric Tons Recycled', sub: 'Scrap recycled to date across the network.' },
    { _key: 's2', count: 320,   suffix: '+', label: 'Active Clients',       sub: 'Contractors, builders, and industrial buyers.' },
    { _key: 's3', count: 30,    suffix: '+', label: 'In-House Vehicles',    sub: 'Fleet supporting collection and dispatch.' },
    { _key: 's4', count: 5000,  suffix: '+', label: 'Vendors Digitized',    sub: 'Scrap vendors on the mobile platform.' },
  ],

  // Featured products (references)
  featuredProducts: [
    { _type: 'reference', _key: 'fp1', _ref: 'product-tmt-rebar-8mm' },
    { _type: 'reference', _key: 'fp2', _ref: 'product-tmt-rebar-10mm' },
    { _type: 'reference', _key: 'fp3', _ref: 'product-tmt-rebar-12mm' },
    { _type: 'reference', _key: 'fp4', _ref: 'product-tmt-rebar-16mm' },
    { _type: 'reference', _key: 'fp5', _ref: 'product-steel-billets' },
    { _type: 'reference', _key: 'fp6', _ref: 'product-tmt-rebar-20mm' },
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

// ─── Legal Pages ──────────────────────────────────────────────────────────────

const legalPrivacyPolicy = {
  _id: 'legalPage-privacy-policy',
  _type: 'legalPage',
  title: 'Privacy Policy',
  slug: { _type: 'slug', current: 'privacy-policy' },
  lastUpdated: '2026-05-25',
  body: [
    block('lp1', 'Country Materials Limited ("we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard data when you visit countrymaterial.com or contact us directly.'),
    block('lp2', 'Information We Collect: We may collect your name, email address, phone number, and message content when you submit our contact form. We do not collect payment information directly on this site.'),
    block('lp3', 'How We Use Your Information: We use submitted information solely to respond to your enquiry, provide quotations, or follow up on business requests. We do not sell or share your data with third parties for marketing purposes.'),
    block('lp4', 'Data Retention: Contact form submissions are retained for up to 12 months for business correspondence purposes, after which they are securely deleted.'),
    block('lp5', 'Cookies: This site may use essential cookies for analytics and performance monitoring. No personally identifiable tracking cookies are set without consent.'),
    block('lp6', 'Your Rights: You may request access to, correction of, or deletion of any personal data we hold about you by contacting us at info@countrymaterial.com.'),
    block('lp7', 'Changes: We may update this policy from time to time. The "Last Updated" date at the top of this page reflects the most recent revision.'),
    block('lp8', 'Contact: For any privacy-related enquiries, write to us at Babecov Complex, Buguruni Mandela Road, Dar es Salaam, or email info@countrymaterial.com.'),
  ],
}

const legalTerms = {
  _id: 'legalPage-terms-of-use',
  _type: 'legalPage',
  title: 'Terms of Use',
  slug: { _type: 'slug', current: 'terms' },
  lastUpdated: '2026-05-25',
  body: [
    block('tu1', 'By accessing countrymaterial.com you agree to these Terms of Use. If you do not agree, please discontinue use of this site immediately.'),
    block('tu2', 'Intellectual Property: All content on this site — including text, images, logos, and design — is the property of Country Materials Limited and may not be reproduced without prior written consent.'),
    block('tu3', 'No Warranty: This site and its content are provided "as is". We make no warranties, express or implied, regarding the accuracy, completeness, or suitability of information for any particular purpose. Product specifications and pricing are indicative and subject to change.'),
    block('tu4', 'Limitation of Liability: Country Materials Limited shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this site or reliance on its content.'),
    block('tu5', 'Third-Party Links: This site may contain links to third-party websites. We are not responsible for the content or practices of those sites.'),
    block('tu6', 'Governing Law: These terms are governed by the laws of the United Republic of Tanzania. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dar es Salaam.'),
    block('tu7', 'Changes: We reserve the right to update these terms at any time. Continued use of the site following any changes constitutes acceptance of the revised terms.'),
    block('tu8', 'Contact: For any questions regarding these terms, contact us at info@countrymaterial.com or at our registered office in Dar es Salaam.'),
  ],
}

const legalCookies = {
  _id: 'legalPage-cookies',
  _type: 'legalPage',
  title: 'Cookie Policy',
  slug: { _type: 'slug', current: 'cookies' },
  lastUpdated: '2026-05-25',
  body: [
    block('ck1', 'Country Materials Limited uses cookies and similar tracking technologies to improve your browsing experience on countrymaterial.com. This Cookie Policy explains what cookies are, which ones we use, and how you can control them.'),
    block('ck2', 'What Are Cookies: Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you use it.'),
    block('ck3', 'Essential Cookies: These cookies are required for the website to function. They include session management and security tokens. You cannot opt out of essential cookies.'),
    block('ck4', 'Analytics Cookies: We may use analytics tools to understand traffic patterns and improve our site. These collect anonymous data about pages visited, time on site, and referring sources. No personally identifiable information is stored.'),
    block('ck5', 'Third-Party Cookies: Some embedded content (such as maps or video) may set cookies from third-party providers. We do not control these cookies and recommend reviewing the privacy policies of those providers.'),
    block('ck6', 'Managing Cookies: You can control or delete cookies through your browser settings. Note that disabling cookies may affect the functionality of this site.'),
    block('ck7', 'Your Consent: By clicking "Accept All" on our cookie banner, you consent to the use of non-essential cookies. You may withdraw consent at any time by clearing cookies in your browser or selecting "Decline" if the banner reappears.'),
    block('ck8', 'Contact: For any questions about our use of cookies, contact us at info@countrymaterial.com.'),
  ],
}

// ─── Impact Page ──────────────────────────────────────────────────────────────
// Based on 50,000 tonnes recycled (company-reported) — real staff count: 104
// Environmental calcs kept in impactCalculations.ts; manualOverrides pins jobs to actual headcount

const impactPage = {
  _id: 'impactPage',
  _type: 'impactPage',
  tonnesRecycled: 50000,
  reportingYear: 2024,
  manualOverrides: {
    jobsCreated: 104,
    womenParticipation: 0,
    youthParticipation: 0,
  },
  heroHeading: "Turning Waste Into Tanzania's Future",
  heroSubtitle: 'We transform scrap metal into high-quality, certified steel, enabling affordable construction while empowering informal scrap vendors and driving sustainable industrial growth across Africa.',
  methodologyNote: 'CO₂ and landfill figures are calculated using World Steel Association and EPA conversion factors. Social impact figures are company-reported as of 2024.',
  impactStories: [
    {
      _key: 'is1',
      stat: '50,000+',
      label: 'Metric Tons Recycled',
      description: 'Scrap metal collected, processed and transformed into construction-grade steel.',
      icon: '♻️',
    },
    {
      _key: 'is2',
      stat: '5,000+',
      label: 'Vendors Onboarded',
      description: 'Informal scrap collectors digitized, formalized and earning fair, reliable income.',
      icon: '🤝',
    },
    {
      _key: 'is3',
      stat: '320+',
      label: 'Active Clients',
      description: 'Businesses and contractors across Tanzania sourcing locally produced steel.',
      icon: '🏗️',
    },
    {
      _key: 'is4',
      stat: '104',
      label: 'Jobs Created',
      description: 'Dignified, sustainable livelihoods built across the circular steel value chain.',
      icon: '👷',
    },
  ],
  sdgGoals: ['8', '11', '12', '13'],
}

// ─── Seed Runner ─────────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Seeding Country Materials Sanity dataset...\n')

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('❌ Missing Sanity environment variables.')
    console.error('   Required: NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN')
    process.exit(1)
  }

  // Order matters: base documents first, then references
  const batches = [
    {
      label: 'Site Settings & About Page',
      docs: [siteSettings, aboutPage],
    },
    {
      label: 'Services (4)',
      docs: [serviceWasteManagement, serviceSteel, serviceHardware, serviceTransportation],
    },
    {
      label: 'Product Categories (3)',
      docs: [categoryBuildingMaterials, categorySteelMetals, categoryPaints],
    },
    {
      label: 'Products (6)',
      docs: [productRebar8mm, productRebar10mm, productRebar12mm, productRebar16mm, productSteelBillets, productRebar20mm],
    },
    {
      label: 'Careers (3)',
      docs: [careerLogistics, careerWasteSupervisor, careerSalesExecutive],
    },
    {
      label: 'Homepage (all fields)',
      docs: [homepage],
    },
    {
      label: 'Legal Pages (3)',
      docs: [legalPrivacyPolicy, legalTerms, legalCookies],
    },
    {
      label: 'Impact Page',
      docs: [impactPage],
    },
  ]

  const seededIds = batches.flatMap((batch) => batch.docs.map((doc: any) => doc._id))
  const managedCollectionTypes = ['service', 'productCategory', 'product', 'career', 'legalPage']

  // Upsert all batches first so references are updated before stale docs are removed
  for (const batch of batches) {
    console.log(`📦 ${batch.label} (${batch.docs.length} document${batch.docs.length > 1 ? 's' : ''})...`)
    const transaction = client.transaction()
    for (const doc of batch.docs) {
      transaction.createOrReplace(doc as any)
    }
    try {
      await transaction.commit({ visibility: 'sync' })
      console.log(`   ✅ Done`)
    } catch (err: any) {
      console.error(`   ❌ Failed:`, err.message)
      process.exit(1)
    }
  }

  // Clean up stale docs after all references have been repointed
  console.log('🧹 Cleaning stale seeded documents...')
  const staleIds: string[] = await client.fetch(
    `*[_type in $types && !(_id in $seededIds) && !(_id match "drafts.*")]._id`,
    { types: managedCollectionTypes, seededIds }
  )

  if (staleIds.length > 0) {
    const cleanupTx = client.transaction()
    for (const id of staleIds) {
      cleanupTx.delete(id)
      cleanupTx.delete(`drafts.${id}`)
    }
    await cleanupTx.commit({ visibility: 'sync' })
    console.log(`   ✅ Removed ${staleIds.length} stale document(s)`)
  } else {
    console.log('   ✅ No stale documents found')
  }

  console.log('\n✨ Seed complete!')
  console.log('   → Visit /studio to review and edit content')
  console.log('   → Visit / to see the live site with seeded data\n')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
