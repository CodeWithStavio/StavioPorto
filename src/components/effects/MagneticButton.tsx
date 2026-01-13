'use client'

import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const rafId = useRef<number | null>(null)
  const cachedRect = useRef<{ rect: DOMRect; time: number } | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  const getCachedRect = useCallback(() => {
    const now = Date.now()
    if (cachedRect.current && now - cachedRect.current.time < 100) {
      return cachedRect.current.rect
    }
    const rect = ref.current!.getBoundingClientRect()
    cachedRect.current = { rect, time: now }
    return rect
  }, [])

  const handleMouse = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (rafId.current) return

    rafId.current = requestAnimationFrame(() => {
      const { clientX, clientY } = e
      const { left, top, width, height } = getCachedRect()
      x.set((clientX - left - width / 2) * strength)
      y.set((clientY - top - height / 2) * strength)
      rafId.current = null
    })
  }, [getCachedRect, strength, x, y])

  const reset = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    cachedRect.current = null
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: xSpring, y: ySpring }}
    >
      {children}
    </motion.button>
  )
}
