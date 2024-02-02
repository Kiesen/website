import queryString from 'query-string';

import { type GenericSongResponse } from '@api/song/types';
import {
  type SpotifyAPIErrorResponse,
  type SpotifyAPIGetRecentlyPlayedTracksResponse,
} from '@api/spotify/types';

import { HTTP_STATUS_CODES } from '@config/constants';
import { SPOTIFY_API_ENDPOINTS } from '@config/endpoints';

import logger from '@utils/logger';
import { spotifyAPIClient } from '@utils/spotify';

const { stderr } = logger('[api/song]');

export async function GET() {
  try {
    const recentlyPlayedResponse = await spotifyAPIClient
      .request(
        `${SPOTIFY_API_ENDPOINTS.RECENTLY_PLAYED}?${queryString.stringify(
          { limit: 1 }
        )}`
      )
      .then<
        | SpotifyAPIGetRecentlyPlayedTracksResponse
        | SpotifyAPIErrorResponse
      >((response) => response.json());

    if ('error' in recentlyPlayedResponse) {
      stderr(
        'Error while fetching song data. Reason: %s',
        recentlyPlayedResponse.error.message
      );
      return new Response(null, {
        status: HTTP_STATUS_CODES.UNAUTHORIZED,
      });
    } else {
      return Response.json({ song: recentlyPlayedResponse });
    }
  } catch (error) {
    stderr(
      'Server error while fetching song data. Reason: %s',
      error
    );
    return new Response(null, {
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    });
  }
}
