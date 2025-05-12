<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <!-- Enquanto autenticando (carregando perfil ou token) -->
    <div v-if="!auth.hydrated">
      <p class="text-center mt-10">Carregando...</p>
    </div>

    <!-- Após hidratação -->
    <div v-else>
      <!-- Se autenticado, usa layout com Sidebar + Header -->
      <div v-if="auth.isAuthenticated" class="flex">
        <Sidebar />
        <main class="flex-1 flex flex-col">
          <Header />
          <router-view />
        </main>
      </div>

      <!-- Se não autenticado, mostra apenas o conteúdo público -->
      <div v-else>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Sidebar from './components/Layout/Sidebar.vue'
import Header from './components/Layout/Header.vue'
import { useAuthStore } from './store/auth' // corrigido para 'stores' se for o seu padrão

const auth = useAuthStore()

onMounted(() => {
  auth.initialize()
})
</script>
