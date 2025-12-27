'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'hidden'>('default')
  const [cursorText, setCursorText] = useState('')
  const [isPressed, setIsPressed] = useState(false)
  const trailRefs = useRef<{ x: number; y: number }[]>([])

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Trail cursor with more delay
  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const trailSpringConfig = { damping: 35, stiffness: 150, mass: 1 }

  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const trailXSpring = useSpring(trailX, trailSpringConfig)
  const trailYSpring = useSpring(trailY, trailSpringConfig)

  // Glow intensity based on movement velocity
  const velocity = useMotionValue(0)
  const glowOpacity = useTransform(velocity, [0, 50], [0.3, 0.8])

  useEffect(() => {
    const hasMouseDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!hasMouseDevice) return

    setIsVisible(true)
    let lastX = 0
    let lastY = 0
    let lastTime = Date.now()

    // Check theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const dt = now - lastTime
      if (dt > 0) {
        const dx = e.clientX - lastX
        const dy = e.clientY - lastY
        const speed = Math.sqrt(dx * dx + dy * dy) / dt * 16
        velocity.set(Math.min(speed, 100))
      }
      lastX = e.clientX
      lastY = e.clientY
      lastTime = now

      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor')
      const text = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')

      if (cursorType === 'text' && text) {
        setCursorVariant('text')
        setCursorText(text)
      } else if (target.closest('a, button, [data-cursor-hover]')) {
        setCursorVariant('hover')
        setCursorText('')
      } else if (target.closest('[data-cursor-hidden]')) {
        setCursorVariant('hidden')
      } else {
        setCursorVariant('default')
        setCursorText('')
      }
    }

    const handleMouseDown = () => setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)

    const handleMouseLeave = () => {
      cursorX.set(-100)
      cursorY.set(-100)
      trailX.set(-100)
      trailY.set(-100)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      observer.disconnect()
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY, trailX, trailY, velocity])

  if (!isVisible) return null

  // Dark theme = white cursor, Light theme = black cursor
  const cursorColor = isDark ? '#fafafa' : '#0a0a0a'
  const textColor = isDark ? '#fafafa' : '#0a0a0a'
  const trailColor = isDark ? 'rgba(250, 250, 250, 0.3)' : 'rgba(10, 10, 10, 0.3)'
  const glowBorderColor = isDark ? 'rgba(250, 250, 250, 0.4)' : 'rgba(10, 10, 10, 0.4)'

  // Hover colors - just border, no fill
  const hoverBorderColor = isDark ? 'rgba(250, 250, 250, 0.6)' : 'rgba(10, 10, 10, 0.4)'

  // Text cursor - light tint so text is readable but content shows through
  const textBgColor = isDark ? 'rgba(10, 10, 10, 0.6)' : 'rgba(250, 250, 250, 0.6)'
  const textBorderColor = isDark ? 'rgba(250, 250, 250, 0.4)' : 'rgba(10, 10, 10, 0.25)'

  const variants = {
    default: {
      width: 14,
      height: 14,
      backgroundColor: cursorColor,
      border: 'none',
    },
    hover: {
      width: 50,
      height: 50,
      backgroundColor: 'transparent',
      border: `1.5px solid ${hoverBorderColor}`,
    },
    text: {
      width: 80,
      height: 80,
      backgroundColor: textBgColor,
      border: `1px solid ${textBorderColor}`,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
    },
  }

  return (
    <>
      {/* Outer glow trail */}
      <motion.div
        className="cursor-trail"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          opacity: glowOpacity,
          background: `radial-gradient(circle, ${trailColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main cursor */}
      <motion.div
        className="cursor"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isPressed ? 0.8 : 1,
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {cursorVariant === 'text' && (
          <motion.span
            className="cursor__text"
            style={{ color: textColor }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner glow ring */}
      <motion.div
        className="cursor-glow"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          borderColor: glowBorderColor,
        }}
        animate={{
          width: cursorVariant === 'hover' ? 70 : cursorVariant === 'text' ? 100 : 24,
          height: cursorVariant === 'hover' ? 70 : cursorVariant === 'text' ? 100 : 24,
          opacity: cursorVariant === 'hidden' ? 0 : 0.15,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
    </>
  )
}
