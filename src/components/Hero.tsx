'use client'

import { useState, useEffect } from 'react'

const dynamicWords = ['Talent', 'Success', 'Involvement', 'Growth']

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % dynamicWords.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="heading mb-8">
          Elevate your{' '}
          <span
            className={`text-accent inline-block ${isAnimating ? 'word-exit' : 'word-enter'}`}
          >
            {dynamicWords[currentIndex]}
          </span>
        </h1>

        <div className="max-w-3xl space-y-4">
          <p className="body-text text-secondary-text text-lg">
            I&apos;m Mustafa Alhassny, a dedicated Mobile App Developer with expertise in React Native and backend architecture.
          </p>
          <p className="body-text text-secondary-text text-lg">
            With 2+ years of experience, I specialize in crafting scalable and user-centric applications that enhance business growth and brand recognition.
          </p>
        </div>
      </div>
    </section>
  )
}
