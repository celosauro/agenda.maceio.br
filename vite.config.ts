import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base URL para domínio personalizado (raiz)
  base: '/',
  build: {
    // Otimizações de build (usa esbuild por padrão)
    sourcemap: false,
  },
})
