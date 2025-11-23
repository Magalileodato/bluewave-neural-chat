import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // 🔌 Plugins usados pela aplicação
  plugins: [react()],

  // 🌐 Servidor de dev (suporte para Docker e rede local)
  server: {
    host: true,
    port: 5173,
    strictPort: true
  },

  // 🔍 Preview (modo produção local)
  preview: {
    host: true,
    port: 5173
  }
})
