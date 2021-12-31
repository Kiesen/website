import Head from 'next/head';
import { FC } from 'react';

import NavBar from '@src/components/NavBar';
import Footer from '@src/components/Footer';
import data from '@src/static/meta.json';

const Home: FC<{}> = () => {
  return (
    <>
      <Head>
        <title>Home | frederikaulich</title>
      </Head>

      <NavBar />

      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl md:text-5xl font-bold leading-tight text-center md:text-left">
            {data.headline}
          </h1>

          {/* 
              Trust me, I'm engineer 
          */}
          <p
            className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left"
            dangerouslySetInnerHTML={{ __html: data.subHeadline }}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
