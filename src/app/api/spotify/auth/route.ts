import crypto from 'crypto';
import { cookies } from 'next/headers';
import queryString from 'query-string';

import {
  HTTP_STATUS_CODES,
  SPOTIFY_AUTH_CONFIG,
} from '@config/constants';
import { SPOTIFY_API_ENDPOINTS } from '@config/endpoints';

import logger from '@utils/logger';

const { stdout } = logger('[api/spotify/auth]');

export async function GET() {
  const scope = SPOTIFY_AUTH_CONFIG.SCOPES;
  const state = crypto.randomBytes(20).toString('hex');

  const cookieStore = cookies();
  cookieStore.set(SPOTIFY_AUTH_CONFIG.COOKIE_KEY, state, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  stdout('Redirecting for authorization...');

  return new Response(null, {
    status: HTTP_STATUS_CODES.TEMPORARY_REDIRECT,
    headers: {
      Location:
        `${SPOTIFY_API_ENDPOINTS.AUTHORIZE}?` +
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
