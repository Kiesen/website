<script setup lang="ts">
import { resume } from '~/data/resume'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Toolkit', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const activeSection = ref<string>('')
const intersecting = new Set<string>()

let observer: IntersectionObserver | null = null
const sectionMap = new WeakMap<Element, string>()

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
        const id = sectionMap.get(entry.target)
        if (!id) continue
        if (entry.isIntersecting) {
          intersecting.add(id)
        } else {
          intersecting.delete(id)
        }
      }
      pickActive()
    },
    { rootMargin: '-10% 0px -60% 0px', threshold: 0 },
  )

  for (const link of links) {
    const id = link.href.slice(1)
    const heading = document.getElementById(id)
    const target = heading?.closest('section') ?? heading
    if (target) {
      sectionMap.set(target, id)
      observer.observe(target)
    }
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
  <header
    class="sticky top-0 z-30 border-b border-[var(--color-border-muted)] bg-[var(--color-bg-glass)] backdrop-blur"
  >
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
