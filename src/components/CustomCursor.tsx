'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'hidden'>('default')
  const [cursorText, setCursorText] = useState('')
  const [isPressed, setIsPressed] = useState(false)
  const lastInteractiveElement = useRef<Element | null>(null)
  const resetTimeout = useRef<NodeJS.Timeout | null>(null)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }

  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const hasMouseDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!hasMouseDevice) return

    setIsVisible(true)

    // Check theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // Check if point is within element bounds with padding tolerance
    const isWithinBounds = (x: number, y: number, element: Element) => {
      const rect = element.getBoundingClientRect()
      const cursorType = element.getAttribute('data-cursor')
      // Smaller padding for text cursor elements since they span full width
      const padding = cursorType === 'text' ? 20 : 30
      return (
        x >= rect.left - padding &&
        x <= rect.right + padding &&
        y >= rect.top - padding &&
        y <= rect.bottom + padding
      )
    }

    // Debounced reset to prevent flickering
    const scheduleReset = () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current)
      resetTimeout.current = setTimeout(() => {
        lastInteractiveElement.current = null
        setCursorVariant('default')
        setCursorText('')
      }, 50)
    }

    const cancelReset = () => {
      if (resetTimeout.current) {
        clearTimeout(resetTimeout.current)
        resetTimeout.current = null
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Check if we're still within bounds of the last interactive element
      if (lastInteractiveElement.current) {
        if (!isWithinBounds(e.clientX, e.clientY, lastInteractiveElement.current)) {
          scheduleReset()
        } else {
          cancelReset()
        }
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor')
      const text = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')

      // Check if element wants default cursor (no hover effect)
      if (target.closest('[data-cursor-default]')) {
        if (!lastInteractiveElement.current) {
          scheduleReset()
        }
      } else if (cursorType === 'text' && text) {
        cancelReset()
        lastInteractiveElement.current = target.closest('[data-cursor]')
        setCursorVariant('text')
        setCursorText(text)
      } else if (target.closest('[data-cursor-hidden]')) {
        cancelReset()
        lastInteractiveElement.current = null
        setCursorVariant('hidden')
      } else if (target.closest('a, button, [data-cursor-hover]')) {
        cancelReset()
        lastInteractiveElement.current = target.closest('a, button, [data-cursor-hover]')
        setCursorVariant('hover')
        setCursorText('')
      } else {
        // Only schedule reset if we're not over an interactive element
        if (!target.closest('[data-cursor]') && !target.closest('a, button, [data-cursor-hover]')) {
          if (lastInteractiveElement.current) {
            const withinBounds = isWithinBounds(e.clientX, e.clientY, lastInteractiveElement.current)
            if (!withinBounds) {
              scheduleReset()
            }
          }
        }
      }
    }

    const handleMouseDown = () => setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)

    const handleMouseLeave = () => {
      cursorX.set(-100)
      cursorY.set(-100)
      lastInteractiveElement.current = null
      cancelReset()
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      observer.disconnect()
      cancelReset()
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  // Dark theme = white cursor, Light theme = black cursor
  const cursorColor = isDark ? '#fafafa' : '#0a0a0a'
  const textColor = isDark ? '#fafafa' : '#0a0a0a'

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
    <motion.div
      className="cursor"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: isPressed && cursorVariant !== 'text' ? 0.9 : 1,
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
  )
}
