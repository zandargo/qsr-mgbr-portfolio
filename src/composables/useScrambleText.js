import { animate, scrambleText } from 'animejs'
import { onBeforeUnmount, ref } from 'vue'

export function useScrambleText() {
  const isRunning = ref(false)
  let activeAnimation = null

  const cancelScramble = () => {
    activeAnimation?.pause?.()
    activeAnimation = null
    isRunning.value = false
  }

  const playScramble = (target, text, options = {}) => {
    if (!target) {
      return null
    }

    cancelScramble()
    isRunning.value = true
    target.textContent = options.fromText ?? target.textContent ?? text

    activeAnimation = animate(target, {
      innerHTML: scrambleText({
        text,
        chars: options.chars ?? 'a-zA-Z0-9!%#_',
        ease: options.ease ?? 'outQuad',
        from: options.from ?? 'auto',
        reversed: options.reversed ?? false,
        cursor: options.cursor ?? '_',
        perturbation: options.perturbation ?? 0.12,
        seed: options.seed ?? 7
      }),
      duration: options.duration ?? 1400,
      ease: options.timelineEase ?? 'outQuart',
      onUpdate: () => {
        options.onUpdateText?.(target.textContent ?? '')
      },
      onComplete: () => {
        options.onUpdateText?.(target.textContent ?? text)
        isRunning.value = false
      }
    })

    return activeAnimation
  }

  onBeforeUnmount(cancelScramble)

  return {
    isRunning,
    playScramble,
    cancelScramble
  }
}

