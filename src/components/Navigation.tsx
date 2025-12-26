'use client'

import Link from 'next/link'
import { useTheme } from './ThemeProvider'

const navLinks = [
  { text: 'Home', href: '/' },
  { text: 'Work', href: '/work' },
  { text: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const { theme, toggleTheme, mounted } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" data-cursor-hover>
          {/* Profile Image with Status Dot */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-background font-bold text-sm">
              MA
            </div>
            <div className="status-dot" />
          </div>
          <span className="text-lg font-semibold tracking-tight group-hover:text-accent transition-colors duration-300 ease-smooth">
            Mustafa Alhassny
          </span>
        </Link>

        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link text-secondary-text hover:text-accent transition-all duration-300 ease-smooth"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>

          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-secondary-text hover:text-accent transition-all duration-300 ease-smooth px-4 py-2 rounded-full border border-white/10 hover:border-accent/50"
              aria-label="Toggle theme"
              data-cursor-hover
            >
              <span className="text-sm font-medium tracking-wide">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                {theme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
