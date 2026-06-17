<template>
  <div ref="sectionRef" class="section-container contact-section">
    <article class="contact-shell glass-panel glow-border">
      <header ref="headerRef" class="contact-header section-header">
        <p class="section-kicker text-mono">{{ t('contact.kicker') }}</p>
        <h2 id="contact-title" class="text-display section-title">{{ t('contact.title') }}</h2>
        <p class="section-description">
          {{ t('contact.description') }}
        </p>
      </header>

      <section class="terminal-panel" :aria-label="t('contact.terminal.aria')">
        <div class="terminal-panel__topbar" aria-hidden="true">
          <span class="terminal-panel__dot terminal-panel__dot--close" />
          <span class="terminal-panel__dot terminal-panel__dot--min" />
          <span class="terminal-panel__dot terminal-panel__dot--max" />
          <p class="terminal-panel__label text-mono">{{ t('contact.terminal.prompt') }}</p>
        </div>

        <div class="terminal-panel__body text-mono">
          <p :ref="(element) => setLineRef(element, 0)" class="terminal-line terminal-line--command">
            &gt; {{ t('contact.terminal.command') }}
          </p>
          <p :ref="(element) => setLineRef(element, 1)" class="terminal-line terminal-line--muted">
            &gt; {{ t('contact.terminal.loading') }}
          </p>
          <p :ref="(element) => setLineRef(element, 2)" class="terminal-line terminal-line--muted">
            &gt; {{ t('contact.terminal.connected') }}
          </p>

          <div :ref="(element) => setLineRef(element, 3)" class="terminal-block" role="status" aria-live="polite">
            <p class="terminal-block__label">{{ t('contact.terminal.statusLabel') }}</p>
            <p class="terminal-block__value">{{ t('contact.terminal.statusValue') }}</p>
          </div>

          <div :ref="(element) => setLineRef(element, 4)" class="terminal-block">
            <p class="terminal-block__label">{{ t('contact.terminal.emailLabel') }}</p>
            <a class="terminal-link" href="mailto:madson.br@gmail.com">madson.br@gmail.com</a>
          </div>

          <div :ref="(element) => setLineRef(element, 5)" class="terminal-block">
            <p class="terminal-block__label">{{ t('contact.terminal.githubLabel') }}</p>
            <a class="terminal-link" href="https://github.com/zandargo" target="_blank" rel="noopener noreferrer">github.com/zandargo</a>
          </div>

          <div :ref="(element) => setLineRef(element, 6)" class="terminal-block">
            <p class="terminal-block__label">{{ t('contact.terminal.linkedinLabel') }}</p>
            <a class="terminal-link" href="https://linkedin.com/in/madson-br" target="_blank" rel="noopener noreferrer">linkedin.com/in/madson-br</a>
          </div>

          <div :ref="(element) => setLineRef(element, 7)" class="terminal-block">
            <p class="terminal-block__label">UPWORK</p>
            <a class="terminal-link" href="https://www.upwork.com/freelancers/~01074a8f5756ea2138" target="_blank" rel="noopener noreferrer">upwork.com/freelancers/~01074a8f5756ea2138</a>
          </div>

          <p ref="messageRef" class="terminal-line terminal-line--system" aria-live="polite">
            &gt; {{ currentSystemMessage }}
          </p>

          <p class="terminal-line terminal-line--prompt" aria-hidden="true">
            &gt;
            <span class="terminal-cursor" />
          </p>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup>
  import { animate } from 'animejs'
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useIntersectionReveal } from '../../composables/useIntersectionReveal'

  const { t } = useI18n()

  const sectionRef = ref(null)
  const headerRef = ref(null)
  const messageRef = ref(null)
  const lineRefs = ref([])
  const hasRevealed = ref(false)

  const systemMessages = computed(() => [
    t('contact.terminal.systemMessages.0'),
    t('contact.terminal.systemMessages.1'),
    t('contact.terminal.systemMessages.2'),
    t('contact.terminal.systemMessages.3')
  ])
  const currentSystemMessage = ref(systemMessages.value[0] ?? '')

  let rotateTimer = null
  let messageIndex = 0

  const setLineRef = (element, index) => {
    if (!element) {
      return
    }

    lineRefs.value[index] = element
  }

  const getRandomDelay = () => {
    const min = 15000
    const max = 20000
    return Math.round(min + Math.random() * (max - min))
  }

  const animateSystemMessage = () => {
    if (!messageRef.value) {
      return
    }

    animate(messageRef.value, {
      opacity: [1, 0],
      translateY: [0, -6],
      duration: 180,
      ease: 'inQuad',
      onComplete: () => {
        messageIndex = (messageIndex + 1) % systemMessages.value.length
        currentSystemMessage.value = systemMessages.value[messageIndex]
        animate(messageRef.value, {
          opacity: [0, 1],
          translateY: [6, 0],
          duration: 320,
          ease: 'outQuad'
        })
      }
    })
  }

  const queueSystemMessage = () => {
    rotateTimer = window.setTimeout(() => {
      animateSystemMessage()
      queueSystemMessage()
    }, getRandomDelay())
  }

  const clearSystemMessageTimer = () => {
    if (rotateTimer !== null) {
      window.clearTimeout(rotateTimer)
      rotateTimer = null
    }
  }

  const playReveal = () => {
    if (hasRevealed.value) {
      return
    }

    hasRevealed.value = true

    animate(headerRef.value, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 580,
      ease: 'outQuad'
    })

    if (lineRefs.value.length > 0) {
      animate(lineRefs.value, {
        opacity: [0, 1],
        translateY: [10, 0],
        delay: (_, index) => 100 + index * 85,
        duration: 520,
        ease: 'outExpo'
      })
    }

    if (messageRef.value) {
      animate(messageRef.value, {
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 520,
        delay: 480,
        ease: 'outExpo'
      })
    }
  }

  const { observe, disconnect } = useIntersectionReveal({
    threshold: 0.3,
    rootMargin: '0px 0px -10% 0px',
    onReveal: () => {
      playReveal()
    }
  })

  onMounted(() => {
    if (sectionRef.value) {
      observe(sectionRef.value)
    }

    currentSystemMessage.value = systemMessages.value[0] ?? ''
    queueSystemMessage()
  })

  watch(systemMessages, (nextMessages) => {
    if (nextMessages.length === 0) {
      currentSystemMessage.value = ''
      messageIndex = 0
      return
    }

    if (!nextMessages.includes(currentSystemMessage.value)) {
      messageIndex = 0
      currentSystemMessage.value = nextMessages[0]
      return
    }

    messageIndex = nextMessages.indexOf(currentSystemMessage.value)
  })

  onBeforeUnmount(() => {
    disconnect()
    clearSystemMessageTimer()
  })
</script>

<style scoped>
  .contact-section {
    padding-top: var(--space-2xl);
  }

  .contact-shell {
    padding: clamp(1.25rem, 2.8vw, 2.4rem);
    display: grid;
    gap: clamp(1.25rem, 2.6vw, 2rem);
  }

  .contact-header {
    display: grid;
    gap: var(--space-sm);
    opacity: 0;
  }

  .terminal-panel {
    border: 1px solid rgba(125, 255, 202, 0.24);
    border-radius: var(--radius-lg);
    background: linear-gradient(160deg, rgba(8, 12, 10, 0.92), rgba(6, 9, 8, 0.96));
    overflow: hidden;
  }

  .terminal-panel__topbar {
    display: flex;
    align-items: center;
    gap: 0.42rem;
    padding: 0.65rem 0.9rem;
    border-bottom: 1px solid rgba(125, 255, 202, 0.2);
    background: rgba(14, 19, 16, 0.84);
  }

  .terminal-panel__dot {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    display: inline-block;
  }

  .terminal-panel__dot--close {
    background: #ff6b6b;
  }

  .terminal-panel__dot--min {
    background: #ffd166;
  }

  .terminal-panel__dot--max {
    background: #7dffca;
  }

  .terminal-panel__label {
    margin: 0 0 0 0.45rem;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: lowercase;
    color: var(--text-muted);
  }

  .terminal-panel__body {
    padding: clamp(0.95rem, 2.2vw, 1.4rem);
    display: grid;
    gap: 0.58rem;
  }

  .terminal-line,
  .terminal-block {
    opacity: 0;
  }

  .terminal-line {
    margin: 0;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    line-height: 1.55;
  }

  .terminal-line--command {
    color: var(--primary-soft);
  }

  .terminal-line--muted,
  .terminal-line--system {
    color: var(--text-muted);
  }

  .terminal-line--prompt {
    color: var(--text);
    opacity: 1;
  }

  .terminal-block {
    display: grid;
    grid-template-columns: minmax(90px, 130px) 1fr;
    gap: 0.55rem;
    padding: 0.48rem 0;
    border-bottom: 1px solid rgba(125, 255, 202, 0.09);
  }

  .terminal-block__label,
  .terminal-block__value {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .terminal-block__label {
    color: var(--text-muted);
    letter-spacing: 0.08em;
  }

  .terminal-block__value,
  .terminal-link {
    color: var(--text);
  }

  .terminal-link {
    text-decoration: none;
    border-bottom: 1px dashed rgba(125, 255, 202, 0.34);
    width: fit-content;
    font-size: 0.8rem;
    line-height: 1.45;
    transition: color 180ms ease, border-color 180ms ease;
  }

  .terminal-link:hover,
  .terminal-link:focus-visible {
    outline: none;
    color: var(--primary-soft);
    border-color: rgba(0, 255, 136, 0.58);
  }

  .terminal-cursor {
    display: inline-block;
    width: 0.56rem;
    height: 1rem;
    margin-left: 0.32rem;
    vertical-align: middle;
    background: var(--primary-soft);
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    animation: blink-cursor 1s steps(1, end) infinite;
  }

  @keyframes blink-cursor {

    0%,
    45% {
      opacity: 1;
    }

    46%,
    100% {
      opacity: 0;
    }
  }

  @media (max-width: 760px) {
    .terminal-block {
      grid-template-columns: 1fr;
      gap: 0.18rem;
    }

    .terminal-line,
    .terminal-block__label,
    .terminal-block__value,
    .terminal-link {
      font-size: 0.75rem;
    }
  }
</style>
