import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/Widget_KSJ/',
  resolve: {
    alias: {
      // 더 긴 이름이 먼저 와야 '@/'가 '@scheduler/'를 가로채지 않는다
      '@clock': resolve(__dirname, 'src/pages/clock'),
      '@calendar': resolve(__dirname, 'src/pages/calendar'),
      '@scheduler': resolve(__dirname, 'src/pages/scheduler'),
      '@weather': resolve(__dirname, 'src/pages/weather'),
      '@home': resolve(__dirname, 'src/pages/home'),
      '@': resolve(__dirname, 'src'),
    },
  },
})
