'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

const navLinks = [
  { text: 'Home', href: '/' },
  { text: 'Work', href: '/work' },
  { text: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="u-container">
          <nav className="navbar">
            {/* Left: Logo */}
            <div className="navbar__col">
              <Link href="/" className="navbar__logo">
                <div className="navbar__image">
                  MA
                </div>
                <span className="navbar__logo__name">Mustafa Alhassny</span>
              </Link>
            </div>

            {/* Right: Links + Controls */}
            <div className="navbar__col">
              {/* Desktop Links */}
              <div className="navbar__links">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`has-underline ${pathname === link.href ? 'active' : ''}`}
                  >
                    {link.text}
                  </Link>
                ))}
                {mounted && (
                  <button onClick={toggleTheme} className="navbar__control">
                    <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`navbar__button ${menuOpen ? 'is-open' : ''}`}
              >
                <span>Menu</span>
                <span className="navbar__button__icon">{menuOpen ? '×' : '+'}</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div className={`menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="u-container">
          <div className="menu__links">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="menu__link"
                style={{ transitionDelay: `${index * 0.1}s` }}
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
              className="menu__theme"
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          )}
        </div>
      </div>
    </>
  )
}
