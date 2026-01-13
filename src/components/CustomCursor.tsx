'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'hidden'>('default')
  const [cursorText, setCursorText] = useState('')
  const [isPressed, setIsPressed] = useState(false)
  const lastInteractiveElement = useRef<Element | null>(null)
  const resetTimeout = useRef<NodeJS.Timeout | null>(null)
  const rafId = useRef<number | null>(null)
  const pendingMousePos = useRef<{ x: number; y: number } | null>(null)
  const cachedRect = useRef<{ element: Element; rect: DOMRect; time: number } | null>(null)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }

  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Cache getBoundingClientRect for 100ms to avoid layout thrashing
  const getCachedRect = useCallback((element: Element): DOMRect => {
    const now = Date.now()
    if (cachedRect.current &&
        cachedRect.current.element === element &&
        now - cachedRect.current.time < 100) {
      return cachedRect.current.rect
    }
    const rect = element.getBoundingClientRect()
    cachedRect.current = { element, rect, time: now }
    return rect
  }, [])

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
      const rect = getCachedRect(element)
      const cursorType = element.getAttribute('data-cursor')
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

    // Process mouse position using RAF for smooth updates
    const processMousePosition = () => {
      if (!pendingMousePos.current) return

      const { x, y } = pendingMousePos.current
      cursorX.set(x)
      cursorY.set(y)

      // Check bounds only if we have a tracked element
      if (lastInteractiveElement.current) {
        if (!isWithinBounds(x, y, lastInteractiveElement.current)) {
          scheduleReset()
        } else {
          cancelReset()
        }
      }

      pendingMousePos.current = null
      rafId.current = null
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Store position and schedule RAF if not already scheduled
      pendingMousePos.current = { x: e.clientX, y: e.clientY }
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(processMousePosition)
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check for data-cursor-default FIRST - force default cursor
      if (target.closest('[data-cursor-default]')) {
        cancelReset()
        lastInteractiveElement.current = null
        setCursorVariant('default')
        setCursorText('')
        return
      }

      // Cache closest queries to reduce DOM traversal
      const cursorElement = target.closest('[data-cursor]')
      const cursorType = cursorElement?.getAttribute('data-cursor')
      const text = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')

      if (cursorType === 'text' && text) {
        cancelReset()
        lastInteractiveElement.current = cursorElement
        setCursorVariant('text')
        setCursorText(text)
      } else if (target.closest('[data-cursor-hidden]')) {
        cancelReset()
        lastInteractiveElement.current = null
        setCursorVariant('hidden')
      } else {
        const interactiveElement = target.closest('a, button, [data-cursor-hover]')
        if (interactiveElement) {
          cancelReset()
          lastInteractiveElement.current = interactiveElement
          setCursorVariant('hover')
          setCursorText('')
        } else if (!cursorElement && lastInteractiveElement.current) {
          const withinBounds = isWithinBounds(e.clientX, e.clientY, lastInteractiveElement.current)
          if (!withinBounds) {
            scheduleReset()
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
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      observer.disconnect()
      cancelReset()
      if (rafId.current) cancelAnimationFrame(rafId.current)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY, getCachedRect])

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
      aria-hidden="true"
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
