<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../services/api'
import KPIBox from '../components/Dashboard/KPIBox.vue'
import AppointmentCard from '../components/Dashboard/AppointmentCard.vue'
import BarChart from '../components/Dashboard/BarChart.vue'

const kpis = ref({
  appointments: 0,
  clients: 0,
  revenue: 'R$ 0,00',
  services: 0
})

onMounted(async () => {
  try {
    const res = await api.get('/dashboard/summary') // endpoint fictício
    kpis.value = res.data
  } catch (err) {
    console.error('Erro ao carregar dashboard', err)
  }
})
</script>

<template>
  <div class="p-6 space-y-6">
    <h2 class="text-xl font-semibold mb-4">Dashboard</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KPIBox label="Agendamentos" :value="kpis.appointments" />
      <KPIBox label="Clientes Ativos" :value="kpis.clients" />
      <KPIBox label="Receita Hoje" :value="kpis.revenue" />
      <KPIBox label="Serviços" :value="kpis.services" />
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <AppointmentCard />
      <BarChart />
    </div>
  </div>
</template>
