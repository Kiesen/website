export function useCursorZone() {
  const zoneRef = ref<HTMLElement | null>(null)
  const x = ref(0)
  const y = ref(0)
  const visible = ref(false)

  const onMouseMove = (e: MouseEvent) => {
    if (!zoneRef.value) return
    const rect = zoneRef.value.getBoundingClientRect()
    x.value = e.clientX - rect.left
    y.value = e.clientY - rect.top
  }

  const onMouseEnter = () => {
    visible.value = true
  }

  const onMouseLeave = () => {
    visible.value = false
  }

  return { zoneRef, cursorX: x, cursorY: y, cursorVisible: visible, onMouseMove, onMouseEnter, onMouseLeave }
}
