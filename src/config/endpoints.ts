const SPOTIFY_WEB_API = {
  BASE_URL: 'https://api.spotify.com/v1',
  CURRENTLY_PLAYING: '/me/player/currently-playing',
  RECENTLY_PLAYED: '/me/player/recently-played',
} as const;

const SPOTIFY_AUTH_API = {
  BASE_URL: 'https://accounts.spotify.com/api',
  TOKEN: '/token',
  AUTHORIZE: '/authorize',
} as const;

export const SPOTIFY_API_ENDPOINTS = {
  CURRENTLY_PLAYING: `${SPOTIFY_WEB_API.BASE_URL}${SPOTIFY_WEB_API.CURRENTLY_PLAYING}`,
  RECENTLY_PLAYED: `${SPOTIFY_WEB_API.BASE_URL}${SPOTIFY_WEB_API.RECENTLY_PLAYED}`,
  TOKEN: `${SPOTIFY_AUTH_API.BASE_URL}${SPOTIFY_AUTH_API.TOKEN}`,
  AUTHORIZE: `${SPOTIFY_AUTH_API.BASE_URL}${SPOTIFY_AUTH_API.AUTHORIZE}`,
} as const;

export const NEXT_API_ENDPOINTS = {
  GET_SONG: '/api/song',
} as const;
