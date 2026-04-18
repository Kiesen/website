type CardState = { x: number; y: number; hover: boolean }

/**
 * Drives card hover states via IntersectionObserver on touch devices.
 * On pointer-fine devices (desktop) it does nothing — mouse events handle it.
 *
 * Usage:
 *   const { registerCard } = useScrollActivatedCards(cardStates)
 *   <div :ref="(el) => registerCard(el, key)" …>
 */
export function useScrollActivatedCards(cardStates: Record<string, CardState>) {
  const pending = new Map<string, Element>()
  const observers: IntersectionObserver[] = []

  const registerCard = (el: Element | unknown, key: string) => {
    if (el instanceof Element) pending.set(key, el)
  }

  onMounted(() => {
    if (!window.matchMedia('(pointer: coarse)').matches) return

    for (const [key, el] of pending) {
      const state = cardStates[key]
      if (!state) continue

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return
          state.hover = entry.isIntersecting
          if (entry.isIntersecting) {
            state.x = 50
            state.y = 50
          }
        },
        {
          // Shrink the effective viewport by 25% from the bottom so cards only
          // activate once they've scrolled well clear of the bottom edge.
          rootMargin: '0px 0px -25% 0px',
          threshold: 0.1,
        },
      )

      observer.observe(el)
      observers.push(observer)
    }
  })

  onBeforeUnmount(() => {
    observers.forEach((o) => o.disconnect())
  })

  return { registerCard }
}
