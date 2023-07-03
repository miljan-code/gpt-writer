import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';

import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import '@/styles/globals.css';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.description} — ${siteConfig.name}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'GPT Writer',
    'ChatGPT',
    'AI Copywriting',
    'Grammar Checker',
    'Paraphraser',
  ],
  authors: [
    {
      name: 'miljan',
      url: 'https://miljan.xyz',
    },
  ],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          fontSans.variable,
          fontHeading.variable,
          'font-sans antialiased'
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
