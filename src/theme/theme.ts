import 'styled-components';

export interface AppTheme {
  colors: {
    background: string;
    surface: string;
    primary: string;
    primaryGlow: string;
    secondary: string;
    text: string;
    textDim: string;
    border: string;
    scanline: string;
  };
  fonts: {
    display: string;
    mono: string;
  };
  variant: 'digital' | 'paper';
}

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}

const dark: AppTheme = {
  colors: {
    background: '#0a0a0f',
    surface: '#13131a',
    primary: '#00e5ff',
    primaryGlow: 'rgba(0, 229, 255, 0.45)',
    secondary: '#00ff9d',
    text: '#e0e0e0',
    textDim: 'rgba(0, 229, 255, 0.35)',
    border: 'rgba(0, 229, 255, 0.12)',
    scanline: 'rgba(255, 255, 255, 0.04)',
  },
  fonts: {
    display: "'Orbitron', 'Courier New', monospace",
    mono: "'Courier New', Courier, monospace",
  },
  variant: 'digital',
};

const pink: AppTheme = {
  colors: {
    background: '#1a0812',
    surface: '#2d1020',
    primary: '#ff6b9d',
    primaryGlow: 'rgba(255, 107, 157, 0.45)',
    secondary: '#ffb3c8',
    text: '#ffe0ec',
    textDim: 'rgba(255, 107, 157, 0.35)',
    border: 'rgba(255, 107, 157, 0.12)',
    scanline: 'rgba(255, 255, 255, 0.04)',
  },
  fonts: {
    display: "'Orbitron', 'Courier New', monospace",
    mono: "'Courier New', Courier, monospace",
  },
  variant: 'digital',
};

const green: AppTheme = {
  colors: {
    background: '#030f07',
    surface: '#071a0d',
    primary: '#00ff88',
    primaryGlow: 'rgba(0, 255, 136, 0.45)',
    secondary: '#7fffb3',
    text: '#d0ffe0',
    textDim: 'rgba(0, 255, 136, 0.35)',
    border: 'rgba(0, 255, 136, 0.12)',
    scanline: 'rgba(255, 255, 255, 0.04)',
  },
  fonts: {
    display: "'Orbitron', 'Courier New', monospace",
    mono: "'Courier New', Courier, monospace",
  },
  variant: 'digital',
};

const ivory: AppTheme = {
  colors: {
    background: '#ffffff',
    surface: '#f5ede0',
    primary: '#8b6a4f',
    primaryGlow: 'rgba(139, 106, 79, 0.3)',
    secondary: '#c4956a',
    text: '#3d2b1a',
    textDim: 'rgba(139, 106, 79, 0.4)',
    border: 'rgba(139, 106, 79, 0.15)',
    scanline: 'rgba(0, 0, 0, 0.03)',
  },
  fonts: {
    display: "'Orbitron', 'Courier New', monospace",
    mono: "'Courier New', Courier, monospace",
  },
  variant: 'digital',
};

const paper: AppTheme = {
  colors: {
    background: '#ffffff',
    surface: '#faf7f2',
    primary: '#5c3d11',
    primaryGlow: 'rgba(0, 0, 0, 0.08)',
    secondary: '#8b6914',
    text: '#2a1a0a',
    textDim: 'rgba(92, 61, 17, 0.35)',
    border: 'rgba(92, 61, 17, 0.2)',
    scanline: 'rgba(0, 0, 0, 0)',
  },
  fonts: {
    display: "'Playfair Display', Georgia, serif",
    mono: "'Libre Baskerville', 'Times New Roman', serif",
  },
  variant: 'paper',
};

export const themes = { dark, pink, green, ivory, paper };
export type ThemeName = keyof typeof themes;
