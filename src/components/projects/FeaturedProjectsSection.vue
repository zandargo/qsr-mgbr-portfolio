<template>
	<div class="section-container featured-projects-section">
		<article class="projects-shell glass-panel glow-border">
			<header class="projects-header">
				<p class="section-kicker text-mono">Featured Projects</p>
				<h2 id="projects-title" class="text-display">Software products shaped by engineering precision.</h2>
				<p class="projects-header__description">
					A selected set of systems that combine mechanical logic, frontend architecture, and automation efficiency.
				</p>
			</header>

			<div class="projects-grid">
				<ProjectCard v-for="project in projects" :key="project.code" :project="project" />
			</div>
		</article>
	</div>
</template>

<script setup>
	import ProjectCard from './ProjectCard.vue'

	const projects = [
		{
			code: 'PDLM',
			title: 'Product Data Lifecycle Manager',
			summary: 'A centralized platform to control engineering documents, approvals, and lifecycle transitions for industrial products.',
			tags: ['Vue', 'Quasar', 'REST API', 'PLM'],
			thumbnail: 'linear-gradient(140deg, rgba(0, 255, 136, 0.26), rgba(16, 22, 19, 0.92)), radial-gradient(circle at 18% 20%, rgba(125, 255, 202, 0.3), transparent 42%)',
			github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
			demo: '#projects'
		},
		{
			code: 'CADTK',
			title: 'CAD Automation Toolkit',
			summary: 'Reusable automation scripts and templates that accelerate repetitive modeling and drawing tasks in production teams.',
			tags: ['VBA', 'Python', 'SolidWorks', 'Automation'],
			thumbnail: 'linear-gradient(135deg, rgba(16, 21, 18, 0.82), rgba(0, 255, 136, 0.2)), radial-gradient(circle at 80% 20%, rgba(125, 255, 202, 0.34), transparent 45%)',
			github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
			demo: '#projects'
		},
		{
			code: 'PORTF',
			title: 'Mechanical Intelligence Portfolio',
			summary: 'Interactive portfolio experience engineered with smooth motion systems, performance-focused rendering, and bold visual identity.',
			tags: ['Anime.js', 'Quasar', 'SCSS', 'PWA'],
			thumbnail: 'linear-gradient(125deg, rgba(125, 255, 202, 0.3), rgba(16, 21, 18, 0.84)), radial-gradient(circle at 50% 80%, rgba(0, 255, 136, 0.24), transparent 50%)',
			github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
			demo: '#hero'
		},
		{
			code: 'XLSYS',
			title: 'Excel Engineering Suite',
			summary: 'Operational calculators and reporting flows tailored for engineering decisions, planning, and project execution visibility.',
			tags: ['Excel', 'VBA', 'Data Models', 'Workflows'],
			thumbnail: 'linear-gradient(155deg, rgba(16, 21, 18, 0.88), rgba(0, 255, 136, 0.16)), radial-gradient(circle at 20% 78%, rgba(125, 255, 202, 0.28), transparent 52%)',
			github: 'https://github.com/zandargo/qsr-mgbr-portfolio',
			demo: '#projects'
		}
	]
</script>

<style scoped>
	.featured-projects-section {
		padding-top: var(--space-2xl);
	}

	.projects-shell {
		padding: clamp(1.25rem, 2.8vw, 2.4rem);
		display: grid;
		gap: clamp(1.2rem, 2.6vw, 2rem);
	}

	.projects-header {
		display: grid;
		gap: var(--space-sm);
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

	.projects-header__description {
		margin: 0;
		max-width: 74ch;
		line-height: 1.68;
		color: var(--text-muted);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-lg);
	}

	@media (max-width: 980px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		h2 {
			font-size: clamp(1.6rem, 7vw, 2.1rem);
		}
	}
</style>
