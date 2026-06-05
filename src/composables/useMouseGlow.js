import { computed, onBeforeUnmount, ref, unref } from 'vue'

export function useMouseGlow(options = {}) {
  const mouseGlowRef = ref(null)
  const isActive = ref(false)
  const isSupported = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const state = {
    x: options.startX ?? 0,
    y: options.startY ?? 0,
    targetX: options.startX ?? 0,
    targetY: options.startY ?? 0,
    opacity: 0,
    rAF: 0,
    element: null
  }

  const ease = options.ease ?? 0.14
  const offset = options.offset ?? 10

  const applyStyle = () => {
    const glowElement = unref(mouseGlowRef)
    if (!glowElement) {
      return
    }

    glowElement.style.opacity = String(state.opacity)
    glowElement.style.transform = `translate3d(${state.x - offset}px, ${state.y - offset}px, 0)`
  }

  const tick = () => {
    state.x += (state.targetX - state.x) * ease
    state.y += (state.targetY - state.y) * ease
    applyStyle()
    state.rAF = window.requestAnimationFrame(tick)
  }

  const onPointerMove = (event) => {
    state.targetX = event.clientX
    state.targetY = event.clientY
    state.opacity = 1
    if (!state.rAF) {
      state.rAF = window.requestAnimationFrame(tick)
    }
  }

  const onPointerLeave = () => {
    state.opacity = 0
    applyStyle()
  }

  const enable = (element) => {
    if (!isSupported || typeof window === 'undefined') {
      return
    }

    state.element = element ?? window
    const target = state.element ?? window
    target.addEventListener('pointermove', onPointerMove, { passive: true })
    target.addEventListener('pointerleave', onPointerLeave, { passive: true })
    isActive.value = true
    state.opacity = 1
    if (!state.rAF) {
      state.rAF = window.requestAnimationFrame(tick)
    }
  }

  const disable = () => {
    if (typeof window !== 'undefined' && state.element) {
      state.element.removeEventListener('pointermove', onPointerMove)
      state.element.removeEventListener('pointerleave', onPointerLeave)
    }

    if (state.rAF) {
      window.cancelAnimationFrame(state.rAF)
      state.rAF = 0
    }

    state.opacity = 0
    applyStyle()
    isActive.value = false
    state.element = null
  }

  const glowStyle = computed(() => ({
    opacity: state.opacity,
    transform: `translate3d(${state.x - offset}px, ${state.y - offset}px, 0)`
  }))

  onBeforeUnmount(disable)

  return {
    mouseGlowRef,
    glowStyle,
    isSupported,
    isActive,
    enable,
    disable
  }
}

