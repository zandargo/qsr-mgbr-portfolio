<template>
  <component :is="tag" ref="titleRef" v-bind="attrs" :class="['scramble-title', attrs.class]">
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

    playScramble(target, targetText, {
      duration: props.duration,
      chars: 'a-zA-Z0-9!%#_',
      from: 'center',
      reversed: false,
      cursor: '_'
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
    startLoop()
  })

  onBeforeUnmount(() => {
    clearLoopTimer()
    cancelScramble()
  })
</script>

<style scoped>
  .scramble-title {
    display: block;
    white-space: pre-line;
  }
</style>
