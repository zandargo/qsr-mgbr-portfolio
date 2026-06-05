<template>
	<header class="nav-shell">
		<nav class="nav-inner section-container glass-panel" aria-label="Primary navigation">
			<a href="#hero" class="brand text-display">MGBR</a>

			<ul class="nav-links">
				<li><a href="#biography">Biography</a></li>
				<li><a href="#soft-skills">Skills</a></li>
				<li><a href="#projects">Projects</a></li>
				<li><a href="#experience">Experience</a></li>
				<li><a href="#links">Links</a></li>
				<li><a href="#contact">Contact</a></li>
			</ul>
		</nav>
	</header>
</template>

<style scoped>
	.nav-shell {
		position: fixed;
		top: var(--space-md);
		left: 0;
		width: 100%;
		z-index: 20;
	}

	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-lg);
		padding: var(--space-sm) var(--space-lg);
	}

	.brand {
		color: var(--text);
		text-decoration: none;
		font-size: 1.05rem;
		letter-spacing: 0.18em;
	}

	.nav-links {
		display: flex;
		gap: var(--space-md);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.nav-links a {
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.88rem;
	}

	.nav-links a:hover,
	.nav-links a:focus-visible {
		color: var(--primary);
	}

	@media (max-width: 900px) {
		.nav-links {
			gap: var(--space-sm);
			flex-wrap: wrap;
			justify-content: flex-end;
		}
	}
</style>
