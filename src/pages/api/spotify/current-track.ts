import { NextApiRequest, NextApiResponse } from 'next';

import spotifyAPIClient from '@src/utils/spotifyAPIClient';

const spotifyCurrentTrackHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const { data: currentTrackData } =
          await spotifyAPIClient.requestAPI(
            'https://api.spotify.com/v1/me/player/currently-playing'
          );

        return res.status(200).json(currentTrackData);
      } catch (e) {
        return res.status(401).end('Unauthorized');
      }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default spotifyCurrentTrackHandler;
