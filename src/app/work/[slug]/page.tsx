import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { PROJECTS } from '@/constants'
import { SITE_URL, SEO_CONFIG, generateBreadcrumbSchema, generateProjectSchema } from '@/lib/seo.config'
import ProjectClient from './ProjectClient'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = PROJECTS.find((p) => p.slug === params.slug)
  if (!project) return { title: 'Not Found' }

  const url = `${SITE_URL}/work/${params.slug}`
  const title = `${project.title} - Case Study`
  const description = project.longDescription.slice(0, 155) + '...'

  return {
    title,
    description,
    keywords: [...SEO_CONFIG.keywords, ...project.tags, 'Case Study', 'Portfolio Project'],
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
          url: project.image || '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${project.title} - ${SEO_CONFIG.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SEO_CONFIG.name}`,
      description,
      images: [project.image || '/og-image.png'],
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

// Generate SoftwareApplication/CreativeWork Schema for projects
function generateFullProjectSchema(project: typeof PROJECTS[0]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/work/${project.slug}#project`,
    name: project.title,
    description: project.longDescription,
    applicationCategory: project.tags.includes('AI') ? 'DeveloperApplication' : 'MobileApplication',
    operatingSystem: project.tags.includes('React Native') ? 'iOS, Android' : 'Web',
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SEO_CONFIG.name,
    },
    creator: {
      '@type': 'Person',
      name: SEO_CONFIG.name,
    },
    image: project.image ? `${SITE_URL}${project.image}` : `${SITE_URL}/og-image.png`,
    keywords: project.tags.join(', '),
    dateCreated: new Date().toISOString().split('T')[0],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

// Generate Article Schema for case study
function generateCaseStudySchema(project: typeof PROJECTS[0]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/work/${project.slug}#article`,
    headline: `${project.title} - Case Study`,
    description: project.longDescription,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SEO_CONFIG.name,
    },
    publisher: {
      '@type': 'Person',
      name: SEO_CONFIG.name,
      url: SITE_URL,
    },
    image: project.image ? `${SITE_URL}${project.image}` : `${SITE_URL}/og-image.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/work/${project.slug}`,
    },
    keywords: project.tags.join(', '),
    articleSection: 'Portfolio',
    inLanguage: 'en-US',
  }
}

export default function ProjectPage({ params }: PageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === params.slug)
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length]

  // JSON-LD structured data
  const projectSchema = generateFullProjectSchema(project)
  const caseStudySchema = generateCaseStudySchema(project)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Work', url: `${SITE_URL}/work` },
    { name: project.title, url: `${SITE_URL}/work/${project.slug}` },
  ])

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ProjectClient
        project={project}
        nextProject={nextProject}
        prevProject={prevProject}
      />
    </>
  )
}
