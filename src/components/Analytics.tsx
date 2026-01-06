// ══════════════════════════════════════════════════════════════════════════════
// ANALYTICS COMPONENT
// Unified analytics setup for Google Analytics 4 + Web Vitals
// ══════════════════════════════════════════════════════════════════════════════

'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense, useCallback } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// ─────────────────────────────────────────────────────────────────────────────
// WEB VITALS TRACKING (Core Web Vitals for SEO)
// ─────────────────────────────────────────────────────────────────────────────
function WebVitalsTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Dynamic import to avoid SSR issues
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      const sendToAnalytics = (metric: { name: string; value: number; id: string }) => {
        // Send to Google Analytics
        if (window.gtag && GA_MEASUREMENT_ID) {
          window.gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            non_interaction: true,
          })
        }

        // Log in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Web Vital] ${metric.name}:`, metric.value)
        }
      }

      // Core Web Vitals
      onCLS(sendToAnalytics)  // Cumulative Layout Shift
      onINP(sendToAnalytics)  // Interaction to Next Paint (replaced FID)
      onLCP(sendToAnalytics)  // Largest Contentful Paint

      // Additional metrics
      onFCP(sendToAnalytics)  // First Contentful Paint
      onTTFB(sendToAnalytics) // Time to First Byte
    }).catch(() => {
      // web-vitals not available, skip silently
    })
  }, [])

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE VIEW TRACKING
// ─────────────────────────────────────────────────────────────────────────────
function AnalyticsPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !pathname) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

    // Google Analytics 4 pageview
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
      })
    }
  }, [pathname, searchParams])

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE ANALYTICS 4 SCRIPTS
// ─────────────────────────────────────────────────────────────────────────────
function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
          });
        `}
      </Script>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM EVENT TRACKING
// ─────────────────────────────────────────────────────────────────────────────
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track CTA clicks
export function trackCTAClick(buttonName: string) {
  trackEvent('cta_click', 'engagement', buttonName)
}

// Track contact form submissions
export function trackContactSubmit() {
  trackEvent('form_submit', 'contact', 'contact_form')
}

// Track project views
export function trackProjectView(projectName: string) {
  trackEvent('project_view', 'portfolio', projectName)
}

// Track social link clicks
export function trackSocialClick(platform: string) {
  trackEvent('social_click', 'outbound', platform)
}

// Track scroll depth
export function trackScrollDepth(depth: number) {
  trackEvent('scroll', 'engagement', `${depth}%`, depth)
}

// Track time on page
export function trackTimeOnPage(seconds: number) {
  trackEvent('time_on_page', 'engagement', 'seconds', seconds)
}

// Track expertise section views
export function trackExpertiseView(expertise: string) {
  trackEvent('expertise_view', 'portfolio', expertise)
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <Suspense fallback={null}>
        <AnalyticsPageView />
        <WebVitalsTracking />
      </Suspense>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DECLARATIONS
// ─────────────────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}
