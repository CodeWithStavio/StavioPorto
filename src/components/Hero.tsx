'use client'

const dynamicWords = ['Growth', 'Talent', 'Success', 'Involvement', 'Growth']

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        {/* Main Heading - INLINE rotating words */}
        <h1 className="hero__title">
          <span>Elevate your</span>
          <span className="hero__words">
            <ul className="hero__words-list">
              {dynamicWords.map((word, index) => (
                <li key={index} className="hero__word">
                  {word}
                </li>
              ))}
            </ul>
          </span>
        </h1>

        {/* Bio */}
        <div className="hero__bio">
          <p>
            I&apos;m <strong>Mustafa Alhassny</strong>, a dedicated Mobile App Developer with expertise in React Native and backend architecture. With <span className="hero__accent">2+ years</span> of experience, I specialize in crafting scalable and user-centric applications that enhance business growth and brand recognition.
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
