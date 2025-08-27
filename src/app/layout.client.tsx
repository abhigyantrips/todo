'use client';

import { fontBranding, fontSans } from '@/lib/fonts';

import { Header } from '@/components/header';

import { Providers } from '@/app/providers';

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${fontSans.variable} ${fontBranding.variable} min-h-screen antialiased`}
      >
        <Providers
          themeProps={{
            attribute: 'class',
            defaultTheme: 'system',
            enableSystem: true,
          }}
        >
          <div className="relative flex h-screen flex-col">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
