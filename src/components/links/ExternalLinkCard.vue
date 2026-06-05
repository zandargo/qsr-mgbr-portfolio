<template>
	<article ref="cardRef" class="external-link-card glass-panel" :class="`external-link-card--${variant}`" tabindex="0" :aria-label="`${item.title} external card`">
		<div class="external-link-card__media" :style="mediaStyle" aria-hidden="true">
			<div class="external-link-card__reflection" />
			<p class="external-link-card__badge text-mono">{{ item.badge }}</p>
		</div>

		<div class="external-link-card__content">
			<h3 class="external-link-card__title text-display">{{ item.title }}</h3>
			<p class="external-link-card__description">{{ item.description }}</p>

			<ul v-if="item.tags?.length" class="external-link-card__tags" :aria-label="`${item.title} tags`">
				<li v-for="tag in item.tags" :key="`${item.title}-${tag}`" class="external-link-card__tag text-mono">{{ tag }}</li>
			</ul>

			<a class="external-link-card__cta" :href="item.href" target="_blank" rel="noopener noreferrer" :aria-label="`Open ${item.title} in a new tab`">
				<span>{{ item.ctaLabel }}</span>
				<span aria-hidden="true">&#8594;</span>
			</a>
		</div>
	</article>
</template>

<script setup>
	import VanillaTilt from 'vanilla-tilt'
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

	const props = defineProps({
		item: {
			type: Object,
			required: true
		},
		variant: {
			type: String,
			default: 'profile'
		}
	})

	const cardRef = ref(null)

	const mediaStyle = computed(() => ({
		background: props.item.mediaBackground
	}))

	const shouldEnableTilt = () => {
		if (typeof window === 'undefined') {
			return false
		}

		const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
		const isTouchOnly = window.matchMedia?.('(pointer: coarse)').matches

		return !prefersReducedMotion && !isTouchOnly
	}

	onMounted(() => {
		if (!cardRef.value || !shouldEnableTilt()) {
			return
		}

		VanillaTilt.init(cardRef.value, {
			max: 8,
			speed: 420,
			scale: 1.015,
			glare: true,
			'max-glare': 0.18,
			gyroscope: false
		})
	})

	onBeforeUnmount(() => {
		cardRef.value?.vanillaTilt?.destroy?.()
	})
</script>

<style scoped>
	.external-link-card {
		position: relative;
		display: grid;
		grid-template-rows: 180px 1fr;
		overflow: hidden;
		border: 1px solid rgba(125, 255, 202, 0.2);
		background: linear-gradient(165deg, rgba(14, 19, 16, 0.9), rgba(9, 13, 11, 0.78));
		transition:
			transform 240ms ease,
			border-color 240ms ease,
			box-shadow 240ms ease;
	}

	.external-link-card:hover,
	.external-link-card:focus-visible {
		outline: none;
		transform: translateY(-4px);
		border-color: rgba(0, 255, 136, 0.46);
		box-shadow:
			0 0 0 1px rgba(0, 255, 136, 0.12) inset,
			0 0 26px rgba(0, 255, 136, 0.2);
	}

	.external-link-card__media {
		position: relative;
		display: grid;
		align-items: end;
		padding: var(--space-md);
		border-bottom: 1px solid rgba(125, 255, 202, 0.2);
		background-size: cover;
		background-position: center;
		overflow: hidden;
	}

	.external-link-card__reflection {
		position: absolute;
		inset: -20% auto auto -36%;
		width: 54%;
		height: 185%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.17), transparent);
		transform: rotate(18deg) translateX(-24%);
		opacity: 0;
		transition: transform 420ms ease, opacity 260ms ease;
	}

	.external-link-card:hover .external-link-card__reflection,
	.external-link-card:focus-visible .external-link-card__reflection {
		opacity: 1;
		transform: rotate(18deg) translateX(116%);
	}

	.external-link-card__badge {
		margin: 0;
		padding: 0.32rem 0.55rem;
		width: fit-content;
		font-size: 0.66rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text);
		border-radius: 999px;
		border: 1px solid rgba(125, 255, 202, 0.28);
		background: rgba(7, 11, 8, 0.58);
	}

	.external-link-card__content {
		padding: var(--space-md);
		display: grid;
		gap: var(--space-sm);
	}

	.external-link-card__title {
		margin: 0;
		font-size: clamp(1.08rem, 2vw, 1.32rem);
		line-height: 1.12;
	}

	.external-link-card__description {
		margin: 0;
		color: var(--text-muted);
		line-height: 1.56;
	}

	.external-link-card__tags {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.38rem;
	}

	.external-link-card__tag {
		padding: 0.3rem 0.52rem;
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--primary-soft);
		border: 1px solid rgba(125, 255, 202, 0.24);
		border-radius: 999px;
		background: rgba(16, 22, 19, 0.7);
	}

	.external-link-card__cta {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.65rem;
		padding: 0.54rem 0.8rem;
		border-radius: 999px;
		border: 1px solid rgba(125, 255, 202, 0.26);
		background: rgba(12, 18, 14, 0.62);
		color: var(--text);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		text-decoration: none;
		transition: border-color 180ms ease, box-shadow 180ms ease;
	}

	.external-link-card__cta:hover,
	.external-link-card__cta:focus-visible {
		outline: none;
		border-color: rgba(0, 255, 136, 0.52);
		box-shadow: 0 0 0 1px rgba(0, 255, 136, 0.14) inset;
	}

	.external-link-card--product {
		grid-template-rows: 220px 1fr;
	}

	.external-link-card--product .external-link-card__cta {
		border-color: rgba(0, 255, 136, 0.44);
		background: linear-gradient(135deg, rgba(0, 255, 136, 0.18), rgba(125, 255, 202, 0.12));
	}
</style>
