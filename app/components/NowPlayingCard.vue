<script setup lang="ts">
const { data: track, pending } = await useLastLikedTrack()

const relativeLiked = computed(() => {
  if (!track.value?.likedAt) return ''
  const diff = Date.now() - new Date(track.value.likedAt).getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.round(hrs / 24)
  return `${days}d ago`
})
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16">
    <SectionHeading id="listening" eyebrow="On Repeat" title="Last liked on Spotify" />

    <div
      class="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 sm:p-6"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style="background: radial-gradient(circle at center, var(--color-accent), transparent 60%)"
      />

      <div v-if="pending" class="flex items-center gap-4" aria-busy="true">
        <div class="h-20 w-20 shrink-0 animate-pulse rounded-lg bg-[var(--color-border)]" />
        <div class="flex-1 space-y-2">
          <div class="h-4 w-1/2 animate-pulse rounded bg-[var(--color-border)]" />
          <div class="h-3 w-1/3 animate-pulse rounded bg-[var(--color-border)]" />
        </div>
      </div>

      <a
        v-else-if="track"
        :href="track.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-elevated)] rounded-xl"
      >
        <img
          :src="track.albumArt"
          :alt="`Album art for ${track.album}`"
          class="h-20 w-20 shrink-0 rounded-lg object-cover shadow-lg sm:h-24 sm:w-24"
          loading="lazy"
          decoding="async"
        />

        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <Icon name="simple-icons:spotify" class="h-3.5 w-3.5 text-[#1DB954]" aria-hidden="true" />
            <span class="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
              Liked {{ relativeLiked }}
            </span>
          </div>

          <h3 class="mt-1 truncate text-lg font-semibold text-[var(--color-fg)]">
            {{ track.title }}
          </h3>
          <p class="truncate text-sm text-[var(--color-fg-muted)]">{{ track.artist }} · {{ track.album }}</p>

          <span class="mt-3 inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)]">
            Listen on Spotify
            <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" />
          </span>
        </div>
      </a>
    </div>
  </section>
</template>
