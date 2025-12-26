'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
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
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: 'var(--accent)',
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: 'var(--accent)',
    },
    text: {
      width: 100,
      height: 100,
      backgroundColor: 'var(--text-primary)',
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
