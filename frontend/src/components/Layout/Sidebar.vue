<template>
  <Transition name="sidebar" appear>
    <aside
      v-if="auth.isAuthenticated"
      :class="[
        'bg-gray-900 text-white min-h-screen transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64'
      ]"
      class="flex flex-col"
    >
      <!-- Topo -->
      <div class="flex items-center justify-between px-4 py-4">
        <h1 v-if="!isCollapsed" class="text-xl font-bold">Barbearia</h1>
        <button @click="toggle" class="text-gray-300 hover:text-white">
          <span v-if="isCollapsed">»</span>
          <span v-else>«</span>
        </button>
      </div>

      <!-- Navegação -->
      <nav class="flex-1">
        <ul class="space-y-1">
          <SidebarLink icon="📊" label="Dashboard" to="/dashboard" :collapsed="isCollapsed" />
          <SidebarLink icon="👥" label="Clientes" to="/clients" :collapsed="isCollapsed" />
          <SidebarLink icon="✂️" label="Serviços" to="/servicos" :collapsed="isCollapsed" />
          <SidebarLink icon="💸" label="Financeiro" to="/financeiro" :collapsed="isCollapsed" />
          <SidebarLink icon="📈" label="Relatórios" to="/relatorios" :collapsed="isCollapsed" />
        </ul>
      </nav>

      <!-- Logoff -->
      <div class="px-4 py-4 border-t border-gray-700">
        <button
          @click="auth.logout"
          class="flex items-center w-full text-left text-red-400 hover:text-red-200"
        >
          <span class="text-lg">🏃🚪</span>
          <span v-if="!isCollapsed" class="ml-2">Sair</span>
        </button>
      </div>
    </aside>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import SidebarLink from './SidebarLink.vue'

const isCollapsed = ref(false)
const toggle = () => (isCollapsed.value = !isCollapsed.value)

const auth = useAuthStore()
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.3s ease;
}
.sidebar-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.sidebar-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.sidebar-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.sidebar-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
