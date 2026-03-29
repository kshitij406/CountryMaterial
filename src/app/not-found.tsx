import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="font-heading text-8xl text-gold/20 mb-4">404</div>
        <h1 className="font-heading text-4xl text-white mb-4">Page Not Found</h1>
        <p className="font-body text-white/60 leading-relaxed mb-8">
          The page you are looking for does not exist, has been moved, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-navy font-body font-semibold tracking-wide transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
