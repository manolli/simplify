import { defineStore } from 'pinia'
import axios from 'axios'

export interface Client {
  _id?: string
  name: string
  phone: string
  email: string
  notes?: string
  createdAt?: string
}

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [] as Client[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchClients() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get('/v1/clients')
        this.clients = res.data
      } catch (err: any) {
        this.error = err.response?.data?.error || 'Erro ao buscar clientes'
      } finally {
        this.loading = false
      }
    },

    async createClient(client: Client) {
      try {
        const res = await axios.post('/v1/clients', client)
        this.clients.push(res.data)
      } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Erro ao criar cliente')
      }
    },

    async updateClient(id: string, client: Client) {
      try {
        const res = await axios.put(`/v1/clients/${id}`, client)
        const index = this.clients.findIndex(c => c._id === id)
        if (index !== -1) this.clients[index] = res.data
      } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Erro ao atualizar cliente')
      }
    },

    async deleteClient(id: string) {
      try {
        await axios.delete(`/v1/clients/${id}`)
        this.clients = this.clients.filter(c => c._id !== id)
      } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Erro ao excluir cliente')
      }
    }
  }
})
