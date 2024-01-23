import queryString from 'query-string';

type AuthCode = string | string[] | undefined;

type AuthResponse = {
  refresh_token: string;
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
};

const spotifyAPIClient = () => {
  // Interval identifier
  let intervalID: undefined | NodeJS.Timeout = undefined;

  // Token url and basic access authorization header value
  const TOKEN_URL = 'https://accounts.spotify.com/api/token';
  const BASIC_ACCESS_AUTHORIZATION = `Basic ${Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')}`;

  // Headers for requesting the authorization endpoints
  const authorizationHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: BASIC_ACCESS_AUTHORIZATION,
  };

  const authorizeClient = async (
    code: AuthCode
  ): Promise<boolean> => {
    try {
      const authorizationResponse = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: authorizationHeaders,
        body: queryString.stringify({
          code: code,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
          grant_type: 'authorization_code',
        }),
      });
      const data =
        (await authorizationResponse.json()) as AuthResponse;

      // Set access and refresh in memory
      process.env.SPOTIFY_ACCESS_TOKEN = data.access_token;
      process.env.SPOTIFY_REFRESH_TOKEN = data.refresh_token;

      // Refresh the access token every 30 minutes
      intervalID = setInterval(
        refreshAccessToken,
        1000 * (data.expires_in / 2)
      );
      return true;
    } catch (error) {
      console.error('Spotify client authorization failed', error);
      return false;
    }
  };

  const refreshAccessToken = async (): Promise<void> => {
    try {
      const refreshAuthorizationResponse = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: authorizationHeaders,
        body: queryString.stringify({
          grant_type: 'refresh_token',
          refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
        }),
      });

      const data =
        (await refreshAuthorizationResponse.json()) as AuthResponse;

      process.env.SPOTIFY_ACCESS_TOKEN = data.access_token;
    } catch (error) {
      clearInterval(intervalID);
      console.error(
        'Spotify client refresh authorization failed',
        error
      );
    }
  };

  const request = async (endpoint: string) => {
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
  };

  return { authorizeClient, request };
};

export { spotifyAPIClient };
export const sci = spotifyAPIClient();
