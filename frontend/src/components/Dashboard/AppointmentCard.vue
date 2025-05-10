<template>
    <div class="bg-white shadow rounded p-4">
      <h3 class="font-semibold mb-3">Próximos Agendamentos</h3>
      <ul class="space-y-2">
        <li
          v-for="(appt, index) in appointments"
          :key="index"
          class="flex justify-between items-center border-b pb-2 last:border-0"
        >
          <div>
            <p class="font-medium">{{ appt.client }}</p>
            <p class="text-sm text-gray-500">{{ appt.service }}</p>
          </div>
          <span class="text-sm text-gray-600">{{ appt.time }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import api from '../../services/api'
  
  interface Appointment {
    client: string
    service: string
    time: string
  }
  
  const appointments = ref<Appointment[]>([])
  
  onMounted(async () => {
    try {
      const res = await api.get('/appointments/today')
      appointments.value = res.data
    } catch (err) {
      console.error('Erro ao buscar agendamentos', err)
    }
  })
  </script>
  