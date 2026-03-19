import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Unified OTT — Unlimited Movies, Shows & Live Sports',
  description:
    'Stream 10,000+ movies, web series, and live sports in 4K UHD. Unified OTT combines the best of Netflix, JioCinema & Hotstar in one platform.',
  keywords: ['streaming', 'movies', 'web series', 'live sports', 'OTT', '4K'],
  openGraph: {
    title: 'Unified OTT',
    description: 'Unlimited Movies, Shows & Live Sports',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#020617] text-white antialiased">
        {/* Film grain overlay */}
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
