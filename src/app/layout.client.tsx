'use client';

import { fontBranding, fontSans } from '@/lib/fonts';

import { AddTaskButton } from '@/components/add-task';
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
          <div className="relative flex h-full flex-col">
            <Header />
            <main className="mx-auto w-full max-w-screen-md flex-1">
              {children}
            </main>
          </div>

          <AddTaskButton />
        </Providers>
      </body>
    </html>
  );
}
