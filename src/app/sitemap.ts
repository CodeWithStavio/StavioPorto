// ══════════════════════════════════════════════════════════════════════════════
// DYNAMIC SITEMAP GENERATION
// Next.js 14+ built-in sitemap support
// ══════════════════════════════════════════════════════════════════════════════

import { MetadataRoute } from 'next'
import { PROJECTS } from '@/constants'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stavio.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  // Core pages
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

  // Project pages (if you add individual project routes later)
  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${BASE_URL}/work#${project.title.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...corePages, ...projectPages]
}
