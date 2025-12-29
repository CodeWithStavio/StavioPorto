'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

const directionOffset = {
  up: { y: 80 },
  down: { y: -80 },
  left: { x: 80 },
  right: { x: -80 },
}

export default function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up'
}: RevealOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
        filter: 'blur(10px)',
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        willChange: isInView ? 'auto' : 'transform, opacity, filter',
        backfaceVisibility: 'hidden',
        height: '100%',
      }}
    >
      {children}
    </motion.div>
  )
}
