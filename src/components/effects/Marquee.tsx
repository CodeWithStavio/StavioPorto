'use client'

import { motion } from 'framer-motion'

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}

export default function Marquee({
  children,
  speed = 20,
  direction = 'left',
  className = ''
}: MarqueeProps) {
  return (
    <div className={`marquee ${className}`}>
      <motion.div
        className="marquee__inner"
        animate={{ x: direction === 'left' ? '-50%' : '0%' }}
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}
