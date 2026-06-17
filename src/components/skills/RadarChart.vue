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
    60, // Liderança
    75, // Comunicação
    96, // Criatividade
    72, // Trabalho em equipe
    94, // Adaptabilidade
    89, // Resolução de problemas
  ]

  const chartOptions = computed(() => ({
    chart: {
      type: 'polarArea',
      height: '100%',
      width: '100%',
      fontFamily: 'Fira Code, sans-serif',
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
      foreColor: '#CCFFEEDD'
    },
    labels: [
      t('radar.categories.0'),
      t('radar.categories.1'),
      t('radar.categories.2'),
      t('radar.categories.3'),
      t('radar.categories.4'),
      t('radar.categories.5')
    ],
    stroke: {
      width: 2,
      colors: ['#AAFFDD99'],
    },
    // fill: {
    //   opacity: 0.75,
    //   // colors: '#00FF00',
    // },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        stops: [0, 50],
        opacityFrom: 0.8,
        opacityTo: 1,
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 1,
          strokeColor: 'rgba(125, 255, 202, 0.18)',
        },
        spokes: {
          strokeWidth: 1,
          connectorColors: 'rgba(125, 255, 202, 0.2)',
        }
      }
    },
    legend: {
      show: true,
      position: 'right',
      horizontalAlign: 'left',
      fontSize: '14px',
      formatter: (seriesName, opts) => seriesName,
      markers: {
        strokeWidth: 1,
        width: 12,
        height: 12,
        radius: 50,
        offsetX: -8,
      },
      itemMargin: {
        horizontal: 18,
        vertical: 4,
      }
    },
    tooltip: {
      theme: 'dark'
    },
    theme: {
      // mode: 'dark',
      // palletete: 'palette5',
      monochrome: {
        enabled: true,
        color: '#66FFBB',
        shadeTo: 'dark',
        shadeIntensity: 1,
      },
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          legend: {
            position: 'right',
            // horizontalAlign: 'left'
            itemMargin: {
              horizontal: 18,
              vertical: 2,
            }
          }
        }
      },
      {
        breakpoint: 700,
        options: {
          legend: {
            position: 'bottom',
            offsetX: 16,
            // horizontalAlign: 'center',
            itemMargin: {
              horizontal: 18,
              vertical: 2,
            }
          },
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
