// ══════════════════════════════════════════════════════════════════════════════
// DYNAMIC SITEMAP GENERATION
// Next.js 14+ built-in sitemap support - CTO-Level SEO
// ══════════════════════════════════════════════════════════════════════════════

import { MetadataRoute } from 'next'
import { PROJECTS, EXPERTISE_ITEMS } from '@/constants'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stavio.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  // Core pages - highest priority
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Individual project pages - high priority
  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${BASE_URL}/work/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Expertise/service pages - high priority for lead generation
  const expertisePages: MetadataRoute.Sitemap = EXPERTISE_ITEMS.map((item) => ({
    url: `${BASE_URL}/expertise/${item.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [...corePages, ...expertisePages, ...projectPages]
}
