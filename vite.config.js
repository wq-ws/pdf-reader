import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    Components({
      dts: true, // ts 环境下要启用 
      resolvers: [NaiveUiResolver()],
      dirs: ['src/components']
    })
  ],
  server: {
    port: 5173
  }
})
