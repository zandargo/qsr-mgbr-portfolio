import Lenis from 'lenis'

let lenisInstance = null
let rafId = null
let consumers = 0

function startRafLoop() {
  if (!lenisInstance || rafId) {
    return
  }

  const raf = (time) => {
    lenisInstance?.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)
}

function stopRafLoop() {
  if (!rafId) {
    return
  }

  cancelAnimationFrame(rafId)
  rafId = null
}

export function useLenis() {
  const init = (options = {}) => {
    if (typeof window === 'undefined') {
      return null
    }

    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        ...options
      })
      startRafLoop()
    }

    consumers += 1
    return lenisInstance
  }

  const scrollTo = (target, options = {}) => {
    if (!lenisInstance) {
      if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }

    lenisInstance.scrollTo(target, {
      offset: -110,
      duration: 1.05,
      ...options
    })
  }

  const destroy = (force = false) => {
    if (!lenisInstance) {
      return
    }

    consumers = force ? 0 : Math.max(0, consumers - 1)
    if (!force && consumers > 0) {
      return
    }

    stopRafLoop()
    lenisInstance.destroy()
    lenisInstance = null
  }

  const getLenis = () => lenisInstance

  return {
    init,
    scrollTo,
    destroy,
    getLenis
  }
}

