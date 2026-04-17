<script setup lang="ts">
import { resume } from '~/data/resume'

type CardState = { x: number; y: number; hover: boolean }
const cardStates = reactive<Record<string, CardState>>(
  Object.fromEntries(resume.skills.map((g) => [g.label, { x: 50, y: 50, hover: false }])),
)

const onCardMove = (label: string, e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  cardStates[label]!.x = ((e.clientX - rect.left) / rect.width) * 100
  cardStates[label]!.y = ((e.clientY - rect.top) / rect.height) * 100
  cardStates[label]!.hover = true
}

const onCardLeave = (label: string) => {
  cardStates[label]!.hover = false
}
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16">
    <SectionHeading id="skills" eyebrow="Toolkit" title="What I work with" />
    <div class="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div
        v-for="group in resume.skills"
        :key="group.label"
        class="skill-card relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition-colors duration-200 hover:border-[var(--color-fg-subtle)]"
        :style="{
          '--mx': cardStates[group.label]?.x + '%',
          '--my': cardStates[group.label]?.y + '%',
        }"
        @mousemove="onCardMove(group.label, $event)"
        @mouseleave="onCardLeave(group.label)"
      >
        <div class="skill-spotlight" :class="{ 'skill-spotlight--active': cardStates[group.label]?.hover }" />
        <h3 class="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
          {{ group.label }}
        </h3>
        <ul class="flex flex-wrap gap-1.5">
          <li
            v-for="item in group.items"
            :key="item.name"
            class="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-bg)] px-2.5 py-1 text-sm text-[var(--color-fg)]"
          >
            <Icon v-if="item.icon" :name="item.icon" class="h-3.5 w-3.5 shrink-0 text-[var(--color-fg-muted)]" />
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-spotlight {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 300ms ease;
  background: radial-gradient(
    circle at var(--mx, 50%) var(--my, 50%),
    color-mix(in oklch, var(--color-accent) 14%, transparent) 0%,
    transparent 65%
  );
}

.skill-spotlight--active {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .skill-spotlight {
    display: none;
  }
}
</style>
