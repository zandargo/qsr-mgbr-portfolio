<template>
	<article class="timeline-card glass-panel" :class="[`timeline-card--${side}`]" :data-side="side">
		<p class="timeline-card__year text-mono">{{ item.year }}</p>
		<h3 class="timeline-card__title text-display">{{ item.role }}</h3>
		<p class="timeline-card__company">{{ item.company }}</p>
		<p class="timeline-card__summary">{{ item.summary }}</p>
	</article>
</template>

<script setup>
	defineProps({
		item: {
			type: Object,
			required: true
		},
		side: {
			type: String,
			default: 'left',
			validator: (value) => ['left', 'right'].includes(value)
		}
	})
</script>

<style scoped>
	.timeline-card {
		position: relative;
		padding: var(--space-lg);
		opacity: 0;
		transform: translateY(28px);
		transition: border-color 220ms ease;
	}

	.timeline-card::before {
		content: '';
		position: absolute;
		top: 1.45rem;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--primary);
		box-shadow: 0 0 12px rgba(0, 255, 136, 0.75);
	}

	.timeline-card--left::before {
		right: -40px;
	}

	.timeline-card--right::before {
		left: -40px;
	}

	.timeline-card__year {
		margin: 0;
		font-size: 0.78rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--primary-soft);
	}

	.timeline-card__title {
		margin: var(--space-xs) 0 0;
		font-size: clamp(1.25rem, 2vw, 1.55rem);
		line-height: 1.05;
	}

	.timeline-card__company {
		margin: var(--space-xs) 0 0;
		color: var(--accent);
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.timeline-card__summary {
		margin: var(--space-sm) 0 0;
		color: var(--text-muted);
		line-height: 1.6;
	}

	@media (max-width: 960px) {
		.timeline-card {
			padding: var(--space-md) var(--space-lg);
		}

		.timeline-card::before {
			left: -30px;
			right: auto;
		}
	}
</style>
