<script setup lang="ts">
import { resume } from '~/data/resume'
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16">
    <SectionHeading id="contact" eyebrow="Contact" title="Let's talk" />
    <p class="text-pretty text-lg leading-relaxed text-[var(--color-fg-muted)]">
      Always happy to chat about interesting engineering problems, side projects, or roles. The fastest way to reach me
      is on of the options below.
    </p>
    <ul class="mt-6 flex flex-wrap gap-3">
      <li v-for="social in resume.socials" :key="social.href">
        <a
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 text-sm text-[var(--color-fg)] transition hover:border-[var(--color-fg-muted)]"
        >
          <Icon :name="social.icon" class="h-4 w-4" />
          {{ social.label }}
        </a>
      </li>
    </ul>
  </section>
</template>
