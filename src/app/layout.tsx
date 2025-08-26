import type { Metadata } from 'next';

import { fontBranding, fontSans } from '@/lib/fonts';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'TaskMaster 5000 (Lite)',
  description: 'A lightweight task management tool.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontBranding.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
