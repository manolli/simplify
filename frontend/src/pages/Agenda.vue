<template>
    <div>
      <h1>Agenda do Dia</h1>
      <ul>
        <li v-for="appt in appointments" :key="appt._id">
          {{ formattedDate(appt.date) }} -
          {{ appt.clientId.name }} -
          {{ appt.serviceId.name }} com {{ appt.barberId.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useAuthStore } from '../store/auth'
  
  const auth = useAuthStore()
  const appointments = ref<any[]>([])
  
  onMounted(async () => {
    const today = new Date().toISOString().split('T')[0]
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_AGENDA}/v1/appointments?date=${today}`,
      { headers: { Authorization: `Bearer ${auth.token}` } }
    )
    appointments.value = res.data
  })
  
  function formattedDate(dt: string) {
    return new Date(dt).toLocaleString()
  }
  </script>