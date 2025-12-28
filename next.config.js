/** @type {import('next').NextConfig} */
const nextConfig = {
  // ════════════════════════════════════════════════════════════════════════════
  // IMAGE OPTIMIZATION
  // ════════════════════════════════════════════════════════════════════════════
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // COMPRESSION & PERFORMANCE
  // ════════════════════════════════════════════════════════════════════════════
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Enable SWC minification (faster than Terser)
  swcMinify: true,

  // ════════════════════════════════════════════════════════════════════════════
  // EXPERIMENTAL FEATURES (Next.js 14+)
  // ════════════════════════════════════════════════════════════════════════════
  experimental: {
    // optimizeCss: true, // Requires 'critters' package - enable if needed
    optimizePackageImports: ['framer-motion', '@studio-freight/lenis'],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SECURITY HEADERS
  // ════════════════════════════════════════════════════════════════════════════
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security Headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Content Security Policy (relaxed for development - tighten for production)
          // {
          //   key: 'Content-Security-Policy',
          //   value: [
          //     "default-src 'self'",
          //     "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          //     "style-src 'self' 'unsafe-inline'",
          //     "img-src 'self' data: blob: https:",
          //     "font-src 'self' https://fonts.gstatic.com",
          //     "connect-src 'self'",
          //   ].join('; '),
          // },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // REDIRECTS
  // ════════════════════════════════════════════════════════════════════════════
  async redirects() {
    return [
      // Redirect www to non-www (or vice versa)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.stavio.dev',
          },
        ],
        destination: 'https://stavio.dev/:path*',
        permanent: true,
      },
      // Common typos/old URLs
      {
        source: '/portfolio',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // ════════════════════════════════════════════════════════════════════════════
  // WEBPACK OPTIMIZATION
  // ════════════════════════════════════════════════════════════════════════════
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle in production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1]
                return `npm.${packageName.replace('@', '')}`
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name: 'shared',
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
