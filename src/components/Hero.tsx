'use client'

import { ROTATING_WORDS, SITE_CONFIG } from '@/constants'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero__title">
          <span>Elevate your</span>
          <span className="hero__words">
            <ul className="hero__words-list">
              {ROTATING_WORDS.map((word, index) => (
                <li key={index} className="hero__word">
                  {word}
                </li>
              ))}
            </ul>
          </span>
        </h1>

        <div className="hero__bio">
          <p>
            I&apos;m <strong>{SITE_CONFIG.name}</strong>, a dedicated Mobile App Developer with expertise in React Native and backend architecture. With <span className="hero__accent">{SITE_CONFIG.yearsExperience} years</span> of experience, I specialize in crafting scalable and user-centric applications that enhance business growth and brand recognition.
          </p>
        </div>

        <div className="scroll-indicator">
          <span className="scroll-indicator__text">Scroll</span>
          <div className="scroll-indicator__line" />
        </div>
      </div>
    </section>
  )
}
