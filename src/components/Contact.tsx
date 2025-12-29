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
function ContactForm() {
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

    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`

    setIsSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form className="contact__form" onSubmit={handleSubmit}>
      <div className="contact__form-group">
        <label htmlFor="name" className="contact__form-label">
          Name
        </label>
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
      </div>

      <div className="contact__form-group">
        <label htmlFor="email" className="contact__form-label">
          Email
        </label>
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
      </div>

      <div className="contact__form-group">
        <label htmlFor="message" className="contact__form-label">
          Message
        </label>
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
      </div>

      <button
        type="submit"
        className="contact__form-submit"
        disabled={isSubmitting}
        aria-label="Send message"
      >
        {submitted ? 'Opening Email Client...' : isSubmitting ? 'Sending...' : 'Send Message'}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </form>
  )
}

export default function Contact({ variant = 'home' }: ContactProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const socialLinks = SOCIAL_LINKS.filter(link => link.name !== 'Email')
  const emailLink = SOCIAL_LINKS.find(link => link.name === 'Email')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  if (variant === 'page') {
    return (
      <>
        {/* Get in Touch Section with Form */}
        <motion.section
          className="contact"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="container">
            <motion.div variants={itemVariants}>
              <SectionHeader label="[A]" title="Get in Touch" />
            </motion.div>

            <div className="contact__grid">
              <motion.div variants={itemVariants}>
                <p className="contact__text">{COPY.contact.getInTouch}</p>
                {emailLink && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  download="MustafaAlhassny.pdf"
                  aria-label="Download resume as PDF"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Resume
                </motion.a>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Connect Section */}
        <motion.section
          className="contact"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="container">
            <motion.div variants={itemVariants}>
              <SectionHeader label="[B]" title="Connect with Me" />
            </motion.div>

            <div className="contact__social">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
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
              ))}
            </div>
          </div>
        </motion.section>
      </>
    )
  }

  // Home page variant - two column layout
  return (
    <motion.section
      className="contact"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="container">
        <motion.div variants={itemVariants}>
          <SectionHeader label="[C]" title="Contact" />
        </motion.div>

        <div className="contact__grid">
          <motion.div variants={itemVariants}>
            <motion.p
              className="contact__subtitle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              {COPY.contact.heroSubtitle}
            </motion.p>
            <p className="contact__text">{COPY.contact.getInTouch}</p>
            {emailLink && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                <AnimatedLink href={emailLink.href} variant="accent" className="contact__email glow-text">
                  {SITE_CONFIG.email}
                </AnimatedLink>
              </motion.div>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.p
              className="contact__subtitle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Connect with Me
            </motion.p>
            <div className="contact__social">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
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
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
