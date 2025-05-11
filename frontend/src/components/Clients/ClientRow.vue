<template>
  <tr class="border-t">
    <td class="p-2">{{ client.name }}</td>
    <td class="p-2">{{ client.phone }}</td>
    <td class="p-2">{{ client.email }}</td>
    <td class="p-2">
      <button
        @click="$emit('edit', client)"
        class="text-blue-600 hover:underline mr-3"
      >
        Editar
      </button>
      <button
        @click="client._id && $emit('delete', client._id)"
        class="text-red-600 hover:underline"
      >
        Excluir
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { Client } from '@/store/client'

defineProps<{ client: Client }>()
defineEmits<{
  (e: 'edit', client: Client): void
  (e: 'delete', id: string): void
}>()
</script>
