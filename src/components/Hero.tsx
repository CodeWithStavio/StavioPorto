'use client'

import { useState, useEffect } from 'react'

const dynamicWords = ['Growth', 'Talent', 'Success', 'Involvement']

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % dynamicWords.length)
        setIsAnimating(false)
      }, 600)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center px-8 pt-24 pb-16">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Heading */}
        <div className="mb-12 reveal">
          <h1 className="heading">
            <span className="block text-secondary-text mb-2" style={{ fontSize: '0.4em', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Mobile App Developer
            </span>
            <span className="block">Elevate your</span>
            <span className="block overflow-hidden h-[1.1em]">
              <span
                className={`text-accent inline-block ${isAnimating ? 'word-exit' : 'word-enter'}`}
                style={{ perspective: '1000px' }}
              >
                {dynamicWords[currentIndex]}
              </span>
            </span>
          </h1>
        </div>

        {/* Bio Section */}
        <div className="max-w-2xl reveal reveal-delay-2">
          <p className="body-text text-secondary-text mb-6">
            I&apos;m <span className="text-primary-text font-medium">Mustafa Alhassny</span>, a dedicated Mobile App Developer with expertise in React Native and backend architecture.
          </p>
          <p className="body-text text-secondary-text">
            With <span className="text-accent font-semibold">2+ years</span> of experience, I specialize in crafting scalable and user-centric applications that enhance business growth and brand recognition.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 reveal reveal-delay-4">
          <span className="text-secondary-text text-sm tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  )
}
