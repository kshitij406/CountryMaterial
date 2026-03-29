import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const RECIPIENT = 'info@countrymaterial.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      // Dev fallback — log to console if no API key is configured
      console.log('[Contact Form — no RESEND_API_KEY set]', { name, email, phone, message })
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'Country Materials Website <onboarding@resend.dev>',
      to: RECIPIENT,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0B1D3A; padding: 24px 32px;">
            <h2 style="color: #C8962E; margin: 0; font-size: 22px;">New Contact Form Submission</h2>
            <p style="color: #ffffff80; margin: 4px 0 0; font-size: 13px;">countrymaterial.com</p>
          </div>

          <div style="background: #FAF7F2; padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DED1; color: #2C3E50; font-size: 13px; font-weight: bold; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DED1; color: #2C3E50; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DED1; color: #2C3E50; font-size: 13px; font-weight: bold;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DED1; color: #2C3E50; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #C8962E;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DED1; color: #2C3E50; font-size: 13px; font-weight: bold;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #E8DED1; color: #2C3E50; font-size: 14px;">${phone || 'Not provided'}</td>
              </tr>
            </table>

            <div style="margin-top: 24px;">
              <p style="color: #2C3E50; font-size: 13px; font-weight: bold; margin-bottom: 8px;">Message</p>
              <div style="background: white; border: 1px solid #E8DED1; padding: 16px; color: #2C3E50; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E8DED1;">
              <a href="mailto:${email}?subject=Re: Your enquiry to Country Materials"
                 style="display: inline-block; background: #C8962E; color: #0B1D3A; padding: 12px 24px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Reply to ${name}
              </a>
            </div>
          </div>

          <div style="background: #1A1A2E; padding: 16px 32px; text-align: center;">
            <p style="color: #ffffff40; font-size: 12px; margin: 0;">
              Country Materials Ltd &bull; Babecov Complex, Buguruni Mandela Road &bull; Dar es Salaam, Tanzania
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('[Resend error]', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[Contact API error]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
