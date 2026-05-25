import { PortableText, type PortableTextComponents } from '@portabletext/react'

interface LegalData {
  title: string
  lastUpdated?: string
  body?: unknown[]
}

const ptComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-black text-2xl text-ink mt-10 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2
        className="font-black text-xl text-ink mt-10 mb-4 pl-4"
        style={{ borderLeft: '3px solid #C8962E' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-bold text-lg text-ink mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-slate leading-relaxed mb-5 text-[15px]">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="pl-5 my-6 text-slate italic"
        style={{ borderLeft: '3px solid #C8962E' }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="underline decoration-gold underline-offset-2 text-gold hover:text-gold-light transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-bold text-ink">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 mb-5 space-y-2 text-slate text-[15px]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 mb-5 space-y-2 text-slate text-[15px]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
}

function formatDate(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

interface Props {
  data: LegalData | null
  fallbackTitle: string
}

export default function LegalPageLayout({ data, fallbackTitle }: Props) {
  const title = data?.title ?? fallbackTitle

  return (
    <>
      {/* Hero strip */}
      <section
        className="relative pt-32 pb-16 sm:pb-20"
        style={{ background: '#0B1D3A' }}
        aria-label="Page hero"
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <p
            className="font-mono text-[11px] tracking-[0.22em] uppercase mb-6"
            style={{ color: '#C8962E' }}
          >
            Legal
          </p>
          <h1 className="font-black text-[clamp(34px,5vw,60px)] leading-tight text-white">
            {title}
          </h1>
          <span
            className="block h-1 w-16 mt-5"
            style={{ background: '#C8962E' }}
            aria-hidden="true"
          />
          {data?.lastUpdated && (
            <p className="mt-5 text-[13px]" style={{ color: '#8896A7' }}>
              Last updated: {formatDate(data.lastUpdated)}
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <section style={{ background: '#FAF7F2' }} className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          {data?.body?.length ? (
            <PortableText value={data.body as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
          ) : (
            <p className="text-slate text-[15px]">Content coming soon.</p>
          )}
        </div>
      </section>
    </>
  )
}
