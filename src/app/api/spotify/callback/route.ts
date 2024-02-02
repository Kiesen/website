import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

import { SPOTIFY_AUTH_CONFIG } from '@config/constants';

import logger from '@utils/logger';
import { spotifyAPIClient } from '@utils/spotifyAPIClient';

const { stdout, stderr } = logger('[api/spotify/callback]');

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const cookieStore = cookies();
  const storedState = cookieStore.get(SPOTIFY_AUTH_CONFIG.COOKIE_KEY);

  if (!code || state !== storedState?.value) {
    stderr('Invalid client state or code');

    return new Response(null, {
      status: 401,
    });
  } else {
    const isAuthorized = await spotifyAPIClient.authorizeClient(code);
    cookieStore.delete(SPOTIFY_AUTH_CONFIG.COOKIE_KEY);

    if (isAuthorized) {
      stdout('Successfully authorized client');
      redirect('/');
    } else {
      stderr('Failed to authorize client');
      return new Response(null, {
        status: 401,
      });
    }
  }
}
