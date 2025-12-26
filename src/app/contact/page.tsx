import Link from 'next/link'

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/mustafa_alhasan_' },
  { name: 'Linkedin', href: 'https://www.linkedin.com/in/mustafaalhassny' },
  { name: 'Gitlab', href: 'https://gitlab.com/Mustafa_Alhassny' },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="container">
          <h1 className="title-xxl">
            <span style={{ display: 'block' }}>Let&apos;s Work</span>
            <span style={{ display: 'block' }}>Together</span>
          </h1>
          <p className="hero__bio" style={{ marginTop: '2rem' }}>
            As your App Developer, I&apos;m Here to Bring Your Vision to Life
          </p>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="contact">
        <div className="container">
          <div className="section-header">
            <span>[A]</span>
            <span>Get in Touch</span>
          </div>

          <div className="contact__grid">
            <div>
              <p className="contact__text">
                Have a new project or want to collaborate on mobile and full-stack app development? I&apos;d love to hear from you!
              </p>
              <a
                href="mailto:Contact@Stavio.dev?subject=Hello%20Mustafa"
                className="contact__email"
              >
                Contact@Stavio.dev
              </a>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="contact">
        <div className="container">
          <div className="section-header">
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
                className="contact__social-link"
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
