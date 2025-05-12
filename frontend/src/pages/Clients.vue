<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Clientes</h1>
      <button
        @click="openForm()"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Novo Cliente
      </button>
    </div>

    <div v-if="loading">🔄 Carregando clientes...</div>
    <div v-else-if="clients.length === 0">Nenhum cliente encontrado.</div>

    <table v-else class="min-w-full table-auto border">
      <thead class="bg-gray-100">
        <tr>
          <th class="text-left p-2">Nome</th>
          <th class="text-left p-2">Telefone</th>
          <th class="text-left p-2">Email</th>
          <th class="text-left p-2 w-40">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client._id" class="border-t">
          <td class="p-2">{{ client.name }}</td>
          <td class="p-2">{{ client.phone }}</td>
          <td class="p-2">{{ client.email }}</td>
          <td class="p-2">
            <button
              @click="openForm(client)"
              class="text-blue-600 hover:underline mr-3"
            >
              Editar
            </button>
            <button
              @click="remove(client._id!)"
              class="text-red-600 hover:underline"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulário modal -->
    <ClientForm
      v-if="formOpen"
      :client="selected"
      @close="closeForm"
      @saved="onSave"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useClientStore } from '@/store/client'
import { storeToRefs } from 'pinia'
import ClientForm from '@/components/Clients/ClientForm.vue'

const store = useClientStore()
const { clients, loading } = storeToRefs(store)
const { fetchClients, deleteClient } = store

const formOpen = ref(false)
const selected = ref(null)

const openForm = (client = null) => {
  selected.value = client
  formOpen.value = true
}

const closeForm = () => {
  selected.value = null
  formOpen.value = false
}

const onSave = async () => {  
  closeForm()
}

const remove = async (id) => {
  if (confirm('Deseja realmente excluir este cliente?')) {
    await deleteClient(id)
  }
}

onMounted(fetchClients)
</script>