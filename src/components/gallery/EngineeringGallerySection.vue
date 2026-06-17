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
          <!-- <div class="gallery-item__meta">
            <p class="gallery-item__type text-mono">{{ item.type }}</p>
            <h3 class="gallery-item__title text-display">{{ item.title }}</h3>
            <p class="gallery-item__tools">{{ item.tools }}</p>
          </div> -->
        </article>
      </div>

      <div class="gallery-carousel-shell" :aria-label="t('gallery.carouselAria')">
        <q-carousel class="gallery-carousel" control-type="flat" arrow-navigation swipeable animated navigation navigation-position="bottom" v-model:model-value="activeSlide" :aria-label="t('gallery.carouselAria')">
          <q-carousel-slide v-for="item in galleryItems" :key="`carousel-${item.id}`" :name="item.id" :img-src="item.image" :img-alt="item.alt" img-fit="cover" class="gallery-slide" :aria-label="t('gallery.itemAria', { title: item.title, type: item.type })">
            <!-- <div class="gallery-slide__meta">
              <p class="gallery-item__type text-mono">{{ item.type }}</p>
              <h3 class="gallery-item__title text-display">{{ item.title }}</h3>
              <p class="gallery-item__tools">{{ item.tools }}</p>
            </div> -->
          </q-carousel-slide>
        </q-carousel>
      </div>
    </article>
  </div>
</template>

<script setup>
  import VanillaTilt from 'vanilla-tilt'
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const galleryItems = ref([])
  const activeSlide = ref(null)

  const buildImageTitle = (filename) => {
    const base = filename.replace(/\.[^.]+$/, '')
    return base
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim()
  }

  const loadGalleryImages = async () => {
    try {
      const manifestUrl = new URL('img/gallery/manifest.json', window.location.href).href
      const response = await fetch(manifestUrl)

      if (!response.ok) {
        throw new Error(`Failed to load gallery manifest (${response.status})`)
      }

      const imageFiles = await response.json()
      galleryItems.value = imageFiles.map((filename, index) => {
        const imageSrc = new URL(`img/gallery/${filename}`, window.location.href).href

        return {
          id: `gallery-image-${index}`,
          title: buildImageTitle(filename),
          type: t('gallery.imageType'),
          tools: t('gallery.imageTools'),
          alt: t('gallery.imageAlt', { filename }),
          image: imageSrc
        }
      })

      activeSlide.value = galleryItems.value.length > 0 ? galleryItems.value[0].id : null
    }
    catch (error) {
      console.error('Unable to load gallery images:', error)
      galleryItems.value = []
      activeSlide.value = null
    }
  }

  const masonryRefs = ref([])
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


  onMounted(() => {
    loadGalleryImages()
    initTilt()

    if (typeof window !== 'undefined') {
      mediaQueryList = window.matchMedia('(min-width: 901px)')
      mediaQueryList.addEventListener('change', initTilt)
    }
  })

  onBeforeUnmount(() => {
    destroyTilt()
    mediaQueryList?.removeEventListener?.('change', initTilt)
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
  }

  .gallery-carousel {
    min-height: 0;
  }

  .gallery-slide {
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 2px solid rgba(125, 255, 202, 0.22);
    background: linear-gradient(165deg, rgba(12, 18, 14, 0.9), rgba(8, 12, 10, 0.8));
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
    .gallery-slide {
      flex-basis: 92%;
    }
  }
</style>
