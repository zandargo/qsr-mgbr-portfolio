<template>
	<div class="section-container">
		<article class="placeholder-card glass-panel glow-border">
			<p class="eyebrow">Phase 2 Placeholder</p>
			<h1 id="hero-title" class="title text-display">Hero Section</h1>
			<p class="copy">Main intro block with name, role stack, action links, and scroll hint will be built in Phase 6.</p>
		</article>
	</div>
</template>

<style scoped>
	.placeholder-card {
		min-height: 62vh;
		padding: var(--space-2xl);
		display: grid;
		align-content: center;
		gap: var(--space-sm);
	}

	.eyebrow {
		margin: 0;
		color: var(--primary-soft);
		text-transform: uppercase;
		letter-spacing: 0.16em;
		font-size: 0.72rem;
	}

	.title {
		margin: 0;
		font-size: clamp(2rem, 5vw, 3.5rem);
	}

	.copy {
		margin: 0;
		max-width: 60ch;
		color: var(--text-muted);
	}
</style>
