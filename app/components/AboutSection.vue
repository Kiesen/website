<script setup lang="ts">
import { resume } from '~/data/resume'
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16">
    <SectionHeading id="about" eyebrow="About" title="A few words" />
    <p class="text-pretty text-lg leading-relaxed text-[var(--color-fg-muted)]">
      {{ resume.bio }}
    </p>
    <dl class="mt-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
      <div
        v-if="resume.location"
        class="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3"
      >
        <Icon name="lucide:map-pin" class="h-4 w-4 text-[var(--color-accent)]" />
        <div>
          <dt class="text-xs text-[var(--color-fg-subtle)]">Based in</dt>
          <dd class="text-[var(--color-fg)]">{{ resume.location }}</dd>
        </div>
      </div>
      <div
        class="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3"
      >
        <Icon name="lucide:briefcase" class="h-4 w-4 text-[var(--color-accent)]" />
        <div>
          <dt class="text-xs text-[var(--color-fg-subtle)]">Role</dt>
          <dd class="text-[var(--color-fg)]">{{ resume.title }}</dd>
        </div>
      </div>
    </dl>
  </section>
</template>
