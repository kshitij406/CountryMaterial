'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

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
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-white focus:outline-none font-barlow text-[15px] text-slate px-5 py-4 transition-colors duration-200 placeholder:text-slate/40'
  const inputStyle = { border: '1px solid #D8E0E7', background: '#FFFFFF' }
  const inputFocusStyle = { borderColor: '#2E6FA3' }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-condensed text-[10px] tracking-[0.22em] uppercase text-slate/60 mb-2">
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
            style={inputStyle}
            onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={e => Object.assign(e.target.style, inputStyle)}
          />
        </div>
        <div>
          <label className="block font-condensed text-[10px] tracking-[0.22em] uppercase text-slate/60 mb-2">
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
            style={inputStyle}
            onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={e => Object.assign(e.target.style, inputStyle)}
          />
        </div>
      </div>

      <div>
        <label className="block font-condensed text-[10px] tracking-[0.22em] uppercase text-slate/60 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+255 7XX XXX XXX"
          className={inputClass}
          style={inputStyle}
          onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={e => Object.assign(e.target.style, inputStyle)}
        />
      </div>

      <div>
        <label className="block font-condensed text-[10px] tracking-[0.22em] uppercase text-slate/60 mb-2">
          Subject <span className="text-gold">*</span>
        </label>
        <input
          type="text"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          placeholder="What is this regarding?"
          className={inputClass}
          style={inputStyle}
          onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={e => Object.assign(e.target.style, inputStyle)}
        />
      </div>

      <div>
        <label className="block font-condensed text-[10px] tracking-[0.22em] uppercase text-slate/60 mb-2">
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
          style={inputStyle}
          onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={e => Object.assign(e.target.style, inputStyle)}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="group relative overflow-hidden px-[34px] py-[18px] bg-gold text-white font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="relative z-10">{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
          <span className="absolute inset-0 bg-gold-dim -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
        </button>
      </div>

      {status === 'success' && (
        <div className="px-5 py-4 font-barlow text-[14px] text-slate/85" style={{ border: '1px solid #B9D1E4', background: '#EDF5FB' }}>
          Thank you! Your message has been received. We will get back to you shortly.
        </div>
      )}
      {status === 'error' && (
        <div className="px-5 py-4 font-barlow text-[14px] text-slate/75" style={{ border: '1px solid #D8E0E7', background: '#F7F9FB' }}>
          Something went wrong. Please try again or email us directly.
        </div>
      )}
    </form>
  )
}
