'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <span className="footer__copyright">
            © {currentYear} Mustafa Alhassny
          </span>
          <span className="footer__role">
            Mobile App Developer
          </span>
        </div>
      </div>
    </footer>
  )
}
