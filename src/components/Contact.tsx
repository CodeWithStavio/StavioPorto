import Link from 'next/link'

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/mustafa_alhasan_' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafaalhassny' },
  { name: 'GitLab', href: 'https://gitlab.com/Mustafa_Alhassny' },
]

export default function Contact() {
  return (
    <section className="py-24 px-6 bg-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="subheading mb-4">Let&apos;s Work Together</h2>
        <h3 className="text-xl font-medium text-secondary-text mb-6">
          As your App Developer, I&apos;m Here to Bring Your Vision to Life
        </h3>
        <p className="body-text text-secondary-text mb-8 max-w-2xl mx-auto">
          Have a new project or want to collaborate on mobile and full-stack app development? I&apos;d love to hear from you!
        </p>

        <div className="mb-8">
          <a
            href="mailto:Contact@Stavio.dev?subject=Hello%20Mustafa"
            className="text-2xl font-semibold text-accent hover:underline"
          >
            Contact@Stavio.dev
          </a>
        </div>

        <div className="flex justify-center gap-6">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link text-secondary-text hover:text-accent transition-colors"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
