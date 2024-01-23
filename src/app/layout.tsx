import Head from 'next/head';

import { Providers } from '@app/providers';

import { Body } from '@components/Body';

import { HTML_HEAD_KEYS } from '@config/constants';

import '@styles/globals.css';
import '@styles/tailwind.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head key={HTML_HEAD_KEYS.LAYOUT}>
        <link rel="shortcut icon" href="favicons/favicon.ico" />
      </Head>
      <Body>
        <Providers>{children}</Providers>
      </Body>
    </html>
  );
}
