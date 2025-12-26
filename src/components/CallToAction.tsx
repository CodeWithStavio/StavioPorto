import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="cta">
      <div className="u-container">
        <h2 className="cta__title">
          Ready to Bring Your Vision to Life?
        </h2>
        <Link href="/contact" className="cta__link" data-cursor-hover>
          Contact
        </Link>
      </div>
    </section>
  )
}
