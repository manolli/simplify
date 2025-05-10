<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" class="input" />
        <input v-model="password" type="password" placeholder="Senha" class="input mt-3" />
        <button class="btn w-full mt-5 bg-blue-600 text-white">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

async function login() {
  const res = await fetch('http://localhost:4000/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  })
  const data = await res.json()
  if (data.token) {
    localStorage.setItem('token', data.token)
    router.push('/dashboard')
  } else {
    alert('Login inválido')
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
