'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  splitBy?: 'words' | 'chars'
}

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  splitBy = 'words'
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const items = splitBy === 'words'
    ? children.split(' ')
    : children.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: splitBy === 'words' ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
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

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={controls}
      style={{ display: 'inline-flex', flexWrap: 'wrap', perspective: '1000px' }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{
            display: 'inline-block',
            marginRight: splitBy === 'words' ? '0.3em' : undefined,
            transformOrigin: 'bottom',
          }}
        >
          {item}
        </motion.span>
      ))}
    </motion.span>
  )
}
