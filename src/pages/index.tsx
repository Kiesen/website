import Head from 'next/head';
import { FC } from 'react';

import Card from '@src/components/Card';
import Footer from '@src/components/Footer';
import IconMap from '@src/components/IconMap';
import NavBar from '@src/components/NavBar';
import staticMetaData from '@src/static/meta.json';

const Home: FC<{}> = () => {
  return (
    <>
      <Head>
        <title>Home | frederikaulich</title>
      </Head>

      <div className="h-screen p-6 flex flex-col justify-between">
        <NavBar />
        <main className="container mx-auto flex flex-wrap flex-row items-center justify-between">
          <div className="flex flex-col w-full md:w-2/5 justify-center overflow-y-hidden">
            <span className="my-4 text-3xl md:text-5xl font-bold leading-tight text-center md:text-left">
              {staticMetaData.headline}
            </span>

            <h1 className="leading-normal font-bold text-xl md:text-2xl mb-8 text-center md:text-left">
              {staticMetaData.subHeadline}
            </h1>
          </div>
          <div className="w-full md:w-3/5 xl:w-2/5 mx-auto flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl my-4 font-bold text-center">
              Current tech-stack
            </h2>
            <div className="flex flex-wrap justify-center">
              {staticMetaData.skills.map((skill) => (
                <Card className="w-1/4" key={skill.id}>
                  <a
                    href={skill.link}
                    rel="noreferrer"
                    target="_blank"
                    className="h-24 group flex flex flex-col items-center justify-center"
                  >
                    {IconMap.has(skill.id)
                      ? IconMap.get(skill.id)!(50)
                      : null}
                    <span>{skill.name}</span>
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
