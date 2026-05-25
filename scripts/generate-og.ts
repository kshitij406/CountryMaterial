import sharp from 'sharp'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

const W = 1200
const H = 630

// Brand colours
const NAVY_BG = { r: 0x0b, g: 0x1d, b: 0x3a, alpha: 1 }
const GOLD_HEX = '#C8962E'
const CREAM_HEX = '#FAF7F2'
const SLATE_HEX = '#8899AA'

// ---------------------------------------------------------------------------
// ICO helper — wraps a single PNG buffer in a minimal ICO container.
// Modern browsers fully support PNG-compressed ICO files.
// ---------------------------------------------------------------------------
function pngToIco(pngBuffer: Buffer, size: number): Buffer {
  const DATA_OFFSET = 6 + 16  // ICONDIR (6 bytes) + one ICONDIRENTRY (16 bytes)
  const out = Buffer.alloc(DATA_OFFSET + pngBuffer.length)

  // ICONDIR header
  out.writeUInt16LE(0, 0)   // reserved
  out.writeUInt16LE(1, 2)   // type: 1 = .ico
  out.writeUInt16LE(1, 4)   // image count: 1

  // ICONDIRENTRY (one entry, 16 bytes starting at offset 6)
  out.writeUInt8(size,  6)  // width  (0 means 256)
  out.writeUInt8(size,  7)  // height
  out.writeUInt8(0,     8)  // colour count (0 = no palette)
  out.writeUInt8(0,     9)  // reserved
  out.writeUInt16LE(1,  10) // colour planes
  out.writeUInt16LE(32, 12) // bits per pixel
  out.writeUInt32LE(pngBuffer.length, 14) // image data size
  out.writeUInt32LE(DATA_OFFSET,      18) // image data offset

  pngBuffer.copy(out, DATA_OFFSET)
  return out
}

// ---------------------------------------------------------------------------
// Favicon — 32×32 logo centred on navy, written as favicon.ico
// ---------------------------------------------------------------------------
async function generateFavicon() {
  const logoPath    = resolve('public/images/logo/Country-Materials-Logo.png')
  const faviconPath = resolve('public/favicon.ico')
  const SIZE = 32

  const iconPng = await sharp(logoPath)
    .resize(SIZE, SIZE, { fit: 'contain', background: NAVY_BG })
    .png()
    .toBuffer()

  const icoBuffer = pngToIco(iconPng, SIZE)
  writeFileSync(faviconPath, icoBuffer)

  const { size: bytes } = require('fs').statSync(faviconPath)
  console.log(`✓  Written: ${faviconPath}`)
  console.log(`   Dimensions: ${SIZE}×${SIZE}  (${bytes} bytes, ICO container with embedded PNG)`)
}

// ---------------------------------------------------------------------------
// Logo SVG — embeds Country-Materials-Logo.png as a base64 <image> element
// so the SVG carries the real artwork instead of a hand-drawn approximation
// ---------------------------------------------------------------------------
async function generateLogoSvg() {
  const pngPath = resolve('public/images/logo/Country-Materials-Logo.png')
  const svgPath = resolve('public/images/country-materials-logo.svg')

  const { width: W, height: H } = await sharp(pngPath).metadata()
  const b64 = (await sharp(pngPath).toBuffer()).toString('base64')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img"
  aria-label="Country Materials Ltd Logo">
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="${W}" height="${H}"/>
</svg>`

  writeFileSync(svgPath, svg)

  const { size: bytes } = require('fs').statSync(svgPath)
  console.log(`✓  Written: ${svgPath}`)
  console.log(`   viewBox: 0 0 ${W} ${H}  (${(bytes / 1024).toFixed(1)} KB)`)
}

// ---------------------------------------------------------------------------
// OG image — 1200×630
// ---------------------------------------------------------------------------
async function main() {
  const logoPath = resolve('public/images/logo/Country-Materials-Logo.png')
  const outPath  = resolve('public/og-default.png')

  // --- resize logo to 400px wide, preserve aspect ratio ---
  const logoBuffer = await sharp(logoPath)
    .resize(400, undefined, { fit: 'inside', withoutEnlargement: false })
    .toBuffer()

  const { width: logoW = 400, height: logoH = 154 } = await sharp(logoBuffer).metadata()

  // Layout constants
  const logoLeft   = Math.round((W - logoW) / 2)
  const logoTop    = 133
  const logoBottom = logoTop + logoH

  const ruleY          = logoBottom + 60          // gold rule top
  const mainTextCenterY = ruleY + 2 + 44 + 26     // 26 = half of font-size 52
  const subTextCenterY  = mainTextCenterY + 26 + 32 + 13  // 13 = half of font-size 26

  // --- SVG layer: top border + rule + text ---
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Top gold strip -->
  <rect x="0" y="0" width="${W}" height="4" fill="${GOLD_HEX}"/>
  <!-- Gold horizontal rule below logo -->
  <rect x="0" y="${ruleY}" width="${W}" height="2" fill="${GOLD_HEX}"/>
  <!-- Main heading -->
  <text
    x="${W / 2}" y="${mainTextCenterY}"
    font-family="Liberation Sans, sans-serif"
    font-weight="700"
    font-size="52"
    fill="${CREAM_HEX}"
    text-anchor="middle"
    dominant-baseline="central"
  >Building Tanzania&#x2019;s Future</text>
  <!-- Sub heading -->
  <text
    x="${W / 2}" y="${subTextCenterY}"
    font-family="Liberation Sans, sans-serif"
    font-weight="400"
    font-size="26"
    fill="${SLATE_HEX}"
    text-anchor="middle"
    dominant-baseline="central"
  >Hardware &#xB7; Waste Management &#xB7; Logistics</text>
</svg>`

  await sharp({
    create: { width: W, height: H, channels: 4, background: NAVY_BG },
  })
    .composite([
      { input: logoBuffer, left: logoLeft, top: logoTop, blend: 'over' },
      { input: Buffer.from(svg), left: 0, top: 0, blend: 'over' },
    ])
    .flatten({ background: NAVY_BG })   // collapse alpha → opaque RGB
    .png({ compressionLevel: 9 })
    .toFile(outPath)

  const { width, height } = await sharp(outPath).metadata()
  console.log(`✓  Written: ${outPath}`)
  console.log(`   Dimensions: ${width}×${height}`)
}

Promise.all([main(), generateFavicon(), generateLogoSvg()]).catch((err) => { console.error(err); process.exit(1) })
