import Head from 'next/head';

import { Providers } from '@app/providers';

import { Body } from '@components/Body';

import { NEXT_CONFIG } from '@config/constants';

import 'tailwindcss/tailwind.css';

import '@styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head key={NEXT_CONFIG.LAYOUT}>
        <link rel="shortcut icon" href="favicons/favicon.ico" />
      </Head>
      <Body>
        <Providers>{children}</Providers>
      </Body>
    </html>
  );
}
