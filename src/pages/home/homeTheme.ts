/**
 * 홈 화면 전용 스타일 값.
 * 위젯 테마(DefaultTheme)와 연결하지 않아, 주소에 ?theme= 가 붙어도 홈 모습은 바뀌지 않는다.
 * 사이드바에서 고른 색상의 밝기(isDark)에 따라 밝은·어두운 팔레트를 골라 쓴다.
 */

import { fontPreview, type FontName } from '@/theme/fonts';

/** 팔레트 값을 실어 나르는 CSS 변수 이름 */
const homeVarNames = {
  /** 화면 배경 */
  background: '--home-bg',
  /** 카드·모달 */
  surface: '--home-surface',
  /** 사이드바 */
  sidebar: '--home-sidebar',
  /** 강조색(채움·선택 표시) */
  accent: '--home-accent',
  /** 강조 글자·버튼 배경 */
  accentStrong: '--home-accent-strong',
  /** 선택 항목 배경 */
  selected: '--home-selected',
  /** 본문 글자 */
  text: '--home-text',
  /** 보조 글자 */
  textSub: '--home-text-sub',
  /** 선 */
  border: '--home-border',
  /** 채운 버튼 위 글자 */
  onAccent: '--home-on-accent',
  /** 모달 뒤를 덮는 막 */
  scrim: '--home-scrim',
  /** 잠긴 미리보기를 덮는 막 */
  veil: '--home-veil',
  /** 펼친 사이드바 그림자 */
  shadowSidebar: '--home-shadow-sidebar',
  /** 모달 그림자 */
  shadowModal: '--home-shadow-modal',
} as const;

type HomeVarKey = keyof typeof homeVarNames;

/** 밝은·어두운 두 벌. 키는 서로 같다 */
export const homePalettes: Record<'light' | 'dark', Record<HomeVarKey, string>> = {
  light: {
    background: '#F8F7FC',
    surface: '#FFFFFF',
    sidebar: '#F8F7FC',
    accent: '#8B7CF6',
    accentStrong: '#6F5CE6',
    selected: '#EFECFF',
    text: '#2B2A33',
    textSub: '#6E6A7C',
    border: '#E7E4F0',
    onAccent: '#FFFFFF',
    scrim: 'rgba(43, 42, 51, 0.32)',
    veil: 'rgba(248, 247, 252, 0.72)',
    shadowSidebar: '4px 0 24px rgba(43, 42, 51, 0.08)',
    shadowModal: '0 16px 40px rgba(43, 42, 51, 0.16)',
  },
  dark: {
    background: '#14131C',
    surface: '#1E1C29',
    sidebar: '#1E1C29',
    accent: '#A99BFF',
    accentStrong: '#C5BCFF',
    selected: '#2C2740',
    text: '#ECEAF5',
    textSub: '#ACA6C4',
    border: '#332F45',
    onAccent: '#1A1726',
    scrim: 'rgba(10, 9, 16, 0.55)',
    veil: 'rgba(20, 19, 28, 0.72)',
    shadowSidebar: '4px 0 24px rgba(0, 0, 0, 0.40)',
    shadowModal: '0 16px 40px rgba(0, 0, 0, 0.50)',
  },
};

/** 변수가 없을 때는 밝은 팔레트 값으로 보이게 한다 */
const homeVar = (key: HomeVarKey): string => `var(${homeVarNames[key]}, ${homePalettes.light[key]})`;

/** HomeContainer가 넣은 팔레트 변수를 읽는다 */
export const homeColors = {
  /** 화면 배경 */
  background: homeVar('background'),
  /** 카드·모달 */
  surface: homeVar('surface'),
  /** 사이드바 */
  sidebar: homeVar('sidebar'),
  /** 강조색(채움·선택 표시) */
  accent: homeVar('accent'),
  /** 강조 글자·버튼 배경 */
  accentStrong: homeVar('accentStrong'),
  /** 선택 항목 배경 */
  selected: homeVar('selected'),
  /** 본문 글자 */
  text: homeVar('text'),
  /** 보조 글자 */
  textSub: homeVar('textSub'),
  /** 선 */
  border: homeVar('border'),
  /** 채운 버튼 위 글자 */
  onAccent: homeVar('onAccent'),
  /** 모달 뒤를 덮는 막 */
  scrim: homeVar('scrim'),
  /** 잠긴 미리보기를 덮는 막 */
  veil: homeVar('veil'),
} as const;

/** 고른 색상의 밝기에 맞는 팔레트를 CSS 변수 선언으로 돌려준다. HomeContainer가 그대로 넣는다 */
export const homeVars = (isDark: boolean): string => {
  const palette = homePalettes[isDark ? 'dark' : 'light'];
  return (Object.keys(homeVarNames) as HomeVarKey[])
    .map(key => `${homeVarNames[key]}: ${palette[key]};`)
    .join('\n');
};

/** 한글이 들어 있는 pretendard 패키지의 가변 폰트. 위젯 프리셋의 'Pretendard'와 이름이 다르다 */
export const homeFontBase =
  "'Pretendard Variable', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Nanum Gothic', sans-serif";

/** 홈 글자 폰트. HomeContainer가 넣는 --home-font(고른 폰트)를 따르고, 없으면 기본 폰트를 쓴다 */
export const homeFont = `var(--home-font, ${homeFontBase})`;

/** 고른 폰트 칩에 맞는 홈 글자 폰트. 색상(테마)과는 상관없다 */
export const homeFontFor = (name: FontName): string => fontPreview(name).family ?? homeFontBase;

/** 고른 폰트의 글자 크기 보정. fonts.ts의 scale을 그대로 쓴다 */
export const homeFontScale = (name: FontName): number => fontPreview(name).scale;

/** 홈 글자 크기. HomeContainer가 넣는 --home-font-scale을 곱한다 */
export const homeFontSize = (px: number): string => `calc(${px}px * var(--home-font-scale, 1))`;

export const homeRadius = {
  /** 버튼·항목 */
  control: '10px',
  /** 칩 */
  chip: '999px',
  /** 미리보기·모달 */
  card: '16px',
} as const;

export const homeShadow = {
  /** 펼친 사이드바 */
  sidebar: homeVar('shadowSidebar'),
  /** 모달 */
  modal: homeVar('shadowModal'),
} as const;
