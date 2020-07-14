import { AppProps } from 'next/app';
import { FC } from 'react';
import { CSSReset } from '@chakra-ui/core';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <CSSReset />
      <Component {...pageProps} />
    </>
  );
};

export default App;
