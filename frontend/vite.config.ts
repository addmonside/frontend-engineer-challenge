import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

const dirname =
  typeof __dirname === 'undefined' ? path.dirname(fileURLToPath(import.meta.url)) : __dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mkcert({
      savePath: './.tls',
    }),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 3000, // Важно для macOS
      protocol: 'wss',
      host: 'localhost',
    },
    watch: {
      usePolling: false, // Для macOS обычно false
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
})
