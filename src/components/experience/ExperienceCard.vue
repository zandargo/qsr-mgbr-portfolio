<template>
  <article class="experience-card glass-panel" :class="`experience-card--${side}`" tabindex="0">
    <p class="experience-card__year text-mono">{{ item.year }}</p>
    <h3 class="experience-card__role text-display">{{ item.role }}</h3>
    <p class="experience-card__company">{{ item.company }}</p>
    <p class="experience-card__summary">{{ item.summary }}</p>
  </article>
</template>

<script setup>
  defineProps({
    item: {
      type: Object,
      required: true
    },
    side: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value)
    }
  })
</script>

<style scoped>
  .experience-card {
    padding: var(--space-lg);
    border: 1px solid rgba(125, 255, 202, 0.2);
    opacity: 0;
    transform: translateY(22px);
    transition:
      transform 220ms ease,
      border-color 220ms ease,
      box-shadow 240ms ease;
  }

  .experience-card::before {
    content: '';
    position: absolute;
    top: 1.25rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary);
    box-shadow: 0 0 12px rgba(0, 255, 136, 0.75);
  }

  .experience-card--left::before {
    right: -33px;
  }

  .experience-card--right::before {
    left: -33px;
  }

  .experience-card:hover,
  .experience-card:focus-visible {
    outline: none;
    transform: translateY(-4px);
    border-color: rgba(0, 255, 136, 0.48);
    box-shadow:
      0 0 0 1px rgba(0, 255, 136, 0.14) inset,
      0 0 22px rgba(0, 255, 136, 0.22);
  }

  .experience-card__year {
    margin: 0;
    font-size: 0.74rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--primary-soft);
  }

  .experience-card__role {
    margin: var(--space-xs) 0 0;
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    line-height: 1.08;
  }

  .experience-card__company {
    margin: var(--space-xs) 0 0;
    color: var(--accent);
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .experience-card__summary {
    margin: var(--space-sm) 0 0;
    line-height: 1.6;
    color: var(--text-muted);
  }

  @media (max-width: 940px) {
    .experience-card::before {
      left: -28px;
      right: auto;
    }
  }
</style>
