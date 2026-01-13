'use client'

import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface ParallaxCardProps {
  children: React.ReactNode
  className?: string
}

export default function ParallaxCard({ children, className = '' }: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafId = useRef<number | null>(null)
  const cachedRect = useRef<{ rect: DOMRect; time: number } | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const getCachedRect = useCallback(() => {
    const now = Date.now()
    if (cachedRect.current && now - cachedRect.current.time < 100) {
      return cachedRect.current.rect
    }
    const rect = ref.current!.getBoundingClientRect()
    cachedRect.current = { rect, time: now }
    return rect
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafId.current) return

    rafId.current = requestAnimationFrame(() => {
      const rect = getCachedRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      x.set(mouseX / rect.width - 0.5)
      y.set(mouseY / rect.height - 0.5)
      rafId.current = null
    })
  }, [getCachedRect, x, y])

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    cachedRect.current = null
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
        height: '100%',
      }}
    >
      {children}
    </motion.div>
  )
}
