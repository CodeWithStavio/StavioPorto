'use client'

import Link from 'next/link'

export default function NotFoundClient() {
  return (
    <section className="page-hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 className="title-xxl" style={{ marginBottom: '1rem' }}>
          <span style={{ display: 'block' }}>404</span>
          <span style={{ display: 'block', fontSize: '0.4em', opacity: 0.7 }}>Page Not Found</span>
        </h1>
        <p style={{ marginBottom: '2rem', opacity: 0.7 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="magnetic-btn"
          style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            border: '1px solid currentColor',
            borderRadius: '4px',
          }}
        >
          <span>Back to Home</span>
        </Link>
      </div>
    </section>
  )
}
