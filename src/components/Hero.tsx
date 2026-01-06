'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ROTATING_WORDS, SITE_CONFIG } from '@/constants'
import Marquee from './effects/Marquee'
import SectionHeader from './ui/SectionHeader'

// Premium split text animation with mask reveal
function SplitTextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <span ref={ref} className="split-text-reveal">
      {text.split('').map((char, i) => (
        <span key={i} className="split-text-reveal__char-wrapper">
          <motion.span
            className="split-text-reveal__char"
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : { y: '100%' }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.03,
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

// Elegant rotating word with smooth morph
function RotatingWord({ words, interval = 2500 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span className="rotating-word">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="rotating-word__text"
          initial={{ y: '100%', rotateX: -80 }}
          animate={{ y: '0%', rotateX: 0 }}
          exit={{ y: '-100%', rotateX: 80, opacity: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })

  const titleText = 'Elevate your'

  return (
    <section className="hero" ref={containerRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <SectionHeader label="[A]" title="Introduction" />
        </motion.div>

        <h1 className="hero__title">
          <span className="hero__title-line">
            <SplitTextReveal text={titleText} delay={0.2} />
          </span>

          <span className="hero__words">
            <RotatingWord words={ROTATING_WORDS.slice(0, -1)} interval={2500} />
          </span>
        </h1>

        <motion.div
          className="hero__bio"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <p>
            I&apos;m <strong>{SITE_CONFIG.name}</strong>, an AI specialist and full-stack developer
            with expertise in machine learning, React Native, and modern web technologies. With{' '}
            <span className="hero__accent">{SITE_CONFIG.yearsExperience} years</span> of
            experience, I build AI-powered platforms and cross-platform applications that drive business growth.
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
            transition={{ delay: 1.8, duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
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

      <div className="hero__marquee">
        <Marquee speed={30}>
          <span className="hero__marquee-item">AI & Machine Learning</span>
          <span className="hero__marquee-divider">✦</span>
          <span className="hero__marquee-item">React Native</span>
          <span className="hero__marquee-divider">✦</span>
          <span className="hero__marquee-item">PyTorch & TensorFlow</span>
          <span className="hero__marquee-divider">✦</span>
          <span className="hero__marquee-item">Next.js</span>
          <span className="hero__marquee-divider">✦</span>
          <span className="hero__marquee-item">Full Stack Development</span>
          <span className="hero__marquee-divider">✦</span>
          <span className="hero__marquee-item">NLP & Deepfake Detection</span>
          <span className="hero__marquee-divider">✦</span>
          <span className="hero__marquee-item">Node.js & FastAPI</span>
          <span className="hero__marquee-divider">✦</span>
          <span className="hero__marquee-item">PostgreSQL & MongoDB</span>
          <span className="hero__marquee-divider">✦</span>
        </Marquee>
      </div>
    </section>
  )
}
