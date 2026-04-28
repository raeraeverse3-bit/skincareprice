import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.skincareprice.com'),
  title: {
    default: 'SkinCarePrice — Honest Skincare Reviews & Comparisons',
    template: '%s | SkinCarePrice',
  },
  description:
    "Independent skincare reviews ranked by tier (S/A/B/C/D). Filter by skin type, concern, ingredient, and age decade. We support the skin you're in.",
  keywords: [
    'skincare reviews',
    'best skincare products',
    'skincare comparison',
    'anti-aging skincare',
    'clean beauty',
    'skin support',
    'serum reviews',
    'moisturizer reviews',
    'skincare for 40s',
    'skincare for 50s',
  ],
  authors: [{ name: 'SkinCarePrice Editorial' }],
  creator: 'SkinCarePrice',
  publisher: 'SkinCarePrice',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.skincareprice.com',
    siteName: 'SkinCarePrice',
    title: 'SkinCarePrice — Honest Skincare Reviews & Comparisons',
    description:
      "Independent skincare tier rankings. Filter by skin type, concern, age decade. Affiliate links are disclosed. We support the skin you're in.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SkinCarePrice' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkinCarePrice — Honest Skincare Reviews',
    description: "Independent skincare tier rankings. We support the skin you're in.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: 'https://www.skincareprice.com' },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-56CLED2HFD" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-56CLED2HFD');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'SkinCarePrice',
              url: 'https://www.skincareprice.com',
              description: 'Independent skincare product reviews and comparisons with tier scoring.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.skincareprice.com/?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
