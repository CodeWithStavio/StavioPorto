'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SOCIAL_LINKS, SITE_CONFIG, COPY } from '@/constants'
import SectionHeader from './ui/SectionHeader'
import AnimatedLink from './ui/AnimatedLink'

interface ContactProps {
  variant?: 'home' | 'page'
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
        {/* Get in Touch Section */}
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
              </motion.div>
              <div />
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
