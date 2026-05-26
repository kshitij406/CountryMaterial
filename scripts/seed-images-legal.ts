/**
 * Country Materials — Image + Legal Seed Script
 *
 * 1. Uploads every local image from public/images/ to the Sanity CDN
 * 2. Patches service, product, about, homepage, and siteSettings documents
 *    with the uploaded image references
 * 3. Replaces the three legalPage documents with full PDPA 2022-compliant content
 *
 * Usage:
 *   pnpm tsx scripts/seed-images-legal.ts
 *
 * Requires: SANITY_API_TOKEN with editor/write access in .env.local
 */

import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { resolve, extname, basename } from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ─── Image upload helper ──────────────────────────────────────────────────────

type SanityImage = { _type: 'image'; asset: { _type: 'reference'; _ref: string } }

async function upload(localPath: string): Promise<SanityImage> {
  const file = basename(localPath)
  const ext  = extname(localPath).toLowerCase()
  const mime = ext === '.png' ? 'image/png'
             : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
             : 'image/jpeg'

  console.log(`   ↑ ${file}`)
  const asset = await client.assets.upload('image', createReadStream(localPath), {
    filename: file,
    contentType: mime,
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

// ─── Portable-text block helpers ─────────────────────────────────────────────

type BlockStyle = 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote'

function blk(key: string, text: string, style: BlockStyle = 'normal') {
  return {
    _type: 'block', _key: key, style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}_`, marks: [], text }],
  }
}

function h2(key: string, text: string)  { return blk(key, text, 'h2') }
function h3(key: string, text: string)  { return blk(key, text, 'h3') }
function p(key: string, text: string)   { return blk(key, text, 'normal') }

// Block with mixed inline marks (bold spans, links, etc.)
function rich(key: string, parts: Array<{ text: string; bold?: true; href?: string }>) {
  const markDefs: any[] = []
  const children = parts.map((part, i) => {
    const spanKey = `${key}_${i}`
    const marks: string[] = []
    if (part.bold) marks.push('strong')
    if (part.href) {
      const linkKey = `${key}_lnk${i}`
      markDefs.push({ _key: linkKey, _type: 'link', href: part.href })
      marks.push(linkKey)
    }
    return { _type: 'span', _key: spanKey, marks, text: part.text }
  })
  return { _type: 'block', _key: key, style: 'normal', markDefs, children }
}

// ─── Legal content ────────────────────────────────────────────────────────────

const privacyPolicyBody = [
  rich('pp00', [
    { text: 'Last updated: ' }, { text: '25 May 2025', bold: true },
  ]),

  h2('pp01', '1. Introduction'),
  p('pp02', 'Country Materials Limited ("Country Materials", "we", "our", or "us"), registered at Babecov Complex, Buguruni Mandela Road, Dar es Salaam, United Republic of Tanzania, is committed to protecting the personal data of every person who visits or interacts with countrymaterial.com ("the Site").'),
  p('pp03', 'This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data in compliance with Tanzania\'s Personal Data Protection Act, Cap. 448 (the "PDPA 2022") and any regulations issued thereunder. Please read it carefully.'),

  h2('pp10', '2. Data Controller'),
  p('pp11', 'Country Materials Limited is the data controller of your personal data as defined under PDPA 2022.'),
  rich('pp12', [{ text: 'Address: ' }, { text: 'Babecov Complex, Buguruni Mandela Road, P.O. Box 2140, Dar es Salaam, Tanzania', bold: true }]),
  rich('pp13', [{ text: 'Email: ' }, { text: 'info@countrymaterial.com', bold: true }]),
  rich('pp14', [{ text: 'Phone: ' }, { text: '+255 768 500 555', bold: true }]),

  h2('pp20', '3. Personal Data We Collect'),
  p('pp21', 'We may collect the following categories of personal data when you interact with the Site:'),
  p('pp22', 'Contact form submissions: your name, email address, phone number, company name (if provided), message content, and the subject or role you reference.'),
  p('pp23', 'Technical and usage data: IP address, browser type and version, operating system, pages visited, time spent on page, referral source, and device type. This data is collected automatically through analytics tools in aggregated or pseudonymised form.'),
  p('pp24', 'Business correspondence: if you contact us by email or telephone, we retain records of that correspondence.'),
  p('pp25', 'We do not collect sensitive personal data (such as health information, biometric data, religious beliefs, or political opinions) through this Site.'),

  h2('pp30', '4. Legal Bases for Processing (PDPA 2022, Sections 7–11)'),
  p('pp31', 'We process your personal data on the following legal bases:'),
  p('pp32', 'Legitimate interests — to respond to your business enquiry, to understand how the Site is used, and to maintain the security of our systems. Our legitimate interests are not overridden by your rights where processing is limited to business communications and aggregated analytics.'),
  p('pp33', 'Consent — for the placement of non-essential analytics cookies (see our Cookie Policy). You may withdraw consent at any time without affecting prior lawful processing.'),
  p('pp34', 'Contract performance — where we are in a contractual relationship with you or your organisation, processing is necessary to perform that contract.'),
  p('pp35', 'Compliance with a legal obligation — where Tanzanian law requires us to retain or process certain records, including financial and tax records.'),

  h2('pp40', '5. How We Use Your Data'),
  p('pp41', 'We use the personal data we collect to: respond to enquiries submitted through our contact form; provide product quotations and service information; improve the performance and usability of the Site; maintain records of business communications; fulfil contractual obligations; and comply with applicable legal and regulatory requirements.'),
  p('pp42', 'We do not use your personal data for automated decision-making or profiling that produces legal or similarly significant effects on you.'),

  h2('pp50', '6. Cookies and Similar Technologies'),
  p('pp51', 'We use essential and analytics cookies on this Site. Please refer to our Cookie Policy for full details of the cookies used, their purpose, duration, and how you can manage your preferences and withdraw consent.'),

  h2('pp60', '7. Third-Party Sharing and Disclosure'),
  p('pp61', 'We do not sell, rent, or trade your personal data to any third party. We may disclose personal data to:'),
  p('pp62', 'Service providers: third-party analytics and hosting providers who process data on our behalf under data processing agreements that comply with PDPA 2022. These providers are contractually prohibited from using your data for their own commercial purposes.'),
  p('pp63', 'Legal and regulatory authorities: where required by Tanzanian law, court order, or lawful request from a competent public authority including the Personal Data Protection Commission (PDPC).'),
  p('pp64', 'Business transfers: in the event of a merger, acquisition, or disposal of assets, your data may be transferred to a successor entity, who will remain bound by obligations consistent with this Policy.'),

  h2('pp70', '8. Cross-Border Data Transfers'),
  p('pp71', 'Our analytics and hosting providers may process data on servers located outside Tanzania. Where such transfers occur, we take steps — including contractual safeguards and adequacy assessments — to ensure that the recipient provides a level of data protection equivalent to that required by PDPA 2022 and consistent with any cross-border transfer regulations issued by the PDPC.'),

  h2('pp80', '9. Data Retention'),
  p('pp81', 'We retain personal data only for as long as is necessary for the purposes described in this Policy:'),
  p('pp82', 'Contact form submissions: up to 12 months from the date of receipt, or longer if required for ongoing business correspondence or dispute resolution.'),
  p('pp83', 'Technical and analytics data: up to 26 months in aggregated or anonymised form.'),
  p('pp84', 'Legal and financial records: for the period required by applicable Tanzanian law, including the Income Tax Act and Companies Act.'),
  p('pp85', 'Upon expiry of the applicable retention period, personal data is securely deleted or irreversibly anonymised.'),

  h2('pp90', '10. Your Rights Under PDPA 2022 (Part IV)'),
  p('pp91', 'Subject to PDPA 2022, you have the following rights regarding personal data we hold about you:'),
  p('pp92', 'Right of access (Section 23): to request a copy of the personal data we process about you.'),
  p('pp93', 'Right to rectification (Section 24): to request correction of inaccurate or incomplete personal data.'),
  p('pp94', 'Right to erasure (Section 25): to request deletion of your personal data where there is no lawful reason for continued processing.'),
  p('pp95', 'Right to restriction (Section 26): to request that we limit how we process your personal data in certain circumstances.'),
  p('pp96', 'Right to data portability (Section 27): to receive your personal data in a structured, commonly used, machine-readable format and, where technically feasible, to have it transmitted to another controller.'),
  p('pp97', 'Right to object (Section 28): to object to processing based on legitimate interests or direct marketing.'),
  p('pp98', 'Right to withdraw consent: where processing is based on your consent, you may withdraw it at any time. Withdrawal does not affect the lawfulness of processing prior to withdrawal.'),
  p('pp99', 'To exercise any of these rights, please contact us in writing at info@countrymaterial.com or at our postal address. We will respond within 30 days as required by PDPA 2022, section 23(4). We may need to verify your identity before acting on your request. If you are dissatisfied with our response, you have the right to lodge a complaint with the Personal Data Protection Commission (PDPC) of Tanzania.'),

  h2('ppa0', '11. Data Security'),
  p('ppa1', 'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, and loss. These include encrypted transmission (HTTPS/TLS), access controls, and regular review of our data handling practices.'),
  p('ppa2', 'In the event of a personal data breach that is likely to result in a risk to your rights, we will notify the PDPC and, where required, affected individuals within the timeframes prescribed by PDPA 2022.'),

  h2('ppb0', '12. Children\'s Privacy'),
  p('ppb1', 'This Site is not directed at children under the age of 18. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected data from a child, please contact us and we will delete it promptly.'),

  h2('ppc0', '13. Changes to This Policy'),
  p('ppc1', 'We may update this Privacy Policy periodically to reflect changes in our data practices, technology, or applicable law. Material changes will be notified via a prominent notice on this Site. The "Last Updated" date at the top of this page reflects the most recent revision. We encourage you to review this Policy whenever you visit the Site.'),

  h2('ppd0', '14. Contact and Data Requests'),
  p('ppd1', 'For any privacy-related enquiry, data subject request, or complaint, please contact us at:'),
  p('ppd2', 'Country Materials Limited, Babecov Complex, Buguruni Mandela Road, P.O. Box 2140, Dar es Salaam, Tanzania.'),
  rich('ppd3', [{ text: 'Email: ' }, { text: 'info@countrymaterial.com' }]),
  rich('ppd4', [{ text: 'Phone: ' }, { text: '+255 768 500 555' }]),
]

const termsBody = [
  rich('tu00', [
    { text: 'Last updated: ' }, { text: '25 May 2025', bold: true },
  ]),

  h2('tu01', '1. Acceptance of Terms'),
  p('tu02', 'By accessing or using countrymaterial.com ("the Site"), you confirm that you have read, understood, and agree to be bound by these Terms of Use ("Terms") and our Privacy Policy. If you do not agree with any part of these Terms, please discontinue use of the Site immediately.'),
  p('tu03', 'These Terms apply to all users of the Site, including visitors, registered users, and business partners. Country Materials Limited reserves the right to refuse access to the Site to any person at any time.'),

  h2('tu10', '2. Intellectual Property'),
  p('tu11', 'All content on this Site — including but not limited to text, photographs, graphics, logos, icons, videos, data compilations, design elements, and software — is the property of Country Materials Limited or its licensors and is protected by the Copyright and Neighbouring Rights Act of Tanzania (Cap. 218) and applicable international copyright conventions.'),
  p('tu12', 'You may print or download content from the Site for personal, non-commercial reference only. You must not reproduce, distribute, modify, create derivative works from, publicly display, republish, upload, post, transmit, or commercially exploit any content from this Site without our prior written consent.'),
  p('tu13', 'The Country Materials Limited name, logo, and all related marks are trademarks or registered trademarks of Country Materials Limited in Tanzania and other jurisdictions. Nothing on this Site grants any licence or right to use any trademark without our prior written permission.'),

  h2('tu20', '3. Permitted Use'),
  p('tu21', 'You may use the Site only for lawful purposes and in accordance with these Terms. You must not:'),
  p('tu22', 'Use the Site in any way that violates any applicable local, national, or international law or regulation, including Tanzania\'s Cybercrimes Act (Cap. 455) and Electronic Transactions Act.'),
  p('tu23', 'Transmit any unsolicited or unauthorised advertising, promotional material, spam, or chain letters.'),
  p('tu24', 'Attempt to gain unauthorised access to any part of the Site, any server, computer, or database connected to the Site, or any account belonging to another user.'),
  p('tu25', 'Attack the Site via denial-of-service, injection attacks, or any other technically disruptive or malicious means.'),
  p('tu26', 'Systematically extract, scrape, or harvest data from the Site using automated tools without our written consent.'),
  p('tu27', 'Impersonate Country Materials Limited, its employees, or any other person or entity, or misrepresent your affiliation with any person or entity.'),

  h2('tu30', '4. Accuracy of Information'),
  p('tu31', 'The information on this Site is provided in good faith for general informational purposes only. Whilst we take reasonable care to keep content current and accurate, we make no representations or warranties — express or implied — as to the completeness, accuracy, reliability, suitability, or availability of the information for any particular purpose.'),
  p('tu32', 'You should not rely solely on information obtained from this Site when making any business, financial, legal, or technical decision. We recommend obtaining independent professional advice where appropriate.'),

  h2('tu40', '5. Product Information and Pricing'),
  p('tu41', 'Product specifications, grades, tolerances, and technical data displayed on this Site are indicative only and subject to change without notice. Pricing, minimum order quantities, lead times, and availability are not published on this Site and are available on request only through direct commercial enquiry.'),
  p('tu42', 'Nothing on this Site constitutes a binding offer, quotation, or invitation to treat. All purchases are subject to a separate written purchase order or agreement signed by an authorised representative of Country Materials Limited. We reserve the right to decline any order for any reason.'),

  h2('tu50', '6. Third-Party Links'),
  p('tu51', 'This Site may contain hyperlinks to third-party websites for your convenience and information. Country Materials Limited has no control over the content, privacy policies, or practices of third-party sites and accepts no responsibility or liability for them. The inclusion of a link does not imply endorsement, recommendation, or approval of the linked site or its content.'),

  h2('tu60', '7. Limitation of Liability'),
  p('tu61', 'To the fullest extent permitted by the laws of the United Republic of Tanzania, Country Materials Limited and its officers, directors, employees, agents, and licensors shall not be liable for any:'),
  p('tu62', 'Direct, indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Site or its content, however caused and whether in contract, tort (including negligence), statutory duty, or otherwise.'),
  p('tu63', 'Loss of profit, revenue, data, business opportunity, goodwill, or anticipated savings arising in any way from use of the Site.'),
  p('tu64', 'Errors, omissions, or inaccuracies in any content, including product specifications or pricing indications.'),
  p('tu65', 'Unauthorised access to or alteration of your transmissions or data.'),
  p('tu66', 'This limitation applies even if Country Materials Limited has been advised of the possibility of such damages. Nothing in these Terms limits liability for fraud, fraudulent misrepresentation, death, or personal injury caused by negligence, to the extent such limitation is prohibited by law.'),

  h2('tu70', '8. Indemnity'),
  p('tu71', 'You agree to indemnify, defend, and hold harmless Country Materials Limited and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, penalties, and expenses (including reasonable legal fees) arising out of or in connection with: your access to or use of the Site; your breach of these Terms; your violation of any third-party right, including intellectual property rights; or your violation of any applicable law or regulation.'),

  h2('tu80', '9. Governing Law'),
  p('tu81', 'These Terms of Use shall be governed by and construed in accordance with the laws of the United Republic of Tanzania, without regard to its conflict of law provisions. The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms.'),
  p('tu82', 'By using this Site you irrevocably submit to the personal jurisdiction of the courts of the United Republic of Tanzania for the resolution of any dispute relating to these Terms or your use of the Site.'),

  h2('tu90', '10. Dispute Resolution'),
  p('tu91', 'Any dispute, controversy, or claim arising out of or in connection with these Terms, including any question regarding their existence, validity, breach, or termination, shall first be referred to good-faith negotiations between the parties for a period of 30 days after written notice is given.'),
  p('tu92', 'If the dispute is not resolved through negotiation within that period, it shall be referred to mediation under the procedures of the Tanzania Institute of Arbitration ("TIA"). If mediation fails or is not agreed upon within a further 30 days, the dispute shall be finally resolved by the courts of Dar es Salaam, Tanzania, whose judgments shall be final and binding on the parties.'),

  h2('tua0', '11. Severability'),
  p('tua1', 'If any provision of these Terms is held by a court of competent jurisdiction to be invalid, illegal, or unenforceable in any respect, that provision shall be severed and the remaining provisions shall continue in full force and effect, provided that the fundamental basis of the bargain between the parties is not materially altered.'),

  h2('tub0', '12. Entire Agreement'),
  p('tub1', 'These Terms, together with our Privacy Policy and Cookie Policy incorporated by reference, constitute the entire agreement between you and Country Materials Limited with respect to your use of the Site and supersede all prior agreements, representations, warranties, and understandings, whether oral or written.'),

  h2('tuc0', '13. Amendments'),
  p('tuc1', 'We reserve the right to amend these Terms at any time by posting updated Terms on this page with a revised "Last Updated" date. Your continued use of the Site following the posting of any changes constitutes your binding acceptance of the revised Terms. We encourage you to review this page periodically.'),

  h2('tud0', '14. Contact'),
  p('tud1', 'If you have any questions or concerns about these Terms of Use, please contact us at:'),
  p('tud2', 'Country Materials Limited, Babecov Complex, Buguruni Mandela Road, P.O. Box 2140, Dar es Salaam, Tanzania.'),
  rich('tud3', [{ text: 'Email: ' }, { text: 'info@countrymaterial.com' }]),
  rich('tud4', [{ text: 'Phone: ' }, { text: '+255 768 500 555' }]),
]

const cookiesBody = [
  rich('ck00', [
    { text: 'Last updated: ' }, { text: '25 May 2025', bold: true },
  ]),

  h2('ck01', '1. Introduction'),
  p('ck02', 'Country Materials Limited ("we", "us", "our") uses cookies and similar tracking technologies on countrymaterial.com ("the Site"). This Cookie Policy explains what cookies are, which ones we use, their purpose, and how you can manage your preferences.'),
  p('ck03', 'This Policy should be read alongside our Privacy Policy, which provides broader information on how we process your personal data and your rights under Tanzania\'s Personal Data Protection Act, Cap. 448 (PDPA 2022).'),
  p('ck04', 'By clicking "Accept All" on our cookie consent banner, you consent to the placement of non-essential cookies on your device. You may withdraw this consent at any time — see Section 5 for instructions.'),

  h2('ck10', '2. What Are Cookies?'),
  p('ck11', 'Cookies are small text files placed on your device (computer, tablet, or phone) by a website when you visit it. They are widely used to make websites work, or work more efficiently, and to provide information to the site\'s owners.'),
  p('ck12', 'First-party cookies are set by Country Materials Limited directly. Third-party cookies are set by external providers operating on our behalf. Cookies may be session cookies (automatically deleted when you close your browser) or persistent cookies (which remain on your device until they expire or you delete them).'),

  h2('ck20', '3. Types of Cookies We Use'),

  h3('ck21', '3.1 Essential Cookies'),
  p('ck22', 'These cookies are strictly necessary for the Site to function. They enable core features such as security, session management, and network request routing. Because these cookies are required for the Site to operate, you cannot opt out of them without disabling the website.'),
  p('ck23', 'Examples: session tokens that maintain your browsing session; security cookies that help prevent cross-site request forgery (CSRF); load-balancing cookies that route requests to the correct server.'),
  rich('ck24', [{ text: 'Legal basis: ' }, { text: 'Legitimate interest / technical necessity.', bold: true }, { text: ' No consent is required for strictly necessary cookies under PDPA 2022.' }]),

  h3('ck30', '3.2 Analytics Cookies'),
  p('ck31', 'Analytics cookies allow us to count visits and measure traffic sources so we can understand how visitors use the Site and identify areas for improvement. All data collected by analytics cookies is aggregated and does not personally identify individual visitors.'),
  p('ck32', 'If you decline analytics cookies, we will not be able to track your visit in our analytics tools or include it in aggregate reports, but the Site will continue to function fully.'),
  rich('ck33', [{ text: 'Legal basis: ' }, { text: 'Consent.', bold: true }, { text: ' Analytics cookies are only placed after you click "Accept All" on our cookie banner.' }]),

  h3('ck40', '3.3 Functional Cookies'),
  p('ck41', 'Functional cookies enable enhanced features and personalisation. They are used, for example, to remember your cookie consent choice so that the banner is not displayed on every page.'),
  rich('ck42', [{ text: 'Legal basis: ' }, { text: 'Consent' , bold: true }, { text: ' (where non-essential) or ' }, { text: 'legitimate interest', bold: true }, { text: ' (where necessary to remember consent state).' }]),

  h2('ck50', '4. Third-Party Cookies'),
  p('ck51', 'Certain features of the Site, such as embedded maps or analytics dashboards, may involve third-party providers that set their own cookies. We do not control these third-party cookies. We recommend reviewing the privacy and cookie policies of any third-party providers whose features you interact with on our Site.'),
  p('ck52', 'We take care to evaluate the privacy practices of third-party providers before using their services and require that they process data in accordance with PDPA 2022 where applicable.'),

  h2('ck60', '5. Withdrawing Consent'),
  p('ck61', 'You may withdraw your consent to non-essential cookies at any time using any of the following methods:'),
  p('ck62', 'Clear all cookies in your browser and, when our cookie banner reappears, click "Decline" to withhold consent to non-essential cookies.'),
  p('ck63', 'Use your browser\'s built-in cookie management settings to block or delete cookies from countrymaterial.com. See Section 6 for browser-specific guidance.'),
  p('ck64', 'Note that withdrawing consent may affect certain functionality of the Site. Withdrawal of consent does not affect the lawfulness of processing carried out prior to the withdrawal, nor does it affect processing based on other legal grounds.'),

  h2('ck70', '6. Managing Cookies in Your Browser'),
  p('ck71', 'Most modern browsers allow you to view, delete, and block cookies. The following points to the cookie settings in popular browsers:'),
  p('ck72', 'Google Chrome: Settings → Privacy and security → Cookies and other site data.'),
  p('ck73', 'Mozilla Firefox: Preferences → Privacy & Security → Cookies and Site Data.'),
  p('ck74', 'Microsoft Edge: Settings → Cookies and site permissions → Manage and delete cookies and site data.'),
  p('ck75', 'Apple Safari: Preferences → Privacy → Manage Website Data.'),
  p('ck76', 'Please note that blocking all cookies may prevent you from using some features of this Site and other websites.'),

  h2('ck80', '7. Changes to This Policy'),
  p('ck81', 'We may update this Cookie Policy from time to time to reflect changes in our use of cookies, the services we use, or applicable law including guidance from the Personal Data Protection Commission (PDPC) of Tanzania. The "Last Updated" date at the top of this page shows when this Policy was last revised. We encourage you to review this page periodically.'),

  h2('ck90', '8. Contact Us'),
  p('ck91', 'If you have any questions about our use of cookies or this Cookie Policy, please contact:'),
  p('ck92', 'Country Materials Limited, Babecov Complex, Buguruni Mandela Road, P.O. Box 2140, Dar es Salaam, Tanzania.'),
  rich('ck93', [{ text: 'Email: ' }, { text: 'info@countrymaterial.com' }]),
  rich('ck94', [{ text: 'Phone: ' }, { text: '+255 768 500 555' }]),
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local')
    process.exit(1)
  }

  const img = (rel: string) => resolve('public/images', rel)

  // ── 1. Upload images ──────────────────────────────────────────────────────
  console.log('\n📷  Uploading images to Sanity CDN…')

  const [
    logoImg,
    heroImg,
    steelBarsImg,
    groupPhotoLargeImg,
    companyProfileImg,
    groupPhotoImg,
    teamWorkersImg,
    facilityMainImg,
    wasteImg,
    steelBundleImg,
    hardwareImg,
    transImg,
    ironOreImg,
    industrialImg,
    rebar1Img,
    rebar2Img,
    rebar3Img,
    rebarImg,
    billetsImg,
    kamalLogoImg,
    lakeLogoImg,
    lodhiaLogoImg,
    metroLogoImg,
    sitaLogoImg,
    steelmastLogoImg,
  ] = await Promise.all([
    upload(img('logo/Country-Materials-Logo.png')),
    upload(img('randos/molten_steel.jpeg')),
    upload(img('randos/steel_bars.jpeg')),
    upload(img('company/group-photo-large.jpg')),
    upload(img('company/company-profile.jpg')),
    upload(img('company/group-photo.jpg')),
    upload(img('stock/team-workers.jpg')),
    upload(img('stock/facility-main.jpg')),
    upload(img('company/wastee.jpg')),
    upload(img('stock/steel-rebar-bundle.jpg')),
    upload(img('company/hardware.jpg')),
    upload(img('company/trans-large.jpg')),
    upload(img('stock/iron-ore-smelting.jpg')),
    upload(img('stock/services-industrial.jpg')),
    upload(img('stock/products/tmt-rebar-1.jpg')),
    upload(img('stock/products/tmt-rebar-2.jpg')),
    upload(img('stock/products/tmt-rebar-3.jpg')),
    upload(img('stock/products/rebar.jpg')),
    upload(img('stock/products/steel-billets.jpg')),
    upload(img('partners/kamal-steel-logo.png')),
    upload(img('partners/LAKE_STEEL_LOGO.png')),
    upload(img('partners/lodhia_steel.png')),
    upload(img('partners/Metro-Group-updated-logo-removebg-preview.png')),
    upload(img('partners/sitasteel-removebg-preview.png')),
    upload(img('partners/steelmast-removebg-preview.png')),
  ])
  console.log('   ✅ All images uploaded\n')

  // ── 2. Patch documents with image references ──────────────────────────────
  console.log('🔗  Patching documents with image references…')

  const patches: Promise<any>[] = [
    // Site settings — logo
    client.patch('siteSettings')
      .set({ logo: logoImg })
      .commit({ visibility: 'sync' }),

    // Homepage — hero image
    client.patch('homepage')
      .set({ heroImage: heroImg })
      .commit({ visibility: 'sync' }),

    // About page — hero image + gallery
    client.patch('aboutPage')
      .set({
        heroImage: steelBarsImg,
        images: [
          { ...groupPhotoLargeImg, _key: 'ai1' },
          { ...companyProfileImg,  _key: 'ai2' },
          { ...groupPhotoImg,      _key: 'ai3' },
          { ...teamWorkersImg,     _key: 'ai4' },
          { ...facilityMainImg,    _key: 'ai5' },
        ],
      })
      .commit({ visibility: 'sync' }),

    // Services — cardImage + coverImage
    client.patch('service-waste-management')
      .set({ cardImage: wasteImg, coverImage: industrialImg })
      .commit({ visibility: 'sync' }),

    client.patch('service-steel')
      .set({ cardImage: steelBundleImg, coverImage: ironOreImg })
      .commit({ visibility: 'sync' }),

    client.patch('service-hardware')
      .set({ cardImage: hardwareImg })
      .commit({ visibility: 'sync' }),

    client.patch('service-transportation')
      .set({ cardImage: transImg })
      .commit({ visibility: 'sync' }),

    // Products — images array (first image = main card image)
    client.patch('product-tmt-rebar-8mm')
      .set({ images: [{ ...rebar1Img, _key: 'pi1' }] })
      .commit({ visibility: 'sync' }),

    client.patch('product-tmt-rebar-10mm')
      .set({ images: [{ ...rebar2Img, _key: 'pi1' }] })
      .commit({ visibility: 'sync' }),

    client.patch('product-tmt-rebar-12mm')
      .set({ images: [{ ...rebar3Img, _key: 'pi1' }] })
      .commit({ visibility: 'sync' }),

    client.patch('product-tmt-rebar-16mm')
      .set({ images: [{ ...rebarImg, _key: 'pi1' }] })
      .commit({ visibility: 'sync' }),

    client.patch('product-tmt-rebar-20mm')
      .set({ images: [{ ...rebarImg, _key: 'pi1' }] })
      .commit({ visibility: 'sync' }),

    client.patch('product-steel-billets')
      .set({ images: [{ ...billetsImg, _key: 'pi1' }] })
      .commit({ visibility: 'sync' }),

    // Homepage — partner logos with real company names and logos
    client.patch('homepage')
      .set({
        partnerLogos: [
          { _key: 'p1',  name: 'Kamal Steel',    sub: 'Steel Manufacturer', logo: kamalLogoImg },
          { _key: 'p2',  name: 'Lake Steel',      sub: 'Steel Products',     logo: lakeLogoImg },
          { _key: 'p3',  name: 'Lodhia Steel',    sub: 'Steel Distribution', logo: lodhiaLogoImg },
          { _key: 'p4',  name: 'Metro Group',     sub: 'Hardware & Steel',   logo: metroLogoImg },
          { _key: 'p5',  name: 'Sita Steel',      sub: 'Steel Works',        logo: sitaLogoImg },
          { _key: 'p6',  name: 'Steelmast',       sub: 'Fabrication',        logo: steelmastLogoImg },
          { _key: 'p7',  name: 'TAZARA',          sub: 'Rail' },
          { _key: 'p8',  name: 'TANROADS',        sub: 'Infrastructure' },
          { _key: 'p9',  name: 'AZANIA BANK',     sub: 'Banking' },
          { _key: 'p10', name: 'TPDC',            sub: 'Energy' },
          { _key: 'p11', name: 'NAT. HOUSING',    sub: 'Development' },
          { _key: 'p12', name: 'DANGOTE',         sub: 'Cement' },
        ],
      })
      .commit({ visibility: 'sync' }),
  ]

  const results = await Promise.allSettled(patches)
  const failed  = results.filter(r => r.status === 'rejected')
  if (failed.length) {
    console.error('   ⚠️  Some patches failed:')
    failed.forEach(r => console.error('  ', (r as PromiseRejectedResult).reason?.message))
  } else {
    console.log('   ✅ All document patches applied\n')
  }

  // ── 3. Replace legal page content with PDPA-compliant text ───────────────
  console.log('⚖️   Writing PDPA 2022-compliant legal content…')

  const legalPatches = await Promise.allSettled([
    client.patch('legalPage-privacy-policy')
      .set({
        title: 'Privacy Policy',
        lastUpdated: '2025-05-25',
        body: privacyPolicyBody,
      })
      .commit({ visibility: 'sync' }),

    client.patch('legalPage-terms-of-use')
      .set({
        title: 'Terms of Use',
        lastUpdated: '2025-05-25',
        body: termsBody,
      })
      .commit({ visibility: 'sync' }),

    client.patch('legalPage-cookies')
      .set({
        title: 'Cookie Policy',
        lastUpdated: '2025-05-25',
        body: cookiesBody,
      })
      .commit({ visibility: 'sync' }),
  ])

  const legalFailed = legalPatches.filter(r => r.status === 'rejected')
  if (legalFailed.length) {
    legalFailed.forEach(r => {
      console.error('   ❌', (r as PromiseRejectedResult).reason?.message)
    })
    process.exit(1)
  }

  console.log('   ✅ /privacy-policy  — Privacy Policy written (14 sections, PDPA 2022 compliant)')
  console.log('   ✅ /terms           — Terms of Use written (14 sections, Tanzania law)')
  console.log('   ✅ /cookies         — Cookie Policy written (8 sections, consent mechanism)')

  console.log('\n✨  Done.')
  console.log('   → /privacy-policy · /terms · /cookies  should all render real content')
  console.log('   → Images are live on the Sanity CDN — check /studio to confirm\n')
}

main().catch(err => { console.error(err); process.exit(1) })
