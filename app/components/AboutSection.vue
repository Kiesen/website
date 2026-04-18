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
  transform-origin: bottom;
  transform: scaleY(0);
}

.stat-card:hover .stat-bar {
  animation: vu-meter 2.4s ease-in-out infinite;
}

.stat-card:nth-child(2):hover .stat-bar {
  animation-duration: 2.1s;
  animation-delay: -0.9s;
}

@keyframes vu-meter {
  0% {
    transform: scaleY(0.22);
  }
  6% {
    transform: scaleY(0.92);
  }
  18% {
    transform: scaleY(0.38);
  }
  25% {
    transform: scaleY(1);
  }
  38% {
    transform: scaleY(0.42);
  }
  47% {
    transform: scaleY(0.78);
  }
  59% {
    transform: scaleY(0.26);
  }
  67% {
    transform: scaleY(0.68);
  }
  79% {
    transform: scaleY(0.38);
  }
  88% {
    transform: scaleY(0.85);
  }
  100% {
    transform: scaleY(0.22);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-bar {
    animation: none;
    transform: scaleY(0.5);
  }
}
</style>
