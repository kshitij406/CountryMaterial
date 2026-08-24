/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  // ponytail: cPanel's production install strips devDependencies, so eslint
  // isn't present on the server. Lint locally/in CI instead of during build.
  eslint: { ignoreDuringBuilds: true },
  // ponytail: shared-hosting memory limits (cPanel/CloudLinux LVE) kill the
  // default multi-worker build with SIGKILL. One worker is slower but fits.
  experimental: { cpus: 1, workerThreads: false },
  async redirects() {
    return [
      { source: '/services', destination: '/shop#services', permanent: true },
      { source: '/news', destination: '/blog', permanent: true },
      { source: '/news/:slug', destination: '/blog/:slug', permanent: true },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'countrymaterial.com' },
    ],
  },
}

// ponytail: bundle-analyzer is a devDependency, absent on production installs
// (cPanel's NODE_ENV=production skips devDependencies). Only load it when
// actually analyzing, so a normal build never needs it installed.
export default process.env.ANALYZE === 'true'
  ? (await import('@next/bundle-analyzer')).default({ enabled: true })(nextConfig)
  : nextConfig
