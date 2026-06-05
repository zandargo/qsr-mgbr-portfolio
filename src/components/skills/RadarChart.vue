<template>
	<div class="radar-chart">
		<apexchart type="radar" width="100%" height="100%" :options="chartOptions" :series="chartSeries" />
	</div>
</template>

<script setup>
	const chartSeries = [
		{
			name: 'Professional Strength',
			data: [90, 88, 86, 92, 89, 94]
		}
	]

	const chartOptions = {
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
			categories: ['Leadership', 'Communication', 'Creativity', 'Teamwork', 'Adaptability', 'Problem Solving'],
			labels: {
				style: {
					colors: ['#8ba698', '#8ba698', '#8ba698', '#8ba698', '#8ba698', '#8ba698'],
					fontFamily: 'Barlow, Segoe UI, sans-serif',
					fontSize: '12px'
				}
			}
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
					xaxis: {
						labels: {
							style: {
								fontSize: '11px'
							}
						}
					},
					plotOptions: {
						radar: {
							size: 104
						}
					}
				}
			}
		]
	}
</script>

<style scoped>
	.radar-chart {
		width: 100%;
		height: clamp(300px, 48vw, 430px);
	}
</style>
