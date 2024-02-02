import queryString from 'query-string';

import {
  type SpotifyAPIErrorResponse,
  type SpotifyAPIGetRecentlyPlayedTracksResponse,
} from '@api/spotify/types';

import { SPOTIFY_API_ENDPOINTS } from '@config/endpoints';

import logger from '@utils/logger';
import { spotifyAPIClient } from '@utils/spotifyAPIClient';

const { stderr } = logger('[api/spotify/song]');

export async function GET() {
  try {
    const recently = await spotifyAPIClient
      .request(
        `${SPOTIFY_API_ENDPOINTS.RECENTLY_PLAYED}?${queryString.stringify(
          { limit: 1 }
        )}`
      )
      .then<
        | SpotifyAPIGetRecentlyPlayedTracksResponse
        | SpotifyAPIErrorResponse
      >((response) => response.json());

    if ('error' in recently) {
      stderr(
        'Error while fetching song data. Reason: %s',
        recently.error.message
      );
      return new Response(null, { status: 401 });
    } else {
      return Response.json({ recently });
    }
  } catch (error) {
    stderr(
      'Server error while fetching song data. Reason: %s',
      error
    );
    return new Response(null, { status: 500 });
  }
}
