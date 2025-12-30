import { notFound } from 'next/navigation'
import { EXPERTISE_ITEMS } from '@/constants'
import ExpertiseClient from './ExpertiseClient'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return EXPERTISE_ITEMS.map((item) => ({
    slug: item.slug,
  }))
}

export function generateMetadata({ params }: PageProps) {
  const expertise = EXPERTISE_ITEMS.find((item) => item.slug === params.slug)
  if (!expertise) return { title: 'Not Found' }

  return {
    title: `${expertise.title} | Mustafa Alhassny`,
    description: expertise.longDescription,
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

  return (
    <ExpertiseClient
      expertise={expertise}
      nextExpertise={nextExpertise}
      prevExpertise={prevExpertise}
    />
  )
}
