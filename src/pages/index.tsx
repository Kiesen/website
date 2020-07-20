import Head from 'next/head';
import { FC, useEffect } from 'react';
import { Box } from '@chakra-ui/core';

import Header from '@src/components/header';
import Particle from '@src/animations/particle';

const Home: FC<{}> = () => {
  useEffect(() => {
    const animation = new Particle('particles', 100);
    animation.start();
  }, []);
  return (
    <>
      <Head>
        <title>Home | frederikaulich</title>
      </Head>
      <Box w="100%" color="black">
        <Header />
        <canvas id="particles" />
      </Box>
    </>
  );
};

export default Home;
