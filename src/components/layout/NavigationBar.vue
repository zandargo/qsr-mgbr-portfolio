<template>
  <header class="nav-shell">
    <nav class="nav-inner section-container glass-panel" aria-label="Primary navigation">
      <a href="#hero" class="brand text-display" @click.prevent="handleNavAction('hero')">{{ t('nav.brand') }}</a>

      <div class="desktop-nav-wrap">
        <div class="desktop-nav-main">
          <ul ref="desktopNavRef" class="nav-links nav-links--desktop">
            <li v-for="item in navItems" :key="item.id">
              <a :href="`#${item.id}`" :data-section="item.id" :class="{ 'is-active': activeSection === item.id }" @click.prevent="handleNavAction(item.id)">
                {{ item.label }}
              </a>
            </li>
          </ul>
          <span class="active-underline" :style="{
            transform: `translateX(${underlineState.x}px)`,
            width: `${underlineState.width}px`,
            opacity: underlineState.opacity
          }" />
        </div>

        <label class="locale-picker" :aria-label="t('nav.language')">
          <span class="sr-only">{{ t('nav.language') }}</span>
          <select v-model="selectedLocale" class="locale-select">
            <option v-for="option in localeOptions" :key="option.code" :value="option.code">
              {{ option.label }}
            </option>
          </select>
        </label>
      </div>

      <button ref="menuButtonRef" class="menu-toggle" type="button" :aria-expanded="isMenuOpen ? 'true' : 'false'" aria-controls="mobile-nav-overlay" @click="toggleMenu">
        <span aria-hidden="true">{{ isMenuOpen ? t('nav.close') : t('nav.menu') }}</span>
        <span class="sr-only">{{ t('nav.toggle') }}</span>
      </button>
    </nav>

    <transition name="overlay-fade">
      <div v-if="isMenuOpen" id="mobile-nav-overlay" ref="mobileOverlayRef" class="mobile-nav-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu" @keydown="onOverlayKeydown" @click.self="closeMenu">
        <ul class="nav-links nav-links--mobile">
          <li v-for="(item, index) in navItems" :key="item.id">
            <a :ref="index === 0 ? setFirstMobileLinkRef : null" :href="`#${item.id}`" :class="{ 'is-active': activeSection === item.id }" @click.prevent="handleNavAction(item.id)">
              {{ item.label }}
            </a>
          </li>
        </ul>

        <label class="locale-picker locale-picker--mobile" :aria-label="t('nav.language')">
          <span>{{ t('nav.language') }}</span>
          <select v-model="selectedLocale" class="locale-select locale-select--mobile">
            <option v-for="option in localeOptions" :key="option.code" :value="option.code">
              {{ option.label }}
            </option>
          </select>
        </label>
      </div>
    </transition>
  </header>
</template>

<script setup>
  import { animate } from 'animejs'
  import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useLenis } from '../../composables/useLenis'

  const LOCALE_STORAGE_KEY = 'qsr-locale'
  const supportedLocales = ['en-US', 'pt-BR']
  const { t, locale } = useI18n()

  const navItems = computed(() => [
    { id: 'biography', label: t('nav.biography') },
    { id: 'soft-skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'reviews', label: t('nav.reviews') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'links', label: t('nav.links') },
    { id: 'contact', label: t('nav.contact') }
  ])

  const localeOptions = computed(() => [
    { code: 'en-US', label: t('locales.en-US') },
    { code: 'pt-BR', label: t('locales.pt-BR') }
  ])

  const selectedLocale = computed({
    get: () => locale.value,
    set: (nextLocale) => {
      if (!supportedLocales.includes(nextLocale)) {
        return
      }

      locale.value = nextLocale
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
      }
    }
  })

  const { scrollTo } = useLenis()

  const desktopNavRef = ref(null)
  const menuButtonRef = ref(null)
  const mobileOverlayRef = ref(null)
  const firstMobileLinkRef = ref(null)

  const isMenuOpen = ref(false)
  const activeSection = ref('hero')
  const underlineState = reactive({ x: 0, width: 0, opacity: 0 })
  let observer = null
  let lastFocusedElement = null

  const setFirstMobileLinkRef = (element) => {
    firstMobileLinkRef.value = element
  }

  const syncUrlHash = (sectionId) => {
    if (typeof history === 'undefined') {
      return
    }

    history.replaceState(null, '', `#${sectionId}`)
  }

  const handleNavAction = (sectionId) => {
    activeSection.value = sectionId
    scrollTo(`#${sectionId}`, { offset: -110, duration: 1.1 })
    syncUrlHash(sectionId)
    if (isMenuOpen.value) {
      closeMenu()
    }
  }

  const toggleMenu = () => {
    if (isMenuOpen.value) {
      closeMenu()
      return
    }

    openMenu()
  }

  const openMenu = () => {
    lastFocusedElement = document.activeElement
    isMenuOpen.value = true
  }

  const closeMenu = () => {
    isMenuOpen.value = false
    nextTick(() => {
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus()
        return
      }

      menuButtonRef.value?.focus()
    })
  }

  const getFocusableElements = () => {
    const root = mobileOverlayRef.value
    if (!root) {
      return []
    }

    return [...root.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
  }

  const onOverlayKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeMenu()
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) {
      event.preventDefault()
      return
    }

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]
    const isShift = event.shiftKey

    if (!isShift && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }

    if (isShift && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    }
  }

  const updateActiveFromScroll = (entries) => {
    const visibleEntries = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

    if (visibleEntries.length === 0) {
      return
    }

    activeSection.value = visibleEntries[0].target.id
  }

  const initSectionObserver = () => {
    const sections = [...document.querySelectorAll('main .page-section[id]')]
    if (sections.length === 0) {
      return
    }

    observer = new IntersectionObserver(updateActiveFromScroll, {
      root: null,
      rootMargin: '-42% 0px -42% 0px',
      threshold: [0.15, 0.35, 0.55, 0.75]
    })

    sections.forEach((section) => observer.observe(section))
  }

  const updateUnderline = () => {
    const navRoot = desktopNavRef.value
    if (!navRoot) {
      return
    }

    const activeLink = navRoot.querySelector(`a[data-section="${activeSection.value}"]`)
    if (!activeLink) {
      return
    }

    const navBounds = navRoot.getBoundingClientRect()
    const linkBounds = activeLink.getBoundingClientRect()
    const nextX = linkBounds.left - navBounds.left
    const nextWidth = linkBounds.width

    animate(underlineState, {
      x: nextX,
      width: nextWidth,
      opacity: 1,
      duration: 420,
      ease: 'outQuart'
    })
  }

  watch(activeSection, () => {
    updateUnderline()
  })

  watch(isMenuOpen, async (opened) => {
    if (!opened) {
      return
    }

    await nextTick()
    firstMobileLinkRef.value?.focus()
  })

  onMounted(() => {
    initSectionObserver()
    nextTick(() => {
      updateUnderline()
    })
    window.addEventListener('resize', updateUnderline)
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
    window.removeEventListener('resize', updateUnderline)
  })
</script>

<style scoped>
  .nav-shell {
    position: fixed;
    top: var(--space-md);
    left: 0;
    width: 100%;
    z-index: 30;
    pointer-events: none;
  }

  .nav-inner {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-lg);
    padding: var(--space-sm) var(--space-lg);
    /* width: min(1200px, calc(100% - (2 * var(--space-md)))); */
    width: clamp(90%, 1200px, calc(100% - (2 * var(--space-md))));
    margin: 0 auto;
    pointer-events: auto;
  }

  .brand {
    color: var(--text);
    text-decoration: none;
    font-size: 1.06rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .desktop-nav-wrap {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    justify-self: end;
  }

  .desktop-nav-main {
    position: relative;
  }

  .nav-links {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav-links--desktop {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .nav-links--desktop a {
    position: relative;
    display: inline-flex;
    padding: var(--space-xs) var(--space-2xs);
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.88rem;
    letter-spacing: 0.04em;
    transition: color 0.2s ease;
  }

  .nav-links--desktop a:hover,
  .nav-links--desktop a:focus-visible,
  .nav-links--desktop a.is-active {
    color: var(--primary);
  }

  .active-underline {
    position: absolute;
    bottom: 2px;
    left: 0;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(0, 255, 136, 0.3), rgba(0, 255, 136, 1), rgba(125, 255, 202, 0.45));
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
    will-change: transform, width, opacity;
  }

  .menu-toggle {
    display: none;
    border: 1px solid rgba(125, 255, 202, 0.28);
    border-radius: 999px;
    padding: var(--space-xs) var(--space-md);
    background: rgba(10, 16, 13, 0.85);
    color: var(--text);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .locale-picker {
    display: inline-flex;
    align-items: center;
  }

  .locale-select {
    min-width: 8.4rem;
    border: 1px solid rgba(125, 255, 202, 0.24);
    border-radius: 999px;
    padding: 0.3rem 0.72rem;
    background: rgba(10, 16, 13, 0.85);
    color: var(--text);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    outline: none;
  }

  .locale-select:focus-visible {
    outline: 2px solid var(--primary-soft);
    outline-offset: 2px;
  }

  .menu-toggle:focus-visible,
  .nav-links a:focus-visible,
  .brand:focus-visible {
    outline: 2px solid var(--primary-soft);
    outline-offset: 3px;
  }

  .mobile-nav-overlay {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    padding: max(var(--space-2xl), env(safe-area-inset-top)) var(--space-xl) var(--space-xl);
    background:
      radial-gradient(circle at 20% 15%, rgba(0, 255, 136, 0.14), transparent 35%),
      radial-gradient(circle at 85% 80%, rgba(125, 255, 202, 0.12), transparent 42%),
      rgba(5, 10, 8, 0.92);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    pointer-events: auto;
  }

  .nav-links--mobile {
    display: grid;
    gap: var(--space-md);
    justify-items: center;
  }

  .locale-picker--mobile {
    margin-top: var(--space-lg);
    gap: var(--space-sm);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .locale-select--mobile {
    min-width: 11rem;
  }

  .nav-links--mobile a {
    color: var(--text);
    text-decoration: none;
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 4.8vw, 2rem);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.2s ease, text-shadow 0.2s ease;
  }

  .nav-links--mobile a.is-active,
  .nav-links--mobile a:hover,
  .nav-links--mobile a:focus-visible {
    color: var(--primary);
    text-shadow: 0 0 15px rgba(0, 255, 136, 0.45);
  }

  .overlay-fade-enter-active,
  .overlay-fade-leave-active {
    transition: opacity 0.26s ease;
  }

  .overlay-fade-enter-from,
  .overlay-fade-leave-to {
    opacity: 0;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 980px) {
    .nav-inner {
      grid-template-columns: auto auto;
      justify-content: space-between;
    }

    .desktop-nav-wrap {
      display: none;
    }

    .menu-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
