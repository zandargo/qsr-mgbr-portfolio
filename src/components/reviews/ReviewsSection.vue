<template>
  <div ref="sectionRef" class="section-container reviews-section">
    <article class="reviews-shell glass-panel glow-border">
      <header class="reviews-header section-header">
        <p class="section-kicker text-mono">{{ t('reviews.kicker') }}</p>
        <h5 id="reviews-title" class="text-display section-title">{{ t('reviews.title') }}</h5>
        <p class="section-description">{{ t('reviews.description') }}</p>
      </header>

      <div class="reviews-masonry q-pt-md" :aria-label="t('reviews.listAria')">
        <ReviewCard v-for="review in reviews" :key="review.id || review.jobTitle" :review="review" />
      </div>
    </article>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import ReviewCard from './ReviewCard.vue'

  const { t } = useI18n()
  const sectionRef = ref(null)
  const reviews = ref([])

  onMounted(async () => {
    try {
      const response = await fetch('/txt/merged_export_2026-06-22.json')
      if (!response.ok) {
        throw new Error(`Unable to load reviews: ${response.status}`)
      }

      const data = await response.json()
      reviews.value = data
        .filter((item) => {
          const clientName = item['Client Name']?.trim()
          const feedbackComment = item['Client Feedback Comment']?.trim()
          const unavailableText = 'not available'
          return (
            feedbackComment &&
            feedbackComment.toLowerCase() !== unavailableText &&
            clientName &&
            clientName.toLowerCase() !== unavailableText
          )
        })
        .map((item) => ({
          id: item.id || `${item['Job Title']}-${item['Client Name']}`,
          jobTitle: item['Job Title'] || t('reviews.unknownTitle'),
          client: item['Client Name'] || t('reviews.unknownClient'),
          rating: Number(item['Client Feedback Score']) || 0,
          text: item['Client Feedback Comment'].trim(),
          skills: item.Skills && item.Skills.toLowerCase() !== 'not available' ? item.Skills.split(' || ').map((skill) => skill.trim()).filter(Boolean) : []
        }))
    } catch (error) {
      // Fallback if the JSON cannot be loaded.
      reviews.value = []
      // eslint-disable-next-line no-console
      console.error(error)
    }
  })
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

  .reviews-masonry {
    column-count: 3;
    column-gap: var(--space-lg);
  }

  .reviews-masonry>* {
    display: inline-block;
    width: 100%;
    margin-bottom: var(--space-lg);
  }

  @media (max-width: 980px) {
    .reviews-masonry {
      column-count: 1;
    }
  }
</style>
