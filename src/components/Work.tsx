'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { PROJECTS } from '@/constants'
import SectionHeader from './ui/SectionHeader'
import ParallaxCard from './effects/ParallaxCard'
import RevealOnScroll from './effects/RevealOnScroll'

export default function Work() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Show only first 4 projects on homepage
  const featuredProjects = PROJECTS.slice(0, 4)

  return (
    <section className="work-section" ref={ref} id="work">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader label="[C]" title="Selected Work" />
        </motion.div>

        <div className="work-grid">
          {featuredProjects.map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 0.15}>
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
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Link
            href="/work"
            data-cursor="hover"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'var(--muted)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              fontSize: 'var(--body)',
              fontWeight: 500,
              color: 'var(--foreground)',
              transition: 'all 0.3s ease',
            }}
          >
            View All Projects
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
