<script setup lang="ts">
import { resume } from '~/data/resume'
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="mt-10 border-t border-[var(--color-border-muted)] py-8 text-center font-mono text-xs text-[var(--color-fg-subtle)]"
  >
    © {{ year }} · {{ resume.name }}
  </footer>
</template>
