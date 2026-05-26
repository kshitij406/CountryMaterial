import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { revalidateTag } from 'next/cache'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

interface ProductUpdate {
  sanityId: string
  price?: number
  priceRange?: string
  inStock?: boolean
  specifications?: Record<string, string>
}

interface SyncBody {
  catalogUrl?: string
  catalogLabel?: string
  products?: ProductUpdate[]
}

export async function POST(req: NextRequest) {
  // ── Auth ─────────────────────────────────────────────────────────────────────
  const authHeader = req.headers.get('authorization') ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!token || token !== process.env.ERP_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body: SyncBody = await req.json()
    const timestamp = new Date().toISOString()
    let catalogUrlSynced = false
    let productCount = 0

    // ── Patch siteSettings ───────────────────────────────────────────────────
    if (body.catalogUrl) {
      const setFields: Record<string, string> = {
        'erpIntegration.catalogUrl': body.catalogUrl,
        'erpIntegration.erpLastSyncedAt': timestamp,
      }
      if (body.catalogLabel) {
        setFields['erpIntegration.catalogLabel'] = body.catalogLabel
      }
      await writeClient.patch('siteSettings').set(setFields).commit()
      catalogUrlSynced = true
    }

    // ── Patch products ───────────────────────────────────────────────────────
    if (body.products?.length) {
      await Promise.all(
        body.products.map((p) => {
          const fields: Record<string, unknown> = {}
          if (p.price !== undefined)       fields.price = p.price
          if (p.priceRange !== undefined)  fields.priceRange = p.priceRange
          if (p.inStock !== undefined)     fields.inStock = p.inStock
          if (p.specifications)            fields.specifications = p.specifications
          return writeClient.patch(p.sanityId).set(fields).commit()
        }),
      )
      productCount = body.products.length
    }

    // ── Revalidate Next.js cache ─────────────────────────────────────────────
    revalidateTag('siteSettings')
    revalidateTag('products')

    return NextResponse.json({
      success: true,
      synced: { catalogUrl: catalogUrlSynced, productCount },
      timestamp,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
