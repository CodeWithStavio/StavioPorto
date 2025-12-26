import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="cta">
      <div className="container">
        <h2 className="cta__title">Ready to Bring Your Vision to Life?</h2>
        <Link href="/contact" className="contact__email">
          Contact
        </Link>
      </div>
    </section>
  )
}
