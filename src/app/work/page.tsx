import Link from 'next/link'

const projects = [
  {
    number: '01',
    title: 'Divvy',
    description: 'A mobile app for splitting bills and managing shared expenses with friends and family.',
    color: '#f60',
    tags: ['React Native', 'Node.js', 'MongoDB'],
  },
  {
    number: '02',
    title: 'F.U.S.E',
    description: 'Full-stack mobile application with comprehensive backend infrastructure and hosting.',
    color: '#574bc1',
    tags: ['React Native', 'Express', 'AWS'],
  },
  {
    number: '03',
    title: 'AceLounge',
    description: 'Complete mobile solution with DevOps pipeline and cloud hosting infrastructure.',
    color: '#000f14',
    tags: ['React Native', 'Docker', 'Kubernetes'],
  },
]

export default function Work() {
  return (
    <>
      {/* Header */}
      <section className="work-header">
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
          <div className="section-header">
            <span>[A]</span>
            <span>Work</span>
          </div>

          <div className="work-grid">
            {projects.map((project) => (
              <div key={project.number} className="work-card">
                <div
                  className="work-card__image"
                  style={{ backgroundColor: project.color }}
                >
                  <span className="work-card__number">{project.number}</span>
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
          <h2 className="cta__title">Ready to Bring Your Vision to Life?</h2>
          <Link href="/contact" className="contact__email">
            Contact
          </Link>
        </div>
      </section>
    </>
  )
}
