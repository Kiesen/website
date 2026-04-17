<script setup lang="ts">
import { resume } from '~/data/resume'

const sectionRef = ref<HTMLElement | null>(null)
const canvasRef = ref<InstanceType<typeof HeroCanvas> | null>(null)

const onPointerMove = (event: PointerEvent) => {
  if (!sectionRef.value || !canvasRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  canvasRef.value.setCursor(event.clientX - rect.left, event.clientY - rect.top)
}

const onPointerLeave = () => {
  canvasRef.value?.clearCursor()
}
</script>

<template>
  <section
    id="top"
    ref="sectionRef"
    class="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-20 bg-grain opacity-[0.06]" />

    <HeroCanvas ref="canvasRef" />

    <div class="hero-content relative mx-auto max-w-3xl px-6">
      <h1 class="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--color-fg)] sm:text-6xl">
        {{ resume.name
        }}<span class="hero-dot inline-block align-bottom text-[var(--color-accent)]" aria-hidden="true" />
      </h1>

      <p class="mt-4 max-w-xl text-balance text-lg text-[var(--color-fg-muted)] sm:text-xl">
        {{ resume.title }} — {{ resume.tagline }}
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#contact"
          class="inline-flex h-10 items-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-medium text-[var(--color-accent-fg)] transition hover:brightness-110"
        >
          Get in touch
        </a>
        <a
          href="#projects"
          class="inline-flex h-10 items-center rounded-full border border-[var(--color-border)] px-5 text-sm font-medium text-[var(--color-fg)] transition hover:border-[var(--color-fg-muted)]"
        >
          View projects
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-dot {
  width: 0.18em;
  height: 0.18em;
  border-radius: 50%;
  background: currentColor;
  margin-left: 0.04em;
  margin-bottom: 0.15em;
}

:root:not(.dark) .hero-content::before {
  content: '';
  position: absolute;
  inset: -5rem -12rem;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(ellipse at center, var(--color-bg) 25%, transparent 70%);
}
</style>
