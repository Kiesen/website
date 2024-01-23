import crypto from 'crypto';
import queryString from 'query-string';

import { SPOTIFY_AUTH_STATE_KEY } from '@config/constants';
import { cookies } from 'next/headers';
import logger from '@utils/logger';

const { stdout } = logger('[api/spotify/auth]');

export async function GET() {
  const scope =
    'user-read-currently-playing user-read-recently-played';
  const state = crypto.randomBytes(20).toString('hex');

  const cookieStore = cookies();
  cookieStore.set(SPOTIFY_AUTH_STATE_KEY, state, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  stdout('Redirecting for authorization...');

  return new Response(null, {
    status: 307,
    headers: {
      Location:
        'https://accounts.spotify.com/authorize?' +
        queryString.stringify({
          scope: scope,
          state: state,
          response_type: 'code',
          client_id: process.env.SPOTIFY_CLIENT_ID,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
        }),
    },
  });
}
