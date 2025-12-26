import Link from 'next/link'
import { COPY } from '@/constants'

export default function CallToAction() {
  return (
    <section className="cta">
      <div className="container">
        <h2 className="cta__title">{COPY.cta.title}</h2>
        <Link href="/contact" className="cta__link">
          {COPY.cta.buttonText}
        </Link>
      </div>
    </section>
  )
}
