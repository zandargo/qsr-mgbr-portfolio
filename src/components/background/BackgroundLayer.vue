<template>
	<div class="background-layer" aria-hidden="true">
		<div class="background-gradient" />
		<svg class="background-circuit" viewBox="0 0 1920 1080" preserveAspectRatio="none">
			<g class="background-circuit__paths">
				<path d="M80 210 H420 V340 H760 V520 H1130" />
				<path d="M170 800 H510 V660 H930 V860 H1280 V940 H1680" />
				<path d="M320 120 H320 V470 H590 V710 H910" />
				<path d="M1240 120 V320 H1520 V500 H1840" />
				<path d="M1420 390 H1100 V600 H760 V840" />
				<path d="M1550 940 V730 H1370 V540 H1040 V390 H870" />
			</g>
		</svg>
		<div class="background-noise" />
	</div>
</template>

<script setup>
	import { animate } from 'animejs'
	import { onMounted, onUnmounted } from 'vue'

	let gradientAnimation = null

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
	})

	onUnmounted(() => {
		gradientAnimation?.pause()
		gradientAnimation = null
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

	.background-circuit {
		position: absolute;
		inset: 0;
		opacity: 0.2;
		filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.12));
	}

	.background-circuit__paths {
		fill: none;
		stroke: rgba(125, 255, 202, 0.22);
		stroke-width: 1.4;
		stroke-linecap: square;
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke;
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
