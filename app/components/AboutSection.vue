<script setup lang="ts">
import { resume } from '~/data/resume'
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16">
    <SectionHeading id="about" eyebrow="About" title="A few words" />
    <p class="text-pretty text-lg leading-relaxed text-[var(--color-fg-muted)]">
      {{ resume.bio }}
    </p>
    <dl class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div
        v-if="resume.location"
        class="stat-card group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-5 py-4"
      >
        <span class="stat-bar" aria-hidden="true" />
        <Icon
          name="lucide:map-pin"
          class="pointer-events-none absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 text-[var(--color-fg)] opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]"
          aria-hidden="true"
        />
        <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">Based in</dt>
        <dd class="mt-1 text-lg font-medium text-[var(--color-fg)]">{{ resume.location }}</dd>
      </div>
      <div
        class="stat-card group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-5 py-4"
      >
        <span class="stat-bar" aria-hidden="true" />
        <Icon
          name="lucide:briefcase"
          class="pointer-events-none absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 text-[var(--color-fg)] opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]"
          aria-hidden="true"
        />
        <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">Role</dt>
        <dd class="mt-1 text-lg font-medium text-[var(--color-fg)]">{{ resume.title }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.stat-card {
  transition: border-color 200ms ease;
}

.stat-card:hover {
  border-color: var(--color-fg-subtle);
}

.stat-bar {
  position: absolute;
  left: 0;
  top: 18%;
  bottom: 18%;
  width: 2px;
  border-radius: 0 1px 1px 0;
  background: var(--color-accent);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stat-card:hover .stat-bar {
  transform: scaleY(1);
}

@media (prefers-reduced-motion: reduce) {
  .stat-bar {
    transition: none;
  }
}
</style>
