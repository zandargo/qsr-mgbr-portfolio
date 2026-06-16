<template>
  <div ref="sectionRef" class="section-container experience-section">
    <article class="experience-shell glass-panel glow-border">
      <header ref="headerRef" class="experience-header">
        <p class="section-kicker text-mono">{{ t('experience.kicker') }}</p>
        <h2 id="experience-title" class="text-display">{{ t('experience.title') }}</h2>
        <p class="experience-header__description">
          {{ t('experience.description') }}
        </p>
      </header>

      <div class="experience-timeline" :aria-label="t('experience.timelineAria')">
        <div class="experience-rail" aria-hidden="true">
          <div ref="lineFillRef" class="experience-rail__fill" />
        </div>

        <div class="experience-list">
          <ExperienceCard v-for="(item, index) in experienceItems" :key="`${item.year}-${item.company}`" :ref="(element) => setCardRef(element, index)" :item="item" :side="index % 2 === 0 ? 'left' : 'right'" />
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
  import { animate } from 'animejs'
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useIntersectionReveal } from '../../composables/useIntersectionReveal'
  import ExperienceCard from './ExperienceCard.vue'

  const { t } = useI18n()

  const sectionRef = ref(null)
  const headerRef = ref(null)
  const lineFillRef = ref(null)
  const cardRefs = ref([])

  const experienceItems = computed(() => [
    {
      year: t('experience.items.0.year'),
      company: t('experience.items.0.company'),
      role: t('experience.items.0.role'),
      summary: t('experience.items.0.summary')
    },
    {
      year: t('experience.items.1.year'),
      company: t('experience.items.1.company'),
      role: t('experience.items.1.role'),
      summary: t('experience.items.1.summary')
    },
    {
      year: t('experience.items.2.year'),
      company: t('experience.items.2.company'),
      role: t('experience.items.2.role'),
      summary: t('experience.items.2.summary')
    },
    {
      year: t('experience.items.3.year'),
      company: t('experience.items.3.company'),
      role: t('experience.items.3.role'),
      summary: t('experience.items.3.summary')
    }
  ])

  const lineState = { value: 0 }
  let lineAnimation = null

  const setCardRef = (element, index) => {
    if (!element) {
      return
    }

    cardRefs.value[index] = element.$el ?? element
  }

  const setLineProgress = (progress) => {
    lineAnimation?.pause?.()
    lineAnimation = animate(lineState, {
      value: Math.max(lineState.value, Math.min(1, progress)),
      duration: 380,
      ease: 'outQuad',
      onUpdate: () => {
        if (lineFillRef.value) {
          lineFillRef.value.style.transform = `scaleY(${lineState.value})`
        }
      }
    })
  }

  const playHeaderReveal = () => {
    if (!headerRef.value) {
      return
    }

    animate(headerRef.value, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 620,
      ease: 'outQuad'
    })
  }

  const { observe, disconnect } = useIntersectionReveal({
    threshold: 0.22,
    rootMargin: '0px 0px -8% 0px',
    onReveal: (entry, payload) => {
      if (!payload) {
        return
      }

      animate(entry.target, {
        opacity: [0, 1],
        translateY: [24, 0],
        translateX: [payload.side === 'left' ? -18 : 18, 0],
        duration: 700,
        ease: 'outExpo'
      })

      const progress = (payload.index + 1) / experienceItems.value.length
      setLineProgress(progress)
    }
  })

  onMounted(() => {
    playHeaderReveal()
    cardRefs.value.forEach((card, index) => {
      if (!card) {
        return
      }

      observe(card, {
        index,
        side: index % 2 === 0 ? 'left' : 'right'
      })
    })
  })

  onBeforeUnmount(() => {
    disconnect()
    lineAnimation?.pause?.()
  })
</script>

<style scoped>
  .experience-section {
    padding-top: var(--space-2xl);
  }

  .experience-shell {
    padding: clamp(1.25rem, 2.8vw, 2.4rem);
    display: grid;
    gap: clamp(1.35rem, 2.7vw, 2.1rem);
  }

  .experience-header {
    display: grid;
    gap: var(--space-sm);
    opacity: 0;
  }

  h2 {
    margin: 0;
    font-size: clamp(1.8rem, 3vw, 2.8rem);
    line-height: 1.06;
  }

  .experience-header__description {
    margin: 0;
    max-width: 74ch;
    line-height: 1.68;
    color: var(--text-muted);
  }

  .experience-timeline {
    position: relative;
    padding-inline: clamp(1rem, 2vw, 1.5rem);
  }

  .experience-rail {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: rgba(125, 255, 202, 0.17);
    transform: translateX(-50%);
  }

  .experience-rail__fill {
    position: absolute;
    inset: 0;
    transform-origin: top center;
    transform: scaleY(0);
    background: linear-gradient(to bottom, var(--primary), var(--accent));
    box-shadow: 0 0 18px rgba(0, 255, 136, 0.46);
  }

  .experience-list {
    display: grid;
    gap: var(--space-lg);
  }

  :deep(.experience-card--left) {
    margin-right: calc(50% + 1.45rem);
  }

  :deep(.experience-card--right) {
    margin-left: calc(50% + 1.45rem);
  }

  @media (max-width: 1024px) {
    .experience-timeline {
      padding-inline: 0;
    }

    .experience-rail {
      left: 14px;
      transform: none;
    }

    :deep(.experience-card--left),
    :deep(.experience-card--right) {
      margin-left: 2.15rem;
      margin-right: 0;
    }
  }

  @media (max-width: 640px) {
    h2 {
      font-size: clamp(1.6rem, 7vw, 2.1rem);
    }

    :deep(.experience-card--left),
    :deep(.experience-card--right) {
      margin-left: 1.8rem;
    }
  }
</style>
