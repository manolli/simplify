<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const pageTitle = computed(() => route.meta.title || 'Dashboard')
const actionLabel = computed(() => route.meta.actionLabel || 'Novo Agendamento')
</script>

<template>
    <header class="bg-white border-b px-6 py-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold">{{ pageTitle }}</h2>
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {{ actionLabel }}
      </button>
    </header>
</template> 