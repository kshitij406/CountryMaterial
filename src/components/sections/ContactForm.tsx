'use client'

import { useState, FormEvent } from 'react'
import type { Dictionary } from '@/i18n'

const inputBase = 'w-full text-[15px] text-ink bg-white border px-4 py-3.5 placeholder:text-slate/35 transition-colors duration-200 focus:outline-none focus:border-gold'

export default function ContactForm({ t }: { t: Dictionary['contactForm'] }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-14 h-14 flex items-center justify-center border border-gold/40">
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-gold" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="font-black text-[20px] text-ink">{t.successHeading}</h3>
        <p className="text-[14px] text-slate/55 max-w-xs">{t.successBody}</p>
        <button onClick={() => setStatus('idle')} className="mt-2 text-[13px] font-semibold text-gold hover:text-gold-dark transition-colors duration-200 cursor-pointer border-b border-gold/30 hover:border-gold pb-0.5">
          {t.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className="block font-mono text-[10px] tracking-[0.18em] uppercase text-slate/50 mb-2">
            {t.fullName} <span className="text-gold" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder={t.fullNamePlaceholder}
            className={inputBase}
            style={{ borderColor: '#E8DED1' }}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block font-mono text-[10px] tracking-[0.18em] uppercase text-slate/50 mb-2">
            {t.email} <span className="text-gold" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder={t.emailPlaceholder}
            className={inputBase}
            style={{ borderColor: '#E8DED1' }}
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-phone" className="block font-mono text-[10px] tracking-[0.18em] uppercase text-slate/50 mb-2">
          {t.phone}
        </label>
        <input
          id="cf-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder={t.phonePlaceholder}
          className={inputBase}
          style={{ borderColor: '#E8DED1' }}
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="cf-subject" className="block font-mono text-[10px] tracking-[0.18em] uppercase text-slate/50 mb-2">
          {t.subject} <span className="text-gold" aria-hidden="true">*</span>
        </label>
        <select
          id="cf-subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className={inputBase}
          style={{ borderColor: '#E8DED1' }}
        >
          <option value="">{t.selectSubject}</option>
          <option value="quote">{t.subjects.quote}</option>
          <option value="delivery">{t.subjects.delivery}</option>
          <option value="vendor">{t.subjects.vendor}</option>
          <option value="trade">{t.subjects.trade}</option>
          <option value="certification">{t.subjects.certification}</option>
          <option value="other">{t.subjects.other}</option>
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="block font-mono text-[10px] tracking-[0.18em] uppercase text-slate/50 mb-2">
          {t.message} <span className="text-gold" aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder={t.messagePlaceholder}
          className={`${inputBase} resize-none`}
          style={{ borderColor: '#E8DED1' }}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-[13px] text-red-700 bg-red-50 border border-red-200 px-4 py-3">
          {t.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[15px] px-8 py-4 transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            {t.sending}
          </>
        ) : (
          <>
            {t.send}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </>
        )}
      </button>
    </form>
  )
}
