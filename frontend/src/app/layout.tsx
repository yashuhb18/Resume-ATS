import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nimma-MITra - ECE/EEE Career Companion & Smart Resume Analyzer',
  description: 'Nimma-MITra: Your personalized ECE/EEE career companion. Get daily domain updates, curated learning resources, and smart resume analysis—all in one place. Free, private, and practical.',
  keywords: 'ECE career, EEE career, resume analyzer, domain updates, learning resources, ATS score, resume optimization, job search, career tools, free resume scanner, applicant tracking system, resume parser, CV analyzer, job application, resume tips, resume keywords, resume score, free ATS checker, resume grader, job application tips, career advice, resume builder, AI resume analyzer, resume screening, job seeker tools, career optimization, resume feedback, interview preparation, job hunting, recruitment tools, HR technology, resume formatting, professional resume',
  publisher: 'Nimma-MITra',
  metadataBase: new URL('https://nimma-mitra.com'),
  alternates: {
    canonical: '/',
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
  openGraph: {
    title: 'Nimma-MITra - ECE/EEE Career Companion',
    description: 'Personalized ECE/EEE career updates, learning resources, and resume analysis. Free, private, and practical.',
    type: 'website',
    locale: 'en_US',
    url: 'https://nimma-mitra.com',
    siteName: 'Nimma-MITra',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nimma-MITra - ECE/EEE Career Companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nimma-MITra - ECE/EEE Career Companion',
    description: 'Personalized ECE/EEE career updates, learning resources, and resume analysis. Free, private, and practical.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
    ],
    apple: '/images/logo.png',
  },
  category: 'Career Tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <meta name="theme-color" content="#3B82F6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Nimma-MITra',
              description: 'Nimma-MITra: Personalized ECE/EEE career companion. Daily updates, curated learning, and smart resume analysis. Zero data storage, privacy-first.',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Any',
              url: 'https://nimma-mitra.com',
              sameAs: [
                'https://nimma-mitra.com'
              ],
              themeColor: '#3B82F6',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'ATS Score Analysis',
                'Skills Detection',
                'Domain Classification',
                'Experience Analysis',
                'Project Review',
                'Issue Detection',
                'Smart Suggestions',
                'PDF Report Generation'
              ],
              keywords: 'ATS, resume analyzer, resume score, job search, career tools'
            }),
          }}
        />
      </head>
      <body className="min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
