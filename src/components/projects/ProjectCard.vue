<template>
  <article ref="cardRef" class="project-card glass-panel" tabindex="0" role="button" :aria-label="t('projectCard.cardAria', { title: project.title })" @click="handleCardClick" @keydown.enter.prevent="handleCardClick" @keydown.space.prevent="handleCardClick">
    <div class="project-card__media" :style="mediaStyle">
      <div class="project-card__reflection" aria-hidden="true" />
      <p class="project-card__code text-mono">{{ project.code }}</p>
    </div>

    <div class="project-card__content column justify-between">
      <h3 class="project-card__title text-display">{{ project.title }}</h3>
      <p class="q-mt-md project-card__summary">{{ project.summary }}</p>

      <ul class="project-card__tags q-pa-none q-my-md " :aria-label="t('projectCard.technologiesAria', { title: project.title })">
        <li v-for="tag in project.tags" :key="tag" class="project-card__tag text-mono">{{ tag }}</li>
      </ul>

      <div class="project-card__actions items-end">
        <button type="button" class="project-card__link" @click="emit('open-project', project)">{{ t('projectCard.details') }}</button>
        <!-- <a class="project-card__link" :href="project.github" target="_blank" rel="noreferrer">{{ t('projectCard.github') }}</a> -->
        <a class="project-card__link project-card__link--primary" :href="project.demo" target="_blank" rel="noreferrer">{{ t('projectCard.liveDemo') }}</a>
      </div>
    </div>
  </article>
</template>

<script setup>
  import VanillaTilt from 'vanilla-tilt'
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const emit = defineEmits(['open-project'])

  const props = defineProps({
    project: {
      type: Object,
      required: true
    },
    backgroundPosition: {
      type: String,
      default: 'top'
    }
  })

  const cardRef = ref(null)

  const formatBackgroundValue = (value) => {
    if (!value) {
      return { background: 'none' }
    }

    const trimmedValue = String(value).trim()
    const isCssBackground = /^(?:linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient|url\(|none)\b/i.test(trimmedValue)

    if (isCssBackground) {
      return { background: trimmedValue }
    }

    return {
      backgroundImage: `url(${trimmedValue})`,
      backgroundPosition: props.backgroundPosition,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }
  }

  const mediaStyle = computed(() => formatBackgroundValue(props.project.thumbnail))

  const handleCardClick = (event) => {
    const interactive = event.target.closest('a, button')
    if (interactive) {
      return
    }

    emit('open-project', props.project)
  }

  const shouldEnableTilt = () => {
    if (typeof window === 'undefined') {
      return false
    }

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const isTouchOnly = window.matchMedia?.('(pointer: coarse)').matches

    return !prefersReducedMotion && !isTouchOnly
  }

  onMounted(() => {
    if (!cardRef.value || !shouldEnableTilt()) {
      return
    }

    VanillaTilt.init(cardRef.value, {
      max: 8,
      speed: 420,
      glare: true,
      'max-glare': 0.2,
      scale: 1.02,
      gyroscope: false
    })
  })

  onBeforeUnmount(() => {
    cardRef.value?.vanillaTilt?.destroy?.()
  })
</script>

<style scoped>
  .project-card {
    position: relative;
    display: grid;
    grid-template-rows: 190px 1fr;
    overflow: hidden;
    border: 1px solid rgba(125, 255, 202, 0.2);
    transition:
      transform 240ms ease,
      border-color 240ms ease,
      box-shadow 240ms ease;
    background: linear-gradient(160deg, rgba(16, 21, 18, 0.85), rgba(10, 14, 12, 0.74));
  }

  .project-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 24%, rgba(125, 255, 202, 0.12) 42%, transparent 58%);
    opacity: 0;
    transform: translateX(-35%);
    transition: opacity 260ms ease, transform 380ms ease;
    pointer-events: none;
  }

  .project-card:hover,
  .project-card:focus-visible {
    outline: none;
    transform: translateY(-5px);
    border-color: rgba(0, 255, 136, 0.45);
    box-shadow:
      0 0 0 1px rgba(0, 255, 136, 0.12) inset,
      0 0 26px rgba(0, 255, 136, 0.2);
  }

  .project-card:hover::after,
  .project-card:focus-visible::after {
    opacity: 1;
    transform: translateX(15%);
  }

  .project-card__media {
    position: relative;
    display: grid;
    align-items: end;
    padding: var(--space-md);
    border-bottom: 1px solid rgba(125, 255, 202, 0.2);
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }

  .project-card__reflection {
    position: absolute;
    inset: -20% auto auto -30%;
    width: 56%;
    height: 180%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent);
    transform: rotate(18deg) translateX(-25%);
    opacity: 0;
    transition: transform 420ms ease, opacity 260ms ease;
  }

  .project-card:hover .project-card__reflection,
  .project-card:focus-visible .project-card__reflection {
    opacity: 1;
    transform: rotate(18deg) translateX(110%);
  }

  .project-card__code {
    margin: 0;
    padding: 0.35rem 0.55rem;
    width: fit-content;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text);
    border-radius: 999px;
    border: 1px solid rgba(125, 255, 202, 0.28);
    background: rgba(7, 11, 8, 0.55);
  }

  .project-card__content {
    padding: var(--space-md);
    /* display: grid; */
    /* gap: var(--space-sm); */
  }

  .project-card__title {
    margin: 0;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    line-height: 1.1;
  }

  .project-card__summary {
    /* margin: 0; */
    color: var(--text-muted);
    line-height: 1.55;
  }

  .project-card__tags {
    list-style: none;
    /* margin: 0; */
    /* padding: 0; */
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .project-card__tag {
    padding: 0.32rem 0.55rem;
    font-size: 0.67rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--primary-soft);
    border: 1px solid rgba(125, 255, 202, 0.24);
    border-radius: 999px;
    background: rgba(16, 22, 19, 0.68);
  }

  .project-card__actions {
    display: flex;
    gap: 0.55rem;
    padding-top: 0.1rem;
  }

  .project-card__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.48rem 0.75rem;
    border-radius: 999px;
    border: 1px solid rgba(125, 255, 202, 0.24);
    background: rgba(12, 18, 14, 0.62);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--text);
    cursor: pointer;
    transition: border-color 180ms ease, box-shadow 180ms ease;
  }

  .project-card__link:hover,
  .project-card__link:focus-visible {
    outline: none;
    border-color: rgba(0, 255, 136, 0.48);
    box-shadow: 0 0 0 1px rgba(0, 255, 136, 0.12) inset;
  }

  .project-card__link--primary {
    border-color: rgba(0, 255, 136, 0.42);
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.18), rgba(125, 255, 202, 0.12));
  }
</style>
