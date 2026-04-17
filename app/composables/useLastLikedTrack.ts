import type { Track } from '~/types/resume'

const mockTrack: Track = {
  title: 'Weightless',
  artist: 'Marconi Union',
  album: 'Weightless (Ambient Transmissions Vol. 2)',
  albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
  url: 'https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6',
  likedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
}

export const useLastLikedTrack = () => {
  return useAsyncData<Track>('last-liked-track', async () => {
    await new Promise((r) => setTimeout(r, 120))
    return mockTrack
  })
}
