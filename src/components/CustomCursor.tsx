'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'hidden'>('default')
  const [cursorText, setCursorText] = useState('')

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

    const handleMouseLeave = () => {
      cursorX.set(-100)
      cursorY.set(-100)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      observer.disconnect()
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  // Dark theme = white cursor, Light theme = black cursor
  const cursorColor = isDark ? '#fafafa' : '#0a0a0a'

  const variants = {
    default: {
      width: 14,
      height: 14,
      backgroundColor: cursorColor,
    },
    hover: {
      width: 50,
      height: 50,
      backgroundColor: cursorColor,
    },
    text: {
      width: 80,
      height: 80,
      backgroundColor: cursorColor,
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
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {cursorVariant === 'text' && (
        <motion.span
          className="cursor__text"
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
