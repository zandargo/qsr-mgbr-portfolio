<template>
	<div ref="sectionRef" class="section-container experience-section">
		<article class="experience-shell glass-panel glow-border">
			<header ref="headerRef" class="experience-header">
				<p class="section-kicker text-mono">Experience</p>
				<h2 id="experience-title" class="text-display">A connected track record of engineering and software delivery.</h2>
				<p class="experience-header__description">
					Each role added a stronger layer of systems thinking, from CAD execution to automation and product-grade frontend work.
				</p>
			</header>

			<div class="experience-timeline" aria-label="Professional experience timeline">
				<div class="experience-rail" aria-hidden="true">
					<div ref="lineFillRef" class="experience-rail__fill" />
				</div>

				<div class="experience-list">
					<ExperienceCard v-for="(item, index) in experienceItems" :key="`${item.year}-${item.company}`" :ref="(element) => setCardRef(element, index)" :item="item" :side="index % 2 === 0 ? 'left' : 'right'" />
				</div>
			</div>
		</article>
	</div>
</template>

<script setup>
	import { animate } from 'animejs'
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { useIntersectionReveal } from '../../composables/useIntersectionReveal'
	import ExperienceCard from './ExperienceCard.vue'

	const sectionRef = ref(null)
	const headerRef = ref(null)
	const lineFillRef = ref(null)
	const cardRefs = ref([])

	const experienceItems = [
		{
			year: '2010',
			company: 'Invento',
			role: 'CAD Designer',
			summary: 'Built accurate technical documentation and optimized drawing quality for manufacturing and installation workflows.'
		},
		{
			year: '2012',
			company: 'EKIPAR',
			role: 'Mechanical Designer',
			summary: 'Designed machines and assemblies with emphasis on manufacturability, reliability, and engineering clarity.'
		},
		{
			year: '2017',
			company: 'Sangati Berga',
			role: 'Innovation Agent',
			summary: 'Introduced automation routines and data-driven processes to reduce repetitive engineering operations.'
		},
		{
			year: '2022',
			company: 'Freelance · Upwork Top Rated Plus',
			role: 'Automation and Frontend Specialist',
			summary: 'Delivered custom software, CAD automation, and frontend systems for global clients in production contexts.'
		}
	]

	const lineState = { value: 0 }
	let lineAnimation = null

	const setCardRef = (element, index) => {
		if (!element) {
			return
		}

		cardRefs.value[index] = element.$el ?? element
	}

	const setLineProgress = (progress) => {
		lineAnimation?.pause?.()
		lineAnimation = animate(lineState, {
			value: Math.max(lineState.value, Math.min(1, progress)),
			duration: 380,
			ease: 'outQuad',
			onUpdate: () => {
				if (lineFillRef.value) {
					lineFillRef.value.style.transform = `scaleY(${lineState.value})`
				}
			}
		})
	}

	const playHeaderReveal = () => {
		if (!headerRef.value) {
			return
		}

		animate(headerRef.value, {
			opacity: [0, 1],
			translateY: [18, 0],
			duration: 620,
			ease: 'outQuad'
		})
	}

	const { observe, disconnect } = useIntersectionReveal({
		threshold: 0.22,
		rootMargin: '0px 0px -8% 0px',
		onReveal: (entry, payload) => {
			if (!payload) {
				return
			}

			animate(entry.target, {
				opacity: [0, 1],
				translateY: [24, 0],
				translateX: [payload.side === 'left' ? -18 : 18, 0],
				duration: 700,
				ease: 'outExpo'
			})

			const progress = (payload.index + 1) / experienceItems.length
			setLineProgress(progress)
		}
	})

	onMounted(() => {
		playHeaderReveal()
		cardRefs.value.forEach((card, index) => {
			if (!card) {
				return
			}

			observe(card, {
				index,
				side: index % 2 === 0 ? 'left' : 'right'
			})
		})
	})

	onBeforeUnmount(() => {
		disconnect()
		lineAnimation?.pause?.()
	})
</script>

<style scoped>
	.experience-section {
		padding-top: var(--space-2xl);
	}

	.experience-shell {
		padding: clamp(1.25rem, 2.8vw, 2.4rem);
		display: grid;
		gap: clamp(1.35rem, 2.7vw, 2.1rem);
	}

	.experience-header {
		display: grid;
		gap: var(--space-sm);
		opacity: 0;
	}

	.section-kicker {
		margin: 0;
		font-size: 0.72rem;
		letter-spacing: 0.17em;
		text-transform: uppercase;
		color: var(--primary-soft);
	}

	h2 {
		margin: 0;
		font-size: clamp(1.8rem, 3vw, 2.8rem);
		line-height: 1.06;
	}

	.experience-header__description {
		margin: 0;
		max-width: 74ch;
		line-height: 1.68;
		color: var(--text-muted);
	}

	.experience-timeline {
		position: relative;
		padding-inline: clamp(1rem, 2vw, 1.5rem);
	}

	.experience-rail {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 50%;
		width: 2px;
		background: rgba(125, 255, 202, 0.17);
		transform: translateX(-50%);
	}

	.experience-rail__fill {
		position: absolute;
		inset: 0;
		transform-origin: top center;
		transform: scaleY(0);
		background: linear-gradient(to bottom, var(--primary), var(--accent));
		box-shadow: 0 0 18px rgba(0, 255, 136, 0.46);
	}

	.experience-list {
		display: grid;
		gap: var(--space-lg);
	}

	:deep(.experience-card--left) {
		margin-right: calc(50% + 1.45rem);
	}

	:deep(.experience-card--right) {
		margin-left: calc(50% + 1.45rem);
	}

	@media (max-width: 1024px) {
		.experience-timeline {
			padding-inline: 0;
		}

		.experience-rail {
			left: 14px;
			transform: none;
		}

		:deep(.experience-card--left),
		:deep(.experience-card--right) {
			margin-left: 2.15rem;
			margin-right: 0;
		}
	}

	@media (max-width: 640px) {
		h2 {
			font-size: clamp(1.6rem, 7vw, 2.1rem);
		}

		:deep(.experience-card--left),
		:deep(.experience-card--right) {
			margin-left: 1.8rem;
		}
	}
</style>
