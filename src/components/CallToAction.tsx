'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { COPY } from '@/constants'
import MagneticButton from './effects/MagneticButton'

export default function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const titleChars = COPY.cta.title.split('')

  return (
    <section className="cta" ref={ref}>
      <div className="container">
        <motion.h2
          className="cta__title"
          style={{ perspective: '1000px' }}
        >
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: -45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.02,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              style={{ display: 'inline-block', transformOrigin: 'bottom' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <MagneticButton>
            <Link
              href="/contact"
              className="magnetic-btn pulse-glow"
              data-cursor="hover"
            >
              <span>{COPY.cta.buttonText}</span>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
