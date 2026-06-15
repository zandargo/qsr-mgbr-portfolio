<template>
  <div class="radar-chart">
    <apexchart type="radar" width="100%" height="100%" :options="chartOptions" :series="chartSeries" />
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
        t('radar.categories.0'),
        t('radar.categories.1'),
        t('radar.categories.2'),
        t('radar.categories.3'),
        t('radar.categories.4'),
        t('radar.categories.5')
      ],
      labels: {
        style: {
          colors: ['#8ba698', '#8ba698', '#8ba698', '#8ba698', '#8ba698', '#8ba698'],
          fontFamily: 'Fira Code, Barlow, Segoe UI, sans-serif',
          fontSize: '16px'
        },
        rotate: 25,
        rotateAlways: true,
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
        polygons: {
          strokeColors: 'rgba(125, 255, 202, 0.18)',
          fill: {
            colors: ['rgba(20, 25, 22, 0.46)', 'rgba(16, 21, 18, 0.66)']
          }
        }
      }
    },
    legend: {
      show: false
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
              size: 120
            }
          }
        }
      },
      {
        breakpoint: 700,
        options: {
          plotOptions: {
            radar: {
              size: 80
            }
          },
          xaxis: {
            labels: {
              show: false,
              style: {
                fontSize: '10px'
              },
              rotate: 25,
              rotateAlways: true,
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
          legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '12px',
            markers: {
              width: 10,
              height: 10,
              radius: 5
            }
          }
        }
      }
    ]
  }))
</script>

<style scoped>
  .radar-chart {
    width: 100%;
    height: clamp(300px, 48vw, 430px);
  }
</style>
