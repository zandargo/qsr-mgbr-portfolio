<template>
	<svg ref="circuitRoot" class="background-circuit" viewBox="0 0 1920 1080" preserveAspectRatio="none">
		<g class="background-circuit__paths">
			<path id="circuit-path-1" class="js-circuit-path" d="M80 210 H420 V340 H760 V520 H1130" />
			<path id="circuit-path-2" class="js-circuit-path" d="M170 800 H510 V660 H930 V860 H1280 V940 H1680" />
			<path id="circuit-path-3" class="js-circuit-path" d="M320 120 H320 V470 H590 V710 H910" />
			<path id="circuit-path-4" class="js-circuit-path" d="M1240 120 V320 H1520 V500 H1840" />
			<path id="circuit-path-5" class="js-circuit-path" d="M1420 390 H1100 V600 H760 V840" />
			<path id="circuit-path-6" class="js-circuit-path" d="M1550 940 V730 H1370 V540 H1040 V390 H870" />
		</g>

		<g class="background-circuit__pulses">
			<circle class="circuit-pulse js-circuit-pulse" data-path-id="circuit-path-1" data-duration="6200" data-offset="0.03" cx="0" cy="0" r="3.2" />
			<circle class="circuit-pulse js-circuit-pulse" data-path-id="circuit-path-2" data-duration="7000" data-offset="0.22" cx="0" cy="0" r="3" />
			<circle class="circuit-pulse js-circuit-pulse" data-path-id="circuit-path-3" data-duration="5600" data-offset="0.58" cx="0" cy="0" r="2.8" />
			<circle class="circuit-pulse js-circuit-pulse" data-path-id="circuit-path-4" data-duration="6400" data-offset="0.36" cx="0" cy="0" r="3" />
			<circle class="circuit-pulse js-circuit-pulse" data-path-id="circuit-path-5" data-duration="5900" data-offset="0.68" cx="0" cy="0" r="3.1" />
			<circle class="circuit-pulse js-circuit-pulse" data-path-id="circuit-path-6" data-duration="6600" data-offset="0.48" cx="0" cy="0" r="2.9" />
		</g>

		<g class="background-circuit__pulses background-circuit__pulses--burst">
			<circle class="circuit-pulse circuit-pulse--burst js-circuit-burst" data-path-id="circuit-path-1" data-duration="1400" data-offset="0.18" cx="0" cy="0" r="4" />
			<circle class="circuit-pulse circuit-pulse--burst js-circuit-burst" data-path-id="circuit-path-2" data-duration="1600" data-offset="0.62" cx="0" cy="0" r="4.1" />
			<circle class="circuit-pulse circuit-pulse--burst js-circuit-burst" data-path-id="circuit-path-4" data-duration="1300" data-offset="0.35" cx="0" cy="0" r="3.8" />
			<circle class="circuit-pulse circuit-pulse--burst js-circuit-burst" data-path-id="circuit-path-6" data-duration="1450" data-offset="0.74" cx="0" cy="0" r="4.1" />
		</g>
	</svg>
</template>

<script setup>
	import { ref } from 'vue'

	const circuitRoot = ref(null)

	defineExpose({
		circuitRoot
	})
</script>

<style scoped>
	.background-circuit {
		position: absolute;
		inset: 0;
		opacity: 0.2;
		filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.12));
		pointer-events: none;
	}

	.background-circuit__paths {
		fill: none;
		stroke: rgba(125, 255, 202, 0.22);
		stroke-width: 1.4;
		stroke-linecap: square;
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke;
	}

	.background-circuit__pulses {
		mix-blend-mode: screen;
	}

	.circuit-pulse {
		fill: rgba(125, 255, 202, 0.95);
		opacity: 0;
		filter: drop-shadow(0 0 9px rgba(0, 255, 136, 0.8));
	}

	.circuit-pulse--burst {
		fill: rgba(0, 255, 136, 0.98);
		filter: drop-shadow(0 0 14px rgba(0, 255, 136, 0.92));
	}
</style>
