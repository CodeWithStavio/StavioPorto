'use client'

import { useState, useEffect } from 'react'

const dynamicWords = ['Talent', 'Success', 'Involvement', 'Growth']

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState(-1)

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(currentIndex)
      setCurrentIndex((prev) => (prev + 1) % dynamicWords.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <section className="min-h-screen flex items-center px-6 md:px-12 pt-20 pb-16 relative">
      <div className="max-w-[1800px] mx-auto w-full">
        {/* Label */}
        <p className="label mb-6">Mobile App Developer</p>

        {/* Main Heading */}
        <h1 className="heading mb-8">
          <span className="block">Elevate your</span>
          {/* Word stack showing current and previous */}
          <span className="block relative">
            <span className="text-accent transition-all duration-500 ease-out">
              {dynamicWords[currentIndex]}
            </span>
          </span>
          {previousIndex >= 0 && (
            <span className="block text-muted opacity-30 transition-opacity duration-500">
              {dynamicWords[previousIndex]}
            </span>
          )}
        </h1>

        {/* Bio */}
        <div className="max-w-2xl mt-12">
          <p className="body-text text-secondary-text">
            I&apos;m <span className="text-primary-text font-medium">Mustafa Alhassny</span>, a dedicated Mobile App Developer with expertise in React Native and backend architecture.
          </p>
          <p className="body-text text-secondary-text mt-4">
            With <span className="text-accent font-medium">2+ years</span> of experience, I specialize in crafting scalable and user-centric applications that enhance business growth and brand recognition.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  )
}
