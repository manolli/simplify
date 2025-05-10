<template>
    <div class="bg-white shadow rounded p-4">
      <h3 class="font-semibold mb-3">Receita da Semana</h3>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import Chart from 'chart.js/auto'
  
  const chartCanvas = ref()
  
  onMounted(() => {
    new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        datasets: [{
          label: 'R$',
          data: [120, 180, 90, 200, 160, 240],
          backgroundColor: '#3b82f6'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    })
  })
  </script>
  