import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

const FALLBACK_RECIPIENT = 'info@countrymaterial.com'
const FALLBACK_FROM      = 'Country Materials Website <onboarding@resend.dev>'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  // ── Parse body ────────────────────────────────────────────────────────────
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, phone, subject, message } = body as Record<string, string>

  // ── Server-side validation ────────────────────────────────────────────────
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Name, email, subject and message are required' },
      { status: 400 },
    )
  }

  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // ── API key guard ─────────────────────────────────────────────────────────
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email service is not configured' },
      { status: 503 },
    )
  }

  // ── Recipient from Sanity, with hardcoded fallback ────────────────────────
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)
  const recipient = settings?.email ?? FALLBACK_RECIPIENT
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? FALLBACK_FROM

  // ── Send via Resend ───────────────────────────────────────────────────────
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error: sendError } = await resend.emails.send({
      from:    fromAddress,
      to:      recipient,
      replyTo: email.trim(),
      subject: `[Country Materials] ${subject.trim()}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">

          <div style="background:#1F3347;padding:24px 32px;">
            <h2 style="color:#2E6FA3;margin:0;font-size:22px;">New Contact Form Submission</h2>
            <p style="color:rgba(255,255,255,0.5);margin:4px 0 0;font-size:13px;">countrymaterial.com</p>
          </div>

          <div style="background:#FAF7F2;padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #E8DED1;color:#2C3E50;font-size:13px;font-weight:bold;width:110px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #E8DED1;color:#2C3E50;font-size:14px;">${escHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #E8DED1;color:#2C3E50;font-size:13px;font-weight:bold;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #E8DED1;color:#2C3E50;font-size:14px;">
                  <a href="mailto:${escAttr(email)}" style="color:#2E6FA3;">${escHtml(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #E8DED1;color:#2C3E50;font-size:13px;font-weight:bold;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #E8DED1;color:#2C3E50;font-size:14px;">${phone?.trim() ? escHtml(phone) : '<span style="color:#999">Not provided</span>'}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #E8DED1;color:#2C3E50;font-size:13px;font-weight:bold;">Subject</td>
                <td style="padding:10px 0;border-bottom:1px solid #E8DED1;color:#2C3E50;font-size:14px;">${escHtml(subject)}</td>
              </tr>
            </table>

            <div style="margin-top:24px;">
              <p style="color:#2C3E50;font-size:13px;font-weight:bold;margin-bottom:8px;">Message</p>
              <div style="background:#fff;border:1px solid #E8DED1;padding:16px;color:#2C3E50;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escHtml(message)}</div>
            </div>

            <div style="margin-top:28px;padding-top:16px;border-top:1px solid #E8DED1;">
              <a href="mailto:${escAttr(email)}?subject=Re: ${escAttr(subject)}"
                 style="display:inline-block;background:#2E6FA3;color:#ffffff;padding:12px 24px;text-decoration:none;font-weight:bold;font-size:14px;">
                Reply to ${escHtml(name)}
              </a>
            </div>
          </div>

           <div style="background:#1A2232;padding:16px 32px;text-align:center;">
             <p style="color:rgba(255,255,255,0.25);font-size:12px;margin:0;">
              Country Materials Limited &bull; Babecov Complex, Buguruni Mandela Road &bull; Dar es Salaam, Tanzania
             </p>
           </div>

        </div>
      `,
    })

    if (sendError) {
      console.error('[Resend error]', sendError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[Contact API error]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── Minimal HTML escaping to prevent injection in the email body ────────────
function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escAttr(str: string): string {
  return encodeURIComponent(str.trim())
}
