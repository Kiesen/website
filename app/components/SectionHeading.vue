<script setup lang="ts">
interface Props {
  id: string
  eyebrow: string
  title: string
}

defineProps<Props>()
</script>

<template>
  <div :id="id" class="mb-8 scroll-mt-20">
    <p class="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
      {{ eyebrow }}
    </p>
    <h2 class="text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
      {{ title }}
    </h2>
  </div>
</template>
