import { randomBytes } from 'node:crypto'
import { createLogger } from '../../utils/logger'

const log = createLogger('spotify:auth')

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const { secret } = getQuery(event) as { secret?: string }

  if (!config.spotifyAuthSecret || secret !== config.spotifyAuthSecret) {
    log.warn('auth attempt with invalid or missing secret')
    throw createError({ statusCode: 403, message: 'Forbidden' })
  }

  const state = randomBytes(16).toString('hex')
  setCookie(event, 'spotify_oauth_state', state, { httpOnly: true, sameSite: 'lax', maxAge: 600 })

  log.info('initiating OAuth flow — redirecting to Spotify')
  const params = new URLSearchParams({
    client_id: config.spotifyClientId,
    response_type: 'code',
    redirect_uri: config.spotifyRedirectUri,
    scope: 'user-library-read',
    state,
  })

  return sendRedirect(event, `https://accounts.spotify.com/authorize?${params}`)
})
