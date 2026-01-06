'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const items = splitBy === 'words' ? children.split(' ') : children.split('')

  return (
    <span ref={ref} className={`text-reveal ${className}`}>
      {items.map((item, index) => (
        <span key={index} className="text-reveal__item-wrapper">
          <motion.span
            className="text-reveal__item"
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : { y: '100%' }}
            transition={{
              duration: 0.6,
              delay: delay + index * (splitBy === 'words' ? 0.05 : 0.02),
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            {item}
          </motion.span>
          {splitBy === 'words' && index < items.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  )
}
