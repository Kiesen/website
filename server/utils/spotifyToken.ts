let cached: { accessToken: string; expiresAt: number } | null = null

export async function getSpotifyAccessToken(): Promise<string> {
  if (cached && Date.now() < cached.expiresAt - 60_000) {
    return cached.accessToken
  }

  const config = useRuntimeConfig()
  const credentials = Buffer.from(`${config.spotifyClientId}:${config.spotifyClientSecret}`).toString('base64')

  console.log('Refreshing Spotify access token...', config.spotifyRefreshToken) // Log when refreshing the token

  if (!config.spotifyRefreshToken) {
    throw createError({
      statusCode: 500,
      message: 'NUXT_SPOTIFY_REFRESH_TOKEN is not set. Visit /api/spotify/auth to complete the one-time auth flow.',
    })
  }

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
    throw createError({
      statusCode: 502,
      message: `Spotify token refresh failed (${res.status}): ${body.error_description ?? body.error ?? res.statusText}`,
    })
  }

  const data = await res.json()

  if (data.refresh_token) {
    console.warn('[spotify] New refresh token issued — update SPOTIFY_REFRESH_TOKEN in your env:', data.refresh_token)
  }

  cached = { accessToken: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 }
  return cached.accessToken
}
