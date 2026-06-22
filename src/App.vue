<template>
  <div class="portfolio-app">
    <BackgroundLayer />
    <NavigationBar />

    <q-scroll-area class="portfolio-scroll fit" v-bind="scrollAreaProps" aria-label="main page scroll area">
      <main class="portfolio-main" :aria-label="t('app.mainAria')">
        <section id="hero" class="page-section" aria-labelledby="hero-title">
          <HeroSection />
        </section>

        <section id="biography" class="page-section" aria-labelledby="biography-title">
          <BiographySection />
        </section>

        <section id="soft-skills" class="page-section" aria-labelledby="soft-skills-title">
          <SoftSkillsSection />
        </section>

        <section id="technical-skills" class="page-section" aria-labelledby="technical-skills-title">
          <TechnicalSkillsSection />
        </section>

        <!-- <section id="experience" class="page-section" aria-labelledby="experience-title">
        <ExperienceSection />
      </section> -->

        <section id="projects" class="page-section" aria-labelledby="projects-title">
          <FeaturedProjectsSection />
        </section>

        <!-- <section id="links" class="page-section" aria-labelledby="links-title">
        <ExternalLinksSection />
      </section> -->

        <section id="gallery" class="page-section" aria-labelledby="gallery-title">
          <EngineeringGallerySection />
        </section>

        <section id="reviews" class="page-section" aria-labelledby="reviews-title">
          <ReviewsSection />
        </section>

        <section id="contact" class="page-section" aria-labelledby="contact-title">
          <ContactSection />
        </section>
      </main>

      <FooterSection />
    </q-scroll-area>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import BackgroundLayer from './components/background/BackgroundLayer.vue'
  import HeroSection from './components/hero/HeroSection.vue'
  import BiographySection from './components/biography/BiographySection.vue'
  import SoftSkillsSection from './components/skills/SoftSkillsSection.vue'
  import TechnicalSkillsSection from './components/skills/TechnicalSkillsSection.vue'
  import ExperienceSection from './components/experience/ExperienceSection.vue'
  import FeaturedProjectsSection from './components/projects/FeaturedProjectsSection.vue'
  import ReviewsSection from './components/reviews/ReviewsSection.vue'
  import EngineeringGallerySection from './components/gallery/EngineeringGallerySection.vue'
  import ExternalLinksSection from './components/links/ExternalLinksSection.vue'
  import ContactSection from './components/contact/ContactSection.vue'
  import NavigationBar from './components/layout/NavigationBar.vue'
  import FooterSection from './components/layout/FooterSection.vue'
  import { useQuasar } from 'quasar'
  import { useScrollAreaStyles } from './composables/useScrollAreaStyles'

  const { t } = useI18n()

  const $q = useQuasar()
  const scrollAreaProps = useScrollAreaStyles()

  const appIcons = {
    'app:upwork': 'img:/img/icons/upwork-svgrepo-com.svg',
    'app:vue': 'img:/img/icons/vue-svgrepo-com.svg',
  }

  $q.iconMapFn = iconName => {
    const icon = appIcons[iconName]
    if (icon !== undefined) {
      return { icon }
    }
  }
</script>

<style scoped>
  .portfolio-app {
    position: relative;
    width: 100%;
    min-height: 100vh;
    isolation: isolate;
  }

  .portfolio-scroll {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }

  .portfolio-scroll .q-scrollarea__container {
    width: 100%;
    height: 100%;
  }

  .portfolio-main {
    position: relative;
    z-index: 1;
    padding-top: 88px;
    min-height: 100%;
  }

  .portfolio-main {
    position: relative;
    z-index: 1;
    padding-top: 88px;
  }

  .page-section {
    position: relative;
    scroll-margin-top: 110px;
  }

  .page-section+.page-section {
    border-top: 1px solid rgba(125, 255, 202, 0.08);
  }
</style>
