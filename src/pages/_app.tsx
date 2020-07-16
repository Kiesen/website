import { AppProps } from 'next/app';
import { FC } from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';

import theme from '@src/styles/theme';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
