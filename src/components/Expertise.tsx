'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { EXPERTISE_ITEMS } from '@/constants'
import SectionHeader from './ui/SectionHeader'

export default function Expertise() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -60, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 100,
        delay: 0.2,
      },
    },
  }

  return (
    <section className="expertise" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader label="[B]" title="Expertise" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {EXPERTISE_ITEMS.map((item, index) => (
            <Link key={item.id} href={`/expertise/${item.slug}`} style={{ textDecoration: 'none' }}>
              <motion.div
                className="expertise__item"
                variants={itemVariants}
                data-cursor="text"
                data-cursor-text="View"
              >
                <motion.div
                  className="expertise__number"
                  variants={numberVariants}
                >
                  {item.id}
                </motion.div>
                <div className="expertise__content">
                  <motion.h3
                    className="expertise__title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    className="expertise__desc"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    {item.description}
                  </motion.p>
                </div>
                <motion.div
                  className="expertise__arrow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  →
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
