import 'styled-components';

export const theme = {
  colors: {
    background: '#0a0a0f',
    surface: '#13131a',
    primary: '#00e5ff',
    primaryGlow: 'rgba(0, 229, 255, 0.45)',
    secondary: '#00ff9d',
    text: '#e0e0e0',
    textDim: 'rgba(0, 229, 255, 0.35)',
    border: 'rgba(0, 229, 255, 0.12)',
  },
  fonts: {
    display: "'Orbitron', 'Courier New', monospace",
    mono: "'Courier New', Courier, monospace",
  },
} as const;

export type AppTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
