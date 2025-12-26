'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true })
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

  // Check if link is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container">
          <div className="navbar__inner">
            {/* Left - Logo */}
            <Link href="/" className="navbar__left">
              <div className="navbar__image">
                <Image
                  src="/assets/Me.jpg"
                  alt="Mustafa Alhassny"
                  width={40}
                  height={40}
                  priority
                />
                <div className="navbar__status" />
              </div>
              <span className="navbar__name">Mustafa Alhassny</span>
            </Link>

            {/* Right - Links + Controls */}
            <div className="navbar__right">
              <div className="navbar__links">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`navbar__link ${isActive(link.href) ? 'is-active' : ''}`}
                  >
                    {link.text}
                  </Link>
                ))}
                {mounted && (
                  <button onClick={toggleTheme} className="navbar__theme">
                    {theme === 'light' ? 'Dark' : 'Light'}
                  </button>
                )}
              </div>

              {/* Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`navbar__menu-btn ${menuOpen ? 'is-open' : ''}`}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <span>Menu</span>
                <span>{menuOpen ? '×' : '+'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div className={`menu-overlay ${menuOpen ? 'is-open' : ''}`}>
        <div className="container">
          <div className="menu-overlay__links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`menu-overlay__link ${isActive(link.href) ? 'is-active' : ''}`}
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
              className="menu-overlay__theme"
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          )}
        </div>
      </div>
    </>
  )
}
