<template>
  <component :is="tag" ref="titleRef" v-bind="attrs" :class="['scramble-title', attrs.class]" :data-text="displayedText">
    {{ displayedText }}
  </component>
</template>

<script setup>
  import { animate } from 'animejs'
  import { nextTick, onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue'
  import { useScrambleText } from '../../composables/useScrambleText'

  defineOptions({ inheritAttrs: false })

  const props = defineProps({
    text: {
      type: String,
      required: true
    },
    initialText: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'h1'
    },
    duration: {
      type: Number,
      default: 1400
    },
    intervalDelay: {
      type: Number,
      default: 2200
    }
  })

  const attrs = useAttrs()
  const titleRef = ref(null)
  const displayedText = ref(props.initialText || props.text)
  const { playScramble, cancelScramble } = useScrambleText()
  let loopTimer = null

  const syncOverlayText = (value) => {
    const target = titleRef.value
    if (!target) {
      return
    }

    target.setAttribute('data-text', value)
  }

  const clearLoopTimer = () => {
    if (loopTimer !== null) {
      window.clearTimeout(loopTimer)
      loopTimer = null
    }
  }

  const runScramble = async (targetText, animateIn = false) => {
    await nextTick()
    const target = titleRef.value
    if (!target) {
      displayedText.value = targetText
      return
    }

    syncOverlayText(target.textContent ?? displayedText.value)

    playScramble(target, targetText, {
      duration: props.duration,
      chars: 'a-zA-Z0-9!%#_',
      from: 'center',
      reversed: false,
      cursor: '_',
      onUpdateText: syncOverlayText
    })

    if (animateIn) {
      animate(target, {
        opacity: [0.92, 1],
        translateY: [8, 0],
        duration: 420,
        ease: 'outQuart'
      })
    }
  }

  const startLoop = async () => {
    clearLoopTimer()
    cancelScramble()

    const fromText = props.initialText || props.text
    const toText = props.text
    let forward = true

    displayedText.value = fromText
    await runScramble(toText, true)

    if (fromText === toText) {
      return
    }

    const loop = async () => {
      forward = !forward
      await runScramble(forward ? toText : fromText)
      loopTimer = window.setTimeout(loop, props.duration + props.intervalDelay)
    }

    loopTimer = window.setTimeout(loop, props.duration + props.intervalDelay)
  }

  watch(
    () => [props.text, props.initialText, props.duration, props.intervalDelay],
    () => {
      startLoop()
    }
  )

  onMounted(() => {
    syncOverlayText(displayedText.value)
    startLoop()
  })

  onBeforeUnmount(() => {
    clearLoopTimer()
    cancelScramble()
  })
</script>

<style scoped>
  .scramble-title {
    position: relative;
    display: block;
    white-space: pre-line;
    isolation: isolate;
    text-shadow:
      0 0 4px rgba(96, 255, 128, 0.85),
      0 0 12px rgba(96, 255, 128, 0.55),
      0 0 24px rgba(96, 255, 128, 0.35);
  }

  .scramble-title::before,
  .scramble-title::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    pointer-events: none;
    white-space: inherit;
  }

  .scramble-title::before {
    z-index: -1;
    color: rgba(120, 255, 155, 0.45);
    filter: blur(8px);
  }

  .scramble-title::after {
    color: transparent;
    background: repeating-linear-gradient(to bottom,
        rgba(185, 255, 185, 0.6) 0 1px,
        rgba(15, 55, 20, 0.2) 1px 3px);
    background-clip: text;
    -webkit-background-clip: text;
    mix-blend-mode: screen;
    opacity: 0.6;
  }
</style>
