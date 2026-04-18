<script setup lang="ts">
import { resume } from '~/data/resume'

const siteUrl = 'https://frederikaulich.com'

useSeoMeta({
  title: `${resume.name} — ${resume.title}`,
  description: resume.bio,
  ogTitle: `${resume.name} — ${resume.title}`,
  ogDescription: resume.bio,
  ogType: 'website',
  ogUrl: siteUrl,
  ogLocale: 'en_US',
  ogSiteName: resume.name,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: resume.name,
        url: siteUrl,
        jobTitle: resume.title,
        description: resume.bio,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Düsseldorf',
          addressCountry: 'DE',
        },
        sameAs: ['https://github.com/Kiesen', 'https://www.linkedin.com/in/frederik-aulich-08736a171/'],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <NowPlayingCard />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
</template>
