'use client'

const dynamicWords = ['Growth', 'Talent', 'Success', 'Involvement', 'Growth']

export default function Hero() {
  return (
    <section className="hero">
      <div className="u-container">
        {/* Main Heading with Word Rotation */}
        <div className="hero__top">
          <h1 className="hero__title">Elevate your</h1>
        </div>
        <div className="hero__top">
          <div className="h-words hero__title">
            <ul className="h-words__list">
              {dynamicWords.map((word, index) => (
                <li key={index} className="h-words__list__item">
                  {word}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bio */}
        <div className="hero__bio">
          <p>
            I&apos;m <strong>Mustafa Alhassny</strong>, a dedicated Mobile App Developer with expertise in React Native and backend architecture.
          </p>
          <p>
            With <span className="hero__accent">2+ years</span> of experience, I specialize in crafting scalable and user-centric applications that enhance business growth and brand recognition.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span className="scroll-indicator__text">Scroll</span>
          <div className="scroll-indicator__line" />
        </div>
      </div>
    </section>
  )
}
