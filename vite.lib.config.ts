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
