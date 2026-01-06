'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { COPY } from '@/constants'
import MagneticButton from './effects/MagneticButton'

// Premium line-by-line text reveal
function TextLineReveal({ text, isInView }: { text: string; isInView: boolean }) {
  const words = text.split(' ')

  return (
    <span className="text-line-reveal">
      {words.map((word, i) => (
        <span key={i} className="text-line-reveal__word-wrapper">
          <motion.span
            className="text-line-reveal__word"
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : { y: '100%' }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  )
}

export default function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="cta" ref={ref}>
      <div className="container">
        <motion.h2 className="cta__title">
          <TextLineReveal text={COPY.cta.title} isInView={isInView} />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
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
