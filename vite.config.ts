import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const isDev = process.env.NODE_ENV === 'development'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: 'MOA',
        short_name: 'MOA',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        importScripts: ['firebase-messaging-sw.js'],
      },
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: Object.assign(
    {
      port: 5173,
    },
    isDev && fs.existsSync('./certs/key.pem') && fs.existsSync('./certs/cert.pem')
      ? {
          https: {
            key: fs.readFileSync('./certs/key.pem'),
            cert: fs.readFileSync('./certs/cert.pem'),
          },
        }
      : {}
  ),
})
