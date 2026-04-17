<script setup lang="ts">
defineProps<{ x: number; y: number; visible: boolean }>()
</script>

<template>
  <div
    aria-hidden="true"
    class="cursor-dot"
    :class="{ 'cursor-dot--visible': visible }"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
  />
</template>

<style scoped>
.cursor-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-accent);
  pointer-events: none;
  z-index: 10;
  translate: -50% -50%;
  opacity: 0;
  transition: opacity 150ms ease;
  will-change: transform;
}

.cursor-dot--visible {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .cursor-dot {
    display: none;
  }
}
</style>
