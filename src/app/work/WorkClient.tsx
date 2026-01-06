'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { PROJECTS, COPY } from '@/constants'
import SectionHeader from '@/components/ui/SectionHeader'
import ParallaxCard from '@/components/effects/ParallaxCard'
import RevealOnScroll from '@/components/effects/RevealOnScroll'
import MagneticButton from '@/components/effects/MagneticButton'

// Clip reveal for titles only
function ClipTitle({
  children,
  isInView,
  delay = 0,
}: {
  children: string
  isInView: boolean
  delay?: number
}) {
  const chars = children.split('')

  return (
    <span className="clip-reveal">
      {chars.map((char, i) => (
        <span key={i} className="clip-reveal__wrapper">
          <motion.span
            className="clip-reveal__item"
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : { y: '100%' }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.025,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Work Card - only title has clip reveal, rest is simple fade
function WorkCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref}>
      <Link href={`/work/${project.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <ParallaxCard className="work-card">
          <div
            className="work-card__image"
            style={{ backgroundColor: project.color }}
            data-cursor="text"
            data-cursor-text="View"
          >
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="work-card__img"
                sizes="(max-width: 768px) 100vw, 50vw"
                style={['Zones', 'Bima', 'Wave'].includes(project.title) ? { objectFit: 'contain', padding: '2rem' } : undefined}
              />
            )}
          </div>
          <div className="work-card__content">
            <div className="work-card__header">
              <h3 className="work-card__title">
                <ClipTitle isInView={isInView} delay={0.1}>{project.title}</ClipTitle>
              </h3>
              {project.subtitle && (
                <motion.span
                  className="work-card__subtitle"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {project.subtitle}
                </motion.span>
              )}
            </div>
            <motion.p
              className="work-card__description"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              {project.description}
            </motion.p>
            <motion.div
              className="work-card__tags"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {project.tags.map((tag, i) => (
                <span key={i} className="work-card__tag">{tag}</span>
              ))}
            </motion.div>
          </div>
        </ParallaxCard>
      </Link>
    </div>
  )
}

// CTA Section - title only
function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="cta" ref={ref}>
      <div className="container">
        <h2 className="cta__title">
          <ClipTitle isInView={isInView} delay={0}>{COPY.cta.title}</ClipTitle>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MagneticButton>
            <Link href="/contact" className="magnetic-btn">
              <span>{COPY.cta.buttonText}</span>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

export default function WorkClient() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <>
      {/* Header */}
      <section className="page-hero" ref={headerRef}>
        <div className="container">
          <h1 className="title-xxl">
            <span style={{ display: 'block' }}>
              <ClipTitle isInView={headerInView} delay={0}>Results:</ClipTitle>
            </span>
            <span style={{ display: 'block' }}>
              <ClipTitle isInView={headerInView} delay={0.25}>My Portfolio</ClipTitle>
            </span>
          </h1>
        </div>
      </section>

      {/* Work Cards */}
      <section className="work-section">
        <div className="container">
          <SectionHeader label="[A]" title="Work" />

          <div className="work-grid">
            {PROJECTS.map((project, index) => (
              <RevealOnScroll key={project.id} delay={index * 0.1}>
                <WorkCard project={project} index={index} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  )
}
