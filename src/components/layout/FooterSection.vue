<template>
	<footer class="footer-wrap">
		<div class="section-container footer-inner glass-panel">
			<p class="text-display footer-title">Designed and developed by Madson Germano</p>
			<p class="footer-meta">Mechanical Engineer and Frontend Developer</p>
			<p class="footer-meta">Vue + Quasar + Anime.js</p>
		</div>
	</footer>
</template>

<style scoped>
	.footer-wrap {
		position: relative;
		z-index: 1;
		padding-bottom: var(--space-2xl);
	}

	.footer-inner {
		padding: var(--space-xl);
		text-align: center;
	}

	.footer-title {
		margin: 0 0 var(--space-xs);
		color: var(--text);
	}

	.footer-meta {
		margin: 0;
		color: var(--text-muted);
	}
</style>
