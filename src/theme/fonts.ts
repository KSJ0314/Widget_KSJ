import type { AppTheme } from './theme';

const KO_FALLBACK = "'Apple SD Gothic Neo', 'Malgun Gothic', 'Nanum Gothic', sans-serif";

/**
 * 폰트 프리셋. `?font=<이름>`으로 선택하며, 선택된 테마의 fonts를 덮어쓴다.
 * `default`는 값이 없어 테마가 정의한 폰트를 그대로 쓴다.
 */
export const fontSets: Record<string, AppTheme['fonts'] | undefined> = {
  default: undefined,
  griun: {
    display: `'Griun', ${KO_FALLBACK}`,
    mono: `'Griun', ${KO_FALLBACK}`,
    digit: `'Griun', ${KO_FALLBACK}`,
  },
};

export type FontName = keyof typeof fontSets;

export const fontNames = Object.keys(fontSets) as FontName[];

/** 폰트 프리셋을 테마에 얹은 새 테마를 만든다. 프리셋이 없으면 테마를 그대로 돌려준다. */
export const withFont = (theme: AppTheme, font: FontName | string | null): AppTheme => {
  const fonts = font ? fontSets[font] : undefined;
  return fonts ? { ...theme, fonts } : theme;
};
