import type { Resume } from '~/types/resume'

export const resume: Resume = {
  name: 'Frederik Aulich',
  handle: 'freddy',
  title: 'Fullstack Software Engineer',
  tagline: 'Crafting fast, privacy-first products — from APIs to AI-powered interfaces.',
  bio: "I'm Freddy — a fullstack software engineer building software products end-to-end. I care deeply about performance, clean architecture, and thoughtful UX. Lately I spend a lot of time integrating AI into real-world products — with a strong focus on privacy-first, GDPR-compliant setups using locally-running models that keep sensitive data off third-party servers.",
  location: 'Düsseldorf, Germany',
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/Kiesen',
      icon: 'simple-icons:github',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/frederik-aulich-08736a171/',
      icon: 'simple-icons:linkedin',
    },
    {
      label: 'Email',
      href: 'mailto:inquiry@frederikaulich.com',
      icon: 'lucide:mail',
    },
  ],
  experience: [
    {
      role: 'Senior Software Developer',
      company: 'MIRA GmbH',
      period: 'Nov 2024 — Present',
      location: 'Düsseldorf · On-site',
      summary:
        "Building mission-critical software for teleoperated vehicle operations and owning the company's web presence.",
      stack: ['Vue.js', 'TypeScript', 'Microsoft Azure'],
    },
    {
      role: 'Senior Frontend Developer',
      company: 'trivago',
      period: 'Nov 2023 — Oct 2024',
      location: 'Düsseldorf · Hybrid',
      summary:
        "Focused on website optimization with a strong emphasis on SEO and SEM performance for trivago's global platform.",
      stack: ['TypeScript', 'Software Design'],
    },
    {
      role: 'Fullstack JavaScript Developer',
      company: 'trivago',
      period: 'Mar 2020 — Nov 2023',
      location: 'Düsseldorf · Hybrid',
      summary:
        "Developed and maintained internal backend tooling supporting trivago's operations and engineering teams.",
      stack: ['TypeScript', 'Node.js', 'Software Design'],
    },
    {
      role: 'Web Developer',
      company: 'Rheinschafe GmbH',
      period: 'Dec 2018 — Feb 2020',
      location: 'Duisburg · On-site',
      summary: 'Built and deployed landing pages and websites alongside the design team for regional businesses.',
      stack: ['TypeScript', 'Laravel'],
    },
    {
      role: 'Web Developer',
      company: 'MÖBELFIRST.COM',
      period: 'Jun 2016 — Nov 2018',
      location: 'Cologne/Bonn · Hybrid',
      summary:
        'Led the complete setup of the Shopware e-commerce shop — from design and implementation through go-live and ongoing operations.',
      stack: ['TypeScript', 'Python', 'Shopware'],
    },
    {
      role: 'Specialist',
      company: 'Apple',
      period: 'Sep 2014 — Jan 2015',
      location: 'Düsseldorf · On-site',
      summary:
        'Delivered personalized customer consultations and product demonstrations to help visitors find the right Apple products.',
    },
  ],
  projects: [
    {
      name: 'Personal Website',
      description:
        'The site you are looking at — Nuxt 4, Vue 3, Tailwind v4. Minimal, dark-first, deployed on a home-baked Docker setup.',
      href: 'https://github.com/Kiesen/website',
      tags: ['Nuxt', 'Vue', 'TypeScript'],
    },
    {
      name: 'trivago',
      description:
        'Replace with a real side project: what it does, why it exists, and one interesting technical detail.',
      tags: ['SEO', 'NextJS', 'Data'],
    },
  ],
  skills: [
    {
      label: 'Languages',
      items: [
        { name: 'TypeScript', icon: 'simple-icons:typescript' },
        { name: 'Python', icon: 'simple-icons:python' },
        { name: 'Go', icon: 'simple-icons:go' },
        { name: 'Rust', icon: 'simple-icons:rust' },
        { name: 'SQL', icon: 'lucide:database' },
        { name: 'Elixir', icon: 'simple-icons:elixir' },
      ],
    },
    {
      label: 'Frontend',
      items: [
        { name: 'Vue', icon: 'simple-icons:vuedotjs' },
        { name: 'React', icon: 'simple-icons:react' },
        { name: 'Nuxt', icon: 'simple-icons:nuxtdotjs' },
        { name: 'Vanilla CSS', icon: 'lucide:paintbrush' },
        { name: 'SEO', icon: 'lucide:search' },
        { name: 'Accessibility', icon: 'lucide:accessibility' },
        { name: 'Web Performance', icon: 'lucide:gauge' },
        { name: 'Figma', icon: 'simple-icons:figma' },
      ],
    },
    {
      label: 'Backend',
      items: [
        { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
        { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
        { name: 'GraphQL', icon: 'simple-icons:graphql' },
        { name: 'REST', icon: 'lucide:cable' },
        { name: 'Redis', icon: 'simple-icons:redis' },
        { name: 'Architecture', icon: 'lucide:layers' },
      ],
    },
    {
      label: 'Platform',
      items: [
        { name: 'Docker', icon: 'simple-icons:docker' },
        { name: 'Kubernetes', icon: 'simple-icons:kubernetes' },
        { name: 'Git', icon: 'simple-icons:git' },
        { name: 'CI/CD', icon: 'lucide:git-merge' },
        { name: 'Google Cloud', icon: 'simple-icons:googlecloud' },
        { name: 'Azure', icon: 'simple-icons:microsoftazure' },
        { name: 'DigitalOcean', icon: 'simple-icons:digitalocean' },
      ],
    },
    {
      label: 'AI & LLMs',
      items: [
        { name: 'OpenAI', icon: 'simple-icons:openai' },
        { name: 'Anthropic', icon: 'simple-icons:anthropic' },
        { name: 'Hugging Face', icon: 'simple-icons:huggingface' },
        { name: 'LangChain', icon: 'lucide:link' },
        { name: 'MCP', icon: 'lucide:bot' },
        { name: 'RAG', icon: 'lucide:sparkles' },
      ],
    },
  ],
}
