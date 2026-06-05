import { onBeforeUnmount } from 'vue'

export function useIntersectionReveal(options = {}) {
  const {
    root = null,
    rootMargin = '0px 0px -10% 0px',
    threshold = 0.25,
    once = true,
    onReveal = null,
    onChange = null
  } = options

  const observedElements = new Set()
  let observer = null

  const createObserver = () => {
    if (typeof window === 'undefined' || observer) {
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target

          if (onChange) {
            onChange(entry, element.__revealPayload)
          }

          if (entry.isIntersecting) {
            if (onReveal) {
              onReveal(entry, element.__revealPayload)
            }

            if (once && observer) {
              observer.unobserve(element)
              observedElements.delete(element)
            }
          }
        })
      },
      {
        root,
        rootMargin,
        threshold
      }
    )
  }

  const observe = (element, payload = null) => {
    if (!element) {
      return
    }

    createObserver()
    if (!observer) {
      return
    }

    element.__revealPayload = payload
    observer.observe(element)
    observedElements.add(element)
  }

  const unobserve = (element) => {
    if (!observer || !element) {
      return
    }

    observer.unobserve(element)
    observedElements.delete(element)
    delete element.__revealPayload
  }

  const disconnect = () => {
    if (!observer) {
      return
    }

    observedElements.forEach((element) => {
      delete element.__revealPayload
    })

    observer.disconnect()
    observedElements.clear()
    observer = null
  }

  onBeforeUnmount(() => {
    disconnect()
  })

  return {
    observe,
    unobserve,
    disconnect
  }
}

