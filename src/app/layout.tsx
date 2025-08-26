import type { Metadata, Viewport } from 'next';

import '@/styles/globals.css';

import RootLayoutClient from '@/app/layout.client';

export const metadata: Metadata = {
  title: 'TaskMaster 5000 (Lite)',
  description: 'A lightweight task management tool.',
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
