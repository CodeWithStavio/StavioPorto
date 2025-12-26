import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="cta-section px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <h2 className="subheading text-center mb-8">
          Ready to Bring Your Vision to Life?
        </h2>
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block text-accent text-lg font-medium underline underline-offset-4 hover:text-accent-light transition-colors"
            data-cursor-hover
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  )
}
