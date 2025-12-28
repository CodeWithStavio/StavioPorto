'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { COPY } from '@/constants'
import MagneticButton from './effects/MagneticButton'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function ScrambleTitle({ text, isInView }: { text: string; isInView: boolean }) {
  const [displayText, setDisplayText] = useState<string[]>(text.split(''))
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return
    setHasAnimated(true)

    const intervals: NodeJS.Timeout[] = []

    text.split('').forEach((char, i) => {
      if (char === ' ' || char === '?' || char === '!') return

      let iterations = 0
      const maxIterations = 4 + Math.floor(i / 3)

      const interval = setInterval(() => {
        setDisplayText(prev => {
          const newText = [...prev]
          if (iterations >= maxIterations) {
            newText[i] = char
          } else {
            newText[i] = chars[Math.floor(Math.random() * chars.length)]
          }
          return newText
        })

        iterations++
        if (iterations > maxIterations) {
          clearInterval(interval)
        }
      }, 35)

      intervals.push(interval)
    })

    return () => intervals.forEach(clearInterval)
  }, [isInView, text, hasAnimated])

  return (
    <>
      {displayText.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: i * 0.015,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </>
  )
}

export default function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="cta" ref={ref}>
      <div className="container">
        <motion.h2
          className="cta__title"
        >
          <ScrambleTitle text={COPY.cta.title} isInView={isInView} />
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
