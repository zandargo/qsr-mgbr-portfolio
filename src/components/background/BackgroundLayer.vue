<template>
	<div class="background-layer" aria-hidden="true">
		<div class="background-gradient" />
		<CircuitBoard ref="circuitBoardRef" />
		<div class="background-noise" />
	</div>
</template>

<script setup>
	import { animate } from 'animejs'
	import { onMounted, onUnmounted, ref } from 'vue'
	import CircuitBoard from './CircuitBoard.vue'
	import { useCircuitAnimation } from '../../composables/useCircuitAnimation'

	let gradientAnimation = null
	const circuitBoardRef = ref(null)
	const { start, stop, destroy, triggerPulseBurst } = useCircuitAnimation()

	const handlePulseBurst = () => {
		triggerPulseBurst()
	}

	const getCircuitRoot = () => {
		return circuitBoardRef.value?.circuitRoot ?? null
	}

	onMounted(() => {
		gradientAnimation = animate('.background-gradient', {
			'--gradient-a-x': ['16%', '78%'],
			'--gradient-a-y': ['22%', '66%'],
			'--gradient-b-x': ['84%', '26%'],
			'--gradient-b-y': ['32%', '76%'],
			'--gradient-c-x': ['52%', '70%'],
			'--gradient-c-y': ['82%', '28%'],
			duration: 36000,
			ease: 'inOutSine',
			direction: 'alternate',
			loop: true
		})

		start(getCircuitRoot())
		window.addEventListener('circuit:pulse-burst', handlePulseBurst)
	})

	onUnmounted(() => {
		gradientAnimation?.pause()
		gradientAnimation = null
		window.removeEventListener('circuit:pulse-burst', handlePulseBurst)
		stop()
		destroy()
	})

	defineExpose({
		triggerCircuitPulseBurst: triggerPulseBurst
	})
</script>

<style scoped>
	.background-layer {
		position: fixed;
		inset: 0;
		z-index: -100;
		overflow: hidden;
		pointer-events: none;
	}

	.background-gradient {
		position: absolute;
		inset: -14%;
		--gradient-a-x: 16%;
		--gradient-a-y: 22%;
		--gradient-b-x: 84%;
		--gradient-b-y: 32%;
		--gradient-c-x: 52%;
		--gradient-c-y: 82%;
		background:
			radial-gradient(circle at var(--gradient-a-x) var(--gradient-a-y), rgba(0, 255, 136, 0.11), transparent 46%),
			radial-gradient(circle at var(--gradient-b-x) var(--gradient-b-y), rgba(125, 255, 202, 0.08), transparent 40%),
			radial-gradient(circle at var(--gradient-c-x) var(--gradient-c-y), rgba(0, 255, 136, 0.06), transparent 34%);
	}

	.background-noise {
		position: absolute;
		inset: 0;
		mix-blend-mode: screen;
		background-image: repeating-linear-gradient(0deg,
				rgba(255, 255, 255, 0.02) 0,
				rgba(255, 255, 255, 0.02) 1px,
				transparent 1px,
				transparent 3px);
		opacity: 0.015;
	}
</style>
