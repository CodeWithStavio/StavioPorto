import { Metadata } from 'next'
import WorkClient from './WorkClient'
import { generatePageMetadata, SITE_URL } from '@/lib/seo.config'
import { PROJECTS } from '@/constants'

// ══════════════════════════════════════════════════════════════════════════════
// PAGE METADATA (SEO)
// ══════════════════════════════════════════════════════════════════════════════
export const metadata: Metadata = {
  ...generatePageMetadata(
    'Work & Projects',
    'Explore my portfolio of AI-powered platforms, mobile applications, and full-stack projects. Including deepfake detection systems, fintech solutions, and cross-platform apps.',
    '/work',
    [
      'Portfolio',
      'Projects',
      'Case Studies',
      'Mobile Apps',
      'AI Projects',
      'React Native Apps',
      'Machine Learning Projects',
    ]
  ),
  openGraph: {
    title: 'Work & Projects | Mustafa Alhassny',
    description: 'Explore my portfolio of AI-powered platforms, mobile applications, and full-stack projects.',
    url: `${SITE_URL}/work`,
    type: 'website',
    images: [
      {
        url: '/og-work.png',
        width: 1200,
        height: 630,
        alt: 'Mustafa Alhassny - Portfolio Projects',
      },
    ],
  },
}

// Generate JSON-LD for projects
function generateProjectsJsonLd() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Portfolio Projects',
    description: 'Collection of AI, mobile, and full-stack development projects',
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        creator: {
          '@type': 'Person',
          name: 'Mustafa Alhassny',
        },
        keywords: project.tags.join(', '),
        image: project.image ? `${SITE_URL}${project.image}` : undefined,
      },
    })),
  }

  return itemListSchema
}

export default function Work() {
  const projectsSchema = generateProjectsJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <WorkClient />
    </>
  )
}
