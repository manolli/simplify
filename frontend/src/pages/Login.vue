<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" class="input" />
        <input v-model="password" type="password" placeholder="Senha" class="input mt-3" />
         <button class="btn w-full mt-5 bg-blue-600 text-white" :disabled="loading">
          <span v-if="loading">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
//import api from '@/services/api' // <- importante: usar o axios.ts
import {useAuthStore}  from '@/store/auth' // <- importante: usar o auth.ts

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const auth = useAuthStore()

async function login() {
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    alert('Erro ao fazer login');
    console.error(err);
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.input {
  @apply w-full p-2 border rounded focus:outline-none focus:ring;
}
.btn {
  @apply py-2 px-4 rounded hover:opacity-90;
}
</style>
