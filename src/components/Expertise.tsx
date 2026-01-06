'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EXPERTISE_ITEMS } from '@/constants'
import SectionHeader from './ui/SectionHeader'

function ExpertiseItem({ item, index }: { item: typeof EXPERTISE_ITEMS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <Link href={`/expertise/${item.slug}`} style={{ textDecoration: 'none' }}>
      <motion.div
        ref={ref}
        className="expertise__item"
        data-cursor="text"
        data-cursor-text="View"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="expertise__number">{item.id}</div>
        <div className="expertise__content">
          <h3 className="expertise__title">{item.title}</h3>
          <p className="expertise__desc">{item.description}</p>
        </div>
        <div className="expertise__arrow">→</div>
      </motion.div>
    </Link>
  )
}

export default function Expertise() {
  return (
    <section className="expertise">
      <div className="container">
        <SectionHeader label="[B]" title="Expertise" />

        <div>
          {EXPERTISE_ITEMS.map((item, index) => (
            <ExpertiseItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
