<template>
  <div class="section-container biography-section">
    <div class="biography-shell">
      <!-- *// -------------------- PROFILE PICTURE ------------------- //* -->
      <article class="profile-panel glass-panel glow-border column justify-between">
        <header class="profile-panel__header section-header">
          <p class="section-kicker text-mono">{{ t('biography.kicker') }}</p>
          <h5 id="biography-title" class="text-display section-title q-ma-none">{{ t('biography.title') }}</h5>
        </header>

        <div class="profile-media">
          <div class="profile-media__frame" aria-hidden="true">
            <q-img src="/img/profile/Profile002.png" spinner-color="primary" spinner-size="82px" height="100%" fit="cover" position="50% 25%" style="opacity: 0.01;" />
          </div>
          <p class="profile-media__caption text-mono">{{ t('biography.caption') }}</p>
        </div>

        <div class="">
          <p class="section-description text-justify">
            {{ t('biography.description') }}
          </p>
        </div>
      </article>

      <!-- *// ----------------------- TIMELINE ----------------------- //* -->
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
    padding: clamp(1.25rem, 2vw, 2rem);
    /* height: fit-content; */
    height: calc(100vh - 128px);
    position: sticky;
    top: 114px;
  }

  .profile-media {
    display: grid;
    gap: var(--space-sm);
    height: 50vh;
    /* min-height: 420px; */
    /* align-content: start; */
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
    /* height: 100%; */
    /* position: relative; */
  }

  .profile-media__frame::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, transparent 0%, rgba(125, 255, 202, 0.12) 36%, transparent 100%),
      repeating-linear-gradient(0deg, rgba(125, 255, 202, 0.06) 0 1px, transparent 1px 12px);
  }

  .profile-media__caption {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
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

  @media (max-width: 1024px) {
    .biography-shell {
      grid-template-columns: 1fr;
    }

    .profile-panel {
      position: static;
      height: auto;
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
