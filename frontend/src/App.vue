<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <div v-if="isAuthenticated" class="flex">
      <Sidebar />
      <main class="flex-1 flex flex-col">
        <Header />
        <router-view />
      </main>
    </div>

    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Layout/Sidebar.vue'
import Header from './components/Layout/Header.vue'
import { useAuthStore } from './store/auth'
import { computed } from 'vue'

const auth = useAuthStore()
const isAuthenticated = computed(() => !!auth.token)
</script>
