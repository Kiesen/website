export interface UseCookieNoticeOptions {
  /** Key used to persist the dismissed state. */
  storageKey?: string
  /** 'session' resets on tab close; 'local' persists across sessions. */
  storage?: 'session' | 'local'
}

/**
 * Reactive visibility + persistence for a cookie notice.
 * Client-only: reads storage in onMounted to avoid SSR hydration mismatch.
 */
export function useCookieNotice(options: UseCookieNoticeOptions = {}) {
  const storageKey = options.storageKey ?? 'cookie-notice:dismissed'
  const storageType = options.storage ?? 'session'
  const isVisible = ref(false)

  const store = () => (storageType === 'local' ? window.localStorage : window.sessionStorage)

  onMounted(() => {
    try {
      if (!store().getItem(storageKey)) isVisible.value = true
    } catch {
      isVisible.value = true
    }
  })

  const dismiss = () => {
    isVisible.value = false
    try {
      store().setItem(storageKey, '1')
    } catch {
      // storage blocked (private mode, disabled) — non-fatal.
    }
  }

  const reset = () => {
    try {
      store().removeItem(storageKey)
    } catch {
      // ignore
    }
    isVisible.value = true
  }

  return { isVisible, dismiss, reset }
}
