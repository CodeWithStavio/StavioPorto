'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'

const navLinks = [
  { text: 'Home', href: '/' },
  { text: 'Work', href: '/work' },
  { text: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-medium text-xs">
                MA
              </div>
              <div className="status-dot" />
            </div>
            <span className="text-sm font-medium">Mustafa Alhassny</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-sm text-secondary-text"
              >
                {link.text}
              </Link>
            ))}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="nav-link text-sm text-secondary-text flex items-center gap-1"
              >
                {theme === 'light' ? 'Dark' : 'Light'}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              </button>
            )}
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="menu-btn"
          >
            Menu
            <span className="text-base">{menuOpen ? '×' : '+'}</span>
          </button>
        </div>
      </nav>

      {/* Full Screen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-20 px-6">
          <div className="max-w-6xl mx-auto pt-8">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-4xl md:text-6xl font-medium hover:text-accent transition-colors"
                >
                  {link.text}
                </Link>
              ))}
            </div>

            {mounted && (
              <button
                onClick={() => {
                  toggleTheme()
                  setMenuOpen(false)
                }}
                className="mt-10 text-lg text-secondary-text hover:text-accent transition-colors"
              >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
