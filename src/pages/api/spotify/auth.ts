import Cookies from 'cookies';
import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import queryString from 'query-string';

import { SPOTIFY_AUTH_STATE_KEY } from '@src/config/constants';

const authRedirectToSpotify = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const scope =
    'user-read-currently-playing user-read-recently-played';
  const state = crypto.randomBytes(20).toString('hex');
  const cookies = new Cookies(req, res);

  cookies.set(SPOTIFY_AUTH_STATE_KEY, state);

  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      queryString.stringify({
        scope: scope,
        state: state,
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
      })
  );
};

const spotifyAuthHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return authRedirectToSpotify(req, res);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default spotifyAuthHandler;
