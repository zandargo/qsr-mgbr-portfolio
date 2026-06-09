<template>
  <div class="section-container external-links-section">
    <article class="links-shell glass-panel glow-border">
      <header class="links-header">
        <p class="section-kicker text-mono">{{ t('linksSection.kicker') }}</p>
        <h2 id="links-title" class="text-display">{{ t('linksSection.title') }}</h2>
        <p class="links-header__description">
          {{ t('linksSection.description') }}
        </p>
      </header>

      <section class="links-group" aria-labelledby="profiles-title">
        <div class="links-group__heading">
          <p class="links-group__kicker text-mono">{{ t('linksSection.profiles.kicker') }}</p>
          <h3 id="profiles-title" class="links-group__title text-display">{{ t('linksSection.profiles.title') }}</h3>
        </div>

        <div class="links-grid links-grid--profiles">
          <ExternalLinkCard v-for="item in profileCards" :key="item.title" :item="item" variant="profile" />
        </div>
      </section>

      <section class="links-group" aria-labelledby="products-title">
        <div class="links-group__heading">
          <p class="links-group__kicker text-mono">{{ t('linksSection.products.kicker') }}</p>
          <h3 id="products-title" class="links-group__title text-display">{{ t('linksSection.products.title') }}</h3>
        </div>

        <div class="links-grid links-grid--products">
          <ExternalLinkCard v-for="item in productCards" :key="item.title" :item="item" variant="product" />
        </div>
      </section>
    </article>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import ExternalLinkCard from './ExternalLinkCard.vue'

  const { t, locale } = useI18n()

  const resumeHref = computed(() => {
    // Map the active locale to a language-specific resume file in `public/resume/`.
    // Add the corresponding PDF files to `public/resume/` (example names below).
    return locale.value === 'pt-BR'
      ? '/resume/Madson_Germano_Resume_PT-BR.pdf'
      : '/resume/Madson_Germano_Resume_EN-US.pdf'
  })

  const profileCards = computed(() => [
    {
      title: t('linksSection.cards.github.title'),
      description: t('linksSection.cards.github.description'),
      badge: t('linksSection.cards.github.badge'),
      tags: ['Vue', 'Automation', 'PWA'],
      ctaLabel: t('linksSection.cards.github.ctaLabel'),
      href: 'https://github.com/zandargo',
      mediaBackground:
        'linear-gradient(135deg, rgba(12, 16, 14, 0.9), rgba(0, 255, 136, 0.18)), radial-gradient(circle at 18% 22%, rgba(125, 255, 202, 0.28), transparent 42%)',
      image: 'img/screen/ProfileGithub01.jpeg'
    },
    {
      title: t('linksSection.cards.linkedin.title'),
      description: t('linksSection.cards.linkedin.description'),
      badge: t('linksSection.cards.linkedin.badge'),
      tags: ['Leadership', 'Projects', 'Industry'],
      ctaLabel: t('linksSection.cards.linkedin.ctaLabel'),
      href: 'https://linkedin.com/in/madson-germano',
      mediaBackground:
        'linear-gradient(138deg, rgba(16, 22, 19, 0.88), rgba(125, 255, 202, 0.2)), radial-gradient(circle at 84% 18%, rgba(0, 255, 136, 0.26), transparent 45%)',
      image: 'img/screen/ProfileLinkedin01.jpeg'
    },
    {
      title: t('linksSection.cards.upwork.title'),
      description: t('linksSection.cards.upwork.description'),
      badge: t('linksSection.cards.upwork.badge'),
      tags: ['Freelance', 'CAD', 'Automation'],
      ctaLabel: t('linksSection.cards.upwork.ctaLabel'),
      href: 'https://www.upwork.com/freelancers/~01074a8f5756ea2138',
      mediaBackground:
        'linear-gradient(150deg, rgba(8, 14, 11, 0.9), rgba(0, 255, 136, 0.16)), radial-gradient(circle at 50% 78%, rgba(125, 255, 202, 0.22), transparent 52%)',
      image: 'img/screen/ProfileUpwork01.png'
    },
    {
      title: t('linksSection.cards.resume.title'),
      description: t('linksSection.cards.resume.description'),
      badge: t('linksSection.cards.resume.badge'),
      tags: ['Experience', 'Skills', 'Results'],
      ctaLabel: t('linksSection.cards.resume.ctaLabel'),
      href: resumeHref.value,
      mediaBackground:
        'linear-gradient(142deg, rgba(14, 18, 16, 0.92), rgba(125, 255, 202, 0.22)), radial-gradient(circle at 24% 82%, rgba(0, 255, 136, 0.2), transparent 48%)'
    }
  ])

  const productCards = computed(() => [
    {
      title: t('linksSection.productsCards.pdlm.title'),
      description: t('linksSection.productsCards.pdlm.description'),
      badge: t('linksSection.productsCards.pdlm.badge'),
      tags: ['PLM', 'Vue', 'Workflow'],
      ctaLabel: t('linksSection.productsCards.pdlm.ctaLabel'),
      href: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      mediaBackground:
        'linear-gradient(132deg, rgba(10, 14, 12, 0.9), rgba(0, 255, 136, 0.23)), radial-gradient(circle at 18% 18%, rgba(125, 255, 202, 0.3), transparent 40%)'
    },
    {
      title: t('linksSection.productsCards.cadtk.title'),
      description: t('linksSection.productsCards.cadtk.description'),
      badge: t('linksSection.productsCards.cadtk.badge'),
      tags: ['Python', 'VBA', 'SolidWorks'],
      ctaLabel: t('linksSection.productsCards.cadtk.ctaLabel'),
      href: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      mediaBackground:
        'linear-gradient(136deg, rgba(9, 14, 12, 0.9), rgba(125, 255, 202, 0.2)), radial-gradient(circle at 78% 20%, rgba(0, 255, 136, 0.24), transparent 42%)'
    },
    {
      title: t('linksSection.productsCards.xlsys.title'),
      description: t('linksSection.productsCards.xlsys.description'),
      badge: t('linksSection.productsCards.xlsys.badge'),
      tags: ['Excel', 'Data Models', 'Reports'],
      ctaLabel: t('linksSection.productsCards.xlsys.ctaLabel'),
      href: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      mediaBackground:
        'linear-gradient(150deg, rgba(11, 15, 13, 0.92), rgba(0, 255, 136, 0.19)), radial-gradient(circle at 20% 84%, rgba(125, 255, 202, 0.24), transparent 48%)'
    },
    {
      title: t('linksSection.productsCards.internalTools.title'),
      description: t('linksSection.productsCards.internalTools.description'),
      badge: t('linksSection.productsCards.internalTools.badge'),
      tags: ['Dashboards', 'QA', 'Workflows'],
      ctaLabel: t('linksSection.productsCards.internalTools.ctaLabel'),
      href: 'https://github.com/zandargo/qsr-mgbr-portfolio',
      mediaBackground:
        'linear-gradient(148deg, rgba(12, 16, 14, 0.9), rgba(125, 255, 202, 0.22)), radial-gradient(circle at 80% 78%, rgba(0, 255, 136, 0.24), transparent 50%)'
    }
  ])
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
