import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import './globals.scss';
import { cookies } from 'next/headers';
import { UserLanguage } from './enums/LangEnum';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import { Providers } from './providers';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const viewport: Viewport = {
  themeColor: '#FF9A00',
  colorScheme: 'light',
  initialScale: 1,
  userScalable: true,
  maximumScale: 3,
  width: 'device-width',
};
export const metadata: Metadata = {
  title: 'Scalar',
  description: 'Vaš partner u investicijama u građevini',

  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/images/Favicon/favicon-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '196x196',
      url: '/images/Favicon/favicon-196x196.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '128x128',
      url: '/images/Favicon/favicon-128x128.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/images/Favicon/favicon-96x96.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/images/Favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/images/Favicon/favicon-16x16.png',
    },

    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '180x180',
      url: '/images/Favicon/apple-touch-icon-180x180.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '152x152',
      url: '/images/Favicon/apple-touch-icon-152x152.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '120x120',
      url: '/images/Favicon/apple-touch-icon-120x120.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '76x76',
      url: '/images/Favicon/apple-touch-icon-76x76.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '60x60',
      url: '/images/Favicon/apple-touch-icon-60x60.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '57x57',
      url: '/images/Favicon/apple-touch-icon-57x57.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '114x114',
      url: '/images/Favicon/apple-touch-icon-114x114.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '72x72',
      url: '/images/Favicon/apple-touch-icon-72x72.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '144x144',
      url: '/images/Favicon/apple-touch-icon-144x144.png',
    },
  ],

  keywords: 'investicije, građevina, projektiranje, partner, Scalar',
  authors: {
    url: 'https://www.scalar.hr',
    name: "'Scalar d.o.o.'",
  },
  robots: 'index, follow',
  applicationName: 'Scalar Investicije',

  openGraph: {
    type: 'website',
    url: 'https://www.scalar.hr',
    title: 'Scalar - Vaš partner u investicijama u građevini',
    description: 'Pružamo sveobuhvatne usluge projektiranja i izvođenja radova u građevinskoj industriji.',
    siteName: 'Scalar',
    images: [
      {
        url: '/images/OG/scalar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Scalar - Građevinski projekt',
      },
    ],
    locale: 'hr_HR',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@ScalarCompany',
    creator: '@ScalarCompany',
    title: 'Scalar - Vaš partner u investicijama u građevini',
    description: 'Pružamo sveobuhvatne usluge projektiranja i izvođenja radova u građevinskoj industriji.',
    images: [
      {
        url: '/images/OG/scalar-og.jpg',
        alt: 'Scalar - Građevinski projekt',
      },
    ],
  },

  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-site-verification-code',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const lang = (cookieStore.get('@sutra-user-lang')?.value as UserLanguage) || 'hr';

  return (
    <html
      lang={lang}
      className='scrollbar scrollbar-thumb-accent scrollbar-track-primary-dark dark:scrollbar-track-primary-light min-h-screen w-full h-full antialiased'
    >
      <body className={`${roboto.className} w-full h-full md:pt-0 pt-12 relative bg-almost-white dark:bg-almost-black`}>
        <Toaster />

        <Suspense>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
