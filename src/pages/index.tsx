import Head from 'next/head';
import { FC } from 'react';
import { Box } from '@chakra-ui/core';

import Header from '@src/components/header';

const Home: FC<{}> = () => {
  return (
    <>
      <Head>
        <title>Home | frederikaulich</title>
      </Head>
      <Box w="100%" color="black">
        <Header />
      </Box>
    </>
  );
};

export default Home;
