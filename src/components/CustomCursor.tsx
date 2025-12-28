'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'hidden'>('default')
  const [cursorText, setCursorText] = useState('')
  const [isPressed, setIsPressed] = useState(false)

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

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor')
      const text = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')

      // Check if element wants default cursor (no hover effect)
      if (target.closest('[data-cursor-default]')) {
        setCursorVariant('default')
        setCursorText('')
      } else if (cursorType === 'text' && text) {
        setCursorVariant('text')
        setCursorText(text)
      } else if (target.closest('[data-cursor-hidden]')) {
        setCursorVariant('hidden')
      } else if (target.closest('a, button, [data-cursor-hover]')) {
        setCursorVariant('hover')
        setCursorText('')
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
