import queryString from 'query-string';

import { SPOTIFY_API_BASE_URL } from '@config/endpoints';
import { sci } from '@utils/spotifyAPIClient';
import {
  CurrentlyPlayingResponse,
  RecentlyPlayedResponse,
} from '@api/spotify/song/types';
import logger from '@utils/logger';

const { stderr } = logger('[api/spotify/song]');

export async function GET() {
  try {
    const current = (await (
      await sci.request(
        `${SPOTIFY_API_BASE_URL}/me/player/currently-playing`
      )
    ).json()) as CurrentlyPlayingResponse | undefined;

    const recently = (await (
      await sci.request(
        `${SPOTIFY_API_BASE_URL}/me/player/recently-played?${queryString.stringify(
          { limit: 1 }
        )}`
      )
    ).json()) as RecentlyPlayedResponse | undefined;

    return Response.json({
      current,
      recently,
    });
  } catch (error) {
    stderr('Error while fetching song data', error);
    return new Response(null, { status: 401 });
  }
}
