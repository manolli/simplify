<template>
    <div class="bg-white shadow rounded p-4">
      <h3 class="font-semibold mb-3">Próximos Agendamentos</h3>
      <ul class="space-y-2">
        <li v-for="(appt, index) in appointments" :key="index" class="flex justify-between items-center border-b pb-2">
          <div>
            <p class="font-medium">{{ appt.client }}</p>
            <p class="text-sm text-gray-500">{{ appt.service }}</p>
          </div>
          <span class="text-sm text-gray-600">{{ appt.time }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const appointments = [
    { client: 'Carlos Lima', service: 'Corte + Barba', time: '14:00' },
    { client: 'Marcos Alves', service: 'Corte', time: '14:30' },
    { client: 'João Pedro', service: 'Barba', time: '15:00' }
  ]
  </script>
  