import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Log to console for now — replace with email service (Nodemailer, Resend, etc.) when ready
    console.log('[Contact Form Submission]', {
      name,
      email,
      phone: phone || 'Not provided',
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[Contact API Error]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
