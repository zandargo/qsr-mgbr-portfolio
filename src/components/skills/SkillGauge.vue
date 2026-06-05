<template>
	<div class="skill-gauge" :style="{ width: `${size}px`, height: `${size}px` }" aria-hidden="true">
		<svg class="skill-gauge__svg" :viewBox="`0 0 ${size} ${size}`" role="presentation">
			<circle class="skill-gauge__track" :cx="center" :cy="center" :r="radius" :stroke-width="strokeWidth" fill="none" />
			<circle class="skill-gauge__progress" :cx="center" :cy="center" :r="radius" :stroke-width="strokeWidth" :stroke-dasharray="metrics.strokeDasharray" :stroke-dashoffset="metrics.strokeDashoffset" fill="none" />
		</svg>
		<div class="skill-gauge__value text-display">{{ Math.round(displayPercent) }}%</div>
	</div>
</template>

<script setup>
	import { animate } from 'animejs'
	import { computed, onBeforeUnmount, ref, watch } from 'vue'
	import { buildGaugeMetrics, normalizePercent } from '../../composables/useSkillGauge'

	const props = defineProps({
		value: {
			type: Number,
			required: true
		},
		active: {
			type: Boolean,
			default: false
		},
		size: {
			type: Number,
			default: 144
		},
		strokeWidth: {
			type: Number,
			default: 9
		}
	})

	const displayPercent = ref(0)
	let gaugeAnimation = null

	const center = computed(() => props.size / 2)
	const radius = computed(() => (props.size - props.strokeWidth) / 2)
	const metrics = computed(() => buildGaugeMetrics(displayPercent.value, radius.value))

	const runAnimation = (target) => {
		gaugeAnimation?.pause?.()
		gaugeAnimation = animate(displayPercent, {
			value: target,
			duration: 900,
			delay: 120,
			ease: 'outExpo'
		})
	}

	watch(
		() => [props.active, props.value],
		([active, value]) => {
			const target = active ? normalizePercent(value) : 0
			runAnimation(target)
		},
		{ immediate: true }
	)

	onBeforeUnmount(() => {
		gaugeAnimation?.pause?.()
	})
</script>

<style scoped>
	.skill-gauge {
		position: relative;
		display: grid;
		place-items: center;
	}

	.skill-gauge__svg {
		transform: rotate(-90deg);
		width: 100%;
		height: 100%;
	}

	.skill-gauge__track {
		stroke: rgba(125, 255, 202, 0.16);
	}

	.skill-gauge__progress {
		stroke: var(--primary);
		stroke-linecap: round;
		filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.55));
		transition: stroke 220ms ease;
	}

	.skill-gauge__value {
		position: absolute;
		font-size: clamp(1.1rem, 2.8vw, 1.5rem);
		letter-spacing: 0.03em;
	}
</style>
