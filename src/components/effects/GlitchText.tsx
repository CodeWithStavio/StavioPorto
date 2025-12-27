'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface GlitchTextProps {
  children: string
  className?: string
}

export default function GlitchText({ children, className = '' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <motion.span
      className={`glitch-text ${className}`}
      data-text={children}
      animate={isGlitching ? {
        x: [0, -2, 2, -2, 0],
        transition: { duration: 0.2 }
      } : {}}
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {children}
      <style jsx>{`
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .glitch-text:hover::before {
          animation: glitch-1 0.3s linear;
          color: #ff6b6b;
          opacity: 0.8;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        }
        .glitch-text:hover::after {
          animation: glitch-2 0.3s linear;
          color: #00d4ff;
          opacity: 0.8;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        }
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(3px, -3px); }
          60% { transform: translate(-3px, -3px); }
          80% { transform: translate(3px, 3px); }
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(3px, -3px); }
          40% { transform: translate(-3px, 3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(-3px, -3px); }
        }
      `}</style>
    </motion.span>
  )
}
