<template>
  <Teleport to="body">
    <div v-if="isRendered" ref="overlayRef" class="project-modal" role="dialog" aria-modal="true" :aria-labelledby="project ? `project-modal-title-${project.code}` : undefined" @click.self="closeModal">
      <article ref="panelRef" class="project-modal__panel glass-panel glow-border">
        <header class="project-modal__header">
          <div>
            <p class="project-modal__kicker text-mono">{{ t('projectModal.kicker') }}</p>
            <h3 v-if="project" :id="`project-modal-title-${project.code}`" class="project-modal__title text-display">{{ project.title }}</h3>
          </div>
          <button ref="closeButtonRef" type="button" class="project-modal__close" @click="closeModal" :aria-label="t('projectModal.closeAria')">
            {{ t('projectModal.close') }}
          </button>
        </header>

        <div v-if="project" class="project-modal__content">
          <q-scroll-area class="project-modal__scroll" @wheel.passive.stop>
            <div class="project-modal__body">
              <section class="project-modal__block" :aria-label="t('projectModal.sections.screenshotsAria')">
                <h4 class="project-modal__block-title text-mono">{{ t('projectModal.sections.screenshots') }}</h4>
                <div class="project-modal__shots">
                  <article v-for="shot in project.screenshots ?? []" :key="`${project.code}-${shot.label}`" class="project-modal__shot">
                    <div class="project-modal__shot-image" :style="{ background: project.thumbnail }" aria-hidden="true" />
                    <div class="project-modal__shot-meta">
                      <p class="project-modal__shot-label">{{ shot.label }}</p>
                      <p class="project-modal__shot-type text-mono">{{ shot.type }}</p>
                    </div>
                  </article>
                </div>
              </section>

              <section class="project-modal__block" :aria-label="t('projectModal.sections.overviewAria')">
                <h4 class="project-modal__block-title text-mono">{{ t('projectModal.sections.overview') }}</h4>
                <p class="project-modal__paragraph">{{ project.overview }}</p>
              </section>

              <section class="project-modal__block" :aria-label="t('projectModal.sections.architectureAria')">
                <h4 class="project-modal__block-title text-mono">{{ t('projectModal.sections.architecture') }}</h4>
                <ul class="project-modal__list">
                  <li v-for="item in project.architecture ?? []" :key="`${project.code}-${item}`">{{ item }}</li>
                </ul>
              </section>

              <section class="project-modal__block" :aria-label="t('projectModal.sections.technologiesAria')">
                <h4 class="project-modal__block-title text-mono">{{ t('projectModal.sections.technologies') }}</h4>
                <ul class="project-modal__chip-list">
                  <li v-for="tag in project.tags" :key="`${project.code}-${tag}`" class="project-modal__chip text-mono">{{ tag }}</li>
                </ul>
              </section>

              <section class="project-modal__block" :aria-label="t('projectModal.sections.challengesAria')">
                <h4 class="project-modal__block-title text-mono">{{ t('projectModal.sections.challenges') }}</h4>
                <ul class="project-modal__list">
                  <li v-for="challenge in project.challenges ?? []" :key="`${project.code}-${challenge}`">{{ challenge }}</li>
                </ul>
              </section>

              <section class="project-modal__block" :aria-label="t('projectModal.sections.linksAria')">
                <h4 class="project-modal__block-title text-mono">{{ t('projectModal.sections.links') }}</h4>
                <div class="project-modal__actions">
                  <a class="project-modal__action" :href="project.github" target="_blank" rel="noreferrer">{{ t('projectModal.github') }}</a>
                  <a class="project-modal__action project-modal__action--primary" :href="project.demo" target="_blank" rel="noreferrer">{{ t('projectModal.liveDemo') }}</a>
                </div>
              </section>
            </div>
          </q-scroll-area>
        </div>
      </article>
    </div>
  </Teleport>
</template>

<script setup>
  import { animate } from 'animejs'
  import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    project: {
      type: Object,
      default: null
    }
  })

  const emit = defineEmits(['update:modelValue', 'closed'])

  const overlayRef = ref(null)
  const panelRef = ref(null)
  const closeButtonRef = ref(null)
  const isRendered = ref(false)
  const isClosing = ref(false)
  const previousActiveElement = ref(null)

  let openOverlayAnimation = null
  let openPanelAnimation = null
  let closeOverlayAnimation = null
  let closePanelAnimation = null
  let previousBodyOverflow = ''

  const isVisible = () => props.modelValue && isRendered.value

  const getFocusableElements = () => {
    if (!overlayRef.value) {
      return []
    }

    return Array.from(
      overlayRef.value.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element instanceof HTMLElement && !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')
  }

  const handleKeydown = (event) => {
    if (!isVisible()) {
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      closeModal()
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const focusable = getFocusableElements()
    if (focusable.length === 0) {
      event.preventDefault()
      return
    }

    const currentIndex = focusable.indexOf(document.activeElement)
    const isShift = event.shiftKey
    const targetIndex = isShift
      ? currentIndex <= 0
        ? focusable.length - 1
        : currentIndex - 1
      : currentIndex === -1 || currentIndex >= focusable.length - 1
        ? 0
        : currentIndex + 1

    event.preventDefault()
    focusable[targetIndex]?.focus()
  }

  const lockBodyScroll = () => {
    if (typeof document === 'undefined') {
      return
    }

    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  const unlockBodyScroll = () => {
    if (typeof document === 'undefined') {
      return
    }

    document.body.style.overflow = previousBodyOverflow
  }

  const playOpenAnimation = async () => {
    if (!overlayRef.value || !panelRef.value) {
      return
    }

    openOverlayAnimation?.cancel?.()
    openPanelAnimation?.cancel?.()

    openOverlayAnimation = animate(overlayRef.value, {
      opacity: [0, 1],
      duration: 240,
      ease: 'outQuad'
    })

    openPanelAnimation = animate(panelRef.value, {
      opacity: [0, 1],
      translateY: [24, 0],
      scale: [0.985, 1],
      duration: 420,
      ease: 'outExpo'
    })

    await Promise.all([openOverlayAnimation, openPanelAnimation])
  }

  const playCloseAnimation = async () => {
    if (!overlayRef.value || !panelRef.value) {
      return
    }

    closeOverlayAnimation?.cancel?.()
    closePanelAnimation?.cancel?.()

    closePanelAnimation = animate(panelRef.value, {
      opacity: [1, 0],
      translateY: [0, 20],
      scale: [1, 0.985],
      duration: 260,
      ease: 'inQuad'
    })

    closeOverlayAnimation = animate(overlayRef.value, {
      opacity: [1, 0],
      duration: 220,
      ease: 'inQuad'
    })

    await Promise.all([closeOverlayAnimation, closePanelAnimation])
  }

  const closeModal = async () => {
    if (isClosing.value) {
      return
    }

    isClosing.value = true
    await playCloseAnimation()
    isRendered.value = false
    emit('update:modelValue', false)
    emit('closed')
    unlockBodyScroll()
    window.removeEventListener('keydown', handleKeydown)
    previousActiveElement.value?.focus?.()
    previousActiveElement.value = null
    isClosing.value = false
  }

  watch(
    () => props.modelValue,
    async (value) => {
      if (!value) {
        if (isRendered.value && !isClosing.value) {
          await closeModal()
        }
        return
      }

      if (isRendered.value) {
        return
      }

      previousActiveElement.value = document.activeElement
      isRendered.value = true
      isClosing.value = false
      lockBodyScroll()
      await nextTick()
      window.addEventListener('keydown', handleKeydown)
      await playOpenAnimation()
      closeButtonRef.value?.focus()
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    openOverlayAnimation?.cancel?.()
    openPanelAnimation?.cancel?.()
    closeOverlayAnimation?.cancel?.()
    closePanelAnimation?.cancel?.()
    window.removeEventListener('keydown', handleKeydown)
    unlockBodyScroll()
  })
</script>

<style scoped>
  .project-modal {
    position: fixed;
    inset: 0;
    z-index: 2300;
    display: grid;
    place-items: center;
    padding: clamp(1rem, 3.2vw, 2.5rem);
    background: linear-gradient(180deg, rgba(6, 9, 8, 0.62), rgba(5, 8, 7, 0.86));
    backdrop-filter: blur(6px);
  }

  .project-modal__panel {
    width: min(1060px, 100%);
    max-height: calc(100vh - clamp(2rem, 7vw, 4.6rem));
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(125, 255, 202, 0.28);
    background: linear-gradient(165deg, rgba(11, 16, 13, 0.96), rgba(8, 12, 10, 0.98));
  }

  .project-modal__header {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    gap: var(--space-md);
    align-items: start;
    padding: clamp(1rem, 2.5vw, 1.6rem);
    border-bottom: 1px solid rgba(125, 255, 202, 0.2);
    background: linear-gradient(180deg, rgba(11, 16, 13, 0.98), rgba(11, 16, 13, 0.9));
  }

  .project-modal__kicker {
    margin: 0;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--primary-soft);
  }

  .project-modal__title {
    margin: 0.4rem 0 0;
    font-size: clamp(1.4rem, 2.4vw, 2.2rem);
    line-height: 1.1;
  }

  .project-modal__close {
    padding: 0.45rem 0.8rem;
    border-radius: 999px;
    border: 1px solid rgba(125, 255, 202, 0.3);
    background: rgba(12, 18, 14, 0.8);
    color: var(--text);
    cursor: pointer;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .project-modal__close:hover,
  .project-modal__close:focus-visible {
    outline: none;
    border-color: rgba(0, 255, 136, 0.52);
    box-shadow: 0 0 0 1px rgba(0, 255, 136, 0.16) inset;
  }

  .project-modal__body {
    padding: clamp(1rem, 3vw, 1.7rem);
    display: grid;
    gap: var(--space-lg);
  }

  .project-modal__content {
    min-height: 0;
    flex: 1;
  }

  .project-modal__scroll {
    height: clamp(220px, 80vh, 90vh);
  }

  .project-modal__block {
    display: grid;
    gap: var(--space-sm);
  }

  .project-modal__block-title {
    margin: 0;
    font-size: 0.74rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--primary-soft);
  }

  .project-modal__paragraph {
    margin: 0;
    line-height: 1.65;
    color: var(--text-muted);
  }

  .project-modal__shots {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-sm);
  }

  .project-modal__shot {
    border: 1px solid rgba(125, 255, 202, 0.22);
    border-radius: var(--radius-md);
    overflow: hidden;
    background: rgba(10, 14, 12, 0.8);
  }

  .project-modal__shot-image {
    height: 120px;
    filter: saturate(0.95) contrast(1.05);
  }

  .project-modal__shot-meta {
    padding: 0.65rem 0.75rem;
    display: grid;
    gap: 0.18rem;
  }

  .project-modal__shot-label {
    margin: 0;
    font-size: 0.85rem;
  }

  .project-modal__shot-type {
    margin: 0;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .project-modal__list {
    margin: 0;
    padding-left: 1.05rem;
    display: grid;
    gap: 0.45rem;
    line-height: 1.5;
    color: var(--text-muted);
  }

  .project-modal__chip-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .project-modal__chip {
    padding: 0.32rem 0.56rem;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 999px;
    border: 1px solid rgba(125, 255, 202, 0.24);
    background: rgba(16, 22, 19, 0.7);
    color: var(--primary-soft);
  }

  .project-modal__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .project-modal__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.54rem 0.85rem;
    border-radius: 999px;
    border: 1px solid rgba(125, 255, 202, 0.24);
    text-decoration: none;
    font-size: 0.72rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--text);
    background: rgba(12, 18, 14, 0.7);
  }

  .project-modal__action:hover,
  .project-modal__action:focus-visible {
    outline: none;
    border-color: rgba(0, 255, 136, 0.52);
    box-shadow: 0 0 0 1px rgba(0, 255, 136, 0.14) inset;
  }

  .project-modal__action--primary {
    border-color: rgba(0, 255, 136, 0.4);
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(125, 255, 202, 0.1));
  }

  @media (max-width: 920px) {
    .project-modal__shots {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .project-modal {
      padding: 0.65rem;
    }

    .project-modal__panel {
      max-height: calc(100vh - 1.3rem);
    }

    .project-modal__shots {
      grid-template-columns: 1fr;
    }
  }
</style>
