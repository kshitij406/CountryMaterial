export const en = {
  meta: {
    siteName: 'Country Materials Ltd',
    titleTemplate: '%s | Country Materials Ltd',
    defaultTitle: 'Country Materials Ltd',
    description:
      "Tanzania's trusted supplier of construction materials, waste management solutions and logistics services based in Dar es Salaam.",
    keywords: [
      'construction materials Tanzania',
      'waste management Dar es Salaam',
      'scrap recycling Tanzania',
      'hardware supplier Tanzania',
      'logistics Tanzania',
      'BS 500 steel',
      'TMT rebar Tanzania',
      'circular economy Africa',
    ],
    home: {
      title: 'Country Materials Ltd | Hardware, Waste Management & Logistics Tanzania',
      description:
        'Country Materials Ltd supplies BS 500-certified steel, scrap recycling, hardware and logistics services across Tanzania, headquartered in Dar es Salaam.',
    },
  },

  nav: {
    home: 'Home',
    about: 'About',
    impact: 'Impact',
    shop: 'Products & Services',
    blog: 'Blog',
    careers: 'Careers',
    contact: 'Contact',
    getQuote: 'Get a Quote',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primaryNav: 'Primary navigation',
    mobileNav: 'Mobile navigation',
    logoAlt: 'Country Materials Limited',
    switchLanguage: 'Change language',
  },

  footer: {
    tagline:
      "Tanzania's leading circular steel ecosystem — from scrap collection to BS 500-certified construction steel. Founded 2022, Dar es Salaam.",
    company: 'Company',
    services: 'Services',
    branches: 'Branches',
    aboutUs: 'About Us',
    ourImpact: 'Our Impact',
    operations: 'Operations',
    certifications: 'Certifications',
    careers: 'Careers',
    scrapCollection: 'Scrap Collection',
    steelManufacturing: 'Steel Manufacturing',
    rebarBillets: 'Rebar & Billets',
    fleetLogistics: 'Fleet Logistics',
    hq: 'Dar es Salaam — HQ',
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    cookies: 'Cookie Policy',
  },

  hero: {
    sectionLabel: 'Hero',
    imageAlt: 'Country Materials Limited steel operations',
    location: 'Dar es Salaam, Tanzania · Est. 2022 · BS 500 Certified',
    headingLine1: "Africa's Circular",
    headingLine2: 'Steel Ecosystem',
    subheading:
      "From scrap collection to BS 500-certified construction steel — Tanzania's most integrated circular steel supply chain.",
    requestQuote: 'Request a Quote',
    viewProducts: 'View Products',
    scroll: 'Scroll',
  },

  stats: {
    eyebrow: 'Our Impact',
    headingLine1: 'Numbers that',
    headingLine2: 'hold weight.',
    established: 'EST. 2022',
    city: 'DAR ES SALAAM',
    annualRevenue: 'Annual Revenue',
    revenueBody:
      'Built on a vendor-first model that turns informal scrap networks into a formalised, technology-driven supply chain — creating value at every step.',
    ourStory: 'Our Story',
    viewImpactReport: 'View Full Impact Report',
    defaults: [
      { label: 'Metric Tons Recycled', sub: 'Scrap processed to date' },
      { label: 'Active Clients',       sub: 'Contractors & industrial buyers' },
      { label: 'Vendors on Platform',  sub: 'Digitised scrap network' },
      { label: 'Team Members',         sub: 'Across all branches' },
      { label: 'Fleet Vehicles',       sub: 'Collection & dispatch' },
      { label: 'Regional Branches',    sub: 'Mbeya · Dodoma · Kahama · Pwani · KIL' },
    ] as readonly { label: string; sub: string }[],
  },

  process: {
    sectionLabel: 'Scrap to steel process',
    eyebrow: 'How It Works',
    headingLine1: 'Scrap.',
    headingLine2: 'Steel.',
    headingLine3: 'Closed loop.',
    intro:
      "Tanzania's first fully integrated circular steel supply chain — connecting informal scrap vendors to certified construction steel in five steps. No intermediaries.",
    calloutLead: 'Circular by design.',
    calloutBody:
      'Every tonne of steel we produce uses recycled scrap — reducing CO₂ emissions by up to 58% versus virgin steel production.',
    steps: [
      {
        title: 'Collection',
        description: '5,000+ registered vendors bring scrap to our collection points. Mobile app — transparent weight, fair price, instant mobile money.',
      },
      {
        title: 'Sorting',
        description: 'Material graded at our yards. Contaminants removed. Every batch logged by weight, type, and source vendor. Chain of custody intact.',
      },
      {
        title: 'Melting',
        description: 'Sorted scrap fed into electric arc furnaces at 1,600°C. Energy-efficient, low-emission. Molten steel tested for chemistry before casting.',
      },
      {
        title: 'Rolling',
        description: 'Billets hot-rolled into BS 500B-grade TMT rebar. Rib pattern, diameter, and strength verified against spec on every run.',
      },
      {
        title: 'Distribution',
        description: '30+ owned trucks deliver TBS-certified steel to 320+ active clients across Tanzania. Same-day dispatch from in-stock inventory.',
      },
    ] as readonly { title: string; description: string }[],
  },

  operations: {
    sectionLabel: 'Operations and fleet',
    eyebrow: 'Operations & Fleet',
    headingLine1: '5 branches.',
    headingLine2: '30+ vehicles.',
    headingLine3: '24 hours.',
    intro:
      "Our logistics network runs around the clock — collecting scrap, delivering steel, and keeping Tanzania's construction sector moving without interruption.",
    fleetAlt: 'Country Materials fleet vehicles',
    fleetEyebrow: 'Our Fleet',
    fleetCaption: '30+ owned vehicles — scrap in, steel out.',
    teamAlt: 'Country Materials team',
    teamCaption: 'Our Team · 104 staff',
    facilityAlt: 'Country Materials main facility',
    facilityCaption: 'Main Facility · DSM',
    branchRoles: [
      'Headquarters & Main Yard',
      'Southern Highlands Hub',
      'Central Region Branch',
      'Lake Zone Operations',
      'Coastal Collection Hub',
      'Northern Zone Branch',
    ] as readonly string[],
    fleetStats: [
      'Collection trucks',
      'Regional yards',
      'Operations',
      'Team members',
    ] as readonly string[],
  },

  certifications: {
    sectionLabel: 'Certifications and quality',
    eyebrow: 'Quality & Certification',
    headingLine1: 'Every batch',
    headingLine2: 'tested and',
    headingLine3: 'certified.',
    intro:
      "We don't ship uncertified steel. Period. Our in-house lab and independent audits ensure every tonne leaving our yard meets the specifications your structure depends on.",
    codeLabel: 'Certification code',
    certifiedActive: 'Certified & Active',
    qcEyebrow: 'Quality Control Tests',
    qcHeading: 'Every batch tested before it leaves our yard.',
    qcBody:
      'Independent lab testing + in-house QC on every production run. Mill certificates available on request.',
    items: [
      {
        name: 'British Standard 500',
        authority: 'British Standards Institution',
        description: 'Our TMT rebar meets BS 500B — the internationally recognised standard for high-yield steel reinforcement used in earthquake-resistant and structural-grade construction.',
      },
      {
        name: 'Tanzania Bureau of Standards',
        authority: 'TBS — Government of Tanzania',
        description: 'Full TBS certification ensures our products meet Tanzanian national quality standards. Every batch is laboratory-tested for tensile strength, bendability, and chemical composition.',
      },
      {
        name: 'Quality Management System',
        authority: 'International Organisation for Standardisation',
        description: 'Our production and quality control processes are ISO 9001-compliant — guaranteeing consistent product quality from raw scrap input through to finished steel dispatch.',
      },
    ] as readonly { name: string; authority: string; description: string }[],
    testingPoints: [
      'Tensile strength (yield & ultimate)',
      'Chemical composition analysis',
      'Bend and rebend testing',
      'Surface geometry and rib pattern',
      'Weight per metre verification',
      'Batch traceability records',
    ] as readonly string[],
  },

  products: {
    sectionLabel: 'Product catalogue',
    eyebrow: 'Product Catalogue',
    headingLine1: 'Certified steel,',
    headingLine2: 'ready to ship.',
    fullCatalogue: 'Full catalogue',
    inStock: 'In Stock',
    contactUs: 'Contact Us',
    contactForPricing: 'Contact for pricing',
    details: 'Details',
    ctaBody:
      'Need custom sizes, bulk pricing, or scheduled delivery? Our steel team responds within 24 hours.',
    ctaButton: 'Talk to Our Steel Team',
    perTonne: 'Per tonne',
    specDiameter: 'Diameter',
    specLength: 'Length',
    specSection: 'Section',
    fallback: [
      { name: 'TMT Rebar — 8mm',  description: 'High-strength deformed rebar for slab reinforcement, columns, and foundations. Compliant with BS 500B and TBS.' },
      { name: 'TMT Rebar — 10mm', description: 'Standard 10mm deformed rebar for residential and commercial concrete reinforcement. Available in 12m lengths.' },
      { name: 'TMT Rebar — 12mm', description: '12mm TMT rebar for medium and heavy construction. Consistent rib pattern ensures superior concrete bond strength.' },
      { name: 'TMT Rebar — 16mm', description: 'Heavy-duty 16mm deformed rebar for bridges, high-rises, and infrastructure projects. ISO process controlled.' },
      { name: 'Steel Billets',    description: 'Square billets produced from 100% recycled scrap. Used as feedstock for rolling mills. Available in 100mm and 125mm sections.' },
      { name: 'TMT Rebar — 20mm', description: 'Extra-heavy 20mm TMT rebar for pile caps, retaining walls, and large infrastructure. Bulk pricing available.' },
    ] as readonly { name: string; description: string }[],
  },

  clients: {
    sectionLabel: 'Partners and vendor network',
    logosLabel: 'Partner company logos',
    eyebrow: 'Vendor Network',
    headingLine1: '5,000+ vendors.',
    headingLine2: 'One network.',
    becomeVendor: 'Become a Vendor',
    valueProps: [
      { title: 'Fair Pricing',    body: 'Real-time market rates for your scrap — no middlemen, no haggling.' },
      { title: 'Instant Payment', body: 'Mobile money transfer on the spot. No waiting, no cheques.' },
      { title: 'App-Enabled',     body: 'Track pickups, verify weights, and manage your account from your phone.' },
    ] as readonly { title: string; body: string }[],
  },

  productCard: {
    inStock: 'In stock',
    contactUs: 'Contact us',
    contactForPricing: 'Contact for pricing',
    buyNow: 'Buy Now',
    checkoutSoon: 'Online checkout coming soon',
    copyLink: 'Copy link',
    copied: 'Copied',
  },

  shopPage: {
    metaTitle: 'Products & Services | Country Materials Ltd',
    metaDescription:
      'Browse BS 500B-certified TMT rebar, steel billets, hardware and the full range of services from Country Materials Ltd. Request pricing and bulk delivery across Tanzania.',
    eyebrow: 'Products & Services',
    headingPlain: 'Everything we',
    headingAccent: 'supply and do',
    intro:
      'BS 500-grade steel, hardware and materials — plus the collection, manufacturing and logistics services behind them.',
    erpEyebrow: 'ERP Price List',
    erpBody: 'Our full product catalog with current pricing is available via our ERP system, updated weekly.',
    erpDefaultLabel: 'View Price List',
    catalogueEyebrow: 'Catalogue',
    productsHeading: 'Products',
    items: 'ITEMS',
    whatWeDo: 'What We Do',
    servicesHeading: 'Services',
    servicesCount: 'SERVICES',
    learnMore: 'Learn more',
    ctaLabel: 'Quote call to action',
    ctaHeadingLine1: 'Need bulk pricing',
    ctaHeadingLine2: 'or a custom quote?',
    ctaBody:
      'We supply contractors, developers, and businesses at competitive wholesale prices. Our team responds within 24 hours.',
    ctaButton: 'Request a Quote',
    servicesFallback: [
      { title: 'Scrap Collection & Recycling',     excerpt: "Tanzania's largest organised scrap collection network — verified daily through our mobile platform.", chips: ['5,000+ vendors', 'Nationwide pickup'] },
      { title: 'Certified Steel Manufacturing',    excerpt: 'Electric arc furnace technology producing BS 500-certified TMT rebar and billets.',                     chips: ['BS 500B certified', 'Lab-tested batches'] },
      { title: 'Vendor Platform & Procurement',    excerpt: 'A mobile platform connecting scrap vendors, construction clients and our operations.',                   chips: ['Real-time pricing', 'Digital payments'] },
      { title: 'Fleet Logistics & Distribution',   excerpt: '30+ in-house trucks operating 24 hours across 5 regional branches.',                                     chips: ['30+ owned vehicles', 'Same-day dispatch'] },
    ] as readonly { title: string; excerpt: string; chips: readonly string[] }[],
  },

  contactPage: {
    metaTitle: 'Contact Us | Country Materials Ltd',
    metaDescription:
      "Reach Country Materials Ltd's team in Dar es Salaam to request a quote, place a bulk order, or find your nearest yard across Tanzania's five branches.",
    heroLabel: 'Contact page hero',
    eyebrow: 'Get in Touch',
    headingLine1: 'We respond within',
    headingLine2: '24 hours.',
    intro:
      'From bulk orders and delivery logistics to vendor registration and trade accounts — reach our team directly.',
    sectionLabel: 'Contact information and form',
    directContact: 'Direct Contact',
    phoneLabel: 'Phone / WhatsApp',
    emailLabel: 'Email',
    hqLabel: 'Headquarters',
    allBranches: 'All Branches',
    formHeading: 'Send us a message',
    formIntro: "We'll get back to you within 24 hours, Monday–Saturday.",
    hours24: '24hrs',
    hoursStandard: '8am–6pm',
    branchNotes: [
      'Headquarters & Main Yard',
      'Southern Highlands Hub',
      'Central Region Branch',
      'Lake Zone Operations',
      'Coastal Collection Hub',
      'Northern Zone Branch',
    ] as readonly string[],
  },

  productDetail: {
    notFoundTitle: 'Product Not Found | Country Materials Ltd',
    metaFallback: 'available from Country Materials Ltd, Dar es Salaam, Tanzania.',
    allProducts: 'All Products',
    specifications: 'Specifications',
    enquire: 'Have a question? Enquire about this product',
  },

  floating: {
    watchVideo: 'Watch our video',
    whatsapp: 'Chat with us on WhatsApp',
  },

  ctaBanner: {
    eyebrow: 'Get in touch',
    heading: 'Ready to\nWork with Us?',
    subtext:
      'Whether you need steel supply, scrap support, or reliable logistics, our team is ready to help.',
    primaryLabel: 'Contact Us Today',
    secondaryLabel: 'View Our Services',
  },

  legal: {
    heroLabel: 'Page hero',
    eyebrow: 'Legal',
    lastUpdated: 'Last updated',
    comingSoon: 'Content coming soon.',
    /** BCP-47 tag for date formatting on legal pages. */
    dateLocale: 'en-GB',
    terms: {
      title: 'Terms of Use',
      description:
        'Read the Terms of Use governing your access to the Country Materials Ltd website, including intellectual property rights and limitation of liability.',
    },
    privacy: {
      title: 'Privacy Policy',
      description:
        'How Country Materials Ltd collects, uses, and protects your personal information.',
    },
    cookies: {
      title: 'Cookie Policy',
      description: 'How Country Materials Ltd uses cookies and similar technologies on this website.',
    },
  },

  blog: {
    metaTitle: 'Blog | Country Materials Ltd',
    metaDescription:
      "Read the latest news, project updates and announcements from Country Materials Ltd — Tanzania's leading circular steel manufacturer based in Dar es Salaam.",
    eyebrow: 'Latest from Country Materials',
    headingPlain: 'The',
    headingAccent: 'Blog',
    intro:
      'Stay up to date with our latest developments, product updates, and company announcements.',
    empty: 'No posts yet - check back soon.',
    featured: 'Featured',
    readArticle: 'Read Article',
    readMore: 'Read More',
    backToBlog: 'Back to Blog',
    allPosts: 'All Posts',
    by: 'by',
    postFallbackDescription:
      "Read the latest news and updates from Country Materials Ltd, Tanzania's leading circular steel manufacturer.",
    notFoundTitle: 'Post Not Found | Country Materials Ltd',
    dateLocale: 'en-GB',
  },

  careers: {
    metaTitle: 'Careers | Country Materials Ltd',
    metaDescription:
      "Join Country Materials Ltd in Dar es Salaam. Open roles across logistics, waste management, sales and technology in Tanzania's growing circular steel sector.",
    eyebrow: 'Join Our Team',
    headingPrefix: 'Build Your Career with',
    intro:
      "We are growing and looking for driven, capable people to join us in building Tanzania's industrial future.",
    openPositions: 'Open Positions',
    currentPlain: 'Current',
    currentAccent: 'Opportunities',
    openRoles: 'OPEN ROLES',
    closes: 'Closes',
    noneHeading: 'No Open Positions Right Now',
    noneBody:
      'We are not actively hiring at the moment, but we always welcome expressions of interest from talented individuals.',
    whyEyebrow: 'Why Work Here',
    whyHeadingPre: 'A Team That Takes Its',
    whyHeadingAccent: 'Work',
    whyHeadingPost: 'Seriously',
    culture: 'CULTURE',
    basedInPre: 'Based in',
    basedInPost:
      'we are a growing company with ambitions to expand across the region. Joining us now means growing alongside us.',
    ctaHeading: 'Do You Not See the\\nRight Role?',
    ctaSubtext:
      'Send us your CV and a brief note about what you are looking for. We will keep your profile on file.',
    ctaPrimary: 'Get in Touch',
    ctaSecondary: 'About the Company',
    dateLocale: 'en-GB',
    backToCareers: 'All Roles',
    applyNow: 'Apply Now',
    requirements: 'Requirements',
    notFoundTitle: 'Role Not Found | Country Materials Ltd',
    detail: {
      allPositions: 'All Positions',
      positionClosed: 'Position Closed',
      applicationsClose: 'Applications close',
      aboutRole: 'About the Role',
      requirements: 'Requirements',
      closedHeading: 'This Role is Closed',
      applyHeading: 'Apply for This Role',
      closedBody:
        'This position is no longer accepting applications. Check our other open roles or send a general enquiry.',
      applyBodyPre: 'Send your CV and a cover letter referencing',
      applyBodyPost: 'in the subject line.',
      generalEnquiry: 'General Enquiry',
      applyNow: 'Apply Now',
      allOpenPositions: 'All Open Positions',
      closingDate: 'Closing Date',
      department: 'Department',
      location: 'Location',
      type: 'Type',
      metaFallbackPre: 'Apply for the',
      metaFallbackPost: 'position at Country Materials Ltd. Based in',
    },
    whyItems: [
      { title: 'Merit-Based Growth',    desc: 'Performance is recognized and rewarded with real advancement opportunities.' },
      { title: 'Collaborative Culture', desc: 'Teamwork is at the core of how we operate - no silo, no politics.' },
      { title: 'Regional Impact',       desc: 'Work that matters to Tanzania and the region. Your output is visible.' },
      { title: 'Growing Company',       desc: 'Join early and grow with us as we expand across the region.' },
    ] as readonly { title: string; desc: string }[],
    fallbackJobs: [
      {
        title: 'Logistics Coordinator',
        department: 'Transportation',
        description: 'Coordinate day-to-day freight forwarding operations, manage carrier relationships, and ensure on-time delivery across our logistics network.',
        requirements: [
          'Diploma or degree in Logistics, Supply Chain, or related field',
          'Minimum 2 years experience in logistics or freight forwarding',
          'Strong organizational and communication skills',
        ],
      },
      {
        title: 'Waste Collection Supervisor',
        department: 'Waste Management',
        description: 'Oversee scrap collection teams, ensure compliance with waste management regulations, and coordinate with industrial clients and recycling facilities.',
        requirements: [
          'Certificate or diploma in Environmental Science, Public Health, or related field',
          'Experience supervising field teams',
          'Knowledge of waste management regulations in Tanzania',
        ],
      },
    ] as readonly { title: string; department: string; description: string; requirements: readonly string[] }[],
  },

  serviceDetail: {
    breadcrumb: 'Services',
    overview: 'Overview',
    coversPre: 'What This Service',
    coversAccent: 'Covers',
    requestQuote: 'Request a Quote',
    keyPre: 'Key',
    keyAccent: 'Capabilities',
    metaFallback:
      'Explore our industrial services including steel manufacturing, scrap collection, vendor platform and fleet logistics across Tanzania.',
    ctaHeading: 'Ready to Use\\nOur Services?',
    ctaSubtext:
      'Get in touch with our team for a custom quote or to discuss your specific requirements.',
    ctaPrimary: 'Get in Touch',
    ctaSecondary: 'All Services',
    statics: {
      transportation: {
        title: 'Logistics & Fleet Operations',
        label: 'Logistics',
        excerpt: 'Fleet operations supporting scrap movement, yard logistics, and dispatch coordination across Tanzania.',
        intro: 'Our in-house logistics capability supports scrap movement, yard operations, and dispatch coordination across branches and client sites. We focus on safety, reliability, and consistent throughput.',
        features: ['Scrap collection and dispatch coordination', 'In-house fleet operations (30+ vehicles)', 'Inter-branch transfers and route planning', 'Yard logistics support and scheduling', 'Project delivery coordination (where applicable)'],
        highlightLabels: ['In-House Vehicles', 'Branches', 'Operations'],
      },
      hardware: {
        title: 'Vendor Platform & Procurement',
        label: 'Platform',
        excerpt: 'Proprietary mobile platform digitizing 5,000+ scrap vendors to improve transparency, pricing, and sourcing efficiency.',
        intro: 'Our proprietary mobile platform digitizes the scrap supply chain, improving transparency, traceability, and throughput. It helps vendors participate consistently and supports reliable sourcing for certified steel production.',
        features: ['Digitized vendor onboarding and management', 'Transparent sourcing and procurement workflows', 'Supply coordination from collection to processing', 'Traceability and reporting support (where applicable)'],
        highlightLabels: ['Vendors', 'Local Scrap', 'Active Clients'],
      },
      steel: {
        title: 'Certified Steel Products',
        label: 'Steel',
        excerpt: 'BS 500 certified steel and TMT rebar for reliable construction. Billets and finished products supported by traceable sourcing.',
        intro: 'We transform locally sourced scrap into high-quality, BS 500 certified steel products that support affordable construction and long-term durability. Full specifications, sizes, MOQ, and pricing are available on request (TBC).',
        features: ['BS 500 certified steel / TMT rebar', 'Steel billets and finished steel products', 'Clear specifications and traceable sourcing', 'Project coordination for supply planning (TBC)'],
        highlightLabels: ['Certified Steel', 'Metric Tons Recycled', 'Clients'],
      },
      'waste-management': {
        title: 'Scrap Collection & Recycling',
        label: 'Recycling',
        excerpt: 'Scrap collection, sorting, and recycling that turns local waste into high-quality, certified steel.',
        intro: 'Our recycling operations bridge informal scrap vendors, industrial generators, and steel production into a single circular supply chain. The result is a more efficient, transparent, and environmentally responsible model for steel in Tanzania and beyond.',
        features: ['Scrap metal collection and aggregation', 'Industrial scrap sorting and processing', 'Material recovery and recycling operations', 'Compliance documentation and reporting (where applicable)'],
        highlightLabels: ['Metric Tons Recycled', 'Vendors on Platform', 'Staff'],
      },
    } as Record<string, { title: string; label: string; excerpt: string; intro: string; features: readonly string[]; highlightLabels: readonly string[] }>,
  },

  about: {
    metaTitle: 'About Us | Country Materials Ltd',
    metaDescription:
      "Learn how Country Materials Ltd built Tanzania's leading circular steel ecosystem — from informal scrap vendors to BS 500-certified rebar delivered nationwide.",
    heroLabel: 'About page hero',
    facilityAlt: 'Country Materials facility',
    eyebrow: 'About Us',
    headingLine1: 'Built for Tanzania.',
    headingLine2: 'Built to last.',
    intro:
      "Country Materials Limited is Tanzania's leading circular steel manufacturer and scrap recycling ecosystem — founded in 2022, headquartered in Dar es Salaam.",
    missionVisionLabel: 'Mission and vision',
    ourMission: 'Our Mission',
    mission:
      'We transform scrap metal into high-quality, certified steel, enabling affordable construction while empowering informal scrap vendors and driving sustainable industrial growth across Africa.',
    ourVision: 'Our Vision',
    vision:
      "To build Africa's most trusted circular steel ecosystem, making quality construction materials accessible while transforming waste into opportunity for millions.",
    milestonesLabel: 'Company milestones',
    ourStory: 'Our Story',
    storyLine1: 'From idea to',
    storyLine2: 'industry-defining',
    storyLine3: 'network.',
    storyBody:
      'Country Materials was founded with one observation: Tanzania had abundant scrap metal, strong construction demand, and zero organised supply chain connecting them. We built the bridge — from informal scrap vendors with mobile phones to certified steel leaving certified yards.',
    teamAlt: 'Country Materials team',
    scrapAlt: 'Scrap collection',
    hardwareAlt: 'Hardware products',
    valuesLabel: 'Company values',
    standForEyebrow: 'What We Stand For',
    principlesLine1: 'The principles',
    principlesLine2: 'behind the product.',
    ctaLabel: 'Contact call to action',
    ctaHeadingLine1: 'Want to know more?',
    ctaHeadingLine2: "Let's talk.",
    contactUs: 'Contact Us',
    viewProducts: 'View Products',
    milestones: [
      { year: '2022', event: "Founded in Dar es Salaam with a vision to formalise Tanzania's scrap-to-steel supply chain." },
      { year: '2023', event: 'Launched mobile vendor platform. Onboarded 2,000+ scrap vendors within 6 months.' },
      { year: '2024', event: 'Achieved BS 500B and TBS certification. Opened branches in Mbeya and Dodoma.' },
      { year: '2025', event: 'Expanded to 5 branches, 30+ fleet vehicles, $11.2M revenue, 5,000+ vendors digitised.' },
    ] as readonly { year: string; event: string }[],
    values: [
      { title: 'People',      icon: '🤝', body: 'We exist to uplift the communities we serve by creating dignified employment, empowering scrap vendors, and building inclusive economic opportunities across the value chain.' },
      { title: 'Planet',      icon: '🌍', body: 'We are committed to transforming waste into value, reducing environmental harm, and building a business that improves lives while advancing a sustainable, circular future.' },
      { title: 'Partnership', icon: '🔗', body: 'We believe lasting impact is built together. We collaborate with vendors, industry players, and communities to create trust, shared value, and scalable solutions.' },
    ] as readonly { title: string; icon: string; body: string }[],
  },

  impact: {
    metaTitle: 'Climate & Social Impact | Country Materials Ltd',
    metaDescription:
      'Country Materials Ltd has recycled 50,000+ metric tonnes of scrap steel, avoiding 92,500 tonnes of CO₂, onboarding 5,000+ vendors and creating 104 direct jobs in Tanzania.',
    keywords: ['recycling Tanzania', 'CO2 emissions', 'waste management Dar es Salaam', 'ESG'],
    heroLabel: 'Impact hero',
    facilityAlt: 'Country Materials facility',
    eyebrow: 'Climate & Social Impact',
    heroHeading: 'Turning Scrap\nInto a Better Future',
    metricsLabel: 'Primary impact metrics',
    byTheNumbers: 'By the Numbers',
    measuredLine1: 'Measured impact.',
    measuredLine2: 'Verified results.',
    footnotePre: 'CO₂, landfill & energy figures calculated from',
    footnotePost: 'metric tonnes · World Steel Association / EPA conversion factors · FY',
    teamAlt: 'Country Materials team and operations',
    breakLine1: "Building Tanzania's circular economy —",
    breakLine2: 'one tonne at a time.',
    communityLabel: 'Community impact',
    peopleEyebrow: 'People & Community',
    communityLine1: 'Circular steel that',
    communityLine2: 'lifts communities.',
    womenLabel: 'Women and youth empowerment',
    workersAlt: 'Country Materials team members',
    womenEyebrow: 'Women & Youth Empowerment',
    womenLine1: 'Opportunity that',
    womenLine2: 'reaches everyone.',
    womenBody1:
      'Women are a vital part of our vendor network and yard workforce. Our mobile-first vendor platform removes the traditional barriers — no office visit, no upfront cost — making it equally accessible to women and young entrepreneurs across Tanzania.',
    womenBody2:
      'We are actively tracking gender and youth participation data across all five branches and will publish verified figures in our upcoming 2025 Impact Report.',
    scrapAlt: 'Scrap metal collection and processing',
    scrapCaption: 'Scrap collection & processing — Dar es Salaam',
    sdgLabel: 'UN Sustainable Development Goals',
    globalStandards: 'Global Standards',
    sdgLine1: 'UN Sustainable',
    sdgLine2: 'Development Goals',
    sdgIntro:
      "Our operations directly advance four of the United Nations' 17 global goals for a better world by 2030.",
    sdgGoalPrefix: 'SDG Goal',
    methodologyLabel: 'Methodology',
    methodology: 'Methodology',
    methodologyNote:
      'CO₂ avoided calculated at 1.85 tonnes CO₂ per tonne of scrap recycled (World Steel Association, 2023). Landfill diversion calculated at 0.57 m³ per tonne (US EPA). Energy savings calculated at 642 kWh per tonne (World Steel Association). Vendor, client and employment figures are verified company records as of FY',
    metricLabels: {
      tonnesRecycled: 'Tonnes Recycled',
      co2Avoided: 'CO₂ Avoided',
      landfillDiverted: 'Landfill Diverted',
      energySaved: 'Energy Saved',
      jobsCreated: 'Jobs Created',
      vendorsOnboarded: 'Vendors Onboarded',
    },
    units: {
      metricTonnes: 'metric tonnes',
      tonnesCo2: 'tonnes CO₂',
      cubicMetres: 'm³',
      kwh: 'kWh',
      directJobs: 'direct jobs',
      supplyPartners: 'supply partners',
    },
    stories: [
      { stat: '50,000+', label: 'Metric Tons Recycled', description: 'Scrap steel collected, processed and returned to the supply chain since 2022.' },
      { stat: '5,000+',  label: 'Vendors Onboarded',    description: 'Informal collectors and scrap dealers integrated into a formal circular supply chain.' },
      { stat: '320+',    label: 'Active Clients',        description: 'Construction companies, contractors and hardware dealers served across Tanzania.' },
      { stat: '104',     label: 'Jobs Created',          description: 'Direct employment generated at our facility and logistics operations in Dar es Salaam.' },
    ] as readonly { stat: string; label: string; description: string }[],
    womenCallouts: [
      { title: 'Mobile-First Platform',  body: 'Vendors register and transact from any phone — no barriers to entry.' },
      { title: 'Five Regional Branches', body: 'Presence in Dar es Salaam, Mbeya, Dodoma, Kahama, Pwani & Kilimanjaro.' },
      { title: '2025 Impact Report',     body: 'Verified gender & youth data to be published in full.' },
    ] as readonly { title: string; body: string }[],
    sdg: {
      '8':  { label: 'Decent Work & Economic Growth',           description: "We create 104+ direct jobs and bring thousands of informal vendors into Tanzania's formal economy through our mobile platform." },
      '11': { label: 'Sustainable Cities & Communities',        description: "BS 500-certified rebar delivered to construction sites nationwide supports the affordable, durable infrastructure Tanzania's cities need." },
      '12': { label: 'Responsible Consumption & Production',    description: 'Our circular model transforms scrap into certified steel — eliminating waste, reducing virgin ore demand, and closing the supply chain loop.' },
      '13': { label: 'Climate Action',                          description: "Recycling steel avoids 1.85 tonnes of CO₂ per tonne processed. We've kept over 92,500 tonnes of CO₂ out of the atmosphere and counting." },
    } as Record<string, { label: string; description: string }>,
  },

  notFound: {
    heading: 'Page Not Found',
    body: 'The page you are looking for does not exist, has been moved, or is temporarily unavailable.',
    goHome: 'Go Home',
    contactUs: 'Contact Us',
  },

  productGrid: {
    all: 'All',
    empty: 'No products in this category yet.',
  },

  contactForm: {
    successHeading: 'Message received',
    successBody: "We'll respond within 24 hours. You can also call us directly.",
    sendAnother: 'Send another message',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Your full name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    phone: 'Phone / WhatsApp',
    phonePlaceholder: '+255 7XX XXX XXX',
    subject: 'Subject',
    selectSubject: 'Select a subject',
    subjects: {
      quote: 'Request a quote',
      delivery: 'Delivery & logistics',
      vendor: 'Vendor registration',
      trade: 'Trade account',
      certification: 'Certification enquiry',
      other: 'Other',
    },
    message: 'Message',
    messagePlaceholder:
      'What can we help you with? Include quantities, sizes, and delivery location if relevant.',
    error: 'Something went wrong. Please try again or call us directly.',
    sending: 'Sending…',
    send: 'Send Message',
  },

  contactCta: {
    sectionLabel: 'Contact call to action',
    eyebrow: 'Get in Touch',
    headingLine1: 'Ready to build?',
    headingLine2: "Let's talk steel.",
    body: 'From bulk orders and delivery scheduling to tender submissions and trade accounts — our team responds within 24 hours.',
    primaryLabel: 'Request a Quote',
    secondaryLabel: 'Call Us Now',
    callOrWhatsapp: 'Call or WhatsApp',
    emailUs: 'Email us',
    headquarters: 'Headquarters',
  },

  services: {
    eyebrow: 'What We Do',
    headingLine1: 'The complete',
    headingLine2: 'steel chain.',
    allServices: 'All services',
    sectionLabel: 'Our services',
    defaults: {
      scrap: {
        title: 'Scrap Collection',
        excerpt:
          "Tanzania's largest organised scrap collection network. 5,000+ vendors, verified daily.",
        chips: ['5,000+ vendors', 'Mobile-enabled'] as readonly string[],
      },
      steel: {
        title: 'Steel Manufacturing',
        excerpt:
          'Electric arc furnace producing BS 500B-certified TMT rebar and billets from recycled scrap.',
        chips: ['BS 500B', 'TBS certified'] as readonly string[],
      },
      logistics: {
        title: 'Fleet Logistics',
        excerpt: '30+ owned trucks. 24/7 operations. Same-day dispatch across 5 regional branches.',
        chips: ['30+ vehicles', 'Same-day dispatch'] as readonly string[],
      },
      vendor: {
        title: 'Vendor Platform',
        excerpt:
          'Proprietary mobile platform connecting scrap vendors, buyers, and operations on one network.',
        chips: ['Digital payments', 'Trade accounts'] as readonly string[],
      },
    },
  },
}

export type Dictionary = typeof en
