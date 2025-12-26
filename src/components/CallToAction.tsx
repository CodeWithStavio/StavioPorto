import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="subheading mb-8">Ready to Bring Your Vision to Life?</h2>
        <Link href="/contact" className="btn-primary inline-block">
          Contact
        </Link>
      </div>
    </section>
  )
}
