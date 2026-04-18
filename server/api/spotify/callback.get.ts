export default defineEventHandler(async (event) => {
  const { code, error, state } = getQuery(event) as { code?: string; error?: string; state?: string }

  if (error) throw createError({ statusCode: 400, message: `Spotify auth denied: ${error}` })
  if (!code) throw createError({ statusCode: 400, message: 'Missing authorization code' })

  const expectedState = getCookie(event, 'spotify_oauth_state')
  if (!state || state !== expectedState) {
    throw createError({ statusCode: 400, message: 'Invalid state parameter — possible CSRF attempt' })
  }
  deleteCookie(event, 'spotify_oauth_state')

  const config = useRuntimeConfig()
  const credentials = Buffer.from(`${config.spotifyClientId}:${config.spotifyClientSecret}`).toString('base64')

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.spotifyRedirectUri,
    }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw createError({
      statusCode: res.status,
      message: `Token exchange failed: ${body.error_description ?? res.statusText}`,
    })
  }

  const data = await res.json()

  return {
    message:
      'Copy the refresh_token below into your .env as NUXT_SPOTIFY_REFRESH_TOKEN, then remove these auth routes.',
    refresh_token: data.refresh_token,
  }
})
