<script setup lang="ts">
const isDark = useDark({
  selector: 'html',
  valueDark: 'dark',
  valueLight: '',
  initialValue: 'dark',
})
const toggle = useToggle(isDark)
</script>

<template>
  <button
    type="button"
    class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)] hover:border-[var(--color-fg-muted)]"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="isDark"
    @click="toggle()"
  >
    <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="h-4 w-4" />
  </button>
</template>
