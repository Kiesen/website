<script setup lang="ts">
import { ParticleNetwork } from '~/animation/ParticleNetwork'

const canvasEl = ref<HTMLCanvasElement | null>(null)
let network: ParticleNetwork | null = null
let themeObserver: MutationObserver | null = null

const resolveAccent = (): string => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
  if (!raw) return 'rgb(60, 207, 99)'
  // Resolve arbitrary CSS colors (oklch, hsl, ...) to a canvas-safe rgb() string.
  const probe = document.createElement('span')
  probe.style.color = raw
  probe.style.display = 'none'
  document.body.appendChild(probe)
  const resolved = getComputedStyle(probe).color || raw
  probe.remove()
  return resolved
}

onMounted(() => {
  if (!canvasEl.value) return
  network = new ParticleNetwork()
  network.setColor(resolveAccent())
  network.mount(canvasEl.value)

  themeObserver = new MutationObserver(() => {
    network?.setColor(resolveAccent())
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onBeforeUnmount(() => {
  network?.destroy()
  network = null
  themeObserver?.disconnect()
  themeObserver = null
})

defineExpose({
  setCursor(x: number, y: number) {
    network?.setCursor(x, y)
  },
  clearCursor() {
    network?.setCursor(null, null)
  },
})
</script>

<template>
  <canvas
    ref="canvasEl"
    aria-hidden="true"
    class="particle-canvas pointer-events-none absolute inset-0 -z-10 h-full w-full"
  />
</template>

<style scoped>
.particle-canvas {
  mask-image: radial-gradient(ellipse at center, black 45%, transparent 95%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 45%, transparent 95%);
}
</style>
