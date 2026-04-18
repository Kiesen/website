<script setup lang="ts">
import { resume } from '~/data/resume'
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16">
    <SectionHeading id="experience" eyebrow="Experience" title="Where I've worked" />

    <ol class="experience-list relative border-l border-[var(--color-border)]">
      <li v-for="(entry, i) in resume.experience" :key="i" class="experience-item group relative pl-6 pb-10 last:pb-0">
        <span
          class="experience-dot absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-border)] transition group-hover:bg-[var(--color-accent)]"
          aria-hidden="true"
        />
        <p class="font-mono text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
          {{ entry.period }}
          <span v-if="entry.location" class="ml-2 normal-case tracking-normal">· {{ entry.location }}</span>
        </p>
        <h3 class="mt-1 text-lg font-semibold text-[var(--color-fg)]">
          {{ entry.role }}
          <span class="text-[var(--color-fg-muted)]">· {{ entry.company }}</span>
        </h3>
        <p class="mt-2 text-pretty leading-relaxed text-[var(--color-fg-muted)]">
          {{ entry.summary }}
        </p>
        <ul v-if="entry.stack" class="mt-3 flex flex-wrap gap-1.5" aria-label="Stack">
          <li
            v-for="tech in entry.stack"
            :key="tech"
            class="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 font-mono text-xs text-[var(--color-fg-muted)]"
          >
            {{ tech }}
          </li>
        </ul>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.experience-item {
  transition:
    opacity 200ms ease-out,
    transform 200ms ease-out;
}

.experience-item::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-accent);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 200ms ease-out;
}

.experience-item:hover {
  transform: translateX(4px);
}

.experience-item:hover::before {
  transform: scaleY(1) translateX(-4px);
}

.experience-item:hover .experience-dot {
  transform: translateX(-4px);
}

.experience-list:has(.experience-item:hover) .experience-item:not(:hover) {
  opacity: 0.4;
}

@media (prefers-reduced-motion: reduce) {
  .experience-item,
  .experience-item::before {
    transition: none;
  }

  .experience-item:hover {
    transform: none;
  }
}
</style>
