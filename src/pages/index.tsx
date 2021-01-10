import Head from 'next/head';
import { FC } from 'react';

import Header from '@src/components/Header';
import Background from '@src/components/Background';
import Footer from '@src/components/Footer';
import iconMap from '@src/utils/iconMap';
import meta from '@src/static/meta.json';

const Home: FC<{}> = () => {
  return (
    <>
      <Head>
        <title>Home | frederikaulich</title>
      </Head>
      <Background name="retro">
        <div className="w-full min-h-screen text-white flex flex-col justify-between animate-fadeIn">
          <Header />
          <main className="h-full flex flex-col justify-evenly items-center">
            <h1
              className="max-w-xl py-4 text-2xl text-center animate-glitch"
              dangerouslySetInnerHTML={{ __html: meta.about }}
            />
            <div className="max-w-xl py-4">
              <h2 className="text-2xl py-4 text-center font-semibold animate-glitch">
                My current tech-stack
              </h2>
              <div className="flex flex-wrap justify-center">
                {meta.skills.map((skill) => (
                  <a
                    key={skill.id}
                    href={skill.link}
                    rel="noreferrer"
                    target="_blank"
                    className="h-24 w-1/4 m-2 rounded-md bg-gray-50 bg-opacity-10 group flex flex flex-col items-center justify-center"
                  >
                    <div className="transition duration-500 ease-in-out transform group-hover:scale-110">
                      {iconMap.get(skill.id)}
                    </div>
                    <span className="py-2 font-mono">
                      {skill.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </Background>
    </>
  );
};

export default Home;
