'use client';

import useSWR, { SWRResponse } from 'swr';

import { GenericSongResponse } from '@api/song/types';

import { NEXT_API_ENDPOINTS } from '@config/endpoints';

export const useSongRequest = (): SWRResponse<
  GenericSongResponse,
  Error
> =>
  useSWR(NEXT_API_ENDPOINTS.GET_SONG, (url) =>
    fetch(url).then<GenericSongResponse>((response) =>
      response.json()
    )
  );
