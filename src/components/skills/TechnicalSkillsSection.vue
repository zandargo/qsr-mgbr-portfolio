<template>
	<div ref="sectionRef" class="section-container technical-skills-section">
		<article class="technical-shell glass-panel glow-border">
			<header ref="headerRef" class="technical-header">
				<p class="section-kicker text-mono">Technical Skills</p>
				<h2 id="technical-skills-title" class="text-display">Three domains. One delivery engine.</h2>
				<p class="technical-header__description">
					From frontend systems to mechanical design and automation pipelines, these are the technical layers I ship with daily.
				</p>
			</header>

			<div class="technical-groups">
				<section v-for="group in skillGroups" :key="group.key" class="group-block">
					<h3 class="group-title text-display">{{ group.title }}</h3>
					<ul class="skills-row" :aria-label="`${group.title} skills`">
						<li v-for="skill in group.skills" :key="`${group.key}-${skill.name}`" :ref="(element) => setCardRef(element, `${group.key}-${skill.name}`)" class="technical-skill-card glass-panel" tabindex="0">
							<SkillGauge :value="skill.value" :active="gaugesActive" />
							<div class="technical-skill-card__copy">
								<h4 class="text-display">{{ skill.name }}</h4>
								<p class="text-mono technical-skill-card__meta">{{ skill.years }} years experience</p>
								<p class="technical-skill-card__details">{{ skill.context }}</p>
							</div>
						</li>
					</ul>
				</section>
			</div>
		</article>
	</div>
</template>

<script setup>
	import { animate } from 'animejs'
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { useIntersectionReveal } from '../../composables/useIntersectionReveal'
	import SkillGauge from './SkillGauge.vue'

	const sectionRef = ref(null)
	const headerRef = ref(null)
	const gaugesActive = ref(false)
	const cardRefMap = new Map()

	const skillGroups = [
		{
			key: 'frontend',
			title: 'Frontend',
			skills: [
				{ name: 'Vue.js', value: 95, years: 6, context: 'Architecture for production SPAs, reusable components, and scalable composition patterns.' },
				{ name: 'Quasar', value: 90, years: 5, context: 'High-speed UI delivery with responsive design systems and custom theming.' },
				{ name: 'JavaScript', value: 94, years: 7, context: 'Complex UI behavior, data orchestration, and interaction-heavy experiences.' },
				{ name: 'Electron', value: 82, years: 3, context: 'Desktop apps connecting engineering workflows with modern interfaces.' },
				{ name: 'HTML/CSS', value: 96, years: 8, context: 'Semantic layout systems and polished interaction details for robust UI foundations.' }
			]
		},
		{
			key: 'engineering',
			title: 'Engineering',
			skills: [
				{ name: 'SolidWorks', value: 96, years: 10, context: 'Assemblies, parametric modeling, and manufacturing-ready technical outputs.' },
				{ name: 'AutoCAD', value: 90, years: 9, context: '2D detailing, layout standardization, and production documentation.' },
				{ name: 'SolidEdge', value: 80, years: 4, context: 'Mechanical part design and interoperability across engineering stacks.' },
				{ name: 'BIM', value: 74, years: 3, context: 'Structured model collaboration and project-aware documentation flows.' },
				{ name: '3D Printing', value: 88, years: 5, context: 'Prototype-to-iteration cycles for faster validation and design decisions.' }
			]
		},
		{
			key: 'automation',
			title: 'Automation',
			skills: [
				{ name: 'VBA', value: 93, years: 8, context: 'Automated CAD and spreadsheet routines to remove repetitive engineering tasks.' },
				{ name: 'Python', value: 87, years: 5, context: 'Data processing, scriptable tooling, and API-backed engineering utilities.' },
				{ name: 'REST APIs', value: 84, years: 4, context: 'Service integrations for product data sync, dashboards, and custom tools.' },
				{ name: 'Excel', value: 94, years: 10, context: 'Advanced formulas, process templates, and operational reporting systems.' },
				{ name: 'Design Automation', value: 91, years: 6, context: 'Workflow-first automation that accelerates delivery without sacrificing quality.' }
			]
		}
	]

	const setCardRef = (element, key) => {
		if (!element) {
			cardRefMap.delete(key)
			return
		}

		cardRefMap.set(key, element)
	}

	const playRevealAnimation = () => {
		if (headerRef.value) {
			animate(headerRef.value, {
				opacity: [0, 1],
				translateY: [22, 0],
				duration: 620,
				ease: 'outQuad'
			})
		}

		const cards = Array.from(cardRefMap.values())
		if (cards.length > 0) {
			animate(cards, {
				opacity: [0, 1],
				translateY: [20, 0],
				delay: (_, index) => index * 55,
				duration: 700,
				ease: 'outExpo'
			})
		}

		gaugesActive.value = true
	}

	const { observe, disconnect } = useIntersectionReveal({
		threshold: 0.2,
		rootMargin: '0px 0px -8% 0px',
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
	.technical-skills-section {
		padding-top: var(--space-2xl);
	}

	.technical-shell {
		padding: clamp(1.25rem, 2.8vw, 2.4rem);
		display: grid;
		gap: clamp(1.3rem, 2.8vw, 2.2rem);
	}

	.technical-header {
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

	.technical-header__description {
		margin: 0;
		color: var(--text-muted);
		line-height: 1.7;
		max-width: 72ch;
	}

	.technical-groups {
		display: grid;
		gap: var(--space-xl);
	}

	.group-block {
		display: grid;
		gap: var(--space-sm);
	}

	.group-title {
		margin: 0;
		font-size: clamp(1.05rem, 2vw, 1.45rem);
		letter-spacing: 0.05em;
		color: var(--accent);
	}

	.skills-row {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: var(--space-md);
	}

	.technical-skill-card {
		padding: var(--space-md);
		display: grid;
		justify-items: center;
		gap: var(--space-md);
		text-align: center;
		opacity: 0;
		transform: translateY(20px);
		border: 1px solid rgba(125, 255, 202, 0.18);
		transition:
			border-color 200ms ease,
			box-shadow 240ms ease,
			transform 220ms ease;
	}

	.technical-skill-card:hover,
	.technical-skill-card:focus-visible {
		outline: none;
		border-color: rgba(0, 255, 136, 0.45);
		box-shadow:
			0 0 0 1px rgba(0, 255, 136, 0.14) inset,
			0 0 22px rgba(0, 255, 136, 0.22);
		transform: translateY(-3px);
	}

	.technical-skill-card__copy {
		display: grid;
		gap: 0.35rem;
	}

	.technical-skill-card__copy h4 {
		margin: 0;
		font-size: 1.02rem;
	}

	.technical-skill-card__meta {
		margin: 0;
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--primary-soft);
	}

	.technical-skill-card__details {
		margin: 0;
		max-height: 0;
		opacity: 0;
		overflow: hidden;
		color: var(--text-muted);
		line-height: 1.55;
		transition:
			max-height 260ms ease,
			opacity 260ms ease,
			margin-top 260ms ease;
	}

	.technical-skill-card:hover .technical-skill-card__details,
	.technical-skill-card:focus-visible .technical-skill-card__details {
		max-height: 8.5rem;
		opacity: 1;
		margin-top: 0.4rem;
	}

	@media (max-width: 1280px) {
		.skills-row {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	@media (max-width: 1100px) {
		.skills-row {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media (max-width: 860px) {
		.skills-row {
			display: grid;
			grid-auto-flow: column;
			grid-auto-columns: minmax(220px, 74vw);
			overflow-x: auto;
			overscroll-behavior-x: contain;
			scroll-snap-type: x mandatory;
			padding-bottom: var(--space-xs);
		}

		.technical-skill-card {
			scroll-snap-align: start;
		}
	}

	@media (max-width: 640px) {
		h2 {
			font-size: clamp(1.6rem, 7vw, 2.15rem);
		}
	}
</style>
