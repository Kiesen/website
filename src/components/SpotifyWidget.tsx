'use client';

import Image from 'next/image';
import { SiSpotify } from 'react-icons/si';

import { useSpotifyTrackQuery } from '@hooks/useSpotifyTrackQuery';

export async function SpotifyWidget() {
  const { data, error, isLoading } = useSpotifyTrackQuery();
  const albumImage = data?.album?.images[0].url;

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      {isLoading ? (
        <div className="h-40 w-40 bg-gray-300 rounded dark:bg-gray-700" />
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
              <div className="h-40 w-40 bg-gray-300 rounded dark:bg-gray-700" />
              <div>Failed to fetch Spotify song information</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
