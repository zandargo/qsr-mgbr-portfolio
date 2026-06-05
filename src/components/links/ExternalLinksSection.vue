<template>
	<div class="section-container external-links-section">
		<article class="links-shell glass-panel glow-border">
			<header class="links-header">
				<p class="section-kicker text-mono">External Links</p>
				<h2 id="links-title" class="text-display">Professional presence and software products in one command center.</h2>
				<p class="links-header__description">
					Explore profiles, credibility signals, and product systems developed for engineering and operations teams.
				</p>
			</header>

			<section class="links-group" aria-labelledby="profiles-title">
				<div class="links-group__heading">
					<p class="links-group__kicker text-mono">Profiles</p>
					<h3 id="profiles-title" class="links-group__title text-display">Professional Channels</h3>
				</div>

				<div class="links-grid links-grid--profiles">
					<ExternalLinkCard v-for="item in profileCards" :key="item.title" :item="item" variant="profile" />
				</div>
			</section>

			<section class="links-group" aria-labelledby="products-title">
				<div class="links-group__heading">
					<p class="links-group__kicker text-mono">Products</p>
					<h3 id="products-title" class="links-group__title text-display">Developed Applications</h3>
				</div>

				<div class="links-grid links-grid--products">
					<ExternalLinkCard v-for="item in productCards" :key="item.title" :item="item" variant="product" />
				</div>
			</section>
		</article>
	</div>
</template>

<script setup>
	import ExternalLinkCard from './ExternalLinkCard.vue'

	const profileCards = [
		{
			title: 'GitHub',
			description: 'Code repositories, frontend experiments, and automation proof-of-concepts shipped across engineering contexts.',
			badge: 'Open Source',
			tags: ['Vue', 'Automation', 'PWA'],
			ctaLabel: 'Visit GitHub',
			href: 'https://github.com/zandargo',
			mediaBackground:
				'linear-gradient(135deg, rgba(12, 16, 14, 0.9), rgba(0, 255, 136, 0.18)), radial-gradient(circle at 18% 22%, rgba(125, 255, 202, 0.28), transparent 42%)'
		},
		{
			title: 'LinkedIn',
			description: 'Career history, project outcomes, and technical leadership highlights across mechanical and digital product work.',
			badge: 'Network',
			tags: ['Leadership', 'Projects', 'Industry'],
			ctaLabel: 'Open LinkedIn',
			href: 'https://linkedin.com/in/madson-germano',
			mediaBackground:
				'linear-gradient(138deg, rgba(16, 22, 19, 0.88), rgba(125, 255, 202, 0.2)), radial-gradient(circle at 84% 18%, rgba(0, 255, 136, 0.26), transparent 45%)'
		},
		{
			title: 'Upwork',
			description: 'Freelance delivery track record with repeat clients, automation wins, and high-quality technical communication.',
			badge: 'Top Rated Plus',
			tags: ['Freelance', 'CAD', 'Automation'],
			ctaLabel: 'View Upwork',
			href: 'https://www.upwork.com',
			mediaBackground:
				'linear-gradient(150deg, rgba(8, 14, 11, 0.9), rgba(0, 255, 136, 0.16)), radial-gradient(circle at 50% 78%, rgba(125, 255, 202, 0.22), transparent 52%)'
		},
		{
			title: 'Resume PDF',
			description: 'Downloadable profile with engineering depth, software architecture experience, and measurable project results.',
			badge: 'Download',
			tags: ['Experience', 'Skills', 'Results'],
			ctaLabel: 'Open Resume',
			href: 'https://github.com/zandargo/qsr-mgbr-portfolio',
			mediaBackground:
				'linear-gradient(142deg, rgba(14, 18, 16, 0.92), rgba(125, 255, 202, 0.22)), radial-gradient(circle at 24% 82%, rgba(0, 255, 136, 0.2), transparent 48%)'
		}
	]

	const productCards = [
		{
			title: 'PDLM',
			description: 'Product Lifecycle Management platform with approval routing, document controls, and release traceability for engineering teams.',
			badge: 'SaaS System',
			tags: ['PLM', 'Vue', 'Workflow'],
			ctaLabel: 'View Project',
			href: 'https://github.com/zandargo/qsr-mgbr-portfolio',
			mediaBackground:
				'linear-gradient(132deg, rgba(10, 14, 12, 0.9), rgba(0, 255, 136, 0.23)), radial-gradient(circle at 18% 18%, rgba(125, 255, 202, 0.3), transparent 40%)'
		},
		{
			title: 'CAD Automation Toolkit',
			description: 'Reusable automation command packs that shorten repetitive modeling operations and standardize engineering deliverables.',
			badge: 'Automation Suite',
			tags: ['Python', 'VBA', 'SolidWorks'],
			ctaLabel: 'View Project',
			href: 'https://github.com/zandargo/qsr-mgbr-portfolio',
			mediaBackground:
				'linear-gradient(136deg, rgba(9, 14, 12, 0.9), rgba(125, 255, 202, 0.2)), radial-gradient(circle at 78% 20%, rgba(0, 255, 136, 0.24), transparent 42%)'
		},
		{
			title: 'Excel Engineering Suite',
			description: 'Operational calculators and reporting workflows for capacity, cost, and delivery planning inside manufacturing routines.',
			badge: 'Ops Platform',
			tags: ['Excel', 'Data Models', 'Reports'],
			ctaLabel: 'View Project',
			href: 'https://github.com/zandargo/qsr-mgbr-portfolio',
			mediaBackground:
				'linear-gradient(150deg, rgba(11, 15, 13, 0.92), rgba(0, 255, 136, 0.19)), radial-gradient(circle at 20% 84%, rgba(125, 255, 202, 0.24), transparent 48%)'
		},
		{
			title: 'Internal Manufacturing Tools',
			description: 'Lean internal apps for data entry, process checks, and production monitoring tailored to shop-floor constraints.',
			badge: 'Internal Stack',
			tags: ['Dashboards', 'QA', 'Workflows'],
			ctaLabel: 'View Project',
			href: 'https://github.com/zandargo/qsr-mgbr-portfolio',
			mediaBackground:
				'linear-gradient(148deg, rgba(12, 16, 14, 0.9), rgba(125, 255, 202, 0.22)), radial-gradient(circle at 80% 78%, rgba(0, 255, 136, 0.24), transparent 50%)'
		}
	]
</script>

<style scoped>
	.external-links-section {
		padding-top: var(--space-2xl);
	}

	.links-shell {
		padding: clamp(1.25rem, 2.8vw, 2.4rem);
		display: grid;
		gap: clamp(1.35rem, 2.8vw, 2.2rem);
	}

	.links-header {
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

	.links-header__description {
		margin: 0;
		max-width: 74ch;
		line-height: 1.68;
		color: var(--text-muted);
	}

	.links-group {
		display: grid;
		gap: var(--space-md);
	}

	.links-group__heading {
		display: grid;
		gap: 0.22rem;
	}

	.links-group__kicker {
		margin: 0;
		font-size: 0.66rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.links-group__title {
		margin: 0;
		font-size: clamp(1.25rem, 2vw, 1.65rem);
		line-height: 1.15;
	}

	.links-grid {
		display: grid;
		gap: var(--space-lg);
	}

	.links-grid--profiles,
	.links-grid--products {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 980px) {
		.links-grid--profiles,
		.links-grid--products {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		h2 {
			font-size: clamp(1.6rem, 7vw, 2.1rem);
		}
	}
</style>
