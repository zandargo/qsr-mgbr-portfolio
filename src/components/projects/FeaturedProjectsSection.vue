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
      title: t('projects.items.cdstr.title'),
      summary: t('projects.items.cdstr.summary'),
      tags: ['Vue', 'Quasar', 'Firebase'],
      overview: t('projects.items.cdstr.overview'),
      architecture: [
        t('projects.items.cdstr.architecture.0'),
        t('projects.items.cdstr.architecture.1'),
        t('projects.items.cdstr.architecture.2')
      ],
      challenges: [
        t('projects.items.cdstr.challenges.0'),
        t('projects.items.cdstr.challenges.1'),
        t('projects.items.cdstr.challenges.2')
      ],
      screenshots: [
        { label: t('projects.items.cdstr.screenshots.0.label'), type: t('projects.items.cdstr.screenshots.0.type'), img: 'img/projects/cadastrei/Cadastrei001.jpeg' },
        { label: t('projects.items.cdstr.screenshots.1.label'), type: t('projects.items.cdstr.screenshots.1.type'), img: 'img/projects/cadastrei/Cadastrei002.jpeg' },
        { label: t('projects.items.cdstr.screenshots.2.label'), type: t('projects.items.cdstr.screenshots.2.type'), img: 'img/projects/cadastrei/Cadastrei003.jpeg' }
      ],
      thumbnail: 'img/projects/cadastrei/Banner02.png',
      // github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      demo: 'https://cadastrei.web.app/'
    },
    {
      code: 'VTNLQ',
      title: t('projects.items.vittalinq.title'),
      summary: t('projects.items.vittalinq.summary'),
      tags: ['Vue', 'Quasar', 'Firebase'],
      overview: t('projects.items.vittalinq.overview'),
      architecture: [
        t('projects.items.vittalinq.architecture.0'),
        t('projects.items.vittalinq.architecture.1'),
        t('projects.items.vittalinq.architecture.2')
      ],
      challenges: [
        t('projects.items.vittalinq.challenges.0'),
        t('projects.items.vittalinq.challenges.1'),
        t('projects.items.vittalinq.challenges.2')
      ],
      screenshots: [
        { label: t('projects.items.vittalinq.screenshots.0.label'), type: t('projects.items.vittalinq.screenshots.0.type'), img: 'img/projects/vittalinq/vittalinq000.jpeg' },
        { label: t('projects.items.vittalinq.screenshots.1.label'), type: t('projects.items.vittalinq.screenshots.1.type'), img: 'img/projects/vittalinq/vittalinq001.jpeg' }
      ],
      thumbnail: 'img/projects/vittalinq/Banner01.png',
      // github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      demo: 'https://vittalinq.web.app/'
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
</style>
