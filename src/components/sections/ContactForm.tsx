'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-white border border-sand focus:border-gold focus:ring-0 focus:outline-none font-body text-slate text-sm px-5 py-4 transition-colors duration-200 placeholder:text-slate/40'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-xs text-slate/60 tracking-widest uppercase mb-2">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block font-body text-xs text-slate/60 tracking-widest uppercase mb-2">
            Email Address <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block font-body text-xs text-slate/60 tracking-widest uppercase mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+255 7XX XXX XXX"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block font-body text-xs text-slate/60 tracking-widest uppercase mb-2">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto px-10 py-4 bg-gold hover:bg-gold-light text-navy font-body font-semibold tracking-wide transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {status === 'success' && (
        <p className="font-body text-sm text-green-700 bg-green-50 border border-green-200 px-5 py-4">
          Thank you! Your message has been received. We will get back to you shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="font-body text-sm text-red-700 bg-red-50 border border-red-200 px-5 py-4">
          Something went wrong. Please try again or email us directly at info@countrymaterial.com
        </p>
      )}
    </form>
  )
}
