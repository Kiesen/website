import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';

import { SPOTIFY_AUTH_STATE_KEY } from '@src/config/constants';
import spotifyAPIClient from '@src/utils/spotifyAPIClient';

const validateSpotifyAuthCallback = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const code = req.query.code;
  const state = req.query.state;
  const cookies = new Cookies(req, res);
  const storedState = cookies.get(SPOTIFY_AUTH_STATE_KEY);

  if (state === undefined || state !== storedState) {
    return res.status(401).end('Authorization state mismatch');
  } else {
    // Unset auth state cookie
    cookies.set(SPOTIFY_AUTH_STATE_KEY, undefined, {
      expires: new Date(1),
    });

    try {
      await spotifyAPIClient.authorizeClient(code);
      return res.status(200).redirect('/');
    } catch (e) {
      // Error log intended
      console.error(e);
      return res.status(401).end('Authorization failed');
    }
  }
};

const spotifyHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return validateSpotifyAuthCallback(req, res);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default spotifyHandler;
