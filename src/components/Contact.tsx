import Link from 'next/link'

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/mustafa_alhasan_' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafaalhassny' },
  { name: 'GitLab', href: 'https://gitlab.com/Mustafa_Alhassny' },
]

export default function Contact() {
  return (
    <section className="u-section">
      <div className="u-container">
        {/* Section Header */}
        <div className="section__head">
          <span>[C]</span>
          <span>Contact</span>
        </div>

        <div className="contact__grid">
          {/* Left Column */}
          <div>
            <h2 className="contact__title">Let&apos;s Work Together</h2>
            <p className="contact__subtitle">
              As your App Developer, I&apos;m Here to Bring Your Vision to Life
            </p>
            <p className="contact__text">
              Have a new project or want to collaborate on mobile and full-stack app development? I&apos;d love to hear from you!
            </p>

            {/* Email */}
            <a
              href="mailto:Contact@Stavio.dev?subject=Hello%20Mustafa"
              className="contact__email"
              data-cursor-hover
            >
              Contact@Stavio.dev
            </a>
          </div>

          {/* Right Column - Socials */}
          <div>
            <p className="contact__subtitle">Connect with Me</p>
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
        </div>
      </div>
    </section>
  )
}
