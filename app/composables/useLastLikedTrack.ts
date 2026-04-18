import type { Track } from '~/types/resume'

export const useLastLikedTrack = () => {
  return useAsyncData<Track>('last-liked-track', () => $fetch<Track>('/api/spotify/last-liked'))
}
