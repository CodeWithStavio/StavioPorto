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

export default function WorkClient() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const titleChars = 'Results:'.split('')
  const subtitleChars = 'My Portfolio'.split('')

  return (
    <>
      {/* Header */}
      <section className="page-hero" ref={headerRef}>
        <div className="container">
          <motion.h1 className="title-xxl" style={{ perspective: '1000px' }}>
            <span style={{ display: 'block' }}>
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: -90 }}
                  animate={headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
            <span style={{ display: 'block' }}>
              {subtitleChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: -90 }}
                  animate={headerInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Work Cards */}
      <section className="work-section">
        <div className="container">
          <RevealOnScroll>
            <SectionHeader label="[A]" title="Work" />
          </RevealOnScroll>

          <div className="work-grid">
            {PROJECTS.map((project, index) => (
              <RevealOnScroll key={project.id} delay={index * 0.15}>
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
                      <h3 className="work-card__title">{project.title}</h3>
                      {project.subtitle && (
                        <span className="work-card__subtitle">{project.subtitle}</span>
                      )}
                    </div>
                    <p className="work-card__description">{project.description}</p>
                    <div className="work-card__tags">
                      {project.tags.map((tag, i) => (
                        <motion.span
                          key={i}
                          className="work-card__tag"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </ParallaxCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <RevealOnScroll>
        <section className="cta">
          <div className="container">
            <motion.h2
              className="cta__title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {COPY.cta.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MagneticButton>
                <Link href="/contact" className="magnetic-btn">
                  <span>{COPY.cta.buttonText}</span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </RevealOnScroll>
    </>
  )
}
