'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { NAV_LINKS, SITE_CONFIG } from '@/constants'

export default function Navigation() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'is-scrolled' : ''}`} aria-label="Main navigation">
        <div className="container">
          <div className="navbar__inner">
            <Link href="/" className="navbar__left" data-cursor-default aria-label="Go to homepage">
              <span className="navbar__name">{SITE_CONFIG.name}</span>
            </Link>

            <div className="navbar__right">
              <div className="navbar__links" role="menubar">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`navbar__link ${isActive(link.href) ? 'is-active' : ''}`}
                    data-cursor-default
                    role="menuitem"
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.text}
                  </Link>
                ))}
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="navbar__theme"
                    data-cursor-default
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  >
                    {theme === 'light' ? 'Dark' : 'Light'}
                  </button>
                )}
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`navbar__menu-btn ${menuOpen ? 'is-open' : ''}`}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                data-cursor-default
              >
                <span>Menu</span>
                <span>{menuOpen ? '×' : '+'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`menu-overlay ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
      >
        <div className="container">
          <nav className="menu-overlay__links" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`menu-overlay__link ${isActive(link.href) ? 'is-active' : ''}`}
                aria-current={isActive(link.href) ? 'page' : undefined}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {mounted && (
            <button
              onClick={() => {
                toggleTheme()
                setMenuOpen(false)
              }}
              className="menu-overlay__theme"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              tabIndex={menuOpen ? 0 : -1}
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          )}
        </div>
      </div>
    </>
  )
}
