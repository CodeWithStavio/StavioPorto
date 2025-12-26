'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ROTATING_WORDS, SITE_CONFIG } from '@/constants'
import Marquee from './effects/Marquee'

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % (ROTATING_WORDS.length - 1))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const bioVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const titleText = 'Elevate your'

  return (
    <section className="hero">
      <div className="container">
        <motion.h1
          className="hero__title"
          variants={titleVariants}
          initial="hidden"
          animate={mounted ? 'visible' : 'hidden'}
          style={{ perspective: '1000px' }}
        >
          <span className="hero__title-line">
            {titleText.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                style={{ display: 'inline-block', transformOrigin: 'bottom' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>

          <span className="hero__words">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                className="hero__word"
                initial={{ opacity: 0, y: 60, rotateX: -45, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -60, rotateX: 45, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.div
          className="hero__bio"
          variants={bioVariants}
          initial="hidden"
          animate={mounted ? 'visible' : 'hidden'}
        >
          <p>
            I&apos;m <strong>{SITE_CONFIG.name}</strong>, a dedicated Mobile App Developer
            with expertise in React Native and backend architecture. With{' '}
            <span className="hero__accent">{SITE_CONFIG.yearsExperience} years</span> of
            experience, I specialize in crafting scalable and user-centric applications.
          </p>
        </motion.div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="hero__scroll-line"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="hero__scroll-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            Scroll
          </motion.span>
        </motion.div>
      </div>

      {/* Marquee at bottom */}
      <div className="hero__marquee">
        <Marquee speed={30}>
          <span className="hero__marquee-item">Mobile Development</span>
          <span className="hero__marquee-divider">✦</span>
          <span className="hero__marquee-item">React Native</span>
          <span className="hero__marquee-divider">✦</span>
          <span className="hero__marquee-item">Full Stack</span>
          <span className="hero__marquee-divider">✦</span>
          <span className="hero__marquee-item">UI/UX Design</span>
          <span className="hero__marquee-divider">✦</span>
          <span className="hero__marquee-item">Backend Architecture</span>
          <span className="hero__marquee-divider">✦</span>
        </Marquee>
      </div>
    </section>
  )
}
