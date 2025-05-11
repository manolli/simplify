import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },   
  },
   server: {
       port: 5173,
       proxy: {
      '/v1': {
        target: 'http://localhost:4100', // ou o endereço do backend no Docker
        changeOrigin: true
      }
    }
  }
})
