import { animate, svg } from 'animejs'

const DEFAULT_LOOP_DURATION = 6200
const DEFAULT_BURST_DURATION = 1500

function getMotionPath(path, offset = 0) {
  const normalizedOffset = Number.isFinite(offset) ? offset : 0
  return svg.createMotionPath(path, normalizedOffset)
}

export function useCircuitAnimation() {
  let containerEl = null
  let isRunning = false
  const loopAnimations = []
  const burstAnimations = new Set()

  const parseDuration = (value, fallback) => {
    const parsed = Number.parseInt(value ?? '', 10)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
  }

  const parseOffset = (value) => {
    const parsed = Number.parseFloat(value ?? '')
    return Number.isFinite(parsed) ? parsed : 0
  }

  const flashCircuitPaths = (root, intensity = 1) => {
    const paths = root.querySelectorAll('.js-circuit-path')
    if (paths.length === 0) {
      return
    }

    const clampedIntensity = Math.max(1, Math.min(3, intensity))
    const flashDuration = 760 / clampedIntensity

    paths.forEach((path) => {
      const flashAnimation = animate(path, {
        stroke: ['rgba(125, 255, 202, 0.22)', 'rgba(0, 255, 136, 0.86)', 'rgba(125, 255, 202, 0.22)'],
        duration: flashDuration,
        ease: 'inOutSine'
      })
      burstAnimations.add(flashAnimation)
      flashAnimation.then(() => {
        burstAnimations.delete(flashAnimation)
      })
    })
  }

  const buildLoopAnimations = (root) => {
    const pulses = root.querySelectorAll('.js-circuit-pulse')
    pulses.forEach((pulse) => {
      const pathId = pulse.getAttribute('data-path-id')
      if (!pathId) {
        return
      }

      const pathEl = root.querySelector(`#${pathId}`)
      if (!pathEl) {
        return
      }

      const duration = parseDuration(pulse.getAttribute('data-duration'), DEFAULT_LOOP_DURATION)
      const offset = parseOffset(pulse.getAttribute('data-offset'))
      const motionPath = getMotionPath(pathEl, offset)

      const pulseAnimation = animate(pulse, {
        ...motionPath,
        opacity: [0, 1, 1, 0],
        scale: [0.75, 1.16, 1, 0.72],
        duration,
        ease: 'linear',
        loop: true,
        autoplay: false
      })

      loopAnimations.push(pulseAnimation)
    })
  }

  const start = (target) => {
    if (target) {
      containerEl = target
    }

    if (!containerEl || isRunning) {
      return
    }

    if (loopAnimations.length === 0) {
      buildLoopAnimations(containerEl)
    }

    loopAnimations.forEach((animationInstance) => {
      animationInstance.play()
    })

    isRunning = true
  }

  const stop = () => {
    loopAnimations.forEach((animationInstance) => {
      animationInstance.pause()
    })

    burstAnimations.forEach((animationInstance) => {
      animationInstance.cancel()
    })
    burstAnimations.clear()
    isRunning = false
  }

  const triggerPulseBurst = (intensity = 1) => {
    if (!containerEl) {
      return
    }

    const burstPulses = containerEl.querySelectorAll('.js-circuit-burst')
    if (burstPulses.length === 0) {
      flashCircuitPaths(containerEl, intensity)
      return
    }

    const clampedIntensity = Math.max(1, Math.min(3, intensity))
    const burstDurationScale = 1 / clampedIntensity

    burstPulses.forEach((pulse) => {
      const pathId = pulse.getAttribute('data-path-id')
      if (!pathId) {
        return
      }

      const pathEl = containerEl.querySelector(`#${pathId}`)
      if (!pathEl) {
        return
      }

      const duration = parseDuration(pulse.getAttribute('data-duration'), DEFAULT_BURST_DURATION) * burstDurationScale
      const offset = parseOffset(pulse.getAttribute('data-offset'))
      const motionPath = getMotionPath(pathEl, offset)

      const burstAnimation = animate(pulse, {
        ...motionPath,
        opacity: [0, 1, 0],
        scale: [0.7, 1.4, 0.64],
        duration,
        ease: 'outExpo'
      })

      burstAnimations.add(burstAnimation)
      burstAnimation.then(() => {
        burstAnimations.delete(burstAnimation)
      })
    })

    flashCircuitPaths(containerEl, clampedIntensity)
  }

  const destroy = () => {
    stop()
    loopAnimations.forEach((animationInstance) => {
      animationInstance.cancel()
    })
    loopAnimations.length = 0
    containerEl = null
  }

  return {
    start,
    stop,
    destroy,
    triggerPulseBurst
  }
}

