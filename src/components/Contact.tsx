import { SOCIAL_LINKS, SITE_CONFIG, COPY } from '@/constants'
import SectionHeader from './ui/SectionHeader'
import AnimatedLink from './ui/AnimatedLink'

interface ContactProps {
  variant?: 'home' | 'page'
}

export default function Contact({ variant = 'home' }: ContactProps) {
  const socialLinks = SOCIAL_LINKS.filter(link => link.name !== 'Email')
  const emailLink = SOCIAL_LINKS.find(link => link.name === 'Email')

  if (variant === 'page') {
    return (
      <>
        {/* Get in Touch Section */}
        <section className="contact">
          <div className="container">
            <SectionHeader label="[A]" title="Get in Touch" />

            <div className="contact__grid">
              <div>
                <p className="contact__text">{COPY.contact.getInTouch}</p>
                {emailLink && (
                  <AnimatedLink href={emailLink.href} variant="accent" className="contact__email">
                    {SITE_CONFIG.email}
                  </AnimatedLink>
                )}
              </div>
              <div />
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="contact">
          <div className="container">
            <SectionHeader label="[B]" title="Connect with Me" />

            <div className="contact__social">
              {socialLinks.map((social) => (
                <AnimatedLink
                  key={social.name}
                  href={social.href}
                  external
                  className="contact__social-link"
                >
                  {social.name}
                </AnimatedLink>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  // Home page variant - two column layout
  return (
    <section className="contact">
      <div className="container">
        <SectionHeader label="[C]" title="Contact" />

        <div className="contact__grid">
          <div>
            <p className="contact__subtitle">{COPY.contact.heroSubtitle}</p>
            <p className="contact__text">{COPY.contact.getInTouch}</p>
            {emailLink && (
              <AnimatedLink href={emailLink.href} variant="accent" className="contact__email">
                {SITE_CONFIG.email}
              </AnimatedLink>
            )}
          </div>

          <div>
            <p className="contact__subtitle">Connect with Me</p>
            <div className="contact__social">
              {socialLinks.map((social) => (
                <AnimatedLink
                  key={social.name}
                  href={social.href}
                  external
                  className="contact__social-link"
                >
                  {social.name}
                </AnimatedLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
