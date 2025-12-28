import { Metadata } from 'next'
import Contact from '@/components/Contact'
import { COPY } from '@/constants'
import { generatePageMetadata, SITE_URL, SEO_CONFIG } from '@/lib/seo.config'

// ══════════════════════════════════════════════════════════════════════════════
// PAGE METADATA (SEO)
// ══════════════════════════════════════════════════════════════════════════════
export const metadata: Metadata = {
  ...generatePageMetadata(
    'Contact',
    'Get in touch with Mustafa Alhassny for AI development, mobile app projects, full-stack development, or technical consulting. Available for freelance and contract work.',
    '/contact',
    [
      'Contact',
      'Hire Developer',
      'Freelance Developer',
      'AI Consultant',
      'Mobile App Development',
      'Technical Consulting',
    ]
  ),
  openGraph: {
    title: 'Contact | Mustafa Alhassny',
    description: 'Get in touch for AI development, mobile app projects, or technical consulting.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: [
      {
        url: '/og-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact Mustafa Alhassny',
      },
    ],
  },
}

// Contact page JSON-LD schema
function generateContactJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Mustafa Alhassny',
    description: 'Get in touch for AI development, mobile apps, and technical consulting',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SEO_CONFIG.name,
      email: `mailto:${SEO_CONFIG.email}`,
      jobTitle: SEO_CONFIG.title,
      sameAs: [
        SEO_CONFIG.social.linkedin,
        SEO_CONFIG.social.github,
        SEO_CONFIG.social.instagram,
      ],
    },
  }
}

export default function ContactPage() {
  const contactSchema = generateContactJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="title-xxl">
            {COPY.contact.heroTitle.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h1>
          <p className="page-hero__subtitle">
            {COPY.contact.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Contact Sections */}
      <Contact variant="page" />
    </>
  )
}
