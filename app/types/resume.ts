export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface ExperienceEntry {
  role: string
  company: string
  period: string
  location?: string
  summary: string
  stack?: string[]
}

export interface Project {
  name: string
  description: string
  href?: string
  favicon?: string
  tags?: string[]
}

export interface SkillItem {
  name: string
  icon?: string
  color?: string
}

export interface SkillGroup {
  label: string
  items: SkillItem[]
}

export interface Resume {
  name: string
  handle: string
  title: string
  tagline: string
  bio: string
  location?: string
  email?: string
  socials: SocialLink[]
  experience: ExperienceEntry[]
  projects: Project[]
  skills: SkillGroup[]
}

export interface Track {
  title: string
  artist: string
  album: string
  albumArt: string
  url: string
  likedAt: string
}
