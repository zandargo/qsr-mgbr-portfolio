<template>
	<footer class="footer-wrap">
		<div class="section-container footer-inner glass-panel glow-border">
			<div class="footer-brand">
				<div ref="logoRef" class="footer-logo" aria-hidden="true">
					<span class="footer-logo__ring" />
					<span class="footer-logo__hub" />
				</div>

				<div class="footer-copy">
					<p class="footer-kicker text-mono">{{ t('footer.kicker') }}</p>
					<p class="text-display footer-title">{{ t('footer.name') }}</p>
					<p class="footer-meta">{{ t('footer.role1') }}</p>
					<p class="footer-meta">{{ t('footer.role2') }}</p>
					<p class="footer-stack text-mono">{{ t('footer.stack') }}</p>
				</div>
			</div>

			<p class="footer-copyright text-mono">&copy; {{ currentYear }} {{ t('footer.rights') }}</p>
		</div>
	</footer>
</template>

<script setup>
	import { animate } from 'animejs'
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { useI18n } from 'vue-i18n'

	const { t } = useI18n()

	const logoRef = ref(null)
	const currentYear = computed(() => new Date().getFullYear())
	let pulseAnimation = null

	const shouldAnimate = () => {
		if (typeof window === 'undefined') {
			return false
		}

		return !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
	}

	onMounted(() => {
		if (!logoRef.value || !shouldAnimate()) {
			return
		}

		pulseAnimation = animate(logoRef.value, {
			scale: [1, 1.04, 1],
			rotate: [0, 2.5, 0],
			duration: 2400,
			ease: 'inOutSine',
			loop: true
		})
	})

	onBeforeUnmount(() => {
		pulseAnimation?.pause?.()
		pulseAnimation = null
	})
</script>

<style scoped>
	.footer-wrap {
		position: relative;
		z-index: 1;
		padding-bottom: var(--space-2xl);
	}

	.footer-inner {
		padding: clamp(1.1rem, 2.8vw, 1.9rem);
		display: grid;
		gap: var(--space-md);
	}

	.footer-brand {
		display: flex;
		gap: var(--space-md);
		align-items: center;
	}

	.footer-logo {
		position: relative;
		width: clamp(2.2rem, 5vw, 2.8rem);
		height: clamp(2.2rem, 5vw, 2.8rem);
		flex: 0 0 auto;
	}

	.footer-logo__ring,
	.footer-logo__hub {
		position: absolute;
		inset: 0;
		border-radius: 50%;
	}

	.footer-logo__ring {
		border: 1px solid rgba(125, 255, 202, 0.7);
		box-shadow: 0 0 16px rgba(0, 255, 136, 0.24);
		clip-path: polygon(50% 0%, 65% 6%, 78% 18%, 94% 30%, 100% 50%, 94% 70%, 78% 82%, 65% 94%, 50% 100%, 35% 94%, 22% 82%, 6% 70%, 0% 50%, 6% 30%, 22% 18%, 35% 6%);
	}

	.footer-logo__hub {
		inset: 34%;
		background: linear-gradient(160deg, rgba(0, 255, 136, 0.88), rgba(125, 255, 202, 0.4));
		box-shadow: 0 0 14px rgba(0, 255, 136, 0.36);
	}

	.footer-copy {
		display: grid;
		gap: 0.14rem;
	}

	.footer-kicker {
		margin: 0;
		font-size: 0.66rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--primary-soft);
	}

	.footer-title {
		margin: 0;
		font-size: clamp(1.1rem, 2.2vw, 1.5rem);
		line-height: 1.1;
		color: var(--text);
	}

	.footer-meta {
		margin: 0;
		font-size: 0.86rem;
		color: var(--text-muted);
	}

	.footer-stack {
		margin: 0.22rem 0 0;
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--primary-soft);
	}

	.footer-copyright {
		margin: 0;
		padding-top: 0.55rem;
		border-top: 1px solid rgba(125, 255, 202, 0.16);
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
		text-align: right;
	}

	@media (max-width: 680px) {
		.footer-brand {
			align-items: flex-start;
		}

		.footer-title {
			font-size: clamp(1rem, 5vw, 1.25rem);
		}

		.footer-meta {
			font-size: 0.8rem;
		}

		.footer-copyright {
			text-align: left;
		}
	}
</style>
