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
import { reactive, watch } from 'vue'
import { useClientStore, type Client } from '@/store/client'

const props = defineProps<{ client: Client | null }>()
const emit = defineEmits(['close', 'saved'])

const store = useClientStore()

// Torna o formulário reativo com valores padrão
const model = reactive<Client>({
  name: '',
  phone: '',
  email: '',
  notes: ''
})

// Atualiza os campos quando um cliente é passado como prop
watch(
  () => props.client,
  (newVal) => {
    if (newVal) {
      Object.assign(model, newVal)
    } else {
      model.name = ''
      model.phone = ''
      model.email = ''
      model.notes = ''
    }
  },
  { immediate: true }
)

const submit = async () => {
  try {
    if (props.client?._id) {
      await store.updateClient(props.client._id, model)
    } else {
      await store.createClient(model)
    }

    emit('saved') // notifica o componente pai para recarregar e fechar
  } catch (error: any) {
    alert(error.message)
    console.error('Erro ao salvar cliente:', error)
  }
}
</script>
