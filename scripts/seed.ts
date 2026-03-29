/**
 * Country Materials — Sanity Seed Script
 *
 * Populates the Sanity dataset with all content from the existing WordPress site.
 * Run with: npx tsx scripts/seed.ts
 *
 * Prerequisites:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 *   - The token needs write access (Editor or Admin role in Sanity)
 *   - pnpm add -D tsx dotenv (if not already installed)
 *
 * This script is idempotent — it uses createOrReplace so you can run it
 * multiple times without duplicating data. Documents use stable _id values.
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import https from "https";
import http from "http";

// ── Load env ──
dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-01",
  token,
  useCdn: false,
});

// ── Helpers ──

function downloadToBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const handler = url.startsWith("https") ? https : http;
    handler.get(url, { headers: { "User-Agent": "SanitySeedScript/1.0" } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadToBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function uploadImage(url: string, filename: string): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | null> {
  try {
    console.log(`  📷 Uploading ${filename}...`);
    const buffer = await downloadToBuffer(url);
    const ext = path.extname(filename).replace(".", "") || "jpg";
    const contentType =
      ext === "png" ? "image/png" :
      ext === "jpeg" || ext === "jpg" ? "image/jpeg" :
      ext === "webp" ? "image/webp" : "image/jpeg";

    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType,
    });

    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  } catch (err) {
    console.warn(`  ⚠️  Failed to upload ${filename}:`, (err as Error).message);
    return null;
  }
}

function slug(text: string) {
  return {
    _type: "slug",
    current: text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  };
}

function keyed<T extends Record<string, unknown>>(items: T[]): (T & { _key: string })[] {
  return items.map((item, i) => ({ ...item, _key: `item_${i}` }));
}

// ── Seed Functions ──

async function seedSiteSettings() {
  console.log("\n🏢 Seeding Site Settings...");

  const logo = await uploadImage(
    "https://countrymaterial.com/itheeglu/2024/02/Country-Materials-Logo.png",
    "country-materials-logo.png"
  );

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: "Country Materials Ltd",
    ...(logo && { logo }),
    phone: "+255 768 500 555",
    email: "info@countrymaterial.com",
    address: "Babecov Complex, Buguruni Mandela Road",
    poBox: "P.O. Box 2140",
    city: "Dar es Salaam",
    country: "Tanzania",
    socialLinks: keyed([
      { _type: "object", platform: "facebook", url: "https://facebook.com/countrymaterials" },
      { _type: "object", platform: "instagram", url: "https://instagram.com/countrymaterials" },
      { _type: "object", platform: "linkedin", url: "https://linkedin.com/company/countrymaterials" },
    ]),
  });

  console.log("  ✅ Site Settings created");
}

async function seedServices(): Promise<string[]> {
  console.log("\n🔧 Seeding Services...");

  const services = [
    {
      _id: "service-transportation",
      title: "Transportation",
      slug: slug("transportation"),
      excerpt:
        "At Country Materials, we are the heartbeat of seamless logistics and transportation solutions.",
      fullDescription:
        "At Country Materials, we are the heartbeat of seamless logistics and transportation solutions. With a steadfast commitment to reliability, efficiency, and client satisfaction, we redefine the landscape of moving goods from point A to point B.",
      sections: keyed([
        {
          _type: "object",
          heading: "Comprehensive Logistics Services",
          body: "We specialize in end-to-end logistics solutions, offering a spectrum of services that encompass warehousing, distribution, and supply chain management. From the moment your goods leave the origin to their timely arrival at the destination, we ensure a smooth and optimized journey.",
        },
        {
          _type: "object",
          heading: "Efficient Transportation",
          body: "Our transportation services are the lifeline of your supply chain. With a fleet of well-maintained vehicles and a team of seasoned professionals, we deliver your cargo on time, every time, regardless of size or destination.",
        },
      ]),
      imageUrl: "https://countrymaterial.com/itheeglu/2024/02/transport.jpg",
      order: 1,
    },
    {
      _id: "service-hardware",
      title: "Hardware",
      slug: slug("hardware"),
      excerpt:
        "We are architects of possibility. Specializing in a curated selection of premium color paints, robust hardware materials, and steadfast steel bars.",
      fullDescription:
        "We are architects of possibility. Specializing in a curated selection of premium color paints, robust hardware materials, and steadfast steel bars, we bring innovation, durability, and aesthetics to the forefront of every project.",
      sections: keyed([
        {
          _type: "object",
          heading: "Hardware Materials",
          body: "The backbone of construction excellence, our hardware materials embody strength, precision, and reliability. From the nuts and bolts to the power tools, we provide the tools that empower your projects to reach new heights.",
        },
        {
          _type: "object",
          heading: "Stalwart Steel Bars",
          body: "For structures that stand the test of time, our steel bars are the epitome of strength and resilience. Whether it's reinforcing concrete or supporting architectural marvels, our steel bars provide the foundation for enduring success.",
        },
      ]),
      imageUrl: "https://countrymaterial.com/itheeglu/2024/02/hardware.jpg",
      order: 2,
    },
    {
      _id: "service-waste-management",
      title: "Waste Management",
      slug: slug("waste-management"),
      excerpt:
        "As champions of the circular economy, we go beyond conventional waste management.",
      fullDescription:
        "As champions of the circular economy, we go beyond conventional waste management. Our approach is rooted in efficiency, sustainability, and a relentless pursuit of minimizing environmental impact. We provide end-to-end solutions that encompass waste reduction, recycling, and responsible disposal.",
      sections: keyed([
        {
          _type: "object",
          heading: "Waste Collection and Segregation",
          body: "Our expert teams ensure the proper collection and segregation of waste at its source, laying the foundation for an efficient and sustainable waste management process.",
        },
        {
          _type: "object",
          heading: "Recycling Initiatives",
          body: "We believe in the transformative power of recycling. Our state-of-the-art facilities are equipped to process a wide range of materials, giving waste a new life and reducing the burden on landfills.",
        },
        {
          _type: "object",
          heading: "Innovative Waste-to-Energy Solutions",
          body: "Harnessing the potential of waste, we explore cutting-edge technologies to convert it into renewable energy. Our waste-to-energy initiatives contribute to a cleaner energy landscape and a reduction in carbon footprints.",
        },
      ]),
      imageUrl: "https://countrymaterial.com/itheeglu/2024/02/wastee.jpg",
      order: 3,
    },
  ];

  const serviceIds: string[] = [];

  for (const svc of services) {
    const image = await uploadImage(svc.imageUrl, `${svc._id}.jpg`);

    await client.createOrReplace({
      _id: svc._id,
      _type: "service",
      title: svc.title,
      slug: svc.slug,
      excerpt: svc.excerpt,
      fullDescription: svc.fullDescription,
      sections: svc.sections,
      ...(image && { image }),
      order: svc.order,
    });

    serviceIds.push(svc._id);
    console.log(`  ✅ Service: ${svc.title}`);
  }

  return serviceIds;
}

async function seedProductCategories(): Promise<Record<string, string>> {
  console.log("\n📂 Seeding Product Categories...");

  const categories = [
    { _id: "cat-building-materials", name: "Building Materials", slug: slug("building-materials") },
    { _id: "cat-steel-metals", name: "Steel & Metals", slug: slug("steel-metals") },
    { _id: "cat-paints-finishes", name: "Paints & Finishes", slug: slug("paints-finishes") },
    { _id: "cat-hardware", name: "Hardware", slug: slug("hardware") },
  ];

  const map: Record<string, string> = {};

  for (const cat of categories) {
    await client.createOrReplace({
      _id: cat._id,
      _type: "productCategory",
      name: cat.name,
      slug: cat.slug,
    });
    map[cat.name] = cat._id;
    console.log(`  ✅ Category: ${cat.name}`);
  }

  return map;
}

async function seedProducts(categoryMap: Record<string, string>) {
  console.log("\n🛒 Seeding Products...");

  const products = [
    {
      _id: "product-gypsum-board",
      name: "Gypsum Board",
      slug: slug("gypsum-board"),
      price: 13000,
      priceRange: null,
      categoryRef: categoryMap["Building Materials"],
      description:
        "High-quality gypsum boards for interior walls and ceilings. Ideal for residential and commercial construction projects requiring smooth, durable finishes.",
      imageUrl: "https://countrymaterial.com/itheeglu/2025/04/pngwing.com-35-300x300.png",
      inStock: true,
      hasVariants: false,
    },
    {
      _id: "product-marine-board",
      name: "Marine Board",
      slug: slug("marine-board"),
      price: 38000,
      priceRange: null,
      categoryRef: categoryMap["Building Materials"],
      description:
        "Water-resistant marine boards designed for high-moisture environments. Perfect for bathrooms, kitchens, and exterior applications where durability against water exposure is essential.",
      imageUrl: "https://countrymaterial.com/itheeglu/2025/04/IMG_1813-scaled-300x300.jpg",
      inStock: true,
      hasVariants: false,
    },
    {
      _id: "product-rebar-bs500",
      name: "High Tensile Reinforcement Bars (Nondo) BS 500",
      slug: slug("high-tensile-reinforcement-bars-bs-500"),
      price: 11666,
      priceRange: "11,666 - 120,000",
      categoryRef: categoryMap["Steel & Metals"],
      description:
        "BS 500 grade high tensile steel reinforcement bars available in multiple sizes (H10, H12, H16, H20). Essential for concrete reinforcement in structural construction projects.",
      imageUrl: "https://countrymaterial.com/itheeglu/2024/02/h10-h12-h16-h20-rebar-300x300.jpeg",
      inStock: true,
      hasVariants: true,
    },
  ];

  for (const prod of products) {
    const image = await uploadImage(prod.imageUrl, `${prod._id}.jpg`);

    await client.createOrReplace({
      _id: prod._id,
      _type: "product",
      name: prod.name,
      slug: prod.slug,
      price: prod.price,
      ...(prod.priceRange && { priceRange: prod.priceRange }),
      category: { _type: "reference", _ref: prod.categoryRef },
      ...(image && { images: [{ ...image, _key: "img_0" }] }),
      description: prod.description,
      inStock: prod.inStock,
      hasVariants: prod.hasVariants,
    });

    console.log(`  ✅ Product: ${prod.name} — TZS ${prod.price.toLocaleString()}`);
  }
}

async function seedHomepage(serviceIds: string[]) {
  console.log("\n🏠 Seeding Homepage...");

  // Upload partner logos
  const partnerLogos = [
    { name: "Lake Steel", url: "https://countrymaterial.com/itheeglu/2024/02/LAKE_STEEL_LOGO.jpg" },
    { name: "Kamal Steel", url: "https://countrymaterial.com/itheeglu/2024/02/kamal-steel-logo-retina-new.png" },
    { name: "Lodhia", url: "https://countrymaterial.com/itheeglu/2024/02/lodhia-logo-1.png" },
    { name: "Steelmast", url: "https://countrymaterial.com/itheeglu/2024/02/steelmast.jpg" },
    { name: "Metro Group", url: "https://countrymaterial.com/itheeglu/2024/02/Metro-Group-updated-logo.png" },
    { name: "Sita Steel", url: "https://countrymaterial.com/itheeglu/2024/02/sitasteel.jpg" },
  ];

  const partners: Array<{ _key: string; _type: string; name: string; logo?: any }> = [];
  for (let i = 0; i < partnerLogos.length; i++) {
    const p = partnerLogos[i];
    const logo = await uploadImage(p.url, `partner-${p.name.toLowerCase().replace(/\s/g, "-")}.jpg`);
    partners.push({
      _key: `partner_${i}`,
      _type: "object",
      name: p.name,
      ...(logo && { logo }),
    });
  }

  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    heroHeading: "Country Materials",
    heroSubheading:
      "Where we redefine the possibilities in the world of hardware materials, waste management, and transportation.",
    // heroImages: uploaded separately or added via Studio
    introLabel: "Welcome to Country Materials",
    introHeading:
      "Where we redefine the possibilities in the world of hardware materials, waste management, and transportation.",
    introBody:
      "As a dynamic and versatile company, we pride ourselves on being your one-stop solution for all your construction, sustainability, and logistics needs. At Country Materials our success is intertwined with the success of our clients. We prioritize open communication, collaborative partnerships, and tailored solutions to ensure your unique needs are met with precision.",
    vision:
      "Our Vision is to become a leading Steel Waste Management company in our region with an active presence in all over the country.",
    mission:
      "Our mission is to bridge the gap between scrap informal vendors, steel manufacturers and constructors through establishing a steel waste management company that will collect scrap metals direct from the informal scrap vendors at a reasonable price and deliver the same to the steel manufacturers for a proper disposal before selling the steel bars to constructors at an affordable prices and to build a business that will grow to become one of the leading Steel Waste Management companies in Tanzania.",
    values: keyed([
      {
        _type: "object",
        title: "Quality Excellence",
        description:
          "We are committed to delivering hardware materials of the highest quality. Our unwavering dedication to excellence ensures that each product meets and exceeds industry standards, providing reliability and durability in every use.",
        icon: "shield-check",
      },
      {
        _type: "object",
        title: "Community & Environmental Responsibility",
        description:
          "We understand our role in the larger community and the environment. Our commitment extends beyond products to sustainable practices, ensuring that our hardware materials contribute to a greener and more responsible construction industry.",
        icon: "leaf",
      },
      {
        _type: "object",
        title: "Team Collaboration",
        description:
          "We foster a collaborative and inclusive work environment where the collective skills and expertise of our team members contribute to the success of our company and the satisfaction of our clients.",
        icon: "users",
      },
    ]),
    ctaBannerText: "We are here to offer you the best services!",
    featuredServices: serviceIds.map((id, i) => ({
      _key: `svc_${i}`,
      _type: "reference",
      _ref: id,
    })),
    partners,
  });

  console.log("  ✅ Homepage created");
}

async function seedAboutPage() {
  console.log("\n📖 Seeding About Page...");

  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heading: "About Country Materials",
    intro:
      "Where we redefine the possibilities in the world of hardware materials, waste management, and transportation.",
    body: "As a dynamic and versatile company, we pride ourselves on being your one-stop solution for all your construction, sustainability, and logistics needs. At Country Materials our success is intertwined with the success of our clients. We prioritize open communication, collaborative partnerships, and tailored solutions to ensure your unique needs are met with precision.",
    vision:
      "Our Vision is to become a leading Steel Waste Management company in our region with an active presence in all over the country.",
    mission:
      "Our mission is to bridge the gap between scrap informal vendors, steel manufacturers and constructors through establishing a steel waste management company that will collect scrap metals direct from the informal scrap vendors at a reasonable price and deliver the same to the steel manufacturers for a proper disposal before selling the steel bars to constructors at an affordable prices and to build a business that will grow to become one of the leading Steel Waste Management companies in Tanzania.",
    values: keyed([
      {
        _type: "object",
        title: "Quality Excellence",
        description:
          "We are committed to delivering hardware materials of the highest quality. Our unwavering dedication to excellence ensures that each product meets and exceeds industry standards, providing reliability and durability in every use.",
        icon: "shield-check",
      },
      {
        _type: "object",
        title: "Community & Environmental Responsibility",
        description:
          "We understand our role in the larger community and the environment. Our commitment extends beyond products to sustainable practices, ensuring that our hardware materials contribute to a greener and more responsible construction industry.",
        icon: "leaf",
      },
      {
        _type: "object",
        title: "Team Collaboration",
        description:
          "We foster a collaborative and inclusive work environment where the collective skills and expertise of our team members contribute to the success of our company and the satisfaction of our clients.",
        icon: "users",
      },
    ]),
    whyChooseUs: keyed([
      {
        _type: "object",
        title: "Quality Assurance",
        description:
          "Our materials undergo rigorous testing to ensure they meet and exceed industry standards, guaranteeing durability and reliability in every product.",
      },
      {
        _type: "object",
        title: "Innovation",
        description:
          "Stay ahead of the curve with our innovative materials that not only meet current demands but anticipate future trends in construction and design.",
      },
      {
        _type: "object",
        title: "Customer-Centric Approach",
        description:
          "We value our clients' visions and work closely with them to provide tailored solutions, ensuring their projects are a true reflection of their aspirations.",
      },
      {
        _type: "object",
        title: "Sustainability",
        description:
          "As stewards of the environment, we prioritize environmentally friendly materials and practices, promoting a greener and more sustainable construction industry.",
      },
    ]),
  });

  console.log("  ✅ About Page created");
}

async function seedCareers() {
  console.log("\n💼 Seeding Careers...");

  const jobs = [
    {
      _id: "career-operations-manager",
      title: "Operations Manager",
      slug: slug("operations-manager"),
      department: "Operations",
      location: "Dar es Salaam, Tanzania",
      type: "Full-time",
      description:
        "We are looking for an experienced Operations Manager to oversee our day-to-day logistics, warehouse, and transportation operations. You will coordinate with suppliers, manage schedules, and ensure efficient delivery of materials across the region.",
      requirements: [
        "Bachelor's degree in Business Administration, Logistics, or related field",
        "5+ years of experience in operations management, preferably in construction or materials industry",
        "Strong leadership and team management skills",
        "Excellent communication skills in English and Swahili",
        "Valid driving license and willingness to travel within Tanzania",
        "Proficiency in Microsoft Office and inventory management systems",
      ],
      closingDate: "2026-05-31",
      expired: false,
    },
    {
      _id: "career-sales-executive",
      title: "Sales Executive — Hardware Division",
      slug: slug("sales-executive-hardware"),
      department: "Sales",
      location: "Dar es Salaam, Tanzania",
      type: "Full-time",
      description:
        "Join our growing sales team to drive revenue in the hardware materials division. You will build relationships with construction companies, architects, and contractors to expand our client base across Tanzania.",
      requirements: [
        "Diploma or degree in Sales, Marketing, or related field",
        "2+ years of experience in B2B sales, preferably in construction materials",
        "Strong negotiation and relationship-building skills",
        "Fluent in English and Swahili",
        "Own transport preferred",
        "Knowledge of construction materials and hardware products is a plus",
      ],
      closingDate: "2026-04-30",
      expired: false,
    },
  ];

  for (const job of jobs) {
    await client.createOrReplace({
      _id: job._id,
      _type: "career",
      title: job.title,
      slug: job.slug,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements,
      closingDate: job.closingDate,
      expired: job.expired,
    });

    console.log(`  ✅ Career: ${job.title}`);
  }
}

// ── Main ──

async function main() {
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║   Country Materials — Sanity Content Seed    ║");
  console.log("╠══════════════════════════════════════════════╣");
  console.log(`║  Project: ${projectId}`);
  console.log(`║  Dataset: ${dataset}`);
  console.log("╚══════════════════════════════════════════════╝");

  try {
    // 1. Site Settings
    await seedSiteSettings();

    // 2. Services (needed first — homepage references them)
    const serviceIds = await seedServices();

    // 3. Product Categories (needed before products)
    const categoryMap = await seedProductCategories();

    // 4. Products
    await seedProducts(categoryMap);

    // 5. Homepage (references services + uploads partner logos)
    await seedHomepage(serviceIds);

    // 6. About Page
    await seedAboutPage();

    // 7. Careers
    await seedCareers();

    console.log("\n══════════════════════════════════════════════");
    console.log("🎉 Seed complete! All content has been pushed to Sanity.");
    console.log("   Open /studio to verify everything looks right.");
    console.log("══════════════════════════════════════════════\n");
  } catch (err) {
    console.error("\n❌ Seed failed:", err);
    process.exit(1);
  }
}

main();