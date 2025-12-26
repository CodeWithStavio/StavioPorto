import Link from 'next/link'

const projects = [
  {
    id: '01',
    title: 'Divvy',
    service: 'Full Stack Mobile App',
    color: '#f60',
  },
  {
    id: '02',
    title: 'F.U.S.E',
    service: 'Full Stack Mobile App',
    color: '#574bc1',
  },
  {
    id: '03',
    title: 'AceLounge',
    service: 'Full Stack Mobile App',
    color: '#000f14',
  },
]

export default function Work() {
  return (
    <>
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="u-container">
          <p className="u-label" style={{ marginBottom: '1rem' }}>Portfolio</p>
          <h1 className="u-title-xxl">Results: My Portfolio</h1>
        </div>
      </section>

      <section className="u-section">
        <div className="u-container">
          {/* Section Header */}
          <div className="section__head">
            <span>[A]</span>
            <span>Work</span>
          </div>

          {/* Work List */}
          <div className="work__list">
            {projects.map((project) => (
              <div key={project.id} className="work__link" data-cursor-hover>
                <div className="u-container">
                  <div className="work__link__grid">
                    <span className="work__link__count">{project.id}</span>
                    <div
                      className="work__link__thumbnail"
                      style={{ backgroundColor: project.color }}
                    />
                    <h3 className="work__link__title">{project.title}</h3>
                    <span className="work__link__service">{project.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="u-container">
          <h2 className="cta__title">
            Ready to Bring Your Vision to Life?
          </h2>
          <Link href="/contact" className="cta__link" data-cursor-hover>
            Contact
          </Link>
        </div>
      </section>
    </>
  )
}
