// ══════════════════════════════════════════════════════════════════════════════
// JSON-LD STRUCTURED DATA COMPONENT
// Provides rich snippets for search engines (Google, Bing, etc.)
// ══════════════════════════════════════════════════════════════════════════════

import {
  generatePersonSchema,
  generateWebsiteSchema,
  generateProfessionalServiceSchema,
  generateBreadcrumbSchema,
  SITE_URL,
} from '@/lib/seo.config'

interface JsonLdProps {
  type?: 'home' | 'work' | 'contact'
}

export default function JsonLd({ type = 'home' }: JsonLdProps) {
  const personSchema = generatePersonSchema()
  const websiteSchema = generateWebsiteSchema()
  const professionalServiceSchema = generateProfessionalServiceSchema()

  // Generate breadcrumbs based on page type
  const getBreadcrumbs = () => {
    const base = [{ name: 'Home', url: SITE_URL }]

    switch (type) {
      case 'work':
        return generateBreadcrumbSchema([
          ...base,
          { name: 'Work', url: `${SITE_URL}/work` },
        ])
      case 'contact':
        return generateBreadcrumbSchema([
          ...base,
          { name: 'Contact', url: `${SITE_URL}/contact` },
        ])
      default:
        return null
    }
  }

  const breadcrumbSchema = getBreadcrumbs()

  // Organization schema for brand recognition
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Stavio Development',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    founder: { '@id': `${SITE_URL}/#person` },
    sameAs: [
      'https://www.linkedin.com/in/mustafaalhassny',
      'https://github.com/CodeWithStavio',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'Contact@Stavio.dev',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
    },
  }

  return (
    <>
      {/* Person Schema - Who you are */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Website Schema - Site information */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Professional Service Schema - What you offer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />

      {/* Organization Schema - Brand */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Breadcrumb Schema - Navigation */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  )
}
