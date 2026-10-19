import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { cn } from '@/lib/utils';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://roadmap.wakeuplate.io.vn';
const SITE_NAME = 'SE Roadmap';
const SITE_DESCRIPTION =
  'An opinionated, interactive roadmap for learning backend software engineering: foundations, APIs, design patterns, databases, scalability, distributed systems, and operations. 44 curated topics across 7 categories.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SE Roadmap — Backend software engineering learning path',
    template: '%s — SE Roadmap',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'nghiaph' }],
  creator: 'nghiaph',
  publisher: 'nghiaph',
  generator: 'Next.js',
  category: 'education',
  keywords: [
    'software engineering roadmap',
    'backend roadmap',
    'backend developer roadmap',
    'learn backend development',
    'system design roadmap',
    'distributed systems',
    'API design',
    'database design',
    'design patterns',
    'scalability',
    'SOLID principles',
    'microservices',
    'software engineer learning path',
    'self-taught backend engineer',
    'computer science fundamentals',
  ],
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'SE Roadmap — Backend software engineering learning path',
    description:
      'Interactive roadmap for learning backend software engineering — 44 curated topics across 7 categories. Track progress, bookmark, and take notes locally.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SE Roadmap — Backend software engineering learning path',
    description:
      'Interactive roadmap for learning backend software engineering — 44 curated topics across 7 categories.',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0e14' },
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  publisher: {
    '@type': 'Person',
    name: 'nghiaph',
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(sans.variable, mono.variable)}
    >
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          value={{ light: 'light', dark: 'dark' }}
        >
          <Header />
          <main className="container py-8 md:py-12">{children}</main>
          <footer className="container border-t border-border/60 py-8 text-xs text-muted-foreground">
            <p>
              Built for self-study. Bookmarks, notes, and progress are stored locally in your
              browser — no account, no tracking.
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
