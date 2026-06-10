<template>
  <div ref="sectionRef" class="section-container technical-skills-section">
    <article class="technical-shell glass-panel glow-border">
      <header ref="headerRef" class="technical-header">
        <p class="section-kicker text-mono">{{ t('technicalSkills.kicker') }}</p>
        <h2 id="technical-skills-title" class="text-display">{{ t('technicalSkills.title') }}</h2>
        <p class="technical-header__description">
          {{ t('technicalSkills.description') }}
        </p>
      </header>

      <div class="technical-groups">
        <section v-for="group in skillGroups" :key="group.key" class="group-block">
          <h3 class="group-title text-display">{{ group.title }}</h3>
          <div class="group-chart-wrapper" :aria-label="t('technicalSkills.groupAria', { group: group.title })" :style="groupGlowStyle(group)">
            <component :is="ApexCharts" type="bar" :options="chartOptionsGroup(group)" :series="chartSeriesGroup(group)" :height="groupChartHeight(group)" class="group-chart" />

            <!-- <ul class="skills-legend">
              <li v-for="skill in group.skills" :key="`${group.key}-${skill.name}`" class="skill-legend-item">
                <span class="skill-legend-name">{{ skill.name }}</span>
                <span class="skill-legend-meta">{{ t('technicalSkills.yearsExperience', { years: skill.years }) }}</span>
              </li>
            </ul> -->
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script setup>
  import { animate } from 'animejs'
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useIntersectionReveal } from '../../composables/useIntersectionReveal'
  import ApexCharts from 'vue3-apexcharts'
  import { matLegendToggle } from '@quasar/extras/material-icons'

  const { t } = useI18n()

  const sectionRef = ref(null)
  const headerRef = ref(null)
  const gaugesActive = ref(false)
  const cardRefMap = new Map()

  const skillColor = (value) => {
    if (value >= 90) return '#00ff88'
    if (value >= 80) return '#00d1ff'
    if (value >= 70) return '#ffd166'
    return '#ff7b7b'
  }

  const chartOptions = (skill) => ({
    chart: {
      type: 'bar',
      sparkline: { enabled: true },
      animations: { enabled: true },
      dropShadow: { enabled: true, top: 0, left: 0, blur: 4, opacity: 0.45 }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: '60%'
      }
    },
    xaxis: {
      max: 100,
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false },
    grid: { show: false },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, y: { formatter: (val) => `${val}%` } },
    fill: { colors: [skillColor(skill.value)] }
  })

  const chartSeries = (skill) => [{ data: [skill.value] }]

  const chartOptionsGroup = (group) => {
    const categories = group.skills.map(s => s.name)
    return {
      chart: {
        type: 'bar',
        // offsetX: 80,
        animations: { enabled: true },
        toolbar: { show: false },
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 4,
          color: '#AAFFBB',
          opacity: 0.85
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 8,
          barHeight: '50%'
        }
      },
      xaxis: {
        categories,
        max: 100,
        labels: {
          show: true,
          style: {
            colors: '#CCFFEE66',
            fontSize: '0.8rem',
            fontFamily: 'Fira Code',
            fontWeight: '200'
          }
        },
        axisTicks: { show: false },
        axisBorder: { show: false }
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          minWidth: 420,
          style: {
            colors: '#CCFFEEDD',
            fontSize: '0.9rem',
            fontFamily: 'Fira Code',
          }
        },
      },
      grid: {
        show: false,
        // borderColor: '#0f90',
        xaxis: {
          lines: { show: true }
        },
        yaxis: {
          lines: { show: true }
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`,
        offsetY: 8,
        style: {
          colors: ['#000000DD'],
          fontFamily: 'Fira Code',
          fontSize: '1.0rem',
          fontWeight: '600'
        }
      },
      tooltip: {
        enabled: false,
        y: { formatter: (val) => `${val}%` }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: "horizontal",
          shadeIntensity: 0.95,
          colorStops: [
            [
              {
                offset: 0,
                color: 'rgba(0, 255, 136, 0.3)',
                opacity: 1
              },
              {
                offset: 50,
                color: 'rgba(0, 255, 136, 0.75)',
                opacity: 1
              },
              {
                offset: 100,
                color: 'rgba(125, 255, 202, 0.45)',
                opacity: 1
              }

            ]
          ]

        }
      },
      legend: { show: false }
      // grid: {
      //   row: {
      //     colors: ['#000', '#fff', '#000']
      //   },
      //   column: {
      //     colors: ['#000', '#fff', '#000']
      //   }
      // }
    }
  }

  const chartSeriesGroup = (group) => [{ data: group.skills.map(s => s.value) }]

  const groupChartHeight = (group) => Math.max(140, group.skills.length * 48)

  const hexToRgba = (hex, alpha = 0.36) => {
    const h = hex.replace('#', '')
    const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const groupGlowStyle = (group) => {
    const vars = group.skills.map((s, i) => `--glow-${i + 1}: ${hexToRgba(skillColor(s.value), 0.28)}`)
    return Object.fromEntries(vars.map(v => v.split(':').map(s => s.trim())))
  }

  const skillGroups = computed(() => [
    {
      key: 'engineering',
      title: t('technicalSkills.groups.engineering.title'),
      skills: [
        { name: 'SolidWorks', value: 96, years: 10, context: t('technicalSkills.groups.engineering.skills.solidworks') },
        { name: 'AutoCAD', value: 85, years: 9, context: t('technicalSkills.groups.engineering.skills.autocad') },
        { name: 'SolidEdge', value: 80, years: 4, context: t('technicalSkills.groups.engineering.skills.solidedge') },
        { name: 'BIM', value: 74, years: 3, context: t('technicalSkills.groups.engineering.skills.bim') },
        { name: '3D Printing', value: 88, years: 5, context: t('technicalSkills.groups.engineering.skills.printing3d') }
      ]
    },
    {
      key: 'frontend',
      title: t('technicalSkills.groups.frontend.title'),
      skills: [
        { name: 'Vue.js', value: 95, years: 6, context: t('technicalSkills.groups.frontend.skills.vue') },
        { name: 'Quasar', value: 90, years: 5, context: t('technicalSkills.groups.frontend.skills.quasar') },
        { name: 'JavaScript', value: 94, years: 7, context: t('technicalSkills.groups.frontend.skills.javascript') },
        { name: 'Electron', value: 82, years: 3, context: t('technicalSkills.groups.frontend.skills.electron') },
        { name: 'HTML/CSS', value: 96, years: 8, context: t('technicalSkills.groups.frontend.skills.htmlcss') }
      ]
    },
    {
      key: 'automation',
      title: t('technicalSkills.groups.automation.title'),
      skills: [
        { name: 'VBA', value: 93, years: 8, context: t('technicalSkills.groups.automation.skills.vba') },
        { name: 'Python', value: 87, years: 5, context: t('technicalSkills.groups.automation.skills.python') },
        { name: 'REST APIs', value: 84, years: 4, context: t('technicalSkills.groups.automation.skills.rest') },
        { name: 'Excel', value: 94, years: 10, context: t('technicalSkills.groups.automation.skills.excel') },
        { name: 'Design Automation', value: 91, years: 6, context: t('technicalSkills.groups.automation.skills.designAutomation') }
      ]
    }
  ])

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
    justify-items: start;
    gap: var(--space-md);
    text-align: left;
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

  .skill-bar {
    width: 100%;
    max-width: 420px;
    align-self: center;
  }

  .group-chart-wrapper {
    display: grid;
    gap: 0.8rem;
    align-items: center;
  }

  .group-chart {
    width: 100%;
    max-width: 720px;
  }

  /* amplify bar glow */
  .group-chart .apexcharts-bar-area .apexcharts-bar:nth-child(1) {
    filter: drop-shadow(0 0 14px var(--glow-1, rgba(0, 255, 136, 0.12)));
  }

  .group-chart .apexcharts-bar-area .apexcharts-bar:nth-child(2) {
    filter: drop-shadow(0 0 14px var(--glow-2, rgba(0, 209, 255, 0.12)));
  }

  .group-chart .apexcharts-bar-area .apexcharts-bar:nth-child(3) {
    filter: drop-shadow(0 0 14px var(--glow-3, rgba(255, 209, 102, 0.12)));
  }

  .group-chart .apexcharts-bar-area .apexcharts-bar:nth-child(4) {
    filter: drop-shadow(0 0 14px var(--glow-4, rgba(255, 123, 123, 0.12)));
  }

  .group-chart .apexcharts-bar-area .apexcharts-bar:nth-child(5) {
    filter: drop-shadow(0 0 14px var(--glow-5, rgba(0, 255, 136, 0.12)));
  }

  .skills-legend {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.4rem;
  }

  .skill-legend-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0.4rem;
    background: transparent;
    border-radius: 6px;
  }

  .skill-legend-name {
    font-weight: 600;
  }

  .skill-legend-meta {
    font-size: 0.75rem;
    color: var(--text-muted);
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
