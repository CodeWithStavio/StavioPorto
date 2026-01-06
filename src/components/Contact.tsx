'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SOCIAL_LINKS, SITE_CONFIG, COPY } from '@/constants'
import SectionHeader from './ui/SectionHeader'
import AnimatedLink from './ui/AnimatedLink'

interface ContactProps {
  variant?: 'home' | 'page'
}

// Contact Form Component
function ContactForm({ isInView }: { isInView: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`

    setIsSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form className="contact__form" onSubmit={handleSubmit}>
      <motion.div
        className="contact__form-group"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label htmlFor="name" className="contact__form-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="contact__form-input"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          aria-required="true"
        />
      </motion.div>

      <motion.div
        className="contact__form-group"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <label htmlFor="email" className="contact__form-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="contact__form-input"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-required="true"
        />
      </motion.div>

      <motion.div
        className="contact__form-group"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <label htmlFor="message" className="contact__form-label">Message</label>
        <textarea
          id="message"
          name="message"
          required
          className="contact__form-textarea"
          placeholder="Tell me about your project..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          aria-required="true"
        />
      </motion.div>

      <motion.button
        type="submit"
        className="contact__form-submit"
        disabled={isSubmitting}
        aria-label="Send message"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {submitted ? 'Opening Email Client...' : isSubmitting ? 'Sending...' : 'Send Message'}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </motion.button>
    </form>
  )
}

// Social Link
function SocialLink({ social, index, isInView }: { social: typeof SOCIAL_LINKS[0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
    >
      <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="contact__social-link"
        data-cursor-default
      >
        <span className="contact__social-text">{social.name}</span>
        <span className="contact__social-arrow">→</span>
      </a>
    </motion.div>
  )
}

export default function Contact({ variant = 'home' }: ContactProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const socialLinks = SOCIAL_LINKS.filter(link => link.name !== 'Email')
  const emailLink = SOCIAL_LINKS.find(link => link.name === 'Email')

  if (variant === 'page') {
    return (
      <>
        {/* Get in Touch Section with Form */}
        <section className="contact" ref={ref}>
          <div className="container">
            <SectionHeader label="[A]" title="Get in Touch" />

            <div className="contact__grid">
              <div>
                <motion.p
                  className="contact__text"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {COPY.contact.getInTouch}
                </motion.p>
                {emailLink && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ x: 10 }}
                  >
                    <AnimatedLink href={emailLink.href} variant="accent" className="contact__email">
                      {SITE_CONFIG.email}
                    </AnimatedLink>
                  </motion.div>
                )}
                {/* Resume Download */}
                <motion.a
                  href="/resume.pdf"
                  className="contact__resume"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  download="MustafaAlhassny.pdf"
                  aria-label="Download resume as PDF"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Resume
                </motion.a>
              </div>

              <div>
                <ContactForm isInView={isInView} />
              </div>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <ConnectSection socialLinks={socialLinks} />
      </>
    )
  }

  // Home page variant
  return (
    <section className="contact" ref={ref}>
      <div className="container">
        <SectionHeader label="[C]" title="Contact" />

        <div className="contact__grid">
          <div>
            <motion.p
              className="contact__subtitle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {COPY.contact.heroSubtitle}
            </motion.p>
            <motion.p
              className="contact__text"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {COPY.contact.getInTouch}
            </motion.p>
            {emailLink && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                <AnimatedLink href={emailLink.href} variant="accent" className="contact__email glow-text">
                  {SITE_CONFIG.email}
                </AnimatedLink>
              </motion.div>
            )}
          </div>

          <div>
            <motion.p
              className="contact__subtitle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Connect with Me
            </motion.p>
            <div className="contact__social">
              {socialLinks.map((social, index) => (
                <SocialLink key={social.name} social={social} index={index} isInView={isInView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Separate Connect Section for page variant
function ConnectSection({ socialLinks }: { socialLinks: typeof SOCIAL_LINKS }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="contact" ref={ref}>
      <div className="container">
        <SectionHeader label="[B]" title="Connect with Me" />

        <div className="contact__social">
          {socialLinks.map((social, index) => (
            <SocialLink key={social.name} social={social} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
