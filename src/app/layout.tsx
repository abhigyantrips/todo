import type { Metadata } from 'next';

import { fontBranding, fontSans } from '@/lib/fonts';

import '@/styles/globals.css';

import { Providers } from '@/app/providers';

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
    <html suppressHydrationWarning lang="en">
      <body
        className={`${fontSans.variable} ${fontBranding.variable} antialiased`}
      >
        <Providers
          themeProps={{
            attribute: 'class',
            defaultTheme: 'system',
            enableSystem: true,
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
