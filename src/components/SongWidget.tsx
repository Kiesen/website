'use client';

import Image from 'next/image';
import { SiSpotify } from 'react-icons/si';

import { useSongRequest } from '@hooks/useSongRequest';

export function SongWidget() {
  const { data, error, isLoading } = useSongRequest();
  const albumImage = undefined; // data?.album?.images[0].url;

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      {isLoading ? (
        <div className="h-20 w-20 bg-gray-300 rounded dark:bg-gray-700" />
      ) : (
        <>
          {!error ? (
            <div className="flex">
              <Image
                alt=""
                src={albumImage ?? ''}
                className="w-40 rounded-md"
              />
              <SiSpotify size={35} />
            </div>
          ) : (
            <div className="flex">
              <div className="h-20 w-20 bg-gray-300 rounded dark:bg-gray-700" />
              <div className="">
                <span>Failed to fetch Spotify song information</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
