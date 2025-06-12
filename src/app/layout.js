import Navbar from '@/componant/base/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/componant/base/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Steady Formation - Launch Your Business in Any State at 0 Cost',
  description: 'Launch your business in any U.S. state with zero upfront costs. Professional business formation services for U.S. residents with no hidden fees and no document requirements.',
  keywords: 'business formation, LLC formation, corporation setup, business registration, zero cost business, U.S. business formation',
  authors: [{ name: 'Steady Formation' }],
  creator: 'Steady Formation',
  publisher: 'Steady Formation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://steadyformation.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Steady Formation - Launch Your Business in Any State at 0 Cost',
    description: 'Launch your business in any U.S. state with zero upfront costs. Professional business formation services for U.S. residents with no hidden fees and no document requirements.',
    url: 'https://steadyformation.com',
    siteName: 'Steady Formation',
    images: [
      {
        url: '/steady_formation_logo.svg',
        width: 1200,
        height: 630,
        alt: 'Steady Formation - Business Formation Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steady Formation - Launch Your Business in Any State at 0 Cost',
    description: 'Launch your business in any U.S. state with zero upfront costs. Professional business formation services for U.S. residents.',
    images: ['/steady_formation_logo.svg'],
    creator: '@steadyformation',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8B5CF6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Steady Formation",
              "url": "https://steadyformation.com",
              "logo": "https://steadyformation.com/steady_formation_logo.png",
              "description": "Professional business formation services for U.S. residents with zero upfront costs.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-0123",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://twitter.com/steadyformation",
                "https://linkedin.com/company/steadyformation"
              ]
            })
          }}
        />
      </head>
      <body  className={inter.className}>
        <main>
          <Navbar />
          <div className='mt-[-65px]'>{children}</div>
          <Footer />
        </main>
        
      </body>
    </html>
  );
}