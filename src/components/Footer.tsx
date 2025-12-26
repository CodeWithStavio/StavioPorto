import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-secondary-text text-sm">
          <span>&copy; {currentYear}</span>
          <span className="text-accent">Mustafa Alhassny</span>
          <span>All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-secondary-text hover:text-accent text-sm transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/work"
            className="text-secondary-text hover:text-accent text-sm transition-colors duration-300"
          >
            Work
          </Link>
          <Link
            href="/contact"
            className="text-secondary-text hover:text-accent text-sm transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        <div className="text-secondary-text text-sm">
          Built with{' '}
          <span className="text-accent">Next.js</span>
        </div>
      </div>
    </footer>
  )
}
