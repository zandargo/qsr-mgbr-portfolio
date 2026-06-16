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
      code: 'PDLM',
      title: t('projects.items.pdlm.title'),
      summary: t('projects.items.pdlm.summary'),
      tags: ['Vue', 'Quasar', 'REST API', 'PLM'],
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
        { label: t('projects.items.pdlm.screenshots.0.label'), type: t('projects.items.pdlm.screenshots.0.type') },
        { label: t('projects.items.pdlm.screenshots.1.label'), type: t('projects.items.pdlm.screenshots.1.type') },
        { label: t('projects.items.pdlm.screenshots.2.label'), type: t('projects.items.pdlm.screenshots.2.type') }
      ],
      thumbnail: 'linear-gradient(140deg, rgba(0, 255, 136, 0.26), rgba(16, 22, 19, 0.92)), radial-gradient(circle at 18% 20%, rgba(125, 255, 202, 0.3), transparent 42%)',
      github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      demo: '#projects'
    },
    {
      code: 'CADTK',
      title: t('projects.items.cadtk.title'),
      summary: t('projects.items.cadtk.summary'),
      tags: ['VBA', 'Python', 'SolidWorks', 'Automation'],
      overview: t('projects.items.cadtk.overview'),
      architecture: [
        t('projects.items.cadtk.architecture.0'),
        t('projects.items.cadtk.architecture.1'),
        t('projects.items.cadtk.architecture.2')
      ],
      challenges: [
        t('projects.items.cadtk.challenges.0'),
        t('projects.items.cadtk.challenges.1'),
        t('projects.items.cadtk.challenges.2')
      ],
      screenshots: [
        { label: t('projects.items.cadtk.screenshots.0.label'), type: t('projects.items.cadtk.screenshots.0.type') },
        { label: t('projects.items.cadtk.screenshots.1.label'), type: t('projects.items.cadtk.screenshots.1.type') },
        { label: t('projects.items.cadtk.screenshots.2.label'), type: t('projects.items.cadtk.screenshots.2.type') }
      ],
      thumbnail: 'linear-gradient(135deg, rgba(16, 21, 18, 0.82), rgba(0, 255, 136, 0.2)), radial-gradient(circle at 80% 20%, rgba(125, 255, 202, 0.34), transparent 45%)',
      github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      demo: '#projects'
    },
    {
      code: 'PORTF',
      title: t('projects.items.portf.title'),
      summary: t('projects.items.portf.summary'),
      tags: ['Anime.js', 'Quasar', 'SCSS', 'PWA'],
      overview: t('projects.items.portf.overview'),
      architecture: [
        t('projects.items.portf.architecture.0'),
        t('projects.items.portf.architecture.1'),
        t('projects.items.portf.architecture.2')
      ],
      challenges: [
        t('projects.items.portf.challenges.0'),
        t('projects.items.portf.challenges.1'),
        t('projects.items.portf.challenges.2')
      ],
      screenshots: [
        { label: t('projects.items.portf.screenshots.0.label'), type: t('projects.items.portf.screenshots.0.type') },
        { label: t('projects.items.portf.screenshots.1.label'), type: t('projects.items.portf.screenshots.1.type') },
        { label: t('projects.items.portf.screenshots.2.label'), type: t('projects.items.portf.screenshots.2.type') }
      ],
      thumbnail: 'linear-gradient(125deg, rgba(125, 255, 202, 0.3), rgba(16, 21, 18, 0.84)), radial-gradient(circle at 50% 80%, rgba(0, 255, 136, 0.24), transparent 50%)',
      github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      demo: '#hero'
    },
    {
      code: 'XLSYS',
      title: t('projects.items.xlsys.title'),
      summary: t('projects.items.xlsys.summary'),
      tags: ['Excel', 'VBA', 'Data Models', 'Workflows'],
      overview: t('projects.items.xlsys.overview'),
      architecture: [
        t('projects.items.xlsys.architecture.0'),
        t('projects.items.xlsys.architecture.1'),
        t('projects.items.xlsys.architecture.2')
      ],
      challenges: [
        t('projects.items.xlsys.challenges.0'),
        t('projects.items.xlsys.challenges.1'),
        t('projects.items.xlsys.challenges.2')
      ],
      screenshots: [
        { label: t('projects.items.xlsys.screenshots.0.label'), type: t('projects.items.xlsys.screenshots.0.type') },
        { label: t('projects.items.xlsys.screenshots.1.label'), type: t('projects.items.xlsys.screenshots.1.type') },
        { label: t('projects.items.xlsys.screenshots.2.label'), type: t('projects.items.xlsys.screenshots.2.type') }
      ],
      thumbnail: 'linear-gradient(155deg, rgba(16, 21, 18, 0.88), rgba(0, 255, 136, 0.16)), radial-gradient(circle at 20% 78%, rgba(125, 255, 202, 0.28), transparent 52%)',
      github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      demo: '#projects'
    }
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

  @media (max-width: 640px) {
    .section-title {
      font-size: clamp(1.6rem, 7vw, 2.1rem);
    }
  }
</style>
