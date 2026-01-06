'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <section className="page-hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 className="title-xxl" style={{ marginBottom: '1rem' }}>
          <span style={{ display: 'block' }}>Oops!</span>
          <span style={{ display: 'block', fontSize: '0.4em', opacity: 0.7 }}>Something went wrong</span>
        </h1>
        <p style={{ marginBottom: '2rem', opacity: 0.7 }}>
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="magnetic-btn"
          style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            border: '1px solid currentColor',
            borderRadius: '4px',
            background: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          <span>Try Again</span>
        </button>
      </div>
    </section>
  )
}
