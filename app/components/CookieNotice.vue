<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  closeLabel?: string
  closeIcon?: string
  storageKey?: string
  storage?: 'session' | 'local'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Cookies',
  message:
    'This site does not track you. The only cookies used are strictly necessary for the application to function.',
  closeLabel: 'Dismiss cookie notice',
  closeIcon: '🍪',
  storageKey: 'cookie-notice:dismissed',
  storage: 'session',
})

const { isVisible, dismiss } = useCookieNotice({
  storageKey: props.storageKey,
  storage: props.storage,
})

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isVisible.value) dismiss()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Transition name="cookie-notice">
    <div
      v-if="isVisible"
      role="region"
      aria-label="Cookie notice"
      class="cookie-notice pointer-events-none fixed inset-x-0 bottom-0 z-50"
    >
      <div aria-hidden="true" class="cookie-notice-fade absolute inset-x-0 bottom-0" />

      <div class="relative flex justify-center p-4 sm:p-6">
        <div
          class="pointer-events-auto flex w-full max-w-xl items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 shadow-xl sm:items-center sm:p-5"
        >
          <div class="min-w-0 flex-1 text-sm text-[var(--color-fg-muted)]">
            <slot name="message" :title="title" :message="message">
              <p>
                <strong class="text-[var(--color-fg)]">{{ title }}.</strong>
                {{ message }}
              </p>
            </slot>
          </div>
          <button
            type="button"
            :aria-label="closeLabel"
            :title="closeLabel"
            class="shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-base leading-none transition hover:scale-105 hover:border-[var(--color-fg-muted)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-elevated)] focus-visible:outline-none"
            @click="dismiss"
          >
            <span aria-hidden="true">{{ closeIcon }}</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-notice-fade {
  height: 45vh;
  background: linear-gradient(to top, var(--color-bg) 0%, var(--color-bg) 18%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, black 0%, black 70%, transparent 100%);
  mask-image: linear-gradient(to top, black 0%, black 70%, transparent 100%);
}

.cookie-notice-enter-active,
.cookie-notice-leave-active {
  transition:
    opacity 260ms ease,
    transform 260ms ease;
}
.cookie-notice-enter-from,
.cookie-notice-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
