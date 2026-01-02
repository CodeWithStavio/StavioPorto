import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import Grid from '@/components/Grid'
import { ThemeProvider } from '@/components/ThemeProvider'
import SmoothScroll from '@/components/effects/SmoothScroll'
import LoadingScreen from '@/components/effects/LoadingScreen'
import ScrollProgress from '@/components/effects/ScrollProgress'
import JsonLd from '@/components/JsonLd'
import Analytics from '@/components/Analytics'
import { baseMetadata, viewport as viewportConfig } from '@/lib/seo.config'

// ══════════════════════════════════════════════════════════════════════════════
// VIEWPORT EXPORT (Next.js 14+)
// ══════════════════════════════════════════════════════════════════════════════
export const viewport = viewportConfig

// ══════════════════════════════════════════════════════════════════════════════
// METADATA EXPORT (SEO)
// ══════════════════════════════════════════════════════════════════════════════
export const metadata: Metadata = baseMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme flash prevention - must run before body renders */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://github.com" />

        {/* Structured Data (JSON-LD) */}
        <JsonLd type="home" />

        {/* Analytics */}
        <Analytics />
      </head>
      <body>
        <ThemeProvider>
          <LoadingScreen>
            <SmoothScroll>
              <ScrollProgress />
              <div className="ambient-glow" aria-hidden="true" />
              <div className="noise" aria-hidden="true" />
              <Grid />
              <CustomCursor />
              <Navigation />
              <main id="main-content" tabIndex={-1} style={{ position: 'relative', zIndex: 1, outline: 'none' }} role="main">{children}</main>
              <Footer />
            </SmoothScroll>
          </LoadingScreen>
        </ThemeProvider>
      </body>
    </html>
  )
}
