'use client';

import useSWR from 'swr';

import { PartialSongData } from '@api/spotify/song/types';

import { CACHE_KEYS } from '@config/constants';

const fetchCurrentSong = async () =>
  fetch('/api/spotify/song')
    .then<PartialSongData | string>((response) => response.json())
    .catch((error) => error);

export const useSpotifyTrackQuery = () =>
  useSWR({
    queryKey: [CACHE_KEYS.CURRENT_TRACK_QUERY],
    queryFn: fetchCurrentSong,
  });
