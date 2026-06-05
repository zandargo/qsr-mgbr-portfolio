<template>
	<div ref="sectionRef" class="section-container soft-skills-section">
		<article class="skills-shell glass-panel glow-border">
			<header class="skills-header">
				<p class="section-kicker text-mono">{{ t('softSkills.kicker') }}</p>
				<h2 id="soft-skills-title" class="text-display">{{ t('softSkills.title') }}</h2>
				<p class="skills-header__description">
					{{ t('softSkills.description') }}
				</p>
			</header>

			<div class="skills-stage">
				<div class="skills-chart glass-panel">
					<RadarChart />
				</div>

				<ul class="traits-cloud" :aria-label="t('softSkills.traitsAria')">
					<li v-for="(trait, index) in traits" :key="trait" :ref="(element) => setTraitRef(element, index)" class="trait-chip text-mono">
						{{ trait }}
					</li>
				</ul>
			</div>
		</article>
	</div>
</template>

<script setup>
	import { animate } from 'animejs'
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { useI18n } from 'vue-i18n'
	import { useIntersectionReveal } from '../../composables/useIntersectionReveal'
	import RadarChart from './RadarChart.vue'

	const { t } = useI18n()

	const sectionRef = ref(null)
	const traitRefs = ref([])

	const traits = computed(() => [
		t('softSkills.traits.0'),
		t('softSkills.traits.1'),
		t('softSkills.traits.2'),
		t('softSkills.traits.3'),
		t('softSkills.traits.4'),
		t('softSkills.traits.5'),
		t('softSkills.traits.6'),
		t('softSkills.traits.7')
	])

	const setTraitRef = (element, index) => {
		if (!element) {
			return
		}

		traitRefs.value[index] = element
	}

	const playRevealAnimation = () => {
		animate('.skills-header', {
			opacity: [0, 1],
			translateY: [20, 0],
			duration: 520,
			ease: 'outQuad'
		})

		animate('.skills-chart', {
			opacity: [0, 1],
			scale: [0.97, 1],
			duration: 720,
			ease: 'outQuart'
		})

		if (traitRefs.value.length > 0) {
			animate(traitRefs.value, {
				opacity: [0, 1],
				translateY: [14, 0],
				scale: [0.95, 1],
				delay: (_, index) => 180 + index * 65,
				duration: 620,
				ease: 'outExpo'
			})
		}
	}

	const { observe, disconnect } = useIntersectionReveal({
		threshold: 0.3,
		rootMargin: '0px 0px -10% 0px',
		onReveal: () => {
			playRevealAnimation()
		}
	})

	onMounted(() => {
		if (sectionRef.value) {
			observe(sectionRef.value)
		}
	})

	onBeforeUnmount(() => {
		disconnect()
	})
</script>

<style scoped>
	.soft-skills-section {
		padding-top: var(--space-2xl);
	}

	.skills-shell {
		padding: clamp(1.3rem, 2.6vw, 2.3rem);
		display: grid;
		gap: clamp(1.2rem, 2.5vw, 2rem);
	}

	.skills-header {
		display: grid;
		gap: var(--space-sm);
		opacity: 0;
	}

	.section-kicker {
		margin: 0;
		color: var(--primary-soft);
		letter-spacing: 0.17em;
		text-transform: uppercase;
		font-size: 0.72rem;
	}

	h2 {
		margin: 0;
		font-size: clamp(1.8rem, 3vw, 2.8rem);
		line-height: 1.08;
		max-width: 23ch;
	}

	.skills-header__description {
		margin: 0;
		color: var(--text-muted);
		line-height: 1.7;
		max-width: 72ch;
	}

	.skills-stage {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(260px, 0.7fr);
		gap: clamp(1rem, 2.5vw, 2rem);
		align-items: center;
	}

	.skills-chart {
		padding: clamp(0.75rem, 2vw, 1.25rem);
		border: 1px solid rgba(125, 255, 202, 0.2);
		opacity: 0;
	}

	.traits-cloud {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		justify-content: flex-start;
	}

	.trait-chip {
		padding: 0.55rem 0.85rem;
		border-radius: 999px;
		border: 1px solid rgba(125, 255, 202, 0.18);
		background: rgba(16, 22, 19, 0.7);
		color: var(--text-muted);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0;
		transform: translateY(14px);
		transition:
			color 200ms ease,
			border-color 200ms ease,
			box-shadow 200ms ease,
			transform 200ms ease;
	}

	.trait-chip:hover {
		color: var(--text);
		border-color: rgba(0, 255, 136, 0.45);
		box-shadow:
			0 0 0 1px rgba(0, 255, 136, 0.16) inset,
			0 0 20px rgba(0, 255, 136, 0.22);
		transform: translateY(-2px) scale(1.02);
	}

	@media (max-width: 980px) {
		.skills-stage {
			grid-template-columns: 1fr;
		}

		.skills-chart {
			max-width: 780px;
		}
	}

	@media (max-width: 680px) {
		h2 {
			font-size: clamp(1.6rem, 7vw, 2.1rem);
		}

		.traits-cloud {
			gap: 0.45rem;
		}

		.trait-chip {
			font-size: 0.68rem;
			padding: 0.5rem 0.7rem;
		}
	}
</style>
