<template>
    <router-link
      :to="to"
      class="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition"
      :title="collapsed ? label : ''"
    >
      <span class="text-xl">{{ icon }}</span>
      <span v-if="!collapsed" class="ml-3">{{ label }}</span>
    </router-link>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    icon: string
    label: string
    to: string
    collapsed: boolean
  }>()
  </script>
  