import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="py-32 px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="text-accent text-sm font-medium tracking-widest uppercase mb-6 block">
          Let&apos;s Connect
        </span>
        <h2 className="subheading mb-10 max-w-3xl mx-auto">
          Ready to Bring Your Vision to Life?
        </h2>
        <Link
          href="/contact"
          className="btn-primary inline-block"
          data-cursor-hover
        >
          Get in Touch
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />
    </section>
  )
}
