<template>
    <div class="bg-white shadow rounded p-4 text-center">
      <p class="text-sm text-gray-500">{{ label }}</p>
      <h2 class="text-2xl font-bold mt-1">{{ value }}</h2>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    label: string
    value: string | number
  }>()
  </script>
  