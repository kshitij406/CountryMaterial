/**
 * Country Materials Limited — end-to-end test suite
 *
 * Assumes the production build is running at http://localhost:3000
 * (`pnpm build && pnpm start`, or `pnpm dev`).
 *
 * Run:  pnpm exec playwright test
 * Shots: tests/screenshots/<page>-<viewport>.png
 */

import { test, expect, type Page } from '@playwright/test'
import * as path from 'path'
import * as fs from 'fs'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots')

/** All nav links that must appear in the navbar on every page */
const NAV_LINKS = ['Home', 'About', 'Impact', 'Products & Services', 'Blog', 'Careers', 'Contact']

/** Pages under test */
const PAGES = [
  { name: 'home',     url: '/' },
  { name: 'about',    url: '/about' },
  { name: 'impact',   url: '/impact' },
  { name: 'products', url: '/shop' },
  { name: 'blog',     url: '/blog' },
  { name: 'contact',  url: '/contact' },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Ensure screenshot directory exists before any test writes to it */
function ensureScreenshotDir() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
  }
}

/**
 * Take a full-page screenshot and save it to tests/screenshots/.
 * Uses 'load' + a short settle delay rather than 'networkidle', which is
 * inherently racy on image-heavy pages (Playwright's own guidance) and was
 * timing out here on pages with several Sanity/local images in flight.
 */
async function screenshot(page: Page, name: string) {
  await page.waitForLoadState('load')
  await page.waitForTimeout(300)
  ensureScreenshotDir()
  const file = path.join(SCREENSHOT_DIR, `${name}.png`)
  await page.screenshot({ path: file, fullPage: true })
}

/**
 * Collect all local <img> src attributes then verify each returns HTTP 200.
 * Using page.request avoids naturalWidth timing issues with lazy/large images.
 * External CDN images (e.g. Sanity) are skipped. Waits for 'domcontentloaded'
 * rather than 'networkidle' — the <img> tags are present in the initial HTML
 * for these server-rendered pages, and each src is verified independently below.
 */
async function assertImagesLoad(page: Page) {
  await page.waitForLoadState('domcontentloaded')

  const localSrcs: string[] = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'))
    return imgs
      .map((img) => img.getAttribute('src') ?? '')
      .filter((src) =>
        src.startsWith('/') ||
        src.startsWith(window.location.origin) ||
        src.startsWith('/_next/'),
      )
  })

  const brokenImages: string[] = []
  for (const src of localSrcs) {
    const resp = await page.request.get(src)
    if (!resp.ok()) brokenImages.push(src)
  }

  expect(
    brokenImages,
    `Broken local images found: ${brokenImages.join(', ')}`,
  ).toHaveLength(0)
}

/** Assert no element's visible text contains "Lorem ipsum" (case-insensitive) */
async function assertNoLoremIpsum(page: Page) {
  const found = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const hits: string[] = []
    let node: Node | null
    while ((node = walker.nextNode())) {
      if (/lorem ipsum/i.test(node.textContent ?? '')) {
        hits.push((node.textContent ?? '').trim().slice(0, 80))
      }
    }
    return hits
  })

  expect(
    found,
    `Lorem ipsum placeholder text found on page: ${found.join(' | ')}`,
  ).toHaveLength(0)
}

/** Assert the navbar contains every expected link label */
async function assertNavLinks(page: Page) {
  // The navbar is the <header> element; look for links inside it
  const header = page.locator('header')
  await expect(header).toBeVisible()

  for (const label of NAV_LINKS) {
    // Match link text exactly (case-insensitive, trimmed)
    const link = header.getByRole('link', { name: new RegExp(`^${label}$`, 'i') })
    await expect(link, `Nav link "${label}" not found`).toBeVisible()
  }
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

test.describe('Site-wide smoke tests', () => {

  // ── Navbar ────────────────────────────────────────────────────────────────

  test.describe('Navbar', () => {
    for (const pg of PAGES) {
      test(`navbar renders on ${pg.name} (${pg.url})`, async ({ page }) => {
        await page.goto(pg.url)
        await assertNavLinks(page)
      })
    }
  })

  // ── Full-page screenshots ─────────────────────────────────────────────────

  test.describe('Screenshots — desktop (1440 × 900)', () => {
    test.use({ viewport: { width: 1440, height: 900 } })

    for (const pg of PAGES) {
      test(`screenshot: ${pg.name}`, async ({ page }) => {
        await page.goto(pg.url)
        await screenshot(page, `${pg.name}-desktop`)
      })
    }
  })

  test.describe('Screenshots — mobile (390 × 844)', () => {
    test.use({ viewport: { width: 390, height: 844 } })

    for (const pg of PAGES) {
      test(`screenshot: ${pg.name} mobile`, async ({ page }) => {
        await page.goto(pg.url)
        await screenshot(page, `${pg.name}-mobile`)
      })
    }
  })

  // ── Hero headline ─────────────────────────────────────────────────────────

  test.describe('Hero headline', () => {
    test('homepage hero H1 is visible and non-empty', async ({ page }) => {
      await page.goto('/')
      const h1 = page.locator('h1').first()
      await expect(h1).toBeVisible()
      const text = (await h1.textContent()) ?? ''
      expect(text.trim().length, 'H1 is empty').toBeGreaterThan(0)
    })

    // Other pages should also have an <h1>
    for (const pg of PAGES.filter((p) => p.url !== '/')) {
      test(`${pg.name} page has visible H1`, async ({ page }) => {
        await page.goto(pg.url)
        const h1 = page.locator('h1').first()
        await expect(h1).toBeVisible()
        const text = (await h1.textContent()) ?? ''
        expect(text.trim().length, `H1 on ${pg.name} is empty`).toBeGreaterThan(0)
      })
    }
  })

  // ── Stats strip ───────────────────────────────────────────────────────────

  test.describe('Stats strip', () => {
    test('homepage stats section is visible and shows numbers', async ({ page }) => {
      await page.goto('/')

      // Scroll to the stats section (#impact) and verify numbers
      const statsSection = page.locator('#impact')
      await statsSection.scrollIntoViewIfNeeded()
      await expect(statsSection).toBeVisible()

      // At least one element in the stats grid should show a non-zero number.
      // Counter elements are <span class="tabular-nums"> inside the stat grid.
      const counters = statsSection.locator('span.tabular-nums')
      const count = await counters.count()
      expect(count, 'No counter elements found in stats section').toBeGreaterThan(0)

      // Each counter should have non-empty text content
      for (let i = 0; i < count; i++) {
        const text = (await counters.nth(i).textContent()) ?? ''
        expect(text.trim(), `Counter #${i} has empty text`).not.toBe('')
      }
    })

    test('stats section number labels are visible', async ({ page }) => {
      await page.goto('/')
      const statsSection = page.locator('#impact')
      await statsSection.scrollIntoViewIfNeeded()

      // Check that at least one known metric label is visible
      const knownLabels = ['Metric Tons Recycled', 'Active Clients', 'Vendors on Platform', 'Team Members']
      let found = 0
      for (const label of knownLabels) {
        const el = statsSection.getByText(label, { exact: false })
        if ((await el.count()) > 0) found++
      }
      expect(found, 'No recognisable stat labels found in #impact').toBeGreaterThan(0)
    })
  })

  // ── Lorem ipsum check ─────────────────────────────────────────────────────

  test.describe('No placeholder text', () => {
    for (const pg of PAGES) {
      test(`${pg.name} (${pg.url}) — no "Lorem ipsum"`, async ({ page }) => {
        await page.goto(pg.url)
        await assertNoLoremIpsum(page)
      })
    }
  })

  // ── Image loading ─────────────────────────────────────────────────────────

  test.describe('Images load correctly', () => {
    for (const pg of PAGES) {
      test(`${pg.name} (${pg.url}) — no broken local images`, async ({ page }) => {
        await page.goto(pg.url)
        await assertImagesLoad(page)
      })
    }
  })

  // ── Per-page content checks ───────────────────────────────────────────────

  test.describe('Homepage sections', () => {
    test('services section is present', async ({ page }) => {
      await page.goto('/')
      const services = page.locator('#services')
      await services.scrollIntoViewIfNeeded()
      await expect(services).toBeVisible()
      // Should have at least one service card (Link element inside)
      const cards = services.locator('a[href]')
      expect(await cards.count()).toBeGreaterThan(0)
    })

    test('process / scrap-to-steel section is present', async ({ page }) => {
      await page.goto('/')
      const process = page.locator('#process')
      await process.scrollIntoViewIfNeeded()
      await expect(process).toBeVisible()
      // Should contain the 5 step titles
      const stepTitles = ['Collection', 'Sorting', 'Melting', 'Rolling', 'Distribution']
      for (const title of stepTitles) {
        const el = process.getByText(title, { exact: true })
        expect(await el.count(), `Step "${title}" missing from process section`).toBeGreaterThan(0)
      }
    })

    test('products grid section is present', async ({ page }) => {
      await page.goto('/')
      const products = page.locator('#products')
      await products.scrollIntoViewIfNeeded()
      await expect(products).toBeVisible()
    })

    test('contact CTA section is present', async ({ page }) => {
      await page.goto('/')
      const cta = page.locator('#contact-cta')
      await cta.scrollIntoViewIfNeeded()
      await expect(cta).toBeVisible()
    })
  })

  test.describe('Products & Services page (/shop)', () => {
    test('/services redirects to /shop', async ({ page }) => {
      await page.goto('/services')
      await expect(page).toHaveURL(/\/shop/)
    })

    test('products grid renders with product cards', async ({ page }) => {
      await page.goto('/shop')
      const products = page.locator('#products')
      await products.scrollIntoViewIfNeeded()
      await expect(products).toBeVisible()
      const cards = products.locator('a[href^="/shop/"]')
      expect(await cards.count()).toBeGreaterThan(0)
    })

    test('category filter is present', async ({ page }) => {
      await page.goto('/shop')
      const allFilter = page.getByRole('button', { name: 'All', exact: true })
      await expect(allFilter).toBeVisible()
    })

    test('each product card has Buy Now and Copy Link actions', async ({ page }) => {
      await page.goto('/shop')
      const buyNow = page.getByRole('button', { name: 'Buy Now' }).first()
      const copyLink = page.getByRole('button', { name: 'Copy Link' }).first()
      await expect(buyNow).toBeVisible()
      await expect(copyLink).toBeVisible()
    })

    test('services grid renders with service cards', async ({ page }) => {
      await page.goto('/shop')
      const services = page.locator('#services')
      await services.scrollIntoViewIfNeeded()
      await expect(services).toBeVisible()
      const cards = services.locator('a[href^="/services/"]')
      expect(await cards.count()).toBeGreaterThanOrEqual(4)
    })
  })

  test.describe('About page', () => {
    test('milestones / story section renders', async ({ page }) => {
      await page.goto('/about')
      // The milestone years should be visible
      for (const year of ['2022', '2023', '2024', '2025']) {
        const el = page.getByText(year, { exact: true }).first()
        await expect(el, `Year ${year} not found on about page`).toBeVisible()
      }
    })

    test('values section renders core value cards', async ({ page }) => {
      await page.goto('/about')
      const values = page.locator('#values')
      await values.scrollIntoViewIfNeeded()
      await expect(values).toBeVisible()
      const titles = ['People', 'Planet', 'Partnership']
      for (const t of titles) {
        const el = values.getByText(t, { exact: true })
        expect(await el.count(), `Value "${t}" not found`).toBeGreaterThan(0)
      }
    })
  })

  test.describe('Contact page', () => {
    test('contact form renders with required fields', async ({ page }) => {
      await page.goto('/contact')
      await expect(page.locator('#cf-name')).toBeVisible()
      await expect(page.locator('#cf-email')).toBeVisible()
      await expect(page.locator('#cf-subject')).toBeVisible()
      await expect(page.locator('#cf-message')).toBeVisible()
      await expect(page.locator('button[type="submit"]')).toBeVisible()
    })

    test('branch list renders', async ({ page }) => {
      await page.goto('/contact')
      const branches = ['Dar es Salaam', 'Mbeya', 'Dodoma', 'Kahama', 'Pwani']
      for (const branch of branches) {
        const el = page.getByText(branch, { exact: true }).first()
        await expect(el, `Branch "${branch}" not found`).toBeVisible()
      }
    })

    test('phone number is present and clickable', async ({ page }) => {
      await page.goto('/contact')
      // The phone link uses tel: href
      const phoneLink = page.locator('a[href^="tel:"]').first()
      await expect(phoneLink).toBeVisible()
      const href = await phoneLink.getAttribute('href')
      expect(href).toMatch(/^\+?[0-9\s]+$|^tel:/)
    })
  })

  // ── Footer ────────────────────────────────────────────────────────────────

  test.describe('Footer', () => {
    for (const pg of PAGES) {
      test(`footer present on ${pg.name}`, async ({ page }) => {
        await page.goto(pg.url)
        const footer = page.locator('footer')
        await footer.scrollIntoViewIfNeeded()
        await expect(footer).toBeVisible()
        // Footer should contain the company name
        await expect(footer.getByText('Country Materials', { exact: false })).toBeVisible()
      })
    }
  })

  // ── Accessibility basics ──────────────────────────────────────────────────

  test.describe('Accessibility basics', () => {
    test('homepage has exactly one H1', async ({ page }) => {
      await page.goto('/')
      const h1s = page.locator('h1')
      await expect(h1s).toHaveCount(1)
    })

    test('all pages have a <title>', async ({ page }) => {
      for (const pg of PAGES) {
        await page.goto(pg.url)
        const title = await page.title()
        expect(title.trim(), `Empty <title> on ${pg.url}`).not.toBe('')
      }
    })

    test('interactive elements have accessible names', async ({ page }) => {
      await page.goto('/')
      // All buttons should have text or aria-label
      const buttons = page.locator('button')
      const count = await buttons.count()
      for (let i = 0; i < count; i++) {
        const btn = buttons.nth(i)
        const text = (await btn.textContent()) ?? ''
        const ariaLabel = (await btn.getAttribute('aria-label')) ?? ''
        expect(
          (text + ariaLabel).trim(),
          `Button #${i} has no accessible name`,
        ).not.toBe('')
      }
    })
  })

  // ── Careers page ─────────────────────────────────────────────────────────

  test.describe('Careers page', () => {
    test('careers list renders with job listings', async ({ page }) => {
      await page.goto('/careers')
      await expect(page.locator('h1')).toBeVisible()
      // Should show at least one job link
      const jobLinks = page.locator('a[href^="/careers/"]')
      await expect(jobLinks.first()).toBeVisible()
    })

    test('careers job detail page renders', async ({ page }) => {
      await page.goto('/careers')
      // Follow first job link
      const firstJob = page.locator('a[href^="/careers/"]').first()
      const href = await firstJob.getAttribute('href')
      expect(href).toBeTruthy()
      await page.goto(href!)
      // Should have h1 and back link
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.getByText('All Positions', { exact: false })).toBeVisible()
    })

    test('careers detail sidebar shows apply button', async ({ page }) => {
      await page.goto('/careers/logistics-coordinator')
      const applyBtn = page.getByRole('link', { name: /Apply Now|General Enquiry/i })
      await expect(applyBtn).toBeVisible()
    })
  })
})
