// ══════════════════════════════════════════════════════════════════════════════
// SEO CONFIGURATION - CTO-LEVEL BEST PRACTICES
// ══════════════════════════════════════════════════════════════════════════════

import type { Metadata, Viewport } from 'next'

// ─────────────────────────────────────────────────────────────────────────────
// BASE CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stavio.dev'

export const SEO_CONFIG = {
  name: 'Mustafa Alhassny',
  title: 'AI & Full-Stack Developer',
  description:
    'AI specialist and full-stack developer with 3+ years of expertise in machine learning, React Native, and modern web technologies. Building AI-powered platforms and cross-platform applications.',
  shortDescription:
    'Building AI-powered platforms and cross-platform applications with PyTorch, React Native, and modern web technologies.',
  email: 'Contact@Stavio.dev',
  locale: 'en_US',
  themeColor: '#0a0a0a',
  backgroundColor: '#0a0a0a',
  twitterHandle: '@mustafa_alhasan_',
  social: {
    linkedin: 'https://www.linkedin.com/in/mustafaalhassny',
    github: 'https://github.com/CodeWithStavio',
    instagram: 'https://www.instagram.com/mustafa_alhasan_',
  },
  keywords: [
    'AI Developer',
    'Full-Stack Developer',
    'React Native Developer',
    'Machine Learning Engineer',
    'PyTorch Developer',
    'TensorFlow',
    'Next.js Developer',
    'Mobile App Developer',
    'Deepfake Detection',
    'NLP Engineer',
    'Cross-Platform Development',
    'Node.js',
    'TypeScript',
    'Mustafa Alhassny',
    'Stavio',
    'Freelance Developer',
    'AI Consultant',
  ],
} as const

// ─────────────────────────────────────────────────────────────────────────────
// VIEWPORT CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: SEO_CONFIG.themeColor },
  ],
  colorScheme: 'dark light',
}

// ─────────────────────────────────────────────────────────────────────────────
// BASE METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Core Meta
  title: {
    default: `${SEO_CONFIG.name} | ${SEO_CONFIG.title}`,
    template: `%s | ${SEO_CONFIG.name}`,
  },
  description: SEO_CONFIG.description,
  keywords: [...SEO_CONFIG.keywords],
  authors: [{ name: SEO_CONFIG.name, url: SITE_URL }],
  creator: SEO_CONFIG.name,
  publisher: SEO_CONFIG.name,
  generator: 'Next.js',
  applicationName: SEO_CONFIG.name,

  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: SEO_CONFIG.locale,
    url: SITE_URL,
    siteName: `${SEO_CONFIG.name} - Portfolio`,
    title: `${SEO_CONFIG.name} | ${SEO_CONFIG.title}`,
    description: SEO_CONFIG.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SEO_CONFIG.name} - ${SEO_CONFIG.title}`,
        type: 'image/png',
      },
      {
        url: '/og-image-square.png',
        width: 600,
        height: 600,
        alt: `${SEO_CONFIG.name} - ${SEO_CONFIG.title}`,
        type: 'image/png',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: `${SEO_CONFIG.name} | ${SEO_CONFIG.title}`,
    description: SEO_CONFIG.shortDescription,
    images: ['/og-image.png'],
    creator: SEO_CONFIG.twitterHandle,
    site: SEO_CONFIG.twitterHandle,
  },

  // Icons (using SVG as primary - works in all modern browsers)
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
  },
  manifest: '/site.webmanifest',

  // Verification (Add your actual codes)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
  },

  // Alternates
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
    },
  },

  // Additional Meta
  category: 'technology',
  classification: 'Portfolio',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SEO_CONFIG.name,
  },

  // Other
  other: {
    'msapplication-TileColor': SEO_CONFIG.themeColor,
    'msapplication-config': '/browserconfig.xml',
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE-SPECIFIC METADATA GENERATORS
// ─────────────────────────────────────────────────────────────────────────────

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  additionalKeywords: string[] = []
): Metadata {
  const url = `${SITE_URL}${path}`

  return {
    title,
    description,
    keywords: [...SEO_CONFIG.keywords, ...additionalKeywords] as string[],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SEO_CONFIG.name}`,
      description,
      url,
      type: 'website',
    },
    twitter: {
      title: `${title} | ${SEO_CONFIG.name}`,
      description,
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD SCHEMA GENERATORS
// ─────────────────────────────────────────────────────────────────────────────

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SEO_CONFIG.name,
    alternateName: 'Stavio',
    url: SITE_URL,
    image: `${SITE_URL}/profile-photo.jpg`,
    email: `mailto:${SEO_CONFIG.email}`,
    jobTitle: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'React Native',
      'Next.js',
      'Node.js',
      'Python',
      'PyTorch',
      'TensorFlow',
      'Full-Stack Development',
      'Mobile App Development',
      'Cross-Platform Development',
      'API Development',
      'Database Design',
      'Cloud Architecture',
      'Deepfake Detection',
      'Fraud Detection',
    ],
    sameAs: [
      SEO_CONFIG.social.linkedin,
      SEO_CONFIG.social.github,
      SEO_CONFIG.social.instagram,
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'AI & Machine Learning Expertise',
      },
    ],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${SEO_CONFIG.name} Portfolio`,
    description: SEO_CONFIG.description,
    publisher: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: `${SEO_CONFIG.name} - Development Services`,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    description: SEO_CONFIG.description,
    provider: { '@id': `${SITE_URL}/#person` },
    serviceType: [
      'AI Development',
      'Machine Learning Solutions',
      'Mobile App Development',
      'Full-Stack Web Development',
      'API Development',
      'Technical Consulting',
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 0,
        longitude: 0,
      },
      geoRadius: '40000 km',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}/contact`,
      servicePhone: '',
      availableLanguage: ['English', 'Arabic'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI & Machine Learning Development',
            description: 'Custom AI solutions including deepfake detection, NLP, fraud prevention, and predictive models using PyTorch and TensorFlow.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cross-Platform Mobile Development',
            description: 'Production-ready React Native apps for iOS and Android with focus on performance, UX, and App Store optimization.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full-Stack Web Development',
            description: 'Scalable web applications with Next.js, Node.js, TypeScript, and modern cloud infrastructure.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Backend Architecture & API Design',
            description: 'Secure, scalable backend systems with Node.js, FastAPI, PostgreSQL, and Docker with RSA/AES encryption.',
          },
        },
      ],
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateProjectSchema(project: {
  title: string
  description: string
  tags: string[]
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    creator: { '@id': `${SITE_URL}/#person` },
    image: project.image ? `${SITE_URL}${project.image}` : undefined,
    keywords: project.tags.join(', '),
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
