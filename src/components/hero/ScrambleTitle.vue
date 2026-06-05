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
		}
	})

	const attrs = useAttrs()
	const titleRef = ref(null)
	const displayedText = ref(props.initialText || props.text)
	const { playScramble, cancelScramble } = useScrambleText()

	const runScramble = async () => {
		await nextTick()
		const target = titleRef.value
		if (!target) {
			displayedText.value = props.text
			return
		}

		displayedText.value = props.initialText || props.text
		playScramble(target, props.text, {
			duration: props.duration,
			chars: 'a-zA-Z0-9!%#_',
			from: 'center',
			reversed: false,
			cursor: '_'
		})
		animate(target, {
			opacity: [0.92, 1],
			translateY: [8, 0],
			duration: 420,
			ease: 'outQuart'
		})
	}

	watch(
		() => props.text,
		(value) => {
			displayedText.value = props.initialText || value
			runScramble()
		}
	)

	onMounted(() => {
		runScramble()
	})

	onBeforeUnmount(() => {
		cancelScramble()
	})
</script>

<style scoped>
	.scramble-title {
		display: block;
		white-space: pre-line;
	}
</style>
