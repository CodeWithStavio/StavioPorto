'use client'

import Link from 'next/link'
import { EXPERTISE_ITEMS } from '@/constants'
import SectionHeader from './ui/SectionHeader'

export default function Expertise() {
  return (
    <section className="expertise">
      <div className="container">
        <SectionHeader label="[B]" title="Expertise" />

        <div>
          {EXPERTISE_ITEMS.map((item) => (
            <Link key={item.id} href={`/expertise/${item.slug}`} style={{ textDecoration: 'none' }}>
              <div
                className="expertise__item"
                data-cursor="text"
                data-cursor-text="View"
              >
                <div className="expertise__number">
                  {item.id}
                </div>
                <div className="expertise__content">
                  <h3 className="expertise__title">
                    {item.title}
                  </h3>
                  <p className="expertise__desc">
                    {item.description}
                  </p>
                </div>
                <div className="expertise__arrow">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
