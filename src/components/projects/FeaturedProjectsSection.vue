<template>
  <div class="section-container featured-projects-section">
    <article class="projects-shell glass-panel glow-border">
      <header class="projects-header section-header">
        <p class="section-kicker text-mono">{{ t('projects.kicker') }}</p>
        <h2 id="projects-title" class="text-display section-title">{{ t('projects.title') }}</h2>
        <p class="section-description">
          {{ t('projects.description') }}
        </p>
      </header>

      <div class="projects-grid">
        <ProjectCard v-for="project in projects" :key="project.code" :project="project" @open-project="openProjectModal" />
      </div>
    </article>

    <ProjectModal v-model="isProjectModalOpen" :project="selectedProject" @closed="selectedProject = null" />
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import ProjectCard from './ProjectCard.vue'
  import ProjectModal from './ProjectModal.vue'

  const { t } = useI18n()

  const isProjectModalOpen = ref(false)
  const selectedProject = ref(null)

  const openProjectModal = (project) => {
    selectedProject.value = project
    isProjectModalOpen.value = true
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('circuit:pulse-burst'))
    }
  }

  const projects = computed(() => [
    {
      code: 'FLWRX',
      title: t('projects.items.flwrx.title'),
      summary: t('projects.items.flwrx.summary'),
      tags: ['Vue', 'Quasar', 'Firebase', 'SVG'],
      overview: t('projects.items.flwrx.overview'),
      architecture: [
        t('projects.items.flwrx.architecture.0'),
        t('projects.items.flwrx.architecture.1'),
        t('projects.items.flwrx.architecture.2')
      ],
      challenges: [
        t('projects.items.flwrx.challenges.0'),
        t('projects.items.flwrx.challenges.1'),
        t('projects.items.flwrx.challenges.2')
      ],
      screenshots: [
        { label: t('projects.items.flwrx.screenshots.0.label'), type: t('projects.items.flwrx.screenshots.0.type'), img: 'img/projects/floworks/Floworks-wip-002.jpeg' },
        { label: t('projects.items.flwrx.screenshots.1.label'), type: t('projects.items.flwrx.screenshots.1.type'), img: 'img/projects/floworks/Floworks-wip-003.png' },
        { label: t('projects.items.flwrx.screenshots.2.label'), type: t('projects.items.flwrx.screenshots.2.type'), img: 'img/projects/floworks/Floworks-wip-004.jpeg' }
      ],
      thumbnail: 'img/projects/floworks/Banner01.png',
      // github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      demo: 'https://floworks.web.app/'
    },
    {
      code: 'CDSTR',
      title: t('projects.items.pdlm.title'),
      summary: t('projects.items.pdlm.summary'),
      tags: ['Vue', 'Quasar', 'Firebase'],
      overview: t('projects.items.pdlm.overview'),
      architecture: [
        t('projects.items.pdlm.architecture.0'),
        t('projects.items.pdlm.architecture.1'),
        t('projects.items.pdlm.architecture.2')
      ],
      challenges: [
        t('projects.items.pdlm.challenges.0'),
        t('projects.items.pdlm.challenges.1'),
        t('projects.items.pdlm.challenges.2')
      ],
      screenshots: [
        { label: t('projects.items.pdlm.screenshots.0.label'), type: t('projects.items.pdlm.screenshots.0.type'), img: 'img/projects/cadastrei/Cadastrei001.jpeg' },
        { label: t('projects.items.pdlm.screenshots.1.label'), type: t('projects.items.pdlm.screenshots.1.type'), img: 'img/projects/cadastrei/Cadastrei002.jpeg' },
        { label: t('projects.items.pdlm.screenshots.2.label'), type: t('projects.items.pdlm.screenshots.2.type'), img: 'img/projects/cadastrei/Cadastrei003.jpeg' }
      ],
      thumbnail: 'img/projects/cadastrei/Banner02.png',
      // github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      demo: 'https://cadastrei.web.app/'
    },
    // {
    //   code: 'CADTK',
    //   title: t('projects.items.cadtk.title'),
    //   summary: t('projects.items.cadtk.summary'),
    //   tags: ['VBA', 'Python', 'SolidWorks', 'Automation'],
    //   overview: t('projects.items.cadtk.overview'),
    //   architecture: [
    //     t('projects.items.cadtk.architecture.0'),
    //     t('projects.items.cadtk.architecture.1'),
    //     t('projects.items.cadtk.architecture.2')
    //   ],
    //   challenges: [
    //     t('projects.items.cadtk.challenges.0'),
    //     t('projects.items.cadtk.challenges.1'),
    //     t('projects.items.cadtk.challenges.2')
    //   ],
    //   screenshots: [
    //     { label: t('projects.items.cadtk.screenshots.0.label'), type: t('projects.items.cadtk.screenshots.0.type'), img: 'linear-gradient(135deg, rgba(16, 21, 18, 0.82), rgba(0, 255, 136, 0.2)), radial-gradient(circle at 80% 20%, rgba(125, 255, 202, 0.34), transparent 45%)' },
    //     { label: t('projects.items.cadtk.screenshots.1.label'), type: t('projects.items.cadtk.screenshots.1.type'), img: 'linear-gradient(135deg, rgba(16, 21, 18, 0.82), rgba(0, 255, 136, 0.2)), radial-gradient(circle at 80% 20%, rgba(125, 255, 202, 0.34), transparent 45%)' },
    //     { label: t('projects.items.cadtk.screenshots.2.label'), type: t('projects.items.cadtk.screenshots.2.type'), img: 'linear-gradient(135deg, rgba(16, 21, 18, 0.82), rgba(0, 255, 136, 0.2)), radial-gradient(circle at 80% 20%, rgba(125, 255, 202, 0.34), transparent 45%)' }
    //   ],
    //   thumbnail: 'linear-gradient(135deg, rgba(16, 21, 18, 0.82), rgba(0, 255, 136, 0.2)), radial-gradient(circle at 80% 20%, rgba(125, 255, 202, 0.34), transparent 45%)',
    //   github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
    //   demo: '#projects'
    // },
    // {
    //   code: 'PORTF',
    //   title: t('projects.items.portf.title'),
    //   summary: t('projects.items.portf.summary'),
    //   tags: ['Anime.js', 'Quasar', 'SCSS', 'PWA'],
    //   overview: t('projects.items.portf.overview'),
    //   architecture: [
    //     t('projects.items.portf.architecture.0'),
    //     t('projects.items.portf.architecture.1'),
    //     t('projects.items.portf.architecture.2')
    //   ],
    //   challenges: [
    //     t('projects.items.portf.challenges.0'),
    //     t('projects.items.portf.challenges.1'),
    //     t('projects.items.portf.challenges.2')
    //   ],
    //   screenshots: [
    //     { label: t('projects.items.portf.screenshots.0.label'), type: t('projects.items.portf.screenshots.0.type'), img: 'linear-gradient(125deg, rgba(125, 255, 202, 0.3), rgba(16, 21, 18, 0.84)), radial-gradient(circle at 50% 80%, rgba(0, 255, 136, 0.24), transparent 50%)' },
    //     { label: t('projects.items.portf.screenshots.1.label'), type: t('projects.items.portf.screenshots.1.type'), img: 'linear-gradient(125deg, rgba(125, 255, 202, 0.3), rgba(16, 21, 18, 0.84)), radial-gradient(circle at 50% 80%, rgba(0, 255, 136, 0.24), transparent 50%)' },
    //     { label: t('projects.items.portf.screenshots.2.label'), type: t('projects.items.portf.screenshots.2.type'), img: 'linear-gradient(125deg, rgba(125, 255, 202, 0.3), rgba(16, 21, 18, 0.84)), radial-gradient(circle at 50% 80%, rgba(0, 255, 136, 0.24), transparent 50%)' }
    //   ],
    //   thumbnail: 'linear-gradient(125deg, rgba(125, 255, 202, 0.3), rgba(16, 21, 18, 0.84)), radial-gradient(circle at 50% 80%, rgba(0, 255, 136, 0.24), transparent 50%)',
    //   github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
    //   demo: '#hero'
    // },
    // {
    //   code: 'XLSYS',
    //   title: t('projects.items.xlsys.title'),
    //   summary: t('projects.items.xlsys.summary'),
    //   tags: ['Excel', 'VBA', 'Data Models', 'Workflows'],
    //   overview: t('projects.items.xlsys.overview'),
    //   architecture: [
    //     t('projects.items.xlsys.architecture.0'),
    //     t('projects.items.xlsys.architecture.1'),
    //     t('projects.items.xlsys.architecture.2')
    //   ],
    //   challenges: [
    //     t('projects.items.xlsys.challenges.0'),
    //     t('projects.items.xlsys.challenges.1'),
    //     t('projects.items.xlsys.challenges.2')
    //   ],
    //   screenshots: [
    //     { label: t('projects.items.xlsys.screenshots.0.label'), type: t('projects.items.xlsys.screenshots.0.type'), img: 'linear-gradient(155deg, rgba(16, 21, 18, 0.88), rgba(0, 255, 136, 0.16)), radial-gradient(circle at 20% 78%, rgba(125, 255, 202, 0.28), transparent 52%)' },
    //     { label: t('projects.items.xlsys.screenshots.1.label'), type: t('projects.items.xlsys.screenshots.1.type'), img: 'linear-gradient(155deg, rgba(16, 21, 18, 0.88), rgba(0, 255, 136, 0.16)), radial-gradient(circle at 20% 78%, rgba(125, 255, 202, 0.28), transparent 52%)' },
    //     { label: t('projects.items.xlsys.screenshots.2.label'), type: t('projects.items.xlsys.screenshots.2.type'), img: 'linear-gradient(155deg, rgba(16, 21, 18, 0.88), rgba(0, 255, 136, 0.16)), radial-gradient(circle at 20% 78%, rgba(125, 255, 202, 0.28), transparent 52%)' }
    //   ],
    //   thumbnail: 'linear-gradient(155deg, rgba(16, 21, 18, 0.88), rgba(0, 255, 136, 0.16)), radial-gradient(circle at 20% 78%, rgba(125, 255, 202, 0.28), transparent 52%)',
    //   github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
    //   demo: '#projects'
    // }
  ])
</script>

<style scoped>
  .featured-projects-section {
    padding-top: var(--space-2xl);
  }

  .projects-shell {
    padding: clamp(1.25rem, 2.8vw, 2.4rem);
    display: grid;
    gap: clamp(1.2rem, 2.6vw, 2rem);
  }

  .projects-header {
    display: grid;
    gap: var(--space-sm);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-lg);
  }

  @media (max-width: 980px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
