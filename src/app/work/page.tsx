import Link from 'next/link'
import { PROJECTS, COPY } from '@/constants'
import SectionHeader from '@/components/ui/SectionHeader'

export default function Work() {
  return (
    <>
      {/* Header */}
      <section className="page-hero">
        <div className="container">
          <h1 className="title-xxl">
            <span style={{ display: 'block' }}>Results:</span>
            <span style={{ display: 'block' }}>My Portfolio</span>
          </h1>
        </div>
      </section>

      {/* Work Cards */}
      <section className="work-section">
        <div className="container">
          <SectionHeader label="[A]" title="Work" />

          <div className="work-grid">
            {PROJECTS.map((project) => (
              <div key={project.id} className="work-card">
                <div
                  className="work-card__image"
                  style={{ backgroundColor: project.color }}
                >
                  <span className="work-card__number">{project.id}</span>
                </div>
                <div className="work-card__content">
                  <h3 className="work-card__title">{project.title}</h3>
                  <p className="work-card__description">{project.description}</p>
                  <div className="work-card__tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="work-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2 className="cta__title">{COPY.cta.title}</h2>
          <Link href="/contact" className="cta__link">
            {COPY.cta.buttonText}
          </Link>
        </div>
      </section>
    </>
  )
}
