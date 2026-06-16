<template>
  <div class="section-container engineering-gallery-section">
    <article class="gallery-shell glass-panel glow-border">
      <header class="gallery-header section-header">
        <p class="section-kicker text-mono">{{ t('gallery.kicker') }}</p>
        <h2 id="gallery-title" class="text-display section-title">{{ t('gallery.title') }}</h2>
        <p class="section-description">
          {{ t('gallery.description') }}
        </p>
      </header>

      <div class="gallery-masonry" :aria-label="t('gallery.masonryAria')">
        <article v-for="(item, index) in galleryItems" :key="`masonry-${item.id}`" :ref="(element) => setMasonryRef(element, index)" class="gallery-item" :aria-label="t('gallery.itemAria', { title: item.title, type: item.type })">
          <div class="gallery-item__media-wrap">
            <img class="gallery-item__media" :src="item.image" :alt="item.alt" loading="lazy" decoding="async" width="760" height="760" />
          </div>
          <div class="gallery-item__meta">
            <p class="gallery-item__type text-mono">{{ item.type }}</p>
            <h3 class="gallery-item__title text-display">{{ item.title }}</h3>
            <p class="gallery-item__tools">{{ item.tools }}</p>
          </div>
        </article>
      </div>

      <div class="gallery-carousel-shell" :aria-label="t('gallery.carouselAria')">
        <div ref="emblaRef" class="gallery-carousel">
          <div class="gallery-carousel__container">
            <article v-for="item in galleryItems" :key="`carousel-${item.id}`" class="gallery-slide" :aria-label="t('gallery.itemAria', { title: item.title, type: item.type })">
              <div class="gallery-slide__media-wrap">
                <img class="gallery-slide__media" :src="item.image" :alt="item.alt" loading="lazy" decoding="async" width="760" height="760" />
              </div>
              <div class="gallery-slide__meta">
                <p class="gallery-item__type text-mono">{{ item.type }}</p>
                <h3 class="gallery-item__title text-display">{{ item.title }}</h3>
                <p class="gallery-item__tools">{{ item.tools }}</p>
              </div>
            </article>
          </div>
        </div>

        <div class="gallery-carousel__controls">
          <button type="button" class="gallery-carousel__button" :disabled="!canScrollPrev" @click="scrollPrev" :aria-label="t('gallery.prevAria')">
            {{ t('gallery.prev') }}
          </button>
          <button type="button" class="gallery-carousel__button" :disabled="!canScrollNext" @click="scrollNext" :aria-label="t('gallery.nextAria')">
            {{ t('gallery.next') }}
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
  import emblaCarouselVue from 'embla-carousel-vue'
  import VanillaTilt from 'vanilla-tilt'
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const galleryItems = computed(() => [
    {
      id: 'assy-frame',
      title: t('gallery.items.assyFrame.title'),
      type: t('gallery.items.assyFrame.type'),
      tools: t('gallery.items.assyFrame.tools'),
      alt: t('gallery.items.assyFrame.alt'),
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'exploded-module',
      title: t('gallery.items.explodedModule.title'),
      type: t('gallery.items.explodedModule.type'),
      tools: t('gallery.items.explodedModule.tools'),
      alt: t('gallery.items.explodedModule.alt'),
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'cnc-layout',
      title: t('gallery.items.cncLayout.title'),
      type: t('gallery.items.cncLayout.type'),
      tools: t('gallery.items.cncLayout.tools'),
      alt: t('gallery.items.cncLayout.alt'),
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'prototype-print',
      title: t('gallery.items.prototypePrint.title'),
      type: t('gallery.items.prototypePrint.type'),
      tools: t('gallery.items.prototypePrint.tools'),
      alt: t('gallery.items.prototypePrint.alt'),
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'plant-drawing',
      title: t('gallery.items.plantDrawing.title'),
      type: t('gallery.items.plantDrawing.type'),
      tools: t('gallery.items.plantDrawing.tools'),
      alt: t('gallery.items.plantDrawing.alt'),
      image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a9b0?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'render-bay',
      title: t('gallery.items.renderBay.title'),
      type: t('gallery.items.renderBay.type'),
      tools: t('gallery.items.renderBay.tools'),
      alt: t('gallery.items.renderBay.alt'),
      image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1200&q=80'
    }
  ])

  const masonryRefs = ref([])
  const canScrollPrev = ref(false)
  const canScrollNext = ref(false)
  const [emblaRef, emblaApi] = emblaCarouselVue({
    loop: false,
    dragFree: true,
    align: 'start'
  })

  let mediaQueryList = null

  const setMasonryRef = (element, index) => {
    if (!element) {
      return
    }

    masonryRefs.value[index] = element
  }

  const shouldEnableTilt = () => {
    if (typeof window === 'undefined') {
      return false
    }

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const isTouchOnly = window.matchMedia?.('(pointer: coarse)').matches
    const isDesktopWidth = window.matchMedia?.('(min-width: 901px)').matches

    return !prefersReducedMotion && !isTouchOnly && Boolean(isDesktopWidth)
  }

  const destroyTilt = () => {
    masonryRefs.value.forEach((element) => {
      element?.vanillaTilt?.destroy?.()
    })
  }

  const initTilt = () => {
    destroyTilt()
    if (!shouldEnableTilt()) {
      return
    }

    masonryRefs.value.forEach((element) => {
      if (!element) {
        return
      }

      VanillaTilt.init(element, {
        max: 6,
        speed: 420,
        scale: 1.01,
        glare: true,
        'max-glare': 0.16,
        gyroscope: false
      })
    })
  }

  const syncCarouselButtons = () => {
    if (!emblaApi.value) {
      canScrollPrev.value = false
      canScrollNext.value = false
      return
    }

    canScrollPrev.value = emblaApi.value.canScrollPrev()
    canScrollNext.value = emblaApi.value.canScrollNext()
  }

  const scrollPrev = () => {
    emblaApi.value?.scrollPrev()
  }

  const scrollNext = () => {
    emblaApi.value?.scrollNext()
  }

  onMounted(() => {
    initTilt()

    if (typeof window !== 'undefined') {
      mediaQueryList = window.matchMedia('(min-width: 901px)')
      mediaQueryList.addEventListener('change', initTilt)
    }
  })

  watch(
    emblaApi,
    (api) => {
      if (!api) {
        return
      }

      syncCarouselButtons()
      api.on('select', syncCarouselButtons)
      api.on('reInit', syncCarouselButtons)
    }
  )

  onBeforeUnmount(() => {
    destroyTilt()
    mediaQueryList?.removeEventListener?.('change', initTilt)
    emblaApi.value?.destroy?.()
  })
</script>

<style scoped>
  .engineering-gallery-section {
    padding-top: var(--space-2xl);
  }

  .gallery-shell {
    padding: clamp(1.25rem, 2.8vw, 2.4rem);
    display: grid;
    gap: clamp(1.2rem, 2.6vw, 2rem);
  }

  .gallery-header {
    display: grid;
    gap: var(--space-sm);
  }

  .gallery-masonry {
    column-count: 3;
    column-gap: var(--space-md);
  }

  .gallery-item {
    position: relative;
    display: inline-block;
    width: 100%;
    margin: 0 0 var(--space-md);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: linear-gradient(165deg, rgba(12, 18, 14, 0.9), rgba(8, 12, 10, 0.8));
    border: 1px solid rgba(125, 255, 202, 0.22);
    transition:
      transform 230ms ease,
      border-color 230ms ease,
      box-shadow 230ms ease;
  }

  .gallery-item:hover,
  .gallery-item:focus-within {
    transform: translateY(-4px);
    border-color: rgba(0, 255, 136, 0.44);
    box-shadow:
      0 0 0 1px rgba(0, 255, 136, 0.12) inset,
      0 0 24px rgba(0, 255, 136, 0.2);
  }

  .gallery-item__media-wrap {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }

  .gallery-item__media,
  .gallery-slide__media {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    filter: saturate(0.82) contrast(1.08);
    transition: transform 420ms ease, filter 280ms ease;
  }

  .gallery-item:hover .gallery-item__media,
  .gallery-item:focus-within .gallery-item__media {
    transform: scale(1.055);
    filter: saturate(1) contrast(1.08);
  }

  .gallery-item__meta,
  .gallery-slide__meta {
    padding: 0.82rem 0.88rem 0.95rem;
    display: grid;
    gap: 0.32rem;
    background: linear-gradient(180deg, rgba(9, 13, 11, 0.54), rgba(9, 13, 11, 0.9));
  }

  .gallery-item__type {
    margin: 0;
    font-size: 0.66rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--primary-soft);
  }

  .gallery-item__title {
    margin: 0;
    font-size: clamp(1rem, 1.6vw, 1.2rem);
    line-height: 1.12;
  }

  .gallery-item__tools {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.5;
    color: var(--text-muted);
  }

  .gallery-carousel-shell {
    display: none;
    gap: var(--space-sm);
  }

  .gallery-carousel {
    overflow: hidden;
  }

  .gallery-carousel__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
  }

  .gallery-slide {
    flex: 0 0 86%;
    min-width: 0;
    margin-right: var(--space-sm);
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid rgba(125, 255, 202, 0.22);
    background: linear-gradient(165deg, rgba(12, 18, 14, 0.9), rgba(8, 12, 10, 0.8));
  }

  .gallery-slide__media-wrap {
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }

  .gallery-carousel__controls {
    display: flex;
    gap: 0.55rem;
  }

  .gallery-carousel__button {
    padding: 0.52rem 0.82rem;
    border-radius: 999px;
    border: 1px solid rgba(125, 255, 202, 0.24);
    background: rgba(12, 18, 14, 0.64);
    color: var(--text);
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 180ms ease, opacity 180ms ease;
  }

  .gallery-carousel__button:hover,
  .gallery-carousel__button:focus-visible {
    outline: none;
    border-color: rgba(0, 255, 136, 0.5);
  }

  .gallery-carousel__button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (max-width: 1140px) {
    .gallery-masonry {
      column-count: 2;
    }
  }

  @media (max-width: 900px) {
    .gallery-masonry {
      display: none;
    }

    .gallery-carousel-shell {
      display: grid;
    }
  }

  @media (max-width: 640px) {
    .section-title {
      font-size: clamp(1.6rem, 7vw, 2.1rem);
    }

    .gallery-slide {
      flex-basis: 92%;
    }
  }
</style>
