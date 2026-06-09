<template>
  <div class="section-container biography-section">
    <div class="biography-shell">
      <article class="profile-panel glass-panel glow-border">
        <header class="profile-panel__header">
          <p class="section-kicker text-mono">{{ t('biography.kicker') }}</p>
          <h2 id="biography-title" class="text-display">{{ t('biography.title') }}</h2>
        </header>

        <div class="profile-media">
          <div class="profile-media__frame" aria-hidden="true">
            <!-- <span class="profile-media__initials text-display">MG</span> -->
            <q-img src="/img/profile/Profile002.png" spinner-color="primary" spinner-size="82px" height="520px" fit="cover" position="50% 100%" />
          </div>
          <p class="profile-media__caption text-mono">{{ t('biography.caption') }}</p>
        </div>

        <p class="profile-panel__description">
          {{ t('biography.description') }}
        </p>
      </article>

      <div ref="timelineRef" class="timeline-panel" :aria-label="t('biography.timelineAria')">
        <div class="timeline-rail" aria-hidden="true">
          <div ref="timelineFillRef" class="timeline-rail__fill" />
        </div>

        <div class="timeline-list">
          <TimelineCard v-for="(item, index) in timelineItems" :key="item.year" :ref="(element) => setCardRef(element, index)" :item="item" :side="index % 2 === 0 ? 'left' : 'right'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { animate } from 'animejs'
  import { computed } from 'vue'
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useIntersectionReveal } from '../../composables/useIntersectionReveal'
  import TimelineCard from './TimelineCard.vue'

  const { t } = useI18n()

  const timelineItems = computed(() => [
    {
      year: t('biography.timeline.0.year'),
      role: t('biography.timeline.0.role'),
      company: t('biography.timeline.0.company'),
      summary: t('biography.timeline.0.summary')
    },
    {
      year: t('biography.timeline.1.year'),
      role: t('biography.timeline.1.role'),
      company: t('biography.timeline.1.company'),
      summary: t('biography.timeline.1.summary')
    },
    {
      year: t('biography.timeline.2.year'),
      role: t('biography.timeline.2.role'),
      company: t('biography.timeline.2.company'),
      summary: t('biography.timeline.2.summary')
    },
    {
      year: t('biography.timeline.3.year'),
      role: t('biography.timeline.3.role'),
      company: t('biography.timeline.3.company'),
      summary: t('biography.timeline.3.summary')
    },
    {
      year: t('biography.timeline.4.year'),
      role: t('biography.timeline.4.role'),
      company: t('biography.timeline.4.company'),
      summary: t('biography.timeline.4.summary')
    },
    {
      year: t('biography.timeline.5.year'),
      role: t('biography.timeline.5.role'),
      company: t('biography.timeline.5.company'),
      summary: t('biography.timeline.5.summary')
    },
    {
      year: t('biography.timeline.6.year'),
      role: t('biography.timeline.6.role'),
      company: t('biography.timeline.6.company'),
      summary: t('biography.timeline.6.summary')
    },
    {
      year: t('biography.timeline.7.year'),
      role: t('biography.timeline.7.role'),
      company: t('biography.timeline.7.company'),
      summary: t('biography.timeline.7.summary')
    }
  ])

  const timelineRef = ref(null)
  const timelineFillRef = ref(null)
  const cardRefs = ref([])

  const fillState = { value: 0 }
  let fillAnimation = null
  let rafId = null

  const setCardRef = (element, index) => {
    if (!element) {
      return
    }

    cardRefs.value[index] = element.$el ?? element
  }

  const updateLineFill = () => {
    if (!timelineRef.value) {
      return
    }

    const rect = timelineRef.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const start = viewportHeight * 0.78
    const end = rect.height + viewportHeight * 0.42
    const rawProgress = (start - rect.top) / end
    const clamped = Math.min(1, Math.max(0, rawProgress))
    const targetValue = Math.max(fillState.value, clamped)

    if (Math.abs(targetValue - fillState.value) < 0.01) {
      return
    }

    fillAnimation?.pause?.()
    fillAnimation = animate(fillState, {
      value: targetValue,
      duration: 280,
      ease: 'outQuad',
      onUpdate: () => {
        if (timelineFillRef.value) {
          timelineFillRef.value.style.transform = `scaleY(${fillState.value})`
        }
      }
    })
  }

  const queueLineFillUpdate = () => {
    if (rafId !== null) {
      return
    }

    rafId = window.requestAnimationFrame(() => {
      rafId = null
      updateLineFill()
    })
  }

  const { observe, disconnect } = useIntersectionReveal({
    threshold: 0.22,
    rootMargin: '0px 0px -8% 0px',
    onReveal: (entry, payload) => {
      if (!payload?.side) {
        return
      }

      animate(entry.target, {
        opacity: [0, 1],
        translateX: [payload.side === 'left' ? -28 : 28, 0],
        translateY: [30, 0],
        duration: 760,
        delay: payload.index * 70,
        ease: 'outExpo'
      })
      queueLineFillUpdate()
    }
  })

  onMounted(() => {
    cardRefs.value.forEach((card, index) => {
      if (!card) {
        return
      }

      const side = index % 2 === 0 ? 'left' : 'right'
      observe(card, { side, index })
    })

    queueLineFillUpdate()
    window.addEventListener('scroll', queueLineFillUpdate, { passive: true })
    window.addEventListener('resize', queueLineFillUpdate)
  })

  onBeforeUnmount(() => {
    disconnect()
    fillAnimation?.pause?.()

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }

    window.removeEventListener('scroll', queueLineFillUpdate)
    window.removeEventListener('resize', queueLineFillUpdate)
  })
</script>

<style scoped>
  .biography-shell {
    display: grid;
    grid-template-columns: minmax(290px, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(1.5rem, 4vw, 3rem);
  }

  .profile-panel {
    display: grid;
    align-content: start;
    gap: var(--space-lg);
    padding: clamp(1.25rem, 2vw, 2rem);
    height: fit-content;
    position: sticky;
    top: 114px;
  }

  .section-kicker {
    margin: 0;
    color: var(--primary-soft);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 0.72rem;
  }

  h2 {
    margin: var(--space-xs) 0 0;
    font-size: clamp(1.9rem, 3vw, 2.8rem);
    line-height: 1.05;
  }

  .profile-media {
    display: grid;
    gap: var(--space-sm);
  }

  .profile-media__frame {
    /* display: grid; */
    /* place-items: center; */
    /* aspect-ratio: 4 / 3; */
    border-radius: var(--radius-md);
    border: 1px solid rgba(125, 255, 202, 0.22);
    background:
      radial-gradient(circle at 25% 25%, rgba(0, 255, 136, 0.3), transparent 58%),
      linear-gradient(140deg, rgba(12, 18, 14, 0.94), rgba(10, 14, 12, 0.74));
    overflow: hidden;
  }

  .profile-media__frame::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, transparent 0%, rgba(125, 255, 202, 0.12) 36%, transparent 100%),
      repeating-linear-gradient(0deg, rgba(125, 255, 202, 0.06) 0 1px, transparent 1px 12px);
  }

  .profile-media__initials {
    position: relative;
    font-size: clamp(2.5rem, 5vw, 4rem);
    letter-spacing: 0.08em;
    color: rgba(228, 255, 241, 0.92);
    text-shadow: 0 0 18px rgba(0, 255, 136, 0.28);
  }

  .profile-media__caption {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .profile-panel__description {
    margin: 0;
    color: var(--text-muted);
    line-height: 1.7;
  }

  .timeline-panel {
    position: relative;
    padding-inline: clamp(1rem, 2vw, 1.75rem);
  }

  .timeline-rail {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: rgba(125, 255, 202, 0.16);
    transform: translateX(-50%);
  }

  .timeline-rail__fill {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, var(--primary), var(--accent));
    box-shadow: 0 0 18px rgba(0, 255, 136, 0.45);
    transform-origin: top center;
    transform: scaleY(0);
  }

  .timeline-list {
    display: grid;
    gap: var(--space-lg);
  }

  :deep(.timeline-card--left) {
    margin-right: calc(50% + 1.5rem);
  }

  :deep(.timeline-card--right) {
    margin-left: calc(50% + 1.5rem);
  }

  @media (max-width: 1200px) {
    h2 {
      font-size: clamp(1.7rem, 2.5vw, 2.35rem);
    }
  }

  @media (max-width: 1024px) {
    .biography-shell {
      grid-template-columns: 1fr;
    }

    .profile-panel {
      position: static;
    }

    .timeline-panel {
      padding-inline: 0;
    }

    .timeline-rail {
      left: 16px;
      transform: none;
    }

    :deep(.timeline-card--left),
    :deep(.timeline-card--right) {
      margin-left: 2.2rem;
      margin-right: 0;
    }
  }

  @media (max-width: 640px) {
    .biography-section {
      padding-top: var(--space-2xl);
    }

    :deep(.timeline-card--left),
    :deep(.timeline-card--right) {
      margin-left: 1.8rem;
    }
  }
</style>
