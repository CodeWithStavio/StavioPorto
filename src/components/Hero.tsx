'use client'

import { useState, useEffect } from 'react'

const dynamicWords = ['Talent', 'Success', 'Involvement', 'Growth']

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevWord, setPrevWord] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevWord(dynamicWords[currentIndex])
      setCurrentIndex((prev) => (prev + 1) % dynamicWords.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <section className="min-h-screen flex items-center px-6 md:px-12 pt-24 pb-20 relative">
      <div className="max-w-6xl mx-auto w-full">
        {/* Label */}
        <p className="label mb-4">Mobile App Developer</p>

        {/* Main Heading */}
        <h1 className="heading mb-6">
          <span className="block">Elevate your</span>
          <span className="block text-accent">{dynamicWords[currentIndex]}</span>
          {prevWord && (
            <span className="block text-gray-300 dark:text-gray-700 opacity-40 text-[0.6em]">
              {prevWord}
            </span>
          )}
        </h1>

        {/* Bio */}
        <div className="max-w-xl mt-10">
          <p className="body-text text-secondary-text">
            I&apos;m <span className="text-primary-text font-medium">Mustafa Alhassny</span>, a dedicated Mobile App Developer with expertise in React Native and backend architecture.
          </p>
          <p className="body-text text-secondary-text mt-4">
            With <span className="text-accent font-medium">2+ years</span> of experience, I specialize in crafting scalable and user-centric applications that enhance business growth and brand recognition.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  )
}
