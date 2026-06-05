<template>
	<div class="background-layer" aria-hidden="true">
		<div class="background-gradient" />
		<div class="background-grid" />
		<div class="background-noise" />
	</div>
</template>

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
		inset: -10%;
		background:
			radial-gradient(circle at 25% 20%, rgba(0, 255, 136, 0.12), transparent 40%),
			radial-gradient(circle at 78% 34%, rgba(125, 255, 202, 0.08), transparent 32%),
			radial-gradient(circle at 48% 76%, rgba(0, 255, 136, 0.07), transparent 28%);
	}

	.background-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(125, 255, 202, 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(125, 255, 202, 0.06) 1px, transparent 1px);
		background-size: 80px 80px;
		opacity: 0.18;
	}

	.background-noise {
		position: absolute;
		inset: 0;
		background-image: repeating-linear-gradient(0deg,
				rgba(255, 255, 255, 0.02) 0,
				rgba(255, 255, 255, 0.02) 1px,
				transparent 1px,
				transparent 3px);
		opacity: 0.015;
	}
</style>
