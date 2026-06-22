<template>
  <article class="review-card glass-panel" tabindex="0" :aria-label="t('reviews.cardAria', { client: review.client, rating: review.rating })">
    <div class="xxreview-card__top row items-center justify-between gap-sm">
      <div class="col-12">
        <h5 class="text-display q-my-none">{{ review.jobTitle }}</h5>
        <p class="review-card__client text-mono q-mt-xs">{{ review.client }}</p>
      </div>

      <div class="col-12 review-card__rating row items-center gap-xs">
        <q-rating :model-value="review.rating" max="5" readonly dense color="green" size="sm" icon="star_border" icon-selected="star" icon-half="star_half" />
        <span class="review-card__score text-mono">{{ review.rating }}/5</span>
      </div>
    </div>

    <p class="review-card__text">{{ review.text }}</p>

    <div v-if="review.skills?.length" class="row q-gutter-sm">
      <q-badge v-for="skill in review.skills" :key="skill" :label="skill" color="text-muted" rounded dense outline class="review-card__skill" />
    </div>
  </article>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    review: {
      type: Object,
      required: true
    }
  })

  const { t } = useI18n()
</script>

<style scoped>
  .review-card {
    padding: clamp(1.15rem, 2.5vw, 1.4rem);
    display: grid;
    gap: var(--space-sm);
    min-height: 220px;
    background: rgba(16, 22, 19, 0.72);
  }

  .review-card__top {
    align-items: flex-start;
  }

  .review-card__client {
    margin: 0;
    font-size: clamp(1.05rem, 1.3vw, 1.2rem);
    line-height: 1.2;
  }

  .review-card__rating {
    white-space: nowrap;
  }

  .review-card__score {
    margin-left: 0.4rem;
    color: var(--text-muted);
  }

  .review-card__text {
    margin: 0;
    color: var(--text-muted);
    line-height: 1.78;
  }

  .review-card__skill {
    padding: 0.28rem 0.55rem;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    border: 1px solid rgba(125, 255, 202, 0.24);
    background: rgba(16, 22, 19, 0.68);
  }

  @media (max-width: 700px) {
    .review-card__top {
      flex-direction: column;
      align-items: flex-start;
    }

    .review-card__score {
      margin-left: 0;
    }
  }
</style>
