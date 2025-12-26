'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  className = '',
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  })

  const display = useTransform(spring, (latest) => {
    return Math.floor(latest)
  })

  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      spring.set(value)
    }
  }, [isInView, hasAnimated, spring, value])

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [display])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  )
}
