import { AppProps } from 'next/app';
import { FC } from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
