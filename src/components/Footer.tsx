export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="u-container">
        <div className="footer__inner">
          <span>&copy; {currentYear} Mustafa Alhassny</span>
          <span>Mobile App Developer</span>
        </div>
      </div>
    </footer>
  )
}
