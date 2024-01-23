import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import { SPOTIFY_AUTH_STATE_KEY } from '@config/constants';
import spotifyAPIClient from '@utils/spotifyAPIClient';
import { redirect } from 'next/navigation';
import logger from '@utils/logger';

const { stdout, stderr } = logger('[api/spotify/callback]');

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const cookieStore = cookies();
  const storedState = cookieStore.get(SPOTIFY_AUTH_STATE_KEY);

  if (state !== storedState?.value || !code) {
    stderr('Invalid client state or code.');

    return new Response(null, {
      status: 401,
    });
  } else {
    const isAuthorized = await spotifyAPIClient.authorizeClient(code);
    cookieStore.delete(SPOTIFY_AUTH_STATE_KEY);

    if (isAuthorized) {
      stdout('Successfully authorized client');
      redirect('/');
    } else {
      stderr('Failed to authorize client.');
      return new Response(null, {
        status: 401,
      });
    }
  }
}
