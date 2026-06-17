<template>
  <div ref="sectionRef" class="section-container reviews-section">
    <article class="reviews-shell glass-panel glow-border">
      <header class="reviews-header section-header">
        <p class="section-kicker text-mono">{{ t('reviews.kicker') }}</p>
        <h5 id="reviews-title" class="text-display section-title">{{ t('reviews.title') }}</h5>
        <p class="section-description">{{ t('reviews.description') }}</p>
      </header>

      <div class="reviews-grid" :aria-label="t('reviews.listAria')">
        <ReviewCard v-for="review in reviews" :key="review.client" :review="review" />
      </div>
    </article>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import ReviewCard from './ReviewCard.vue'

  const { t } = useI18n()
  const sectionRef = ref(null)

  const reviews = computed(() => [
    {
      client: 'Upwork',
      rating: 5,
      text: t('reviews.items.0.text')
    },
    {
      client: 'Engineering Partner',
      rating: 4.5,
      text: t('reviews.items.1.text')
    },
    {
      client: 'Product Lead',
      rating: 4,
      text: t('reviews.items.2.text')
    }
  ])
</script>

<style scoped>
  .reviews-section {
    padding-top: var(--space-2xl);
  }

  .reviews-shell {
    padding: clamp(1.25rem, 2.8vw, 2.4rem);
    display: grid;
    /* gap: clamp(1.2rem, 2.6vw, 2rem); */
  }

  .reviews-header {
    display: grid;
    gap: var(--space-sm);
  }

  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-lg);
  }

  @media (max-width: 980px) {
    .reviews-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
