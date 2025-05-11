<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-md w-full max-w-md relative">
      <h2 class="text-xl font-semibold mb-4">
        {{ model._id ? 'Editar Cliente' : 'Novo Cliente' }}
      </h2>

      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block font-medium mb-1">Nome</label>
          <input
            v-model="model.name"
            type="text"
            required
            class="w-full border rounded px-3 py-2"
          />
        </div>

        <div class="mb-4">
          <label class="block font-medium mb-1">Telefone</label>
          <input
            v-model="model.phone"
            type="text"
            required
            class="w-full border rounded px-3 py-2"
          />
        </div>

        <div class="mb-4">
          <label class="block font-medium mb-1">E-mail</label>
          <input
            v-model="model.email"
            type="email"
            required
            class="w-full border rounded px-3 py-2"
          />
        </div>

        <div class="mb-4">
          <label class="block font-medium mb-1">Observações</label>
          <textarea
            v-model="model.notes"
            rows="3"
            class="w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button
            type="button"
            class="px-4 py-2 border rounded hover:bg-gray-100"
            @click="$emit('close')"
          >
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useClientStore, type Client } from '@/store/client'

const props = defineProps<{ client: Client | null }>()
const emit = defineEmits(['close', 'saved'])

const model = ref<Client>({
  name: '',
  phone: '',
  email: '',
  notes: ''
})

watch(
  () => props.client,
  (newVal) => {
    model.value = newVal
      ? { ...newVal }
      : { name: '', phone: '', email: '', notes: '' }
  },
  { immediate: true }
)

const store = useClientStore()

const submit = async () => {
  try {
    if (model.value._id) {
      await store.updateClient(model.value._id, model.value)
    } else {
      await store.createClient(model.value)
    }

    emit('saved')
  } catch (error: any) {
    alert(error.message) // ou use um toast
    console.error('Erro ao salvar cliente:', error)
  }
}
</script>
