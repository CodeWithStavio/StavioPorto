'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'

interface Capability {
  title: string
  desc: string
}

interface Metric {
  value: string
  label: string
}

interface ExpertiseItem {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  capabilities: Capability[]
  tools: string[]
  metrics: Metric[]
}

interface ExpertiseClientProps {
  expertise: ExpertiseItem
  nextExpertise: ExpertiseItem
  prevExpertise: ExpertiseItem
}

export default function ExpertiseClient({ expertise, nextExpertise, prevExpertise }: ExpertiseClientProps) {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const capabilitiesRef = useRef(null)
  const capabilitiesInView = useInView(capabilitiesRef, { once: true, margin: '-100px' })
  const metricsRef = useRef(null)
  const metricsInView = useInView(metricsRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const titleChars = expertise.title.split('')

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero" ref={heroRef} style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '2rem' }}
          >
            <Link
              href="/#expertise"
              className="expertise-back"
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
              Back to Home
            </Link>
          </motion.div>

          {/* Service ID */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'var(--muted)',
              borderRadius: '2rem',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{
              fontSize: 'var(--small)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              letterSpacing: '0.1em',
            }}>
              {expertise.id}
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
                  delay: 0.2 + i * 0.03,
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
            }}
          >
            {expertise.longDescription}
          </motion.p>
        </div>

        {/* Floating ID */}
        <motion.div
          style={{ y: backgroundY }}
          className="floating-id"
        >
          <span style={{
            position: 'absolute',
            right: '-5vw',
            top: '20%',
            fontSize: 'clamp(150px, 25vw, 400px)',
            fontWeight: 100,
            color: 'var(--text-tertiary)',
            opacity: 0.03,
            pointerEvents: 'none',
            letterSpacing: '-0.05em',
          }}>
            {expertise.id}
          </span>
        </motion.div>
      </section>

      {/* Metrics Section */}
      <section className="expertise-metrics" ref={metricsRef} style={{ padding: '4rem 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              padding: '3rem',
              background: 'var(--card)',
              borderRadius: '1.5rem',
              border: '1px solid var(--border)',
            }}
          >
            {expertise.metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={metricsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                style={{
                  textAlign: 'center',
                  padding: '1rem',
                }}
              >
                <div style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 200,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: 'var(--small)',
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="expertise-capabilities" ref={capabilitiesRef} style={{ padding: '4rem 0 6rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader label="[A]" title="Capabilities" />
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
          }}>
            {expertise.capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                style={{
                  padding: '1.5rem',
                  background: 'var(--card)',
                  borderRadius: '1rem',
                  border: '1px solid var(--border)',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  y: -4,
                  borderColor: 'var(--text-tertiary)',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}>
                  <span style={{
                    fontSize: 'var(--small)',
                    color: 'var(--text-tertiary)',
                    fontWeight: 500,
                    minWidth: '24px',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 style={{
                      fontSize: 'var(--body)',
                      fontWeight: 600,
                      color: 'var(--foreground)',
                      marginBottom: '0.5rem',
                    }}>
                      {cap.title}
                    </h3>
                    <p style={{
                      fontSize: 'var(--small)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}>
                      {cap.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="expertise-tools" style={{ padding: '4rem 0', background: 'var(--muted)' }}>
        <div className="container">
          <SectionHeader label="[B]" title="Tech Stack" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '2rem',
            }}
          >
            {expertise.tools.map((tool, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '2rem',
                  fontSize: 'var(--small)',
                  fontWeight: 500,
                  color: 'var(--foreground)',
                }}
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="expertise-nav" style={{ padding: '4rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
          }}>
            {/* Previous */}
            <Link
              href={`/expertise/${prevExpertise.slug}`}
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
                  ← Previous
                </span>
                <span style={{
                  fontSize: 'var(--title-s)',
                  fontWeight: 500,
                  color: 'var(--foreground)',
                }}>
                  {prevExpertise.title}
                </span>
              </motion.div>
            </Link>

            {/* Next */}
            <Link
              href={`/expertise/${nextExpertise.slug}`}
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
                  Next →
                </span>
                <span style={{
                  fontSize: 'var(--title-s)',
                  fontWeight: 500,
                  color: 'var(--foreground)',
                }}>
                  {nextExpertise.title}
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
            Let&apos;s build something amazing
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
              Start a Project
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
