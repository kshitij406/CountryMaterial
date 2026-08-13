import type { Dictionary } from './en'

/**
 * Kiswahili (Tanzania). Drafted for review by a native speaker before launch —
 * the trade vocabulary is the risky part: "nondo" (rebar), "chuma chakavu"
 * (scrap), "mabilleti" (billets), "ithibati" (certification).
 */
export const sw: Dictionary = {
  meta: {
    siteName: 'Country Materials Ltd',
    titleTemplate: '%s | Country Materials Ltd',
    defaultTitle: 'Country Materials Ltd',
    description:
      'Msambazaji wa kuaminika Tanzania wa vifaa vya ujenzi, suluhisho za usimamizi wa taka na huduma za usafirishaji, mwenye makao makuu Dar es Salaam.',
    keywords: [
      'vifaa vya ujenzi Tanzania',
      'usimamizi wa taka Dar es Salaam',
      'urejelezaji wa chuma chakavu Tanzania',
      'msambazaji wa vifaa vya ujenzi Tanzania',
      'usafirishaji Tanzania',
      'chuma cha BS 500',
      'nondo za TMT Tanzania',
      'uchumi wa mzunguko Afrika',
    ],
    home: {
      title:
        'Country Materials Ltd | Vifaa vya Ujenzi, Usimamizi wa Taka na Usafirishaji Tanzania',
      description:
        'Country Materials Ltd inasambaza chuma chenye ithibati ya BS 500, urejelezaji wa chuma chakavu, vifaa vya ujenzi na huduma za usafirishaji kote Tanzania, na makao makuu Dar es Salaam.',
    },
  },

  nav: {
    home: 'Mwanzo',
    about: 'Kuhusu Sisi',
    impact: 'Athari Zetu',
    shop: 'Bidhaa na Huduma',
    blog: 'Blogu',
    careers: 'Ajira',
    contact: 'Wasiliana Nasi',
    getQuote: 'Omba Bei',
    openMenu: 'Fungua menyu',
    closeMenu: 'Funga menyu',
    primaryNav: 'Urambazaji mkuu',
    mobileNav: 'Urambazaji wa simu',
    logoAlt: 'Country Materials Limited',
    switchLanguage: 'Badilisha lugha',
    switchTheme: 'Badilisha mwonekano mwepesi/giza',
  },

  footer: {
    tagline:
      'Mfumo unaoongoza wa chuma cha mzunguko nchini Tanzania — kutoka ukusanyaji wa chuma chakavu hadi chuma cha ujenzi chenye ithibati ya BS 500. Tulianzishwa mwaka 2022, Dar es Salaam.',
    company: 'Kampuni',
    services: 'Huduma',
    branches: 'Matawi',
    aboutUs: 'Kuhusu Sisi',
    ourImpact: 'Athari Zetu',
    operations: 'Shughuli Zetu',
    certifications: 'Ithibati',
    careers: 'Ajira',
    scrapCollection: 'Ukusanyaji wa Chuma Chakavu',
    steelManufacturing: 'Utengenezaji wa Chuma',
    rebarBillets: 'Nondo na Mabilleti',
    fleetLogistics: 'Usafirishaji wa Magari',
    hq: 'Dar es Salaam — Makao Makuu',
    rights: 'Haki zote zimehifadhiwa.',
    privacy: 'Sera ya Faragha',
    terms: 'Sheria na Masharti',
    cookies: 'Sera ya Vidakuzi',
  },

  hero: {
    sectionLabel: 'Ukurasa wa mwanzo',
    imageAlt: 'Shughuli za chuma za Country Materials Limited',
    location: 'Dar es Salaam, Tanzania · Tangu 2022 · Ithibati ya BS 500',
    headingLine1: 'Mfumo wa Chuma',
    headingLine2: 'cha Mzunguko Afrika',
    subheading:
      'Kutoka ukusanyaji wa chuma chakavu hadi chuma cha ujenzi chenye ithibati ya BS 500 — mnyororo wa ugavi wa chuma ulioungana zaidi Tanzania.',
    requestQuote: 'Omba Bei',
    viewProducts: 'Angalia Bidhaa',
    scroll: 'Sogeza',
  },

  stats: {
    eyebrow: 'Athari Zetu',
    headingLine1: 'Takwimu zenye',
    headingLine2: 'uzito.',
    established: 'TANGU 2022',
    city: 'DAR ES SALAAM',
    annualRevenue: 'Mapato ya Mwaka',
    revenueBody:
      'Umejengwa juu ya mtindo unaowaweka wachuuzi mbele, unaobadilisha mitandao isiyo rasmi ya chuma chakavu kuwa mnyororo wa ugavi ulio rasmi unaoendeshwa na teknolojia — ukitengeneza thamani katika kila hatua.',
    ourStory: 'Hadithi Yetu',
    viewImpactReport: 'Ona Ripoti Kamili ya Athari',
    defaults: [
      { label: 'Tani za Chuma Zilizorejelezwa', sub: 'Chuma chakavu kilichochakatwa hadi sasa' },
      { label: 'Wateja Hai',                    sub: 'Wakandarasi na wanunuzi wa viwandani' },
      { label: 'Wachuuzi kwenye Jukwaa',        sub: 'Mtandao wa kidijitali wa chuma chakavu' },
      { label: 'Wafanyakazi',                   sub: 'Katika matawi yote' },
      { label: 'Magari ya Kampuni',             sub: 'Ukusanyaji na usafirishaji' },
      { label: 'Matawi ya Mikoa',               sub: 'Mbeya · Dodoma · Kahama · Pwani · KIL' },
    ],
  },

  process: {
    sectionLabel: 'Mchakato kutoka chuma chakavu hadi chuma',
    eyebrow: 'Jinsi Inavyofanya Kazi',
    headingLine1: 'Chuma chakavu.',
    headingLine2: 'Chuma.',
    headingLine3: 'Mzunguko kamili.',
    intro:
      'Mnyororo wa kwanza Tanzania wa ugavi wa chuma cha mzunguko ulioungana kikamilifu — ukiwaunganisha wachuuzi wasio rasmi wa chuma chakavu na chuma cha ujenzi chenye ithibati kwa hatua tano. Bila madalali.',
    calloutLead: 'Mzunguko kwa muundo.',
    calloutBody:
      'Kila tani ya chuma tunayozalisha hutumia chuma chakavu kilichorejelezwa — ikipunguza uzalishaji wa CO₂ hadi asilimia 58 ikilinganishwa na uzalishaji wa chuma kipya.',
    steps: [
      {
        title: 'Ukusanyaji',
        description: 'Wachuuzi 5,000+ waliosajiliwa huleta chuma chakavu katika vituo vyetu vya ukusanyaji. Programu ya simu — uzito wa wazi, bei ya haki, malipo ya papo hapo kwa simu.',
      },
      {
        title: 'Upangaji',
        description: 'Malighafi hupangwa madaraja katika maghala yetu. Uchafu huondolewa. Kila kundi huandikishwa kwa uzito, aina na mchuuzi aliyeleta. Rekodi kamili huhifadhiwa.',
      },
      {
        title: 'Uyeyushaji',
        description: 'Chuma chakavu kilichopangwa hulishwa kwenye tanuru za umeme kwa nyuzi joto 1,600°C. Hutumia nishati kidogo, uchafuzi mdogo. Chuma kilichoyeyuka hupimwa kemia kabla ya kumwagwa.',
      },
      {
        title: 'Usokotaji',
        description: 'Mabilleti husokotwa yakiwa moto kuwa nondo za TMT za daraja la BS 500B. Muundo wa mbavu, kipenyo na nguvu huthibitishwa dhidi ya viwango katika kila mzunguko.',
      },
      {
        title: 'Usambazaji',
        description: 'Malori 30+ ya kampuni husafirisha chuma chenye ithibati ya TBS kwa wateja hai 320+ kote Tanzania. Usafirishaji siku hiyo hiyo kutoka hifadhi iliyopo.',
      },
    ],
  },

  operations: {
    sectionLabel: 'Shughuli na magari',
    eyebrow: 'Shughuli na Magari',
    headingLine1: 'Matawi 5.',
    headingLine2: 'Magari 30+.',
    headingLine3: 'Saa 24.',
    intro:
      'Mtandao wetu wa usafirishaji hufanya kazi mchana na usiku — ukikusanya chuma chakavu, ukisafirisha chuma, na kuhakikisha sekta ya ujenzi Tanzania inaendelea bila kukatizwa.',
    fleetAlt: 'Magari ya Country Materials',
    fleetEyebrow: 'Magari Yetu',
    fleetCaption: 'Magari 30+ ya kampuni — chuma chakavu ndani, chuma nje.',
    teamAlt: 'Timu ya Country Materials',
    teamCaption: 'Timu Yetu · wafanyakazi 104',
    facilityAlt: 'Kiwanda kikuu cha Country Materials',
    facilityCaption: 'Kiwanda Kikuu · DSM',
    branchRoles: [
      'Makao Makuu na Ghala Kuu',
      'Kituo cha Nyanda za Juu Kusini',
      'Tawi la Kanda ya Kati',
      'Shughuli za Kanda ya Ziwa',
      'Kituo cha Ukusanyaji Pwani',
      'Tawi la Kanda ya Kaskazini',
    ],
    fleetStats: [
      'Malori ya ukusanyaji',
      'Maghala ya mikoa',
      'Shughuli',
      'Wafanyakazi',
    ],
  },

  certifications: {
    sectionLabel: 'Ithibati na ubora',
    eyebrow: 'Ubora na Ithibati',
    headingLine1: 'Kila kundi',
    headingLine2: 'hupimwa na',
    headingLine3: 'kuthibitishwa.',
    intro:
      'Hatusafirishi chuma kisicho na ithibati. Kamwe. Maabara yetu ya ndani na ukaguzi huru huhakikisha kila tani inayotoka ghalani mwetu inakidhi viwango ambavyo jengo lako linavitegemea.',
    codeLabel: 'Namba ya ithibati',
    certifiedActive: 'Imethibitishwa na Inatumika',
    qcEyebrow: 'Vipimo vya Udhibiti wa Ubora',
    qcHeading: 'Kila kundi hupimwa kabla ya kutoka ghalani mwetu.',
    qcBody:
      'Upimaji huru wa maabara pamoja na udhibiti wa ubora wa ndani katika kila mzunguko wa uzalishaji. Vyeti vya kiwanda hupatikana kwa ombi.',
    items: [
      {
        name: 'Kiwango cha Uingereza BS 500',
        authority: 'Taasisi ya Viwango ya Uingereza',
        description: 'Nondo zetu za TMT zinakidhi BS 500B — kiwango kinachotambulika kimataifa cha chuma imara cha kuimarisha kinachotumika katika ujenzi unaostahimili matetemeko na wa daraja la kimuundo.',
      },
      {
        name: 'Shirika la Viwango Tanzania',
        authority: 'TBS — Serikali ya Tanzania',
        description: 'Ithibati kamili ya TBS inahakikisha bidhaa zetu zinakidhi viwango vya kitaifa vya ubora vya Tanzania. Kila kundi hupimwa maabara kwa nguvu ya kuvuta, uwezo wa kupinda, na muundo wa kemikali.',
      },
      {
        name: 'Mfumo wa Usimamizi wa Ubora',
        authority: 'Shirika la Kimataifa la Viwango',
        description: 'Michakato yetu ya uzalishaji na udhibiti wa ubora inakidhi ISO 9001 — ikihakikisha ubora thabiti wa bidhaa kuanzia chuma chakavu kinachoingia hadi chuma kilichokamilika kinachosafirishwa.',
      },
    ],
    testingPoints: [
      'Nguvu ya kuvuta (mwanzo na kikomo)',
      'Uchambuzi wa muundo wa kemikali',
      'Upimaji wa kupinda na kunyoosha',
      'Umbo la uso na muundo wa mbavu',
      'Uthibitisho wa uzito kwa mita',
      'Kumbukumbu za ufuatiliaji wa makundi',
    ],
  },

  products: {
    sectionLabel: 'Katalogi ya bidhaa',
    eyebrow: 'Katalogi ya Bidhaa',
    headingLine1: 'Chuma chenye ithibati,',
    headingLine2: 'tayari kusafirishwa.',
    fullCatalogue: 'Katalogi kamili',
    inStock: 'Kipo Ghalani',
    contactUs: 'Wasiliana Nasi',
    contactForPricing: 'Wasiliana kwa bei',
    details: 'Maelezo',
    ctaBody:
      'Unahitaji vipimo maalum, bei ya jumla, au usafirishaji wa ratiba? Timu yetu ya chuma hujibu ndani ya saa 24.',
    ctaButton: 'Zungumza na Timu Yetu ya Chuma',
    perTonne: 'Kwa tani',
    specDiameter: 'Kipenyo',
    specLength: 'Urefu',
    specSection: 'Ukubwa',
    fallback: [
      { name: 'Nondo za TMT — 8mm',  description: 'Nondo imara zenye mbavu kwa ajili ya kuimarisha sakafu, nguzo na misingi. Zinakidhi BS 500B na TBS.' },
      { name: 'Nondo za TMT — 10mm', description: 'Nondo za kawaida za 10mm zenye mbavu kwa ajili ya kuimarisha zege za makazi na biashara. Zinapatikana kwa urefu wa mita 12.' },
      { name: 'Nondo za TMT — 12mm', description: 'Nondo za TMT za 12mm kwa ujenzi wa kati na mzito. Muundo thabiti wa mbavu huhakikisha mshikamano bora na zege.' },
      { name: 'Nondo za TMT — 16mm', description: 'Nondo imara za 16mm zenye mbavu kwa madaraja, majengo marefu na miradi ya miundombinu. Zinadhibitiwa kwa mchakato wa ISO.' },
      { name: 'Mabilleti ya Chuma',  description: 'Mabilleti ya mraba yanayotengenezwa kwa chuma chakavu kilichorejelezwa kwa asilimia 100. Hutumika kama malighafi kwa viwanda vya kusokota. Yanapatikana kwa ukubwa wa 100mm na 125mm.' },
      { name: 'Nondo za TMT — 20mm', description: 'Nondo nzito zaidi za TMT za 20mm kwa vichwa vya nguzo, kuta za kuzuia na miundombinu mikubwa. Bei ya jumla inapatikana.' },
    ],
  },

  clients: {
    sectionLabel: 'Washirika na mtandao wa wachuuzi',
    logosLabel: 'Nembo za kampuni washirika',
    eyebrow: 'Mtandao wa Wachuuzi',
    headingLine1: 'Wachuuzi 5,000+.',
    headingLine2: 'Mtandao mmoja.',
    becomeVendor: 'Kuwa Mchuuzi',
    valueProps: [
      { title: 'Bei ya Haki',        body: 'Bei za soko za wakati halisi kwa chuma chakavu chako — bila madalali, bila kubishana.' },
      { title: 'Malipo ya Papo Hapo', body: 'Uhamisho wa fedha kwa simu papo hapo. Bila kusubiri, bila hundi.' },
      { title: 'Kupitia Programu',   body: 'Fuatilia ukusanyaji, thibitisha uzito, na simamia akaunti yako kwa simu yako.' },
    ],
  },

  productCard: {
    inStock: 'Kipo ghalani',
    contactUs: 'Wasiliana nasi',
    contactForPricing: 'Wasiliana kwa bei',
    buyNow: 'Nunua Sasa',
    checkoutSoon: 'Ununuzi mtandaoni unakuja hivi karibuni',
    copyLink: 'Nakili kiungo',
    copied: 'Imenakiliwa',
  },

  shopPage: {
    metaTitle: 'Bidhaa na Huduma | Country Materials Ltd',
    metaDescription:
      'Angalia nondo za TMT zenye ithibati ya BS 500B, mabilleti ya chuma, vifaa vya ujenzi na huduma zote kutoka Country Materials Ltd. Omba bei na usafirishaji wa jumla kote Tanzania.',
    eyebrow: 'Bidhaa na Huduma',
    headingPlain: 'Kila kitu tunachokisambaza',
    headingAccent: 'na kukifanya',
    intro:
      'Chuma cha daraja la BS 500, vifaa vya ujenzi na malighafi — pamoja na huduma za ukusanyaji, utengenezaji na usafirishaji zinazoviunga mkono.',
    erpEyebrow: 'Orodha ya Bei ya ERP',
    erpBody: 'Katalogi yetu kamili ya bidhaa yenye bei za sasa inapatikana kupitia mfumo wetu wa ERP, unaosasishwa kila wiki.',
    erpDefaultLabel: 'Angalia Orodha ya Bei',
    catalogueEyebrow: 'Katalogi',
    productsHeading: 'Bidhaa',
    items: 'BIDHAA',
    whatWeDo: 'Tunachofanya',
    servicesHeading: 'Huduma',
    servicesCount: 'HUDUMA',
    learnMore: 'Jifunze zaidi',
    ctaLabel: 'Wito wa kuomba bei',
    ctaHeadingLine1: 'Unahitaji bei ya jumla',
    ctaHeadingLine2: 'au bei maalum?',
    ctaBody:
      'Tunasambaza kwa wakandarasi, waendelezaji na biashara kwa bei nafuu za jumla. Timu yetu hujibu ndani ya saa 24.',
    ctaButton: 'Omba Bei',
    servicesFallback: [
      { title: 'Ukusanyaji na Urejelezaji wa Chuma Chakavu', excerpt: 'Mtandao mkubwa zaidi uliopangwa wa ukusanyaji wa chuma chakavu Tanzania — unaothibitishwa kila siku kupitia jukwaa letu la simu.', chips: ['Wachuuzi 5,000+', 'Ukusanyaji nchi nzima'] },
      { title: 'Utengenezaji wa Chuma chenye Ithibati',      excerpt: 'Teknolojia ya tanuru la umeme inayozalisha nondo za TMT na mabilleti zenye ithibati ya BS 500.',                                    chips: ['Ithibati ya BS 500B', 'Makundi yaliyopimwa maabara'] },
      { title: 'Jukwaa la Wachuuzi na Ununuzi',              excerpt: 'Jukwaa la simu linalounganisha wachuuzi wa chuma chakavu, wateja wa ujenzi na shughuli zetu.',                                       chips: ['Bei za wakati halisi', 'Malipo ya kidijitali'] },
      { title: 'Usafirishaji na Usambazaji',                 excerpt: 'Malori 30+ ya kampuni yanayofanya kazi saa 24 katika matawi 5 ya mikoa.',                                                            chips: ['Magari 30+ ya kampuni', 'Usafirishaji siku hiyo hiyo'] },
    ],
  },

  contactPage: {
    metaTitle: 'Wasiliana Nasi | Country Materials Ltd',
    metaDescription:
      'Wasiliana na timu ya Country Materials Ltd Dar es Salaam kuomba bei, kuagiza kwa jumla, au kupata ghala lililo karibu nawe katika matawi matano Tanzania.',
    heroLabel: 'Ukurasa wa mawasiliano',
    eyebrow: 'Wasiliana Nasi',
    headingLine1: 'Tunajibu ndani ya',
    headingLine2: 'saa 24.',
    intro:
      'Kutoka maagizo makubwa na usafirishaji hadi usajili wa wachuuzi na akaunti za biashara — wasiliana na timu yetu moja kwa moja.',
    sectionLabel: 'Taarifa za mawasiliano na fomu',
    directContact: 'Mawasiliano ya Moja kwa Moja',
    phoneLabel: 'Simu / WhatsApp',
    emailLabel: 'Barua Pepe',
    hqLabel: 'Makao Makuu',
    allBranches: 'Matawi Yote',
    formHeading: 'Tutumie ujumbe',
    formIntro: 'Tutakujibu ndani ya saa 24, Jumatatu hadi Jumamosi.',
    hours24: 'Saa 24',
    hoursStandard: '8asubuhi–6jioni',
    branchNotes: [
      'Makao Makuu na Ghala Kuu',
      'Kituo cha Nyanda za Juu Kusini',
      'Tawi la Kanda ya Kati',
      'Shughuli za Kanda ya Ziwa',
      'Kituo cha Ukusanyaji Pwani',
      'Tawi la Kanda ya Kaskazini',
    ],
  },

  productDetail: {
    notFoundTitle: 'Bidhaa Haijapatikana | Country Materials Ltd',
    metaFallback: 'inapatikana kutoka Country Materials Ltd, Dar es Salaam, Tanzania.',
    allProducts: 'Bidhaa Zote',
    specifications: 'Vipimo',
    enquire: 'Una swali? Uliza kuhusu bidhaa hii',
  },

  floating: {
    watchVideo: 'Tazama video yetu',
    whatsapp: 'Zungumza nasi kwa WhatsApp',
  },

  ctaBanner: {
    eyebrow: 'Wasiliana nasi',
    heading: 'Uko tayari\nKufanya Kazi Nasi?',
    subtext:
      'Iwe unahitaji usambazaji wa chuma, msaada wa chuma chakavu, au usafirishaji wa kuaminika, timu yetu iko tayari kukusaidia.',
    primaryLabel: 'Wasiliana Nasi Leo',
    secondaryLabel: 'Angalia Huduma Zetu',
  },

  legal: {
    heroLabel: 'Kichwa cha ukurasa',
    eyebrow: 'Kisheria',
    lastUpdated: 'Ilisasishwa mwisho',
    comingSoon: 'Maudhui yanakuja hivi karibuni.',
    dateLocale: 'sw-TZ',
    terms: {
      title: 'Sheria za Matumizi',
      description:
        'Soma Sheria za Matumizi zinazosimamia ufikiaji wako wa tovuti ya Country Materials Ltd, ikijumuisha haki miliki na mipaka ya dhima.',
    },
    privacy: {
      title: 'Sera ya Faragha',
      description:
        'Jinsi Country Materials Ltd inavyokusanya, kutumia na kulinda taarifa zako binafsi.',
    },
    cookies: {
      title: 'Sera ya Vidakuzi',
      description: 'Jinsi Country Materials Ltd inavyotumia vidakuzi na teknolojia zinazofanana kwenye tovuti hii.',
    },
  },

  blog: {
    metaTitle: 'Blogu | Country Materials Ltd',
    metaDescription:
      'Soma habari za hivi karibuni, taarifa za miradi na matangazo kutoka Country Materials Ltd — mtengenezaji anayeongoza wa chuma cha mzunguko Tanzania, mwenye makao Dar es Salaam.',
    eyebrow: 'Habari Mpya kutoka Country Materials',
    headingPlain: '',
    headingAccent: 'Blogu',
    intro:
      'Endelea kufahamu maendeleo yetu ya hivi karibuni, taarifa za bidhaa na matangazo ya kampuni.',
    empty: 'Hakuna makala bado - rudi hivi karibuni.',
    featured: 'Iliyoangaziwa',
    readArticle: 'Soma Makala',
    readMore: 'Soma Zaidi',
    backToBlog: 'Rudi kwenye Blogu',
    allPosts: 'Makala Zote',
    by: 'na',
    postFallbackDescription:
      'Soma habari na taarifa za hivi karibuni kutoka Country Materials Ltd, mtengenezaji anayeongoza wa chuma cha mzunguko Tanzania.',
    notFoundTitle: 'Makala Haijapatikana | Country Materials Ltd',
    dateLocale: 'sw-TZ',
  },

  careers: {
    metaTitle: 'Ajira | Country Materials Ltd',
    metaDescription:
      'Jiunge na Country Materials Ltd Dar es Salaam. Nafasi wazi katika usafirishaji, usimamizi wa taka, mauzo na teknolojia katika sekta inayokua ya chuma cha mzunguko Tanzania.',
    eyebrow: 'Jiunge na Timu Yetu',
    headingPrefix: 'Jenga Taaluma Yako na',
    intro:
      'Tunakua na tunatafuta watu wenye bidii na uwezo wa kujiunga nasi katika kujenga mustakabali wa viwanda wa Tanzania.',
    openPositions: 'Nafasi Wazi',
    currentPlain: 'Fursa',
    currentAccent: 'za Sasa',
    openRoles: 'NAFASI WAZI',
    closes: 'Inafunga',
    noneHeading: 'Hakuna Nafasi Wazi kwa Sasa',
    noneBody:
      'Kwa sasa hatuajiri, lakini tunakaribisha maombi ya watu wenye vipaji wakati wowote.',
    whyEyebrow: 'Kwa Nini Ufanye Kazi Hapa',
    whyHeadingPre: 'Timu Inayochukulia',
    whyHeadingAccent: 'Kazi',
    whyHeadingPost: 'kwa Uzito',
    culture: 'UTAMADUNI',
    basedInPre: 'Tukiwa',
    basedInPost:
      'sisi ni kampuni inayokua yenye lengo la kupanuka kote katika kanda. Kujiunga nasi sasa maana yake kukua pamoja nasi.',
    ctaHeading: 'Huoni Nafasi\\nInayokufaa?',
    ctaSubtext:
      'Tutumie wasifu wako na maelezo mafupi ya unachotafuta. Tutahifadhi taarifa zako.',
    ctaPrimary: 'Wasiliana Nasi',
    ctaSecondary: 'Kuhusu Kampuni',
    dateLocale: 'sw-TZ',
    backToCareers: 'Nafasi Zote',
    applyNow: 'Omba Sasa',
    requirements: 'Sifa Zinazohitajika',
    notFoundTitle: 'Nafasi Haijapatikana | Country Materials Ltd',
    detail: {
      allPositions: 'Nafasi Zote',
      positionClosed: 'Nafasi Imefungwa',
      applicationsClose: 'Maombi yanafungwa',
      aboutRole: 'Kuhusu Nafasi Hii',
      requirements: 'Sifa Zinazohitajika',
      closedHeading: 'Nafasi Hii Imefungwa',
      applyHeading: 'Omba Nafasi Hii',
      closedBody:
        'Nafasi hii haipokei maombi tena. Angalia nafasi zetu nyingine wazi au tuma ombi la jumla.',
      applyBodyPre: 'Tuma wasifu wako na barua ya maombi ukitaja',
      applyBodyPost: 'kwenye mada ya barua pepe.',
      generalEnquiry: 'Ombi la Jumla',
      applyNow: 'Omba Sasa',
      allOpenPositions: 'Nafasi Zote Wazi',
      closingDate: 'Tarehe ya Mwisho',
      department: 'Idara',
      location: 'Mahali',
      type: 'Aina',
      metaFallbackPre: 'Omba nafasi ya',
      metaFallbackPost: 'katika Country Materials Ltd. Tukiwa',
    },
    whyItems: [
      { title: 'Ukuaji kwa Uwezo',        desc: 'Utendaji hutambuliwa na kuzawadiwa kwa fursa halisi za kupanda cheo.' },
      { title: 'Utamaduni wa Ushirikiano', desc: 'Kufanya kazi pamoja ndio msingi wa shughuli zetu - hakuna mgawanyiko, hakuna siasa.' },
      { title: 'Athari za Kikanda',        desc: 'Kazi yenye maana kwa Tanzania na kanda. Matokeo yako yanaonekana.' },
      { title: 'Kampuni Inayokua',         desc: 'Jiunge mapema na ukue nasi tunapopanuka kote katika kanda.' },
    ],
    fallbackJobs: [
      {
        title: 'Mratibu wa Usafirishaji',
        department: 'Usafirishaji',
        description: 'Ratibu shughuli za kila siku za usafirishaji wa mizigo, simamia mahusiano na wasafirishaji, na hakikisha uwasilishaji kwa wakati katika mtandao wetu.',
        requirements: [
          'Stashahada au shahada ya Usafirishaji, Mnyororo wa Ugavi, au fani inayohusiana',
          'Uzoefu wa angalau miaka 2 katika usafirishaji au usambazaji wa mizigo',
          'Ujuzi imara wa upangaji na mawasiliano',
        ],
      },
      {
        title: 'Msimamizi wa Ukusanyaji wa Taka',
        department: 'Usimamizi wa Taka',
        description: 'Simamia timu za ukusanyaji wa chuma chakavu, hakikisha kufuata sheria za usimamizi wa taka, na ratibu na wateja wa viwandani na vituo vya urejelezaji.',
        requirements: [
          'Cheti au stashahada ya Sayansi ya Mazingira, Afya ya Jamii, au fani inayohusiana',
          'Uzoefu wa kusimamia timu za uwandani',
          'Ufahamu wa sheria za usimamizi wa taka Tanzania',
        ],
      },
    ],
  },

  serviceDetail: {
    breadcrumb: 'Huduma',
    overview: 'Muhtasari',
    coversPre: 'Huduma Hii',
    coversAccent: 'Inahusisha Nini',
    requestQuote: 'Omba Bei',
    keyPre: 'Uwezo',
    keyAccent: 'Muhimu',
    metaFallback:
      'Angalia huduma zetu za viwandani ikijumuisha utengenezaji wa chuma, ukusanyaji wa chuma chakavu, jukwaa la wachuuzi na usafirishaji kote Tanzania.',
    ctaHeading: 'Uko Tayari Kutumia\\nHuduma Zetu?',
    ctaSubtext:
      'Wasiliana na timu yetu kwa bei maalum au kujadili mahitaji yako mahsusi.',
    ctaPrimary: 'Wasiliana Nasi',
    ctaSecondary: 'Huduma Zote',
    statics: {
      transportation: {
        title: 'Usafirishaji na Shughuli za Magari',
        label: 'Usafirishaji',
        excerpt: 'Shughuli za magari zinazounga mkono usafirishaji wa chuma chakavu, shughuli za ghala, na uratibu wa usambazaji kote Tanzania.',
        intro: 'Uwezo wetu wa ndani wa usafirishaji unaunga mkono usafirishaji wa chuma chakavu, shughuli za ghala, na uratibu wa usambazaji kati ya matawi na maeneo ya wateja. Tunazingatia usalama, kutegemewa, na utendaji thabiti.',
        features: ['Uratibu wa ukusanyaji na usambazaji wa chuma chakavu', 'Shughuli za magari ya kampuni (magari 30+)', 'Uhamisho kati ya matawi na upangaji wa njia', 'Msaada wa shughuli za ghala na ratiba', 'Uratibu wa uwasilishaji wa miradi (inapohusika)'],
        highlightLabels: ['Magari ya Kampuni', 'Matawi', 'Shughuli'],
      },
      hardware: {
        title: 'Jukwaa la Wachuuzi na Ununuzi',
        label: 'Jukwaa',
        excerpt: 'Jukwaa letu la simu linalorasimisha wachuuzi 5,000+ wa chuma chakavu ili kuboresha uwazi, bei, na ufanisi wa upatikanaji.',
        intro: 'Jukwaa letu la simu linarasimisha mnyororo wa ugavi wa chuma chakavu, likiboresha uwazi, ufuatiliaji, na utendaji. Linawasaidia wachuuzi kushiriki kwa uthabiti na linaunga mkono upatikanaji wa kuaminika wa malighafi kwa uzalishaji wa chuma chenye ithibati.',
        features: ['Usajili na usimamizi wa wachuuzi kwa njia ya kidijitali', 'Michakato ya wazi ya upatikanaji na ununuzi', 'Uratibu wa ugavi kutoka ukusanyaji hadi uchakataji', 'Msaada wa ufuatiliaji na taarifa (inapohusika)'],
        highlightLabels: ['Wachuuzi', 'Chuma Chakavu cha Ndani', 'Wateja Hai'],
      },
      steel: {
        title: 'Bidhaa za Chuma zenye Ithibati',
        label: 'Chuma',
        excerpt: 'Chuma chenye ithibati ya BS 500 na nondo za TMT kwa ujenzi wa kuaminika. Mabilleti na bidhaa zilizokamilika zenye upatikanaji unaofuatiliwa.',
        intro: 'Tunageuza chuma chakavu kinachopatikana ndani kuwa bidhaa bora za chuma zenye ithibati ya BS 500 zinazounga mkono ujenzi nafuu na uimara wa muda mrefu. Vipimo kamili, ukubwa, kiwango cha chini cha agizo, na bei vinapatikana kwa ombi.',
        features: ['Chuma chenye ithibati ya BS 500 / nondo za TMT', 'Mabilleti ya chuma na bidhaa zilizokamilika', 'Vipimo vilivyo wazi na upatikanaji unaofuatiliwa', 'Uratibu wa miradi kwa upangaji wa ugavi'],
        highlightLabels: ['Chuma chenye Ithibati', 'Tani Zilizorejelezwa', 'Wateja'],
      },
      'waste-management': {
        title: 'Ukusanyaji na Urejelezaji wa Chuma Chakavu',
        label: 'Urejelezaji',
        excerpt: 'Ukusanyaji, upangaji na urejelezaji wa chuma chakavu unaogeuza taka za ndani kuwa chuma bora chenye ithibati.',
        intro: 'Shughuli zetu za urejelezaji zinaunganisha wachuuzi wasio rasmi wa chuma chakavu, wazalishaji wa viwandani, na uzalishaji wa chuma katika mnyororo mmoja wa ugavi wa mzunguko. Matokeo yake ni mtindo wenye ufanisi zaidi, uwazi, na uwajibikaji wa kimazingira kwa chuma Tanzania na kwingineko.',
        features: ['Ukusanyaji na ukusanyiko wa chuma chakavu', 'Upangaji na uchakataji wa chuma chakavu cha viwandani', 'Shughuli za urejeshaji na urejelezaji wa malighafi', 'Nyaraka za kufuata sheria na taarifa (inapohusika)'],
        highlightLabels: ['Tani Zilizorejelezwa', 'Wachuuzi kwenye Jukwaa', 'Wafanyakazi'],
      },
    },
  },

  about: {
    metaTitle: 'Kuhusu Sisi | Country Materials Ltd',
    metaDescription:
      'Jifunze jinsi Country Materials Ltd ilivyojenga mfumo unaoongoza wa chuma cha mzunguko Tanzania — kutoka wachuuzi wasio rasmi wa chuma chakavu hadi nondo zenye ithibati ya BS 500 zinazosafirishwa nchi nzima.',
    heroLabel: 'Kichwa cha ukurasa wa kuhusu sisi',
    facilityAlt: 'Kiwanda cha Country Materials',
    eyebrow: 'Kuhusu Sisi',
    headingLine1: 'Tumejengwa kwa Tanzania.',
    headingLine2: 'Tumejengwa kudumu.',
    intro:
      'Country Materials Limited ni mtengenezaji anayeongoza wa chuma cha mzunguko na mfumo wa urejelezaji wa chuma chakavu Tanzania — ilianzishwa mwaka 2022, makao makuu Dar es Salaam.',
    missionVisionLabel: 'Dhamira na maono',
    ourMission: 'Dhamira Yetu',
    mission:
      'Tunageuza chuma chakavu kuwa chuma bora chenye ithibati, tukiwezesha ujenzi nafuu huku tukiwawezesha wachuuzi wasio rasmi wa chuma chakavu na kuchochea ukuaji endelevu wa viwanda kote Afrika.',
    ourVision: 'Maono Yetu',
    vision:
      'Kujenga mfumo wa chuma cha mzunguko unaoaminika zaidi Afrika, tukifanya vifaa bora vya ujenzi vipatikane huku tukigeuza taka kuwa fursa kwa mamilioni ya watu.',
    milestonesLabel: 'Hatua muhimu za kampuni',
    ourStory: 'Hadithi Yetu',
    storyLine1: 'Kutoka wazo hadi',
    storyLine2: 'mtandao unaobadilisha',
    storyLine3: 'sekta.',
    storyBody:
      'Country Materials ilianzishwa kwa uchunguzi mmoja: Tanzania ilikuwa na chuma chakavu kingi, mahitaji makubwa ya ujenzi, na hakuna mnyororo wa ugavi uliopangwa kuviunganisha. Tulijenga daraja — kutoka wachuuzi wasio rasmi wenye simu za mkononi hadi chuma chenye ithibati kinachotoka maghala yenye ithibati.',
    teamAlt: 'Timu ya Country Materials',
    scrapAlt: 'Ukusanyaji wa chuma chakavu',
    hardwareAlt: 'Bidhaa za vifaa vya ujenzi',
    valuesLabel: 'Maadili ya kampuni',
    standForEyebrow: 'Tunachokisimamia',
    principlesLine1: 'Misingi',
    principlesLine2: 'iliyo nyuma ya bidhaa.',
    ctaLabel: 'Wito wa kuwasiliana',
    ctaHeadingLine1: 'Unataka kujua zaidi?',
    ctaHeadingLine2: 'Tuzungumze.',
    contactUs: 'Wasiliana Nasi',
    viewProducts: 'Angalia Bidhaa',
    milestones: [
      { year: '2022', event: 'Ilianzishwa Dar es Salaam kwa maono ya kurasimisha mnyororo wa ugavi kutoka chuma chakavu hadi chuma Tanzania.' },
      { year: '2023', event: 'Tulizindua jukwaa la simu la wachuuzi. Tulisajili wachuuzi 2,000+ wa chuma chakavu ndani ya miezi 6.' },
      { year: '2024', event: 'Tulipata ithibati ya BS 500B na TBS. Tulifungua matawi Mbeya na Dodoma.' },
      { year: '2025', event: 'Tulipanuka hadi matawi 5, magari 30+, mapato ya dola milioni 11.2, wachuuzi 5,000+ waliosajiliwa kidijitali.' },
    ],
    values: [
      { title: 'Watu',        icon: '🤝', body: 'Tupo ili kuinua jamii tunazozihudumia kwa kutengeneza ajira zenye heshima, kuwawezesha wachuuzi wa chuma chakavu, na kujenga fursa jumuishi za kiuchumi katika mnyororo mzima wa thamani.' },
      { title: 'Sayari',      icon: '🌍', body: 'Tumejitolea kugeuza taka kuwa thamani, kupunguza madhara ya kimazingira, na kujenga biashara inayoboresha maisha huku ikisonga mbele mustakabali endelevu wa mzunguko.' },
      { title: 'Ushirikiano', icon: '🔗', body: 'Tunaamini athari ya kudumu hujengwa pamoja. Tunashirikiana na wachuuzi, wadau wa sekta, na jamii kujenga uaminifu, thamani ya pamoja, na suluhisho zinazoweza kupanuka.' },
    ],
  },

  impact: {
    metaTitle: 'Athari za Tabianchi na Kijamii | Country Materials Ltd',
    metaDescription:
      'Country Materials Ltd imerejeleza tani 50,000+ za chuma chakavu, ikiepusha tani 92,500 za CO₂, ikisajili wachuuzi 5,000+ na kutengeneza ajira 104 za moja kwa moja Tanzania.',
    keywords: ['urejelezaji Tanzania', 'uzalishaji wa CO2', 'usimamizi wa taka Dar es Salaam', 'ESG'],
    heroLabel: 'Kichwa cha ukurasa wa athari',
    facilityAlt: 'Kiwanda cha Country Materials',
    eyebrow: 'Athari za Tabianchi na Kijamii',
    heroHeading: 'Kugeuza Chuma Chakavu\nKuwa Mustakabali Bora',
    metricsLabel: 'Vipimo vikuu vya athari',
    byTheNumbers: 'Kwa Takwimu',
    measuredLine1: 'Athari zilizopimwa.',
    measuredLine2: 'Matokeo yaliyothibitishwa.',
    footnotePre: 'Takwimu za CO₂, taka na nishati zimehesabiwa kutokana na tani',
    footnotePost: 'za kipimo · Vigezo vya ubadilishaji vya World Steel Association / EPA · Mwaka wa fedha',
    teamAlt: 'Timu na shughuli za Country Materials',
    breakLine1: 'Tunajenga uchumi wa mzunguko wa Tanzania —',
    breakLine2: 'tani moja baada ya nyingine.',
    communityLabel: 'Athari kwa jamii',
    peopleEyebrow: 'Watu na Jamii',
    communityLine1: 'Chuma cha mzunguko',
    communityLine2: 'kinachoinua jamii.',
    womenLabel: 'Uwezeshaji wa wanawake na vijana',
    workersAlt: 'Wafanyakazi wa Country Materials',
    womenEyebrow: 'Uwezeshaji wa Wanawake na Vijana',
    womenLine1: 'Fursa inayowafikia',
    womenLine2: 'wote.',
    womenBody1:
      'Wanawake ni sehemu muhimu ya mtandao wetu wa wachuuzi na wafanyakazi wa maghala. Jukwaa letu la wachuuzi linalotumia simu linaondoa vikwazo vya kawaida — bila kutembelea ofisi, bila gharama ya awali — likifanya lipatikane kwa usawa kwa wanawake na vijana wajasiriamali kote Tanzania.',
    womenBody2:
      'Tunafuatilia kwa bidii takwimu za ushiriki wa kijinsia na vijana katika matawi yote matano na tutachapisha takwimu zilizothibitishwa katika Ripoti yetu ya Athari ya mwaka 2025.',
    scrapAlt: 'Ukusanyaji na uchakataji wa chuma chakavu',
    scrapCaption: 'Ukusanyaji na uchakataji wa chuma chakavu — Dar es Salaam',
    sdgLabel: 'Malengo ya Maendeleo Endelevu ya Umoja wa Mataifa',
    globalStandards: 'Viwango vya Kimataifa',
    sdgLine1: 'Malengo ya Maendeleo',
    sdgLine2: 'Endelevu ya Umoja wa Mataifa',
    sdgIntro:
      'Shughuli zetu zinasukuma mbele moja kwa moja manne kati ya malengo 17 ya kimataifa ya Umoja wa Mataifa kwa dunia bora ifikapo 2030.',
    sdgGoalPrefix: 'Lengo la SDG',
    methodologyLabel: 'Mbinu',
    methodology: 'Mbinu',
    methodologyNote:
      'CO₂ iliyoepukwa imehesabiwa kwa tani 1.85 za CO₂ kwa kila tani ya chuma chakavu kilichorejelezwa (World Steel Association, 2023). Uepushaji wa taka umehesabiwa kwa mita za ujazo 0.57 kwa tani (US EPA). Uokoaji wa nishati umehesabiwa kwa kWh 642 kwa tani (World Steel Association). Takwimu za wachuuzi, wateja na ajira ni kumbukumbu za kampuni zilizothibitishwa hadi mwaka wa fedha',
    metricLabels: {
      tonnesRecycled: 'Tani Zilizorejelezwa',
      co2Avoided: 'CO₂ Iliyoepukwa',
      landfillDiverted: 'Taka Zilizoepushwa',
      energySaved: 'Nishati Iliyookolewa',
      jobsCreated: 'Ajira Zilizotengenezwa',
      vendorsOnboarded: 'Wachuuzi Waliosajiliwa',
    },
    units: {
      metricTonnes: 'tani za kipimo',
      tonnesCo2: 'tani za CO₂',
      cubicMetres: 'm³',
      kwh: 'kWh',
      directJobs: 'ajira za moja kwa moja',
      supplyPartners: 'washirika wa ugavi',
    },
    stories: [
      { stat: '50,000+', label: 'Tani Zilizorejelezwa',  description: 'Chuma chakavu kilichokusanywa, kuchakatwa na kurudishwa kwenye mnyororo wa ugavi tangu 2022.' },
      { stat: '5,000+',  label: 'Wachuuzi Waliosajiliwa', description: 'Wakusanyaji wasio rasmi na wafanyabiashara wa chuma chakavu walioingizwa katika mnyororo rasmi wa ugavi wa mzunguko.' },
      { stat: '320+',    label: 'Wateja Hai',             description: 'Kampuni za ujenzi, wakandarasi na wauzaji wa vifaa vya ujenzi wanaohudumiwa kote Tanzania.' },
      { stat: '104',     label: 'Ajira Zilizotengenezwa', description: 'Ajira za moja kwa moja zilizotengenezwa katika kiwanda chetu na shughuli za usafirishaji Dar es Salaam.' },
    ],
    womenCallouts: [
      { title: 'Jukwaa Linalotumia Simu',  body: 'Wachuuzi hujisajili na kufanya biashara kwa simu yoyote — bila vikwazo vya kuanza.' },
      { title: 'Matawi Matano ya Mikoa',   body: 'Tupo Dar es Salaam, Mbeya, Dodoma, Kahama, Pwani na Kilimanjaro.' },
      { title: 'Ripoti ya Athari ya 2025', body: 'Takwimu zilizothibitishwa za kijinsia na vijana zitachapishwa kwa ukamilifu.' },
    ],
    sdg: {
      '8':  { label: 'Kazi Zenye Staha na Ukuaji wa Uchumi',   description: 'Tunatengeneza ajira 104+ za moja kwa moja na kuwaingiza maelfu ya wachuuzi wasio rasmi katika uchumi rasmi wa Tanzania kupitia jukwaa letu la simu.' },
      '11': { label: 'Miji na Jamii Endelevu',                  description: 'Nondo zenye ithibati ya BS 500 zinazopelekwa maeneo ya ujenzi nchi nzima zinaunga mkono miundombinu nafuu na imara ambayo miji ya Tanzania inahitaji.' },
      '12': { label: 'Matumizi na Uzalishaji Wenye Uwajibikaji', description: 'Mtindo wetu wa mzunguko hugeuza chuma chakavu kuwa chuma chenye ithibati — ukiondoa taka, ukipunguza mahitaji ya madini mapya, na kufunga mzunguko wa ugavi.' },
      '13': { label: 'Hatua za Tabianchi',                      description: 'Kurejeleza chuma huepusha tani 1.85 za CO₂ kwa kila tani inayochakatwa. Tumeepusha zaidi ya tani 92,500 za CO₂ zisiingie angani na tunaendelea.' },
    },
  },

  notFound: {
    heading: 'Ukurasa Haujapatikana',
    body: 'Ukurasa unaoutafuta haupo, umehamishwa, au haupatikani kwa muda.',
    goHome: 'Nenda Mwanzo',
    contactUs: 'Wasiliana Nasi',
  },

  productGrid: {
    all: 'Zote',
    empty: 'Hakuna bidhaa katika kundi hili bado.',
  },

  contactForm: {
    successHeading: 'Ujumbe umepokelewa',
    successBody: 'Tutajibu ndani ya saa 24. Unaweza pia kutupigia simu moja kwa moja.',
    sendAnother: 'Tuma ujumbe mwingine',
    fullName: 'Jina Kamili',
    fullNamePlaceholder: 'Jina lako kamili',
    email: 'Barua Pepe',
    emailPlaceholder: 'barua@pepe.com',
    phone: 'Simu / WhatsApp',
    phonePlaceholder: '+255 7XX XXX XXX',
    subject: 'Mada',
    selectSubject: 'Chagua mada',
    subjects: {
      quote: 'Omba bei',
      delivery: 'Usafirishaji na uwasilishaji',
      vendor: 'Usajili wa mchuuzi',
      trade: 'Akaunti ya biashara',
      certification: 'Uulizaji kuhusu ithibati',
      other: 'Nyingine',
    },
    message: 'Ujumbe',
    messagePlaceholder:
      'Tunawezaje kukusaidia? Taja kiasi, vipimo, na mahali pa kupeleka ikiwa inahusika.',
    error: 'Hitilafu imetokea. Tafadhali jaribu tena au tupigie simu moja kwa moja.',
    sending: 'Inatuma…',
    send: 'Tuma Ujumbe',
  },

  contactCta: {
    sectionLabel: 'Wito wa kuwasiliana',
    eyebrow: 'Wasiliana Nasi',
    headingLine1: 'Uko tayari kujenga?',
    headingLine2: 'Tuzungumze kuhusu chuma.',
    body: 'Kutoka maagizo makubwa na ratiba za usafirishaji hadi zabuni na akaunti za biashara — timu yetu hujibu ndani ya saa 24.',
    primaryLabel: 'Omba Bei',
    secondaryLabel: 'Tupigie Simu Sasa',
    callOrWhatsapp: 'Piga simu au WhatsApp',
    emailUs: 'Tutumie barua pepe',
    headquarters: 'Makao Makuu',
  },

  services: {
    eyebrow: 'Tunachofanya',
    headingLine1: 'Mnyororo kamili',
    headingLine2: 'wa chuma.',
    allServices: 'Huduma zote',
    sectionLabel: 'Huduma zetu',
    defaults: {
      scrap: {
        title: 'Ukusanyaji wa Chuma Chakavu',
        excerpt:
          'Mtandao mkubwa zaidi uliopangwa wa ukusanyaji wa chuma chakavu Tanzania. Wachuuzi 5,000+, wanaothibitishwa kila siku.',
        chips: ['Wachuuzi 5,000+', 'Inatumika kwa simu'],
      },
      steel: {
        title: 'Utengenezaji wa Chuma',
        excerpt:
          'Tanuru la umeme linalozalisha nondo za TMT na mabilleti zenye ithibati ya BS 500B kutoka chuma chakavu kilichorejelezwa.',
        chips: ['BS 500B', 'Ithibati ya TBS'],
      },
      logistics: {
        title: 'Usafirishaji wa Magari',
        excerpt:
          'Malori 30+ ya kampuni. Shughuli saa 24/7. Usafirishaji siku hiyo hiyo katika matawi 5 ya mikoa.',
        chips: ['Magari 30+', 'Usafirishaji siku hiyo hiyo'],
      },
      vendor: {
        title: 'Jukwaa la Wachuuzi',
        excerpt:
          'Jukwaa letu la simu linalounganisha wachuuzi wa chuma chakavu, wanunuzi na shughuli katika mtandao mmoja.',
        chips: ['Malipo ya kidijitali', 'Akaunti za biashara'],
      },
    },
  },
}
