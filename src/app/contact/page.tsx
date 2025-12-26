import Link from 'next/link'

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/mustafa_alhasan_' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafaalhassny' },
  { name: 'GitLab', href: 'https://gitlab.com/Mustafa_Alhassny' },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="u-container">
          <p className="u-label" style={{ marginBottom: '1rem' }}>Contact</p>
          <h1 className="u-title-xxl">Let&apos;s Work Together</h1>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="u-section">
        <div className="u-container">
          <div className="section__head">
            <span>[A]</span>
            <span>Get in Touch</span>
          </div>

          <div className="contact__grid">
            <div>
              <p className="contact__subtitle">
                As your App Developer, I&apos;m Here to Bring Your Vision to Life
              </p>
              <p className="contact__text">
                Have a new project or want to collaborate on mobile and full-stack app development? I&apos;d love to hear from you!
              </p>
              <a
                href="mailto:Contact@Stavio.dev?subject=Hello%20Mustafa"
                className="contact__email"
                data-cursor-hover
              >
                Contact@Stavio.dev
              </a>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="u-section">
        <div className="u-container">
          <div className="section__head">
            <span>[B]</span>
            <span>Connect with Me</span>
          </div>

          <div className="contact__social">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
              >
                {social.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
