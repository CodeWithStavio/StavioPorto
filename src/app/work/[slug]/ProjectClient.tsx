'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'

interface Metric {
  value: string
  label: string
}

interface Project {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  color: string
  image: string
  tags: string[]
  role: string
  duration: string
  highlights: string[]
  metrics: Metric[]
}

interface ProjectClientProps {
  project: Project
  nextProject: Project
  prevProject: Project
}

export default function ProjectClient({ project, nextProject, prevProject }: ProjectClientProps) {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const detailsRef = useRef(null)
  const detailsInView = useInView(detailsRef, { once: true, margin: '-100px' })
  const highlightsRef = useRef(null)
  const highlightsInView = useInView(highlightsRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll()
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])

  const titleChars = project.title.split('')

  return (
    <>
      {/* Hero Section */}
      <section className="project-hero" ref={heroRef}>
        <div className="container">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '2rem', paddingTop: '2rem' }}
          >
            <Link
              href="/work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: 'var(--small)',
                color: 'var(--text-tertiary)',
                transition: 'color 0.3s ease',
              }}
              data-cursor-default
            >
              <span style={{ fontSize: '1.25rem' }}>←</span>
              All Projects
            </Link>
          </motion.div>

          {/* Project Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{
              fontSize: 'var(--title-m)',
              fontWeight: 200,
              color: 'var(--text-tertiary)',
              letterSpacing: '-0.02em',
            }}>
              {project.id}
            </span>
            <span style={{
              width: '40px',
              height: '1px',
              background: 'var(--border)',
            }} />
            <span style={{
              fontSize: 'var(--small)',
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              {project.subtitle}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="title-xxl"
            style={{ perspective: '1000px', marginBottom: '1.5rem' }}
          >
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={heroInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: 'inline-block', transformOrigin: 'bottom' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Long Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontSize: 'var(--title-s)',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            {project.longDescription}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            {project.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: '0.375rem 0.75rem',
                  background: 'var(--muted)',
                  borderRadius: '2rem',
                  fontSize: 'var(--xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Image */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              background: project.color === 'transparent' ? 'var(--card)' : project.color,
              border: '1px solid var(--border)',
            }}
          >
            <motion.div
              style={{
                scale: imageScale,
                opacity: imageOpacity,
                width: '100%',
                height: '100%',
              }}
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{
                    objectFit: ['Zones', 'Bima', 'Wave'].includes(project.title) ? 'contain' : 'cover',
                    padding: ['Zones', 'Bima', 'Wave'].includes(project.title) ? '3rem' : 0,
                  }}
                  priority
                />
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Details Grid */}
      <section ref={detailsRef} style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            padding: '3rem',
            background: 'var(--card)',
            borderRadius: '1.5rem',
            border: '1px solid var(--border)',
          }}>
            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div style={{
                fontSize: 'var(--xs)',
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}>
                Role
              </div>
              <div style={{
                fontSize: 'var(--body)',
                fontWeight: 500,
                color: 'var(--foreground)',
              }}>
                {project.role}
              </div>
            </motion.div>

            {/* Duration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div style={{
                fontSize: 'var(--xs)',
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}>
                Duration
              </div>
              <div style={{
                fontSize: 'var(--body)',
                fontWeight: 500,
                color: 'var(--foreground)',
              }}>
                {project.duration}
              </div>
            </motion.div>

            {/* Metrics */}
            {project.metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={detailsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <div style={{
                  fontSize: 'var(--xs)',
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                }}>
                  {metric.label}
                </div>
                <div style={{
                  fontSize: 'var(--title-m)',
                  fontWeight: 300,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.02em',
                }}>
                  {metric.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section ref={highlightsRef} style={{ padding: '4rem 0 6rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader label="[A]" title="Key Highlights" />
          </motion.div>

          <div style={{
            display: 'grid',
            gap: '1rem',
            marginTop: '2rem',
          }}>
            {project.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={highlightsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem',
                  padding: '1.5rem',
                  background: 'var(--card)',
                  borderRadius: '1rem',
                  border: '1px solid var(--border)',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  background: 'var(--muted)',
                  borderRadius: '50%',
                  fontSize: 'var(--small)',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{
                  fontSize: 'var(--body)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {highlight}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
          }}>
            {/* Previous */}
            <Link
              href={`/work/${prevProject.slug}`}
              style={{ textDecoration: 'none' }}
              data-cursor="text"
              data-cursor-text="Prev"
            >
              <motion.div
                whileHover={{ x: -10 }}
                style={{
                  padding: '2rem',
                  background: 'var(--card)',
                  borderRadius: '1rem',
                  border: '1px solid var(--border)',
                  transition: 'border-color 0.3s ease',
                }}
              >
                <span style={{
                  fontSize: 'var(--xs)',
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}>
                  ← Previous Project
                </span>
                <span style={{
                  fontSize: 'var(--title-s)',
                  fontWeight: 500,
                  color: 'var(--foreground)',
                }}>
                  {prevProject.title}
                </span>
              </motion.div>
            </Link>

            {/* Next */}
            <Link
              href={`/work/${nextProject.slug}`}
              style={{ textDecoration: 'none' }}
              data-cursor="text"
              data-cursor-text="Next"
            >
              <motion.div
                whileHover={{ x: 10 }}
                style={{
                  padding: '2rem',
                  background: 'var(--card)',
                  borderRadius: '1rem',
                  border: '1px solid var(--border)',
                  textAlign: 'right',
                  transition: 'border-color 0.3s ease',
                }}
              >
                <span style={{
                  fontSize: 'var(--xs)',
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}>
                  Next Project →
                </span>
                <span style={{
                  fontSize: 'var(--title-s)',
                  fontWeight: 500,
                  color: 'var(--foreground)',
                }}>
                  {nextProject.title}
                </span>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" style={{ padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'var(--title-xl)',
              fontWeight: 400,
              marginBottom: '2rem',
            }}
          >
            Have a similar project in mind?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="magnetic-btn"
              data-cursor="hover"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: 'var(--foreground)',
                color: 'var(--background)',
                borderRadius: '0.75rem',
                fontSize: 'var(--body)',
                fontWeight: 500,
                transition: 'all 0.3s ease',
              }}
            >
              Let&apos;s Talk
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
