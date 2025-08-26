import { Inconsolata, Lobster_Two } from 'next/font/google';

export const fontSans = Inconsolata({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontBranding = Lobster_Two({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-branding',
});
