<script setup lang="ts">
import { resume } from '~/data/resume'

type CardState = { x: number; y: number; hover: boolean }
const cardStates = reactive<Record<string, CardState>>(
  Object.fromEntries(resume.projects.map((p) => [p.name, { x: 50, y: 50, hover: false }])),
)

const { registerCard } = useScrollActivatedCards(cardStates)

const onCardMove = (name: string, e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  cardStates[name]!.x = ((e.clientX - rect.left) / rect.width) * 100
  cardStates[name]!.y = ((e.clientY - rect.top) / rect.height) * 100
  cardStates[name]!.hover = true
}

const onCardLeave = (name: string) => {
  cardStates[name]!.hover = false
}

const getFaviconUrl = (project: { href?: string; favicon?: string }) => {
  if (project.favicon) return project.favicon
  if (!project.href) return null
  try {
    const { hostname } = new URL(project.href)
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`
  } catch {
    return null
  }
}

const onFaviconError = (e: Event) => {
  ;(e.target as HTMLImageElement).style.display = 'none'
}
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16">
    <SectionHeading id="projects" eyebrow="Projects" title="Things I've built and worked on" />
    <ul class="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
      <li v-for="project in resume.projects" :key="project.name">
        <component
          :is="project.href ? 'a' : 'div'"
          :ref="(el: Element | ComponentPublicInstance | null) => registerCard(el, project.name)"
          :href="project.href"
          :target="project.href ? '_blank' : undefined"
          :rel="project.href ? 'noopener noreferrer' : undefined"
          class="project-card group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition-colors duration-200 hover:border-[var(--color-fg-muted)]"
          :style="{
            '--mx': cardStates[project.name]?.x + '%',
            '--my': cardStates[project.name]?.y + '%',
          }"
          @mousemove="onCardMove(project.name, $event)"
          @mouseleave="onCardLeave(project.name)"
        >
          <div class="project-spotlight" :class="{ 'project-spotlight--active': cardStates[project.name]?.hover }" />
          <div class="flex items-start justify-between gap-3">
            <h3 class="flex min-w-0 items-center font-semibold text-[var(--color-fg)]">
              <span class="favicon-wrapper" :class="{ 'favicon-wrapper--active': cardStates[project.name]?.hover }">
                <img
                  v-if="getFaviconUrl(project)"
                  :src="getFaviconUrl(project) ?? ''"
                  class="h-4 w-4 rounded-[3px] object-contain"
                  alt=""
                  aria-hidden="true"
                  @error="onFaviconError"
                />
              </span>
              {{ project.name }}
            </h3>
            <Icon
              v-if="project.href"
              name="lucide:arrow-up-right"
              class="h-4 w-4 shrink-0 text-[var(--color-fg-subtle)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
            />
          </div>
          <p class="mt-2 flex-1 text-pretty text-base leading-relaxed text-[var(--color-fg-muted)]">
            {{ project.description }}
          </p>
          <ul v-if="project.tags" class="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
            <li
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-fg-subtle)]"
            >
              {{ tag }}
            </li>
          </ul>
        </component>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.favicon-wrapper {
  display: inline-flex;
  overflow: hidden;
  width: 0;
  flex-shrink: 0;
  transition: width 220ms ease;
}

.favicon-wrapper--active {
  width: 22px; /* 16px icon + 6px gap */
}

.favicon-wrapper img {
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(-10px);
  transition:
    opacity 180ms ease 60ms,
    transform 180ms ease 60ms;
}

.favicon-wrapper--active img {
  opacity: 1;
  transform: translateX(0);
}

.project-spotlight {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 300ms ease;
  background: radial-gradient(
    circle at var(--mx, 50%) var(--my, 50%),
    color-mix(in oklch, var(--color-accent) 14%, transparent) 0%,
    transparent 65%
  );
}

.project-spotlight--active {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .project-spotlight {
    display: none;
  }

  .favicon-wrapper,
  .favicon-wrapper img {
    transition: none;
  }
}
</style>
