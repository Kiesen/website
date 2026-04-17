<script setup lang="ts">
import { resume } from '~/data/resume'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Toolkit', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const activeSection = ref<string>('')
const intersecting = new Set<string>()

let observer: IntersectionObserver | null = null

const pickActive = () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80
  if (nearBottom) {
    activeSection.value = links[links.length - 1]!.href.slice(1)
    return
  }
  const active = links.find((l) => intersecting.has(l.href.slice(1)))
  activeSection.value = active?.href.slice(1) ?? ''
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          intersecting.add(entry.target.id)
        } else {
          intersecting.delete(entry.target.id)
        }
      }
      pickActive()
    },
    { rootMargin: '-15% 0px -55% 0px', threshold: 0 },
  )

  for (const link of links) {
    const el = document.getElementById(link.href.slice(1))
    if (el) observer.observe(el)
  }

  window.addEventListener('scroll', pickActive, { passive: true })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  window.removeEventListener('scroll', pickActive)
})
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-[var(--color-border)]/60 bg-[var(--color-bg)]/70 backdrop-blur">
    <div class="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
      <a href="#top" class="font-mono text-sm tracking-tight text-[var(--color-fg)]">
        {{ resume.handle }}<span class="text-[var(--color-accent)]">.</span>
      </a>
      <nav aria-label="Primary">
        <ul class="flex items-center gap-1 text-sm">
          <li v-for="link in links" :key="link.href" class="hidden sm:block">
            <a
              :href="link.href"
              class="nav-link relative rounded-full px-3 py-1.5 transition-colors duration-200 hover:text-[var(--color-fg)]"
              :class="activeSection === link.href.slice(1) ? 'text-[var(--color-fg)]' : 'text-[var(--color-fg-muted)]'"
              :aria-current="activeSection === link.href.slice(1) ? 'true' : undefined"
            >
              {{ link.label }}
              <span
                class="nav-underline"
                :class="{ 'nav-underline--active': activeSection === link.href.slice(1) }"
                aria-hidden="true"
              />
            </a>
          </li>
          <li class="ml-1">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  display: inline-flex;
  flex-direction: column;
}

.nav-underline {
  display: block;
  height: 2px;
  border-radius: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: right;
  transition:
    transform 250ms ease-out,
    transform-origin 0ms 250ms;
}

.nav-underline--active {
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 250ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .nav-underline {
    transition: none;
  }
}
</style>
