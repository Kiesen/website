import queryString from 'query-string';

import { SPOTIFY_API_BASE_URL } from '@config/endpoints';
import spotifyAPIClient from '@utils/spotifyAPIClient';
import {
  CurrentlyPlayingResponse,
  RecentlyPlayedResponse,
} from '@api/spotify/song/types';
import logger from '@utils/logger';

const { stderr } = logger('[api/spotify/song]');

export async function GET() {
  try {
    const { data: currentlyPlayedData } =
      await spotifyAPIClient.request<CurrentlyPlayingResponse>(
        `${SPOTIFY_API_BASE_URL}/me/player/currently-playing`
      );

    const { data: recentlyPlayedData } =
      await spotifyAPIClient.request<RecentlyPlayedResponse>(
        `${SPOTIFY_API_BASE_URL}/me/player/recently-played?${queryString.stringify(
          { limit: 1 }
        )}`
      );

    stderr('Error while fetching song data');

    return Response.json({
      current: currentlyPlayedData.item,
      recently: recentlyPlayedData.items[0].item,
    });
  } catch (error) {
    stderr('Error while fetching song data', error);
    return new Response(null, { status: 401 });
  }
}
