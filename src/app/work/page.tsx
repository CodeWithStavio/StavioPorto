import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    number: '01',
    title: 'Divvy',
    thumbnail: '/assets/Divvy.avif',
    color: '#f60',
    stack: ['Full Stack Mobile Application', 'Front-End - Back-End'],
  },
  {
    number: '02',
    title: 'F.U.S.E',
    thumbnail: '/assets/Fuse.avif',
    color: '#574bc1',
    stack: ['Full Stack Mobile Application', 'Front-End - Back-End - Hosting'],
  },
  {
    number: '03',
    title: 'AceLounge',
    thumbnail: '/assets/AceLounge.avif',
    color: '#000f14',
    stack: ['Full Stack Mobile Application', 'Front-End - Back-End - DevOps & Hosting'],
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

      {/* Work List */}
      <section className="work-list">
        <div className="container">
          <div className="section-header">
            <span>[A]</span>
            <span>Work</span>
          </div>

          {projects.map((project) => (
            <div key={project.number} className="work-item">
              <span className="work-item__number">{project.number}</span>
              <div className="work-item__thumbnail">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={96}
                  height={64}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className="work-item__title">{project.title}</h3>
              <div className="work-item__stack">
                {project.stack.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
            </div>
          ))}
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
