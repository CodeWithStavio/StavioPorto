import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { EXPERTISE_ITEMS } from '@/constants'
import { SITE_URL, SEO_CONFIG, generateBreadcrumbSchema } from '@/lib/seo.config'
import ExpertiseClient from './ExpertiseClient'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return EXPERTISE_ITEMS.map((item) => ({
    slug: item.slug,
  }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const expertise = EXPERTISE_ITEMS.find((item) => item.slug === params.slug)
  if (!expertise) return { title: 'Not Found' }

  const url = `${SITE_URL}/expertise/${params.slug}`
  const title = `${expertise.title} Services`
  const description = expertise.longDescription.slice(0, 155) + '...'

  // Dynamic keywords based on expertise type
  const expertiseKeywords: Record<string, string[]> = {
    'ai-machine-learning': [
      'AI Development Services',
      'Machine Learning Solutions',
      'Deep Learning',
      'PyTorch Developer',
      'TensorFlow Expert',
      'NLP Services',
      'Computer Vision',
      'Predictive Analytics',
      'AI Consulting',
    ],
    'cross-platform': [
      'React Native Developer',
      'Cross-Platform App Development',
      'iOS Android Development',
      'Mobile App Developer',
      'Flutter Alternative',
      'Expo Developer',
      'App Store Optimization',
    ],
    'full-stack': [
      'Full-Stack Developer',
      'Next.js Developer',
      'Node.js Expert',
      'TypeScript Developer',
      'API Development',
      'Backend Architecture',
      'Frontend Development',
      'Web Application Development',
    ],
  }

  const keywords = expertiseKeywords[params.slug] || []

  return {
    title,
    description,
    keywords: [...SEO_CONFIG.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SEO_CONFIG.name}`,
      description,
      url,
      type: 'website',
      siteName: `${SEO_CONFIG.name} - Portfolio`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${expertise.title} - ${SEO_CONFIG.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SEO_CONFIG.name}`,
      description,
      images: ['/og-image.png'],
      creator: SEO_CONFIG.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

// Generate Service Schema for expertise
function generateServiceSchema(expertise: typeof EXPERTISE_ITEMS[0]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/expertise/${expertise.slug}#service`,
    name: expertise.title,
    description: expertise.longDescription,
    provider: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SEO_CONFIG.name,
    },
    serviceType: expertise.title,
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${expertise.title} Services`,
      itemListElement: expertise.capabilities.map((cap, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: cap.title,
          description: cap.desc,
        },
        position: index + 1,
      })),
    },
  }
}

export default function ExpertisePage({ params }: PageProps) {
  const expertise = EXPERTISE_ITEMS.find((item) => item.slug === params.slug)

  if (!expertise) {
    notFound()
  }

  const currentIndex = EXPERTISE_ITEMS.findIndex((item) => item.slug === params.slug)
  const nextExpertise = EXPERTISE_ITEMS[(currentIndex + 1) % EXPERTISE_ITEMS.length]
  const prevExpertise = EXPERTISE_ITEMS[(currentIndex - 1 + EXPERTISE_ITEMS.length) % EXPERTISE_ITEMS.length]

  // JSON-LD structured data
  const serviceSchema = generateServiceSchema(expertise)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Expertise', url: `${SITE_URL}/#expertise` },
    { name: expertise.title, url: `${SITE_URL}/expertise/${expertise.slug}` },
  ])

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ExpertiseClient
        expertise={expertise}
        nextExpertise={nextExpertise}
        prevExpertise={prevExpertise}
      />
    </>
  )
}
