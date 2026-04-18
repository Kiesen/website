import { createLogger } from '../../utils/logger'

const log = createLogger('spotify:last-liked')

export default defineCachedEventHandler(
  async () => {
    log.info('handling request')
    const accessToken = await getSpotifyAccessToken()

    const res = await fetch('https://api.spotify.com/v1/me/tracks?limit=1', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (res.status === 429) {
      const retryAfter = res.headers.get('Retry-After') ?? '60'
      log.warn(`rate limited by Spotify — retry after ${retryAfter}s`)
      throw createError({ statusCode: 429, message: `Rate limited. Retry after ${retryAfter}s.` })
    }

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      log.error(`Spotify API error — status ${res.status}`)
      throw createError({
        statusCode: res.status,
        message: body.error?.message ?? `Spotify API error: ${res.statusText}`,
      })
    }

    const data = await res.json()
    const item = data.items?.[0]

    if (!item) {
      log.warn('no liked tracks found in response')
      throw createError({ statusCode: 404, message: 'No liked tracks found' })
    }

    log.info('request successful — returning track')
    const track = item.track
    return {
      title: track.name as string,
      artist: (track.artists as Array<{ name: string }>).map((a) => a.name).join(', '),
      album: track.album.name as string,
      albumArt: (track.album.images as Array<{ url: string }>)[0]?.url ?? '',
      url: track.external_urls.spotify as string,
      likedAt: item.added_at as string,
    }
  },
  { maxAge: 3600, name: 'spotify-last-liked' },
)
