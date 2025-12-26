export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <span className="text-secondary-text text-sm">
          &copy; {currentYear} Mustafa Alhassny
        </span>
        <span className="text-secondary-text text-sm">
          Mobile App Developer
        </span>
      </div>
    </footer>
  )
}
