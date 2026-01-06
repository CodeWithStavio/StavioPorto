'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface ClipRevealProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  splitBy?: 'chars' | 'words' | 'lines'
  once?: boolean
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div'
}

export default function ClipReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.03,
  duration = 0.6,
  splitBy = 'chars',
  once = true,
  as: Tag = 'span',
}: ClipRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  const items = splitBy === 'words'
    ? children.split(' ')
    : splitBy === 'lines'
    ? children.split('\n')
    : children.split('')

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: '100%' },
    visible: {
      y: '0%',
      transition: {
        duration,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLSpanElement & HTMLParagraphElement & HTMLHeadingElement & HTMLDivElement>}
      className={`clip-reveal ${className}`}
    >
      <motion.span
        className="clip-reveal__container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {items.map((item, i) => (
          <span key={i} className="clip-reveal__wrapper">
            <motion.span className="clip-reveal__item" variants={itemVariants}>
              {item === ' ' || item === '' ? '\u00A0' : item}
            </motion.span>
            {splitBy === 'words' && i < items.length - 1 && (
              <span className="clip-reveal__space">{'\u00A0'}</span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

// Simpler inline version for use within other motion components
export function ClipRevealInline({
  children,
  isInView,
  delay = 0,
  stagger = 0.03,
  duration = 0.6,
  splitBy = 'chars',
}: {
  children: string
  isInView: boolean
  delay?: number
  stagger?: number
  duration?: number
  splitBy?: 'chars' | 'words'
}) {
  const items = splitBy === 'words' ? children.split(' ') : children.split('')

  return (
    <span className="clip-reveal">
      {items.map((item, i) => (
        <span key={i} className="clip-reveal__wrapper">
          <motion.span
            className="clip-reveal__item"
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : { y: '100%' }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            {item === ' ' ? '\u00A0' : item}
          </motion.span>
          {splitBy === 'words' && i < items.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  )
}

// For list items with index-based stagger
export function ClipRevealItem({
  children,
  isInView,
  index = 0,
  baseDelay = 0,
  stagger = 0.1,
  duration = 0.6,
}: {
  children: React.ReactNode
  isInView: boolean
  index?: number
  baseDelay?: number
  stagger?: number
  duration?: number
}) {
  return (
    <span className="clip-reveal__wrapper">
      <motion.span
        className="clip-reveal__item"
        initial={{ y: '100%' }}
        animate={isInView ? { y: '0%' } : { y: '100%' }}
        transition={{
          duration,
          delay: baseDelay + index * stagger,
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}
