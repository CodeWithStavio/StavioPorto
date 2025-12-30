import { notFound } from 'next/navigation'
import { PROJECTS } from '@/constants'
import ProjectClient from './ProjectClient'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({ params }: PageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug)
  if (!project) return { title: 'Not Found' }

  return {
    title: `${project.title} | Mustafa Alhassny`,
    description: project.longDescription,
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

  return (
    <ProjectClient
      project={project}
      nextProject={nextProject}
      prevProject={prevProject}
    />
  )
}
