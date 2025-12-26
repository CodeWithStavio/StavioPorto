import Contact from '@/components/Contact'
import { COPY } from '@/constants'

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="title-xxl">
            {COPY.contact.heroTitle.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h1>
          <p className="page-hero__subtitle">
            {COPY.contact.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Contact Sections */}
      <Contact variant="page" />
    </>
  )
}
