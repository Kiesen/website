import axios, { AxiosRequestHeaders } from 'axios';
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
  let intervalID: undefined | NodeJS.Timer = undefined;

  // Token auth url and basic access authorization header value
  const TOKEN_URL = 'https://accounts.spotify.com/api/token';
  const BASIC_ACCESS_AUTHORIZATION = `Basic ${Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')}`;

  // Headers for requesting spotify authorization endpoints
  const authorizationHeaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: BASIC_ACCESS_AUTHORIZATION,
    },
  };

  const authorizeClient = async (code: AuthCode): Promise<void> => {
    const authorizationResponse = await axios.post<AuthResponse>(
      TOKEN_URL,
      queryString.stringify({
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
        grant_type: 'authorization_code',
      }),
      authorizationHeaders
    );

    const { status, data } = authorizationResponse;

    if (status === 200) {
      // Set access and refresh in memory
      process.env.SPOTIFY_ACCESS_TOKEN = data.access_token;
      process.env.SPOTIFY_REFRESH_TOKEN = data.refresh_token;

      // Refresh the access token every 30 minutes
      intervalID = setInterval(
        refreshAccessToken,
        1000 * (data.expires_in / 2)
      );

      return;
    } else {
      throw new Error('Spotify client authorization failed');
    }
  };

  const refreshAccessToken = async (): Promise<void> => {
    const refreshAuthorizationResponse =
      await axios.post<AuthResponse>(
        TOKEN_URL,
        queryString.stringify({
          grant_type: 'refresh_token',
          refresh_token: process.env.REFRESH_TOKEN,
        }),
        authorizationHeaders
      );

    const { status, data } = refreshAuthorizationResponse;

    if (status === 200) {
      process.env.SPOTIFY_ACCESS_TOKEN = data.access_token;
      return;
    } else {
      clearInterval(intervalID);
      console.error('Spotify client refresh authorization failed');
    }
  };

  const requestAPI = async <GenericResponseT>(
    endpoint: string,
    headers?: AxiosRequestHeaders
  ) => {
    const response = await axios.get<GenericResponseT>(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    return response;
  };

  return { authorizeClient, requestAPI };
};

export default spotifyAPIClient();
