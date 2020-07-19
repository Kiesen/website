import { AppProps } from 'next/app';
import { FC } from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';

import chakraTheme from '@src/styles/chakraTheme';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={chakraTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
