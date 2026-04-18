import { createLogger } from './logger'

const log = createLogger('spotify:token')

let cached: { accessToken: string; expiresAt: number } | null = null

export async function getSpotifyAccessToken(): Promise<string> {
  if (cached && Date.now() < cached.expiresAt - 60_000) {
    log.info('cache hit — reusing access token')
    return cached.accessToken
  }

  const config = useRuntimeConfig()

  if (!config.spotifyRefreshToken) {
    log.error('NUXT_SPOTIFY_REFRESH_TOKEN is not set')
    throw createError({
      statusCode: 500,
      message: 'NUXT_SPOTIFY_REFRESH_TOKEN is not set. Visit /api/spotify/auth to complete the one-time auth flow.',
    })
  }

  log.info('access token expired or absent — requesting refresh')
  const credentials = Buffer.from(`${config.spotifyClientId}:${config.spotifyClientSecret}`).toString('base64')

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: config.spotifyRefreshToken,
    }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    log.error(`token refresh failed — status ${res.status}`)
    throw createError({
      statusCode: 502,
      message: `Spotify token refresh failed (${res.status}): ${body.error_description ?? body.error ?? res.statusText}`,
    })
  }

  const data = await res.json()

  if (data.refresh_token) {
    log.warn('Spotify issued a new refresh token — update NUXT_SPOTIFY_REFRESH_TOKEN in your env')
  }

  cached = { accessToken: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 }
  log.info(`token refreshed — expires in ${data.expires_in}s`)
  return cached.accessToken
}
