<template>
  <div class="radar-chart">
    <apexchart class="" width="100%" height="100%" :options="chartOptions" :series="chartSeries" />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const chartSeries = [
    {
      name: t('radar.professionalStrength'),
      data: [
        60, // Liderança
        75, // Comunicação
        96, // Criatividade
        72, // Trabalho em equipe
        94, // Adaptabilidade
        89, // Resolução de problemas
      ]
    }
  ]

  const chartOptions = computed(() => ({
    chart: {
      type: 'radar',
      height: '100%',
      width: '100%',
      offsetY: 0,
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        speed: 760,
        animateGradually: {
          enabled: true,
          delay: 120
        }
      },
      foreColor: '#8ba698'
    },
    xaxis: {
      categories: [
        t('radar.categories.0').split(' '),
        t('radar.categories.1').split(' '),
        t('radar.categories.2').split(' '),
        t('radar.categories.3').split(' '),
        t('radar.categories.4').split(' '),
        t('radar.categories.5').split(' ')
      ],
      labels: {
        style: {
          colors: ['#8ba698', '#8ba698', '#8ba698', '#8ba698', '#8ba698', '#8ba698'],
          fontFamily: 'Fira Code, Barlow, Segoe UI, sans-serif',
          fontSize: '16px',
          // rotate: 45,
          // rotateAlways: true,
          // trim: true,
        },
      },
    },
    yaxis: {
      show: false,
      max: 100,
      tickAmount: 4
    },
    stroke: {
      width: 2,
      colors: ['#44ffaa']
    },
    fill: {
      opacity: 0.36,
      colors: ['#00ff88']
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      strokeColors: '#101512',
      colors: ['#7dffca'],
      hover: {
        size: 6
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      radar: {
        size: 130,
        offsetX: 0,
        offsetY: 0,
        polygons: {
          strokeColors: 'rgba(125, 255, 202, 0.18)',
          fill: {
            colors: ['rgba(20, 25, 22, 0.46)', 'rgba(16, 21, 18, 0.66)']
          }
        }
      }
    },
    legend: {
      show: true,
      customLegendItems: [
        '1', '2', '3', '4', '5', '6'
      ],
    },
    tooltip: {
      theme: 'dark'
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          plotOptions: {
            radar: {
              size: 100
            }
          }
        }
      },
      {
        breakpoint: 700,
        options: {
          plotOptions: {
            radar: {
              size: 75
            }
          },
          xaxis: {
            labels: {
              show: true,
              style: {
                fontSize: '10px'
              },
              // rotate: 25,
              // rotateAlways: true,
            }
          },
          // yaxis: {
          //   labels: {
          //     style: {
          //       fontSize: '11px'
          //     },
          //     rotate: 25,
          //     rotateAlways: true,
          //   }
          // },
          // legend: {
          //   show: true,
          //   position: 'bottom',
          //   horizontalAlign: 'center',
          //   fontSize: '12px',
          //   markers: {
          //     width: 10,
          //     height: 10,
          //     radius: 5
          //   }
          // }
        }
      }
    ]
  }))
</script>

<style scoped>
  .radar-chart {
    /* width: 80%; */
    max-width: 100%;
    height: clamp(320px, 48vw, 430px);
    min-height: 320px;
  }
</style>
