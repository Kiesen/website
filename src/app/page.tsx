import Head from 'next/head';

import Card from '@components/Card';
import Footer from '@components/Footer';
import IconMap from '@components/IconMap';
import NavBar from '@components/NavBar';
import SpotifyWidget from '@components/SpotifyWidget';
import staticMetaData from '@static/meta.json';
import { HTML_HEAD_KEYS } from '@config/constants';

export default function Home() {
  return (
    <>
      <Head key={HTML_HEAD_KEYS.HOME}>
        <title>Home | frederikaulich</title>
      </Head>

      <div className="h-screen p-6 flex flex-col justify-between">
        <NavBar />
        <main className="container mx-auto flex flex-wrap flex-row items-center justify-between">
          <div className="flex flex-col w-full md:w-2/5 justify-center overflow-y-hidden">
            <span className="my-4 text-3xl md:text-5xl font-bold leading-tight text-center md:text-left">
              {staticMetaData.caption}
            </span>

            <h1 className="leading-normal font-medium md:font-bold  text-xl md:text-2xl mb-8 text-center md:text-left">
              {staticMetaData.headline}
            </h1>

            <div className="my-4">{/* <SpotifyWidget /> */}</div>
          </div>

          <div className="w-full md:w-3/5 xl:w-2/5 mx-auto flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl my-4 font-bold text-center">
              {staticMetaData.tech.headline}
            </h2>
            <div className="flex flex-wrap justify-center">
              {staticMetaData.tech.collection.map((item) => (
                <Card className="w-1/4" key={item.id}>
                  <a
                    href={item.link}
                    rel="noreferrer"
                    target="_blank"
                    className="h-24 group flex flex-col items-center justify-center"
                  >
                    {IconMap.has(item.id)
                      ? IconMap.get(item.id)
                      : null}
                    <span>{item.name}</span>
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
}
