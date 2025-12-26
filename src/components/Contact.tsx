import Link from 'next/link'

const socials = [
  { name: 'Email', href: 'mailto:Contact@Stavio.dev?subject=Hello%20Mustafa' },
  { name: 'Instagram', href: 'https://www.instagram.com/mustafa_alhasan_' },
  { name: 'Linkedin', href: 'https://www.linkedin.com/in/mustafaalhassny' },
  { name: 'Gitlab', href: 'https://gitlab.com/Mustafa_Alhassny' },
]

export default function Contact() {
  return (
    <section className="contact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span>[C]</span>
          <span>Contact</span>
        </div>

        <div className="contact__grid">
          {/* Left Column */}
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
            >
              Contact@Stavio.dev
            </a>
          </div>

          {/* Right Column */}
          <div>
            <p className="contact__subtitle">Connect with Me</p>
            <div className="contact__social">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="contact__social-link"
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
