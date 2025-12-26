'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />
      {/* Glow effect */}
      <motion.div
        className="scroll-progress-glow"
        style={{ scaleX }}
      />
    </>
  )
}
