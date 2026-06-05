<template>
	<div ref="heroRootRef" class="section-container hero-section">
		<div ref="mouseGlowRef" class="mouse-glow" :style="glowStyle" aria-hidden="true" />

		<article class="hero-shell glass-panel glow-border">
			<div class="hero-copy">
				<div class="hero-branding">
					<div class="brand-mark" aria-hidden="true">
						<span class="brand-mark__ring" />
						<span class="brand-mark__hub" />
					</div>
					<p class="eyebrow text-mono">Mechanical Intelligence</p>
				</div>

				<ScrambleTitle id="hero-title" class="hero-title text-display" text="MADSON GERMANO" initial-text="M4D50N G3RM4N0" />

				<div class="role-stack" aria-label="Primary roles">
					<p>Mechanical Engineer</p>
					<p>Frontend Developer</p>
					<p>Automation Specialist</p>
				</div>

				<div class="tag-row" aria-live="polite">
					<span class="tag-row__label text-mono">Currently focused on</span>
					<span ref="tagRef" class="tag-row__value text-display">{{ activeTag }}</span>
				</div>

				<div class="action-row">
					<a class="action-button action-button--solid" href="https://github.com/zandargo/qsr-mgbr-portfolio" target="_blank" rel="noreferrer">
						<Icon icon="mdi:github" />
						<span>GitHub</span>
					</a>
					<a class="action-button" href="#links">
						<Icon icon="mdi:linkedin" />
						<span>LinkedIn</span>
					</a>
					<a class="action-button" href="#contact">
						<Icon icon="mdi:file-document-outline" />
						<span>Resume</span>
					</a>
				</div>

				<a class="scroll-hint text-mono" href="#biography">
					<span>Scroll for timeline</span>
					<Icon icon="mdi:chevron-down" class="scroll-hint__icon" />
				</a>
			</div>

			<div class="hero-status glass-panel">
				<p class="status-label text-mono">Profile Signal</p>
				<div class="status-card">
					<p>Designed like a workstation.</p>
					<p>Built for mechanical systems, CAD automation, and polished frontend delivery.</p>
				</div>
				<ul class="status-metrics">
					<li>
						<span class="metric-value text-display">3</span>
						<span class="metric-label">Core disciplines</span>
					</li>
					<li>
						<span class="metric-value text-display">1</span>
						<span class="metric-label">Portfolio system</span>
					</li>
					<li>
						<span class="metric-value text-display">24/7</span>
						<span class="metric-label">Available to iterate</span>
					</li>
				</ul>
			</div>
		</article>
	</div>
</template>

<script setup>
	import { Icon } from '@iconify/vue'
	import { animate } from 'animejs'
	import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
	import ScrambleTitle from './ScrambleTitle.vue'
	import { useMouseGlow } from '../../composables/useMouseGlow'

	const heroRootRef = ref(null)
	const tagRef = ref(null)
	const activeTag = ref('Vue.js')

	const techTags = ['Vue.js', 'Quasar', 'SolidWorks', 'Python', 'VBA', 'PLM', 'CAD Automation']
	let tagIndex = 0
	let tagTimer = null

	const { glowStyle, enable, disable, mouseGlowRef } = useMouseGlow()

	const rotateTag = () => {
		const nextIndex = (tagIndex + 1) % techTags.length
		const nextTag = techTags[nextIndex]
		const tagNode = tagRef.value

		if (!tagNode) {
			activeTag.value = nextTag
			tagIndex = nextIndex
			return
		}

		animate(tagNode, {
			opacity: [1, 0],
			translateY: [0, -10],
			duration: 260,
			ease: 'inQuad',
			onComplete: () => {
				activeTag.value = nextTag
				animate(tagNode, {
					opacity: [0, 1],
					translateY: [10, 0],
					duration: 420,
					ease: 'outQuart'
				})
			}
		})

		tagIndex = nextIndex
	}

	onMounted(async () => {
		await nextTick()
		enable(heroRootRef.value)
		tagTimer = window.setInterval(rotateTag, 2600)
	})

	onBeforeUnmount(() => {
		disable()
		if (tagTimer !== null) {
			window.clearInterval(tagTimer)
			tagTimer = null
		}
	})
</script>

<style scoped>
	.hero-section {
		position: relative;
		padding-top: var(--space-2xl);
		padding-bottom: calc(var(--space-3xl) * 1.25);
		min-height: calc(100vh - 88px);
		display: grid;
		align-items: center;
	}

	.hero-shell {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
		gap: var(--space-2xl);
		padding: clamp(1.5rem, 4vw, 3.25rem);
		overflow: hidden;
	}

	.hero-shell::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(135deg, rgba(0, 255, 136, 0.08), transparent 34%),
			radial-gradient(circle at top right, rgba(125, 255, 202, 0.09), transparent 36%);
		pointer-events: none;
	}

	.hero-copy,
	.hero-status {
		position: relative;
		z-index: 1;
	}

	.hero-copy {
		display: grid;
		align-content: start;
		gap: var(--space-lg);
	}

	.hero-branding {
		display: inline-flex;
		align-items: center;
		gap: var(--space-md);
	}

	.brand-mark {
		position: relative;
		width: 2.5rem;
		height: 2.5rem;
		flex: 0 0 auto;
	}

	.brand-mark__ring,
	.brand-mark__hub {
		position: absolute;
		inset: 0;
		border-radius: 50%;
	}

	.brand-mark__ring {
		border: 1px solid rgba(125, 255, 202, 0.7);
		box-shadow: 0 0 16px rgba(0, 255, 136, 0.24);
		clip-path: polygon(50% 0%, 65% 6%, 78% 18%, 94% 30%, 100% 50%, 94% 70%, 78% 82%, 65% 94%, 50% 100%, 35% 94%, 22% 82%, 6% 70%, 0% 50%, 6% 30%, 22% 18%, 35% 6%);
	}

	.brand-mark__hub {
		inset: 35%;
		background: linear-gradient(160deg, rgba(0, 255, 136, 0.92), rgba(125, 255, 202, 0.42));
		box-shadow: 0 0 18px rgba(0, 255, 136, 0.4);
	}

	.eyebrow {
		margin: 0;
		color: var(--primary-soft);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.74rem;
	}

	.hero-title {
		margin: 0;
		font-size: clamp(2.65rem, 7vw, 5.75rem);
		line-height: 0.92;
		max-width: 11ch;
	}

	.role-stack {
		display: grid;
		gap: 0.22rem;
		font-size: clamp(1rem, 2vw, 1.2rem);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.role-stack p {
		margin: 0;
	}

	.tag-row {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		padding: 0.85rem 1rem;
		border: 1px solid rgba(125, 255, 202, 0.16);
		border-radius: 999px;
		background: rgba(8, 14, 10, 0.55);
		width: fit-content;
	}

	.tag-row__label {
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.tag-row__value {
		font-size: 0.95rem;
		letter-spacing: 0.08em;
		color: var(--primary-soft);
	}

	.action-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		padding-top: var(--space-xs);
	}

	.action-button {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.85rem 1rem;
		border-radius: 999px;
		border: 1px solid rgba(125, 255, 202, 0.18);
		background: rgba(12, 18, 14, 0.55);
		color: var(--text);
		text-decoration: none;
		transition:
			transform 180ms ease,
			border-color 180ms ease,
			box-shadow 180ms ease,
			background 180ms ease;
	}

	.action-button--solid {
		background: linear-gradient(135deg, rgba(0, 255, 136, 0.22), rgba(125, 255, 202, 0.08));
		border-color: rgba(0, 255, 136, 0.42);
	}

	.action-button:hover,
	.action-button:focus-visible {
		transform: translateY(-2px);
		border-color: rgba(0, 255, 136, 0.55);
		box-shadow: 0 0 0 1px rgba(0, 255, 136, 0.14) inset, 0 12px 24px rgba(0, 0, 0, 0.24);
		outline: none;
	}

	.scroll-hint {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: var(--space-sm);
		width: fit-content;
		color: var(--text-muted);
		text-decoration: none;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		font-size: 0.72rem;
	}

	.scroll-hint__icon {
		font-size: 1.1rem;
		color: var(--primary-soft);
	}

	.hero-status {
		display: grid;
		gap: var(--space-lg);
		align-content: start;
		padding: var(--space-xl);
		border-radius: var(--radius-xl);
		background: rgba(10, 15, 12, 0.6);
		border: 1px solid rgba(125, 255, 202, 0.16);
		backdrop-filter: blur(14px);
	}

	.status-label {
		margin: 0;
		color: var(--primary-soft);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.72rem;
	}

	.status-card {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-lg);
		border-radius: var(--radius-lg);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(125, 255, 202, 0.1);
		color: var(--text-muted);
	}

	.status-card p {
		margin: 0;
	}

	.status-metrics {
		display: grid;
		gap: var(--space-md);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.status-metrics li {
		display: grid;
		gap: 0.15rem;
		padding-bottom: var(--space-sm);
		border-bottom: 1px solid rgba(125, 255, 202, 0.1);
	}

	.metric-value {
		font-size: 1.7rem;
		color: var(--text);
	}

	.metric-label {
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	.mouse-glow {
		position: fixed;
		top: 0;
		left: 0;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 50%;
		pointer-events: none;
		background: radial-gradient(circle, rgba(125, 255, 202, 0.95), rgba(0, 255, 136, 0.25) 55%, transparent 72%);
		filter: blur(1px);
		mix-blend-mode: screen;
		z-index: 25;
		will-change: transform, opacity;
	}

	:global(.iconify) {
		font-size: 1.02em;
	}

	@media (max-width: 960px) {
		.hero-shell {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.hero-section {
			min-height: auto;
		}

		.hero-shell {
			padding: var(--space-lg);
		}

		.hero-title {
			font-size: clamp(2.3rem, 14vw, 3.8rem);
		}

		.hero-status {
			padding: var(--space-lg);
		}
	}
</style>
