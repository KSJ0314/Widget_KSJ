import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJs(),
    dts({
      include: ['src/index.ts', 'src/WidgetKSJ.tsx', 'src/theme/theme.ts'],
      outDir: 'dist-lib',
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
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
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WidgetKSJ',
      fileName: 'widget-ksj',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist-lib',
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'styled-components': 'styled',
        },
      },
    },
  },
});
