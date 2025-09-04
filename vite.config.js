import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Kinetic Solutions',
        short_name: 'KSI',
        description: 'Agência de tecnologia e soluções digitais.',
        theme_color: '#17517E',
        icons: [
          {
            src: 'icone-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icone-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
