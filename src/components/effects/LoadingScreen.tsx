'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo, useRef } from 'react'

const words = ['ENVISION', 'ENGINEER', 'ELEVATE']
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState<string[]>([])
  const [settled, setSettled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDisplayText(text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]))
  }, [text])

  useEffect(() => {
    if (!mounted) return

    setSettled(false)
    const intervals: NodeJS.Timeout[] = []

    text.split('').forEach((char, i) => {
      let iterations = 0
      const maxIterations = 4 + i * 2

      const interval = setInterval(() => {
        setDisplayText(prev => {
          const newText = [...prev]
          if (iterations >= maxIterations) {
            newText[i] = char
          } else {
            newText[i] = chars[Math.floor(Math.random() * chars.length)]
          }
          return newText
        })

        iterations++
        if (iterations > maxIterations) {
          clearInterval(interval)
          if (i === text.length - 1) {
            setTimeout(() => setSettled(true), 100)
          }
        }
      }, 50)

      intervals.push(interval)
    })

    return () => intervals.forEach(clearInterval)
  }, [text, mounted])

  if (!mounted) {
    return (
      <span style={{ display: 'inline-flex' }}>
        {text.split('').map((char, i) => (
          <span key={i} style={{ opacity: 0 }}>{char}</span>
        ))}
      </span>
    )
  }

  return (
    <span style={{ display: 'inline-flex' }}>
      {displayText.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 40, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            color: settled ? 'var(--foreground)' : 'var(--text-secondary)'
          }}
          transition={{
            y: { duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.3, delay: i * 0.04 },
            color: { duration: 0.3 }
          }}
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-geist-mono), monospace',
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

interface LoadingScreenProps {
  children: React.ReactNode
}

export default function LoadingScreen({ children }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const wordRef = useRef<HTMLDivElement>(null)
  const [wordWidth, setWordWidth] = useState(0)

  useEffect(() => {
    // Check if already loaded this session - skip loading screen
    const hasLoaded = sessionStorage.getItem('hasLoaded')
    if (hasLoaded) {
      setIsLoading(false)
      return
    }

    const totalDuration = 5000 // 5 seconds
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, totalDuration / 50)

    const wordTimers = words.map((_, i) =>
      setTimeout(() => setCurrentIndex(i), i * 1500 + 200)
    )

    const exitTimer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem('hasLoaded', 'true')
    }, totalDuration)

    return () => {
      clearInterval(progressInterval)
      wordTimers.forEach(clearTimeout)
      clearTimeout(exitTimer)
    }
  }, [])

  useEffect(() => {
    if (wordRef.current) {
      setWordWidth(wordRef.current.offsetWidth)
    }
  }, [currentIndex])

  const progressDisplay = useMemo(() =>
    progress.toString().padStart(3, '0'), [progress]
  )

  // Show loading screen OR content - never both
  if (isLoading) {
    return (
      <div
        className="loading-screen"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--background)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Animated gradient orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <motion.div
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 50, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              width: 'min(600px, 60vw)',
              height: 'min(600px, 60vw)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--text-tertiary) 0%, transparent 70%)',
              opacity: 0.08,
            }}
          />
          <motion.div
            animate={{
              x: [0, -80, 60, 0],
              y: [0, 60, -40, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '15%',
              width: 'min(500px, 50vw)',
              height: 'min(500px, 50vw)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--text-tertiary) 0%, transparent 70%)',
              opacity: 0.06,
            }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--text-tertiary) 1px, transparent 1px),
            linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.03,
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%)',
        }} />

        {/* Noise texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }} />

        {/* Top left corner */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            position: 'absolute',
            top: 'clamp(24px, 5vw, 48px)',
            left: 'clamp(24px, 5vw, 48px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-geist-mono), monospace',
          }}>
            STAVIO.DEV
          </span>
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-geist-mono), monospace',
          }}>
            PORTFOLIO 2026
          </span>
        </motion.div>

        {/* Top right - progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            position: 'absolute',
            top: 'clamp(24px, 5vw, 48px)',
            right: 'clamp(24px, 5vw, 48px)',
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px',
          }}
        >
          <span
            style={{
              fontSize: 'clamp(40px, 8vw, 80px)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-geist-mono), monospace',
              lineHeight: 1,
            }}
          >
            {progressDisplay}
          </span>
          <span style={{
            fontSize: '14px',
            color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-geist-mono), monospace',
          }}>
            %
          </span>
        </motion.div>

        {/* Center - Main word display */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              ref={wordRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                y: -30,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
              style={{
                fontSize: 'clamp(60px, 18vw, 200px)',
                fontWeight: 200,
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              <ScrambleText text={words[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Dynamic underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: 1,
              opacity: 1,
              width: wordWidth > 0 ? wordWidth : 'clamp(80px, 15vw, 200px)',
            }}
            transition={{
              scaleX: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              width: { duration: 0.15, ease: 'easeOut' },
            }}
            style={{
              height: '2px',
              background: 'var(--foreground)',
              marginTop: 'clamp(16px, 3vw, 32px)',
              transformOrigin: 'center',
            }}
          />
        </div>

        {/* Bottom left - status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 5vw, 48px)',
            left: 'clamp(24px, 5vw, 48px)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--foreground)',
            }}
          />
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-geist-mono), monospace',
            textTransform: 'uppercase',
          }}>
            Loading Experience
          </span>
        </motion.div>

        {/* Bottom right - word indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 5vw, 48px)',
            right: 'clamp(24px, 5vw, 48px)',
            display: 'flex',
            gap: '10px',
          }}
        >
          {words.map((word, i) => (
            <motion.div
              key={word}
              animate={{
                width: currentIndex === i ? '32px' : '12px',
                backgroundColor: currentIndex >= i ? 'var(--foreground)' : 'var(--text-tertiary)',
                opacity: currentIndex >= i ? 1 : 0.3,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '3px',
                borderRadius: '2px',
              }}
            />
          ))}
        </motion.div>

        {/* Progress bar at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'var(--border)',
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.1 }}
            style={{
              height: '100%',
              backgroundColor: 'var(--foreground)',
              transformOrigin: 'left',
            }}
          />
        </div>

        {/* Corner brackets */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            position: 'absolute',
            top: '15%',
            left: '8%',
            width: '40px',
            height: '40px',
            borderTop: '1px solid var(--foreground)',
            borderLeft: '1px solid var(--foreground)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '8%',
            width: '40px',
            height: '40px',
            borderBottom: '1px solid var(--foreground)',
            borderRight: '1px solid var(--foreground)',
          }}
        />
      </div>
    )
  }

  // Loading complete - render children
  return <>{children}</>
}
