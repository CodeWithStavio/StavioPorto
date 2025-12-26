import Link from 'next/link'

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/mustafa_alhasan_' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafaalhassny' },
  { name: 'GitLab', href: 'https://gitlab.com/Mustafa_Alhassny' },
]

export default function Contact() {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="section-header mb-16">
          <span className="text-secondary-text text-sm">[C]</span>
          <span className="text-secondary-text text-sm">Contact</span>
        </div>

        <div className="max-w-3xl">
          <h2 className="subheading mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="label mb-2">
            As your App Developer, I&apos;m Here to Bring Your Vision to Life
          </p>
          <p className="body-text text-secondary-text mb-12">
            Have a new project or want to collaborate on mobile and full-stack app development? I&apos;d love to hear from you!
          </p>

          {/* Email */}
          <a
            href="mailto:Contact@Stavio.dev?subject=Hello%20Mustafa"
            className="contact-email block mb-12"
            data-cursor-hover
          >
            Contact@Stavio.dev
          </a>

          {/* Socials */}
          <div className="flex flex-wrap gap-8">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-text hover:text-accent transition-colors text-sm"
                data-cursor-hover
              >
                {social.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
