<template>
  <div ref="sectionRef" class="section-container technical-skills-section">
    <article class="technical-shell glass-panel glow-border">
      <header ref="headerRef" class="technical-header section-header">
        <p class="section-kicker text-mono">{{ t('technicalSkills.kicker') }}</p>
        <div style="width: 95%">
          <h2 id="technical-skills-title" class="text-display section-title">{{ t('technicalSkills.title') }}</h2>
          <p class="section-description">
            {{ t('technicalSkills.description') }}
          </p>

        </div>
      </header>

      <div class="technical-groups ">
        <section v-for="group in skillGroups" :key="group.key" class="group-block">
          <h3 class="group-title text-display">{{ group.title }}</h3>
          <div class="group-chart-wrapper" :aria-label="t('technicalSkills.groupAria', { group: group.title })" :style="groupGlowStyle(group)">
            <component :is="ApexCharts" type="bar" :options="chartOptionsGroup(group)" :series="chartSeriesGroup(group)" :height="groupChartHeight(group)" class="" />
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
  import { useQuasar } from 'quasar'
  import ApexCharts from 'vue3-apexcharts'
  import { matLegendToggle } from '@quasar/extras/material-icons'

  const { t } = useI18n()
  const { screen } = useQuasar()

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

  const chartOptionsGroup = (group) => {
    const categories = group.skills.map(s => s.name)
    return {
      chart: {
        type: 'line',
        width: '100%',
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
          horizontal: false,
          borderRadius: 8,
          columnWidth: '55%',
        }
      },
      stroke: {
        show: true,
        width: [0, 6],
        curve: 'straight',
        colors: ['transparent', '#A0FFF0'],
      },
      xaxis: {
        type: 'category',
        categories,
        labels: {
          show: true,
          style: {
            colors: '#CCFFEEDD',
            fontSize: '1rem',
            fontFamily: 'Fira Code',
            fontWeight: '200'
          },
          rotate: -45,
          rotateAlways: true,
        },
        axisTicks: { show: false },
        axisBorder: { show: false }
      },
      yaxis: [
        {
          show: true,
          title: {
            text: t('technicalSkills.axes.skillLevel'),
            style: {
              color: '#CCFFEEDD',
              fontFamily: 'Fira Code',
              fontSize: '0.85rem'
            }
          },
          min: 0,
          max: 100,
          tickAmount: 5,
          labels: {
            show: true,
            minWidth: 80,
            style: {
              colors: '#CCFFEEDD',
              fontSize: '0.9rem',
              fontFamily: 'Fira Code',
            }
          }
        },
        {
          opposite: true,
          show: true,
          title: {
            text: t('technicalSkills.axes.years'),
            style: {
              color: '#CCFFEEDD',
              fontFamily: 'Fira Code',
              fontSize: '0.85rem'
            }
          },
          min: 0,
          max: 15,
          tickAmount: 5,
          labels: {
            show: true,
            minWidth: 80,
            style: {
              colors: '#CCFFEEDD',
              fontSize: '0.9rem',
              fontFamily: 'Fira Code',
            }
          }
        }
      ],
      grid: {
        show: false,
        xaxis: {
          lines: { show: true }
        },
        yaxis: {
          lines: { show: true }
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        // formatter: (val, { seriesIndex }) => seriesIndex === 1 ? `${val} anos` : `${val}`,
        // offsetY: 8,
        style: {
          colors: ['#000000DD'],
          fontFamily: 'Fira Code',
          fontSize: '1.2rem',
          fontWeight: '400'
        },
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 2,
          color: '#AAFFDD',
          opacity: 0.85
        },
        background: {
          enabled: true,
          foreColor: '#CCFFEEBB',
          borderRadius: 8,
          padding: 8,
          // opacity: 0.75,
          borderWidth: 3,
          borderColor: '#CCFFEEAA',
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 4,
            color: '#AAFFBB',
            opacity: 0.85
          }
        }
      },
      tooltip: {
        enabled: false,
        y: {
          formatter: (val, { seriesIndex }) => seriesIndex === 0 ? `${val}%` : `${val} anos`
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
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
            ],
            [
              {
                offset: 0,
                color: 'rgba(160, 255, 240, 0.3)',
                opacity: 1
              },
              {
                offset: 50,
                color: 'rgba(160, 255, 240, 0.75)',
                opacity: 1
              },
              {
                offset: 100,
                color: 'rgba(160, 255, 240, 0.45)',
                opacity: 1
              }
            ]
          ]
        }
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              width: '100%'
            },
            yaxis: [
              {
                show: false,
                labels: {
                  minWidth: 0,
                }
              },
              {
                show: false,
                labels: {
                  minWidth: 0,
                }
              },
            ],
            xaxis: {
              labels: {
                rotate: -75,
              },
            },
            legend: {
              show: true,
              position: 'bottom',
              horizontalAlign: 'left',
              fontFamily: 'Fira Code',
              fontSize: '0.85rem',
              fontWeight: '300',

              labels: {
                colors: ['#CCFFEEAA', '#CCFFEEAA']
              },
              customLegendItems: [t('technicalSkills.axes.skillLevel'), t('technicalSkills.axes.years')],
              markers: {
                shape: 'circle',
                size: 8,
                fillColors: ['rgba(0, 255, 136, 0.75)', 'rgba(160, 255, 240, 0.75)'],
                strokeWidth: 0,
                offsetX: -12,
              },
              itemMargin: {
                horizontal: 32,
              }
            },
          }
        }
      ],
    }
  }

  const chartSeriesGroup = (group) => [
    { name: t('technicalSkills.axes.skillLevel'), type: 'column', data: group.skills.map(s => s.value) },
    { name: t('technicalSkills.axes.years'), type: 'line', data: group.skills.map(s => s.years) }
  ]

  const groupChartHeight = (group) => Math.max(140, group.skills.length * 60)

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

  const fullSkillGroups = [
    {
      key: 'engineering',
      title: t('technicalSkills.groups.engineering.title'),
      skills: [
        { name: 'SolidWorks', value: 90, years: 13 },
        { name: 'AutoCAD', value: 85, years: 9 },
        { name: 'SolidEdge', value: 80, years: 4 },
        { name: '3D Printing', value: 88, years: 5 },
        { name: 'ANSYS', value: 82, years: 4 },
        { name: 'BIM', value: 74, years: 3 },
        { name: 'CATIA', value: 78, years: 5 },
        { name: 'NX', value: 70, years: 3 },
        { name: 'FEM', value: 86, years: 6 },
        { name: 'GD&T', value: 92, years: 12 }
      ]
    },
    {
      key: 'frontend',
      title: t('technicalSkills.groups.frontend.title'),
      skills: [
        { name: 'Vue.js', value: 95, years: 6 },
        { name: 'Quasar', value: 90, years: 5 },
        { name: 'JavaScript', value: 94, years: 7 },
        { name: 'Electron', value: 82, years: 3 },
        { name: 'HTML/CSS', value: 96, years: 8 },
        { name: 'Vite', value: 85, years: 4 },
        { name: 'Node.js', value: 68, years: 6 },
        { name: 'REST APIs', value: 84, years: 4 },
        { name: 'TypeScript', value: 40, years: 2 },
        { name: 'Git', value: 93, years: 8 },
      ]
    },
    {
      key: 'automation',
      title: t('technicalSkills.groups.automation.title'),
      skills: [
        { name: 'Excel', value: 94, years: 10 },
        { name: 'VBA', value: 93, years: 8 },
        { name: 'Python', value: 65, years: 5 },
        { name: 'REST APIs', value: 84, years: 4 },
        { name: 'Design Automation', value: 91, years: 6 },
        { name: 'Power Automate', value: 80, years: 3 },
        { name: 'Shell Scripting', value: 76, years: 4 },
        { name: 'SQL', value: 85, years: 7 },
        { name: 'CI/CD', value: 83, years: 4 },
        { name: 'API Integration', value: 89, years: 5 }
      ]
    }
  ]

  const skillGroups = computed(() => {
    const maxSkills = screen.gt.sm ? 10 : 5
    return fullSkillGroups.map(group => ({
      ...group,
      skills: group.skills.slice(0, maxSkills)
    }))
  })

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


  .group-chart-wrapper {
    /* display: grid;
    gap: 0.8rem;
    align-items: center; */
    width: clamp(100%, 100%, 1200px);
  }

  .skills-legend {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.4rem;
  }

  /* legacy legend markup removed from template; keep layout vars if reused elsewhere */
  .skills-legend {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.4rem;
  }
</style>
