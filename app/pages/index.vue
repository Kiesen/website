<script setup lang="ts">
import { resume } from '~/data/resume'

useSeoMeta({
  title: `${resume.name} — ${resume.title}`,
  description: resume.bio,
  ogTitle: `${resume.name} — ${resume.title}`,
  ogDescription: resume.bio,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <HeroSection />
      <div class="mx-auto max-w-3xl px-6" aria-hidden="true">
        <hr class="border-[var(--color-border)]" />
      </div>
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <NowPlayingCard />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
</template>
