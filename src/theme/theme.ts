import 'styled-components';

export interface AppTheme {
  colors: {
    background: string;
    surface: string;
    primary: string;
    primaryGlow: string;
    accent: string;
    accentGlow: string;
    secondary: string;
    text: string;
    textDim: string;
    border: string;
    scanline: string;
    /** 값이 있으면 플립 시계 카드에 이 색으로 테두리를 두른다 */
    cardBorder?: string;
  };
  fonts: {
    display: string;
    mono: string;
    /** 시계 숫자 전용. 값이 없으면 각 위젯의 기본 폰트를 쓴다 */
    digit?: string;
    /** 폰트마다 글자가 작아 보이는 정도가 달라, 이를 보정할 배율 (기본 1) */
    scale?: number;
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
    accent: '#00e5ff',
    accentGlow: 'rgba(0, 229, 255, 0.45)',
    secondary: '#00ff9d',
    text: '#e0e0e0',
    textDim: 'rgba(0, 229, 255, 0.35)',
    border: 'rgba(0, 229, 255, 0.12)',
    scanline: 'rgba(255, 255, 255, 0.04)',
  },
  fonts: {
    display: "'Orbitron', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Nanum Gothic', sans-serif",
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
    accent: '#ff6b9d',
    accentGlow: 'rgba(255, 107, 157, 0.45)',
    secondary: '#ffb3c8',
    text: '#ffe0ec',
    textDim: 'rgba(255, 107, 157, 0.35)',
    border: 'rgba(255, 107, 157, 0.12)',
    scanline: 'rgba(255, 255, 255, 0.04)',
  },
  fonts: {
    display: "'Orbitron', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Nanum Gothic', sans-serif",
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
    accent: '#00ff88',
    accentGlow: 'rgba(0, 255, 136, 0.45)',
    secondary: '#7fffb3',
    text: '#d0ffe0',
    textDim: 'rgba(0, 255, 136, 0.35)',
    border: 'rgba(0, 255, 136, 0.12)',
    scanline: 'rgba(255, 255, 255, 0.04)',
  },
  fonts: {
    display: "'Orbitron', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Nanum Gothic', sans-serif",
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
    accent: '#c4956a',
    accentGlow: 'rgba(196, 149, 106, 0.35)',
    secondary: '#c4956a',
    text: '#3d2b1a',
    textDim: 'rgba(139, 106, 79, 0.4)',
    border: 'rgba(139, 106, 79, 0.15)',
    scanline: 'rgba(0, 0, 0, 0.03)',
  },
  fonts: {
    display: "'Orbitron', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Nanum Gothic', sans-serif",
    mono: "'Courier New', Courier, monospace",
  },
  variant: 'digital',
};

const lightBlue: AppTheme = {
  colors: {
    background: '#ffffff',
    surface: '#ddeef8',
    primary: '#7ab2d8',
    primaryGlow: 'rgba(122, 178, 216, 0.3)',
    accent: '#7ab2d8',
    accentGlow: 'rgba(122, 178, 216, 0.3)',
    secondary: '#a8cfe8',
    text: '#1a3348',
    textDim: 'rgba(122, 178, 216, 0.65)',
    border: 'rgba(122, 178, 216, 0.25)',
    scanline: 'rgba(0, 0, 0, 0.03)',
  },
  fonts: {
    display: "'Orbitron', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Nanum Gothic', sans-serif",
    mono: "'Courier New', Courier, monospace",
  },
  variant: 'digital',
};

const lightPink: AppTheme = {
  colors: {
    background: '#ffffff',
    surface: '#fcdde3',
    primary: '#ee8599',
    primaryGlow: 'rgba(238, 133, 153, 0.3)',
    accent: '#ee8599',
    accentGlow: 'rgba(238, 133, 153, 0.3)',
    secondary: '#f4aabb',
    text: '#3d1520',
    textDim: 'rgba(238, 133, 153, 0.65)',
    border: 'rgba(238, 133, 153, 0.25)',
    scanline: 'rgba(0, 0, 0, 0.03)',
  },
  fonts: {
    display: "'Orbitron', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Nanum Gothic', sans-serif",
    mono: "'Courier New', Courier, monospace",
  },
  variant: 'digital',
};

const lightGreen: AppTheme = {
  colors: {
    background: '#ffffff',
    surface: '#d8f2e6',
    primary: '#6dc49a',
    primaryGlow: 'rgba(109, 196, 154, 0.3)',
    accent: '#6dc49a',
    accentGlow: 'rgba(109, 196, 154, 0.3)',
    secondary: '#98d8ba',
    text: '#1a3828',
    textDim: 'rgba(109, 196, 154, 0.65)',
    border: 'rgba(109, 196, 154, 0.25)',
    scanline: 'rgba(0, 0, 0, 0.03)',
  },
  fonts: {
    display: "'Orbitron', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Nanum Gothic', sans-serif",
    mono: "'Courier New', Courier, monospace",
  },
  variant: 'digital',
};

const lightBlueWhite: AppTheme = {
  ...lightBlue,
  colors: {
    ...lightBlue.colors,
    surface: '#ffffff',
    cardBorder: '#7ab2d8',
  },
};

const lightPinkWhite: AppTheme = {
  ...lightPink,
  colors: {
    ...lightPink.colors,
    surface: '#ffffff',
    cardBorder: '#ee8599',
  },
};

const lightGreenWhite: AppTheme = {
  ...lightGreen,
  colors: {
    ...lightGreen.colors,
    surface: '#ffffff',
    cardBorder: '#6dc49a',
  },
};

const paper: AppTheme = {
  colors: {
    background: '#ffffff',
    surface: '#faf7f2',
    primary: '#5c3d11',
    primaryGlow: 'rgba(0, 0, 0, 0.08)',
    accent: '#5c3d11',
    accentGlow: 'rgba(0, 0, 0, 0.08)',
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

export const themes = {
  dark,
  pink,
  green,
  ivory,
  paper,
  lightBlue,
  lightPink,
  lightGreen,
  lightBlueWhite,
  lightPinkWhite,
  lightGreenWhite,
};
export type ThemeName = keyof typeof themes;
