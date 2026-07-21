import type { AppTheme } from './theme';

const KO_FALLBACK = "'Apple SD Gothic Neo', 'Malgun Gothic', 'Nanum Gothic', sans-serif";

/**
 * 폰트 프리셋. `?font=<이름>`으로 선택하며, 선택된 테마의 fonts를 덮어쓴다.
 * `default`는 값이 없어 테마가 정의한 폰트를 그대로 쓴다.
 */
export const fontSets: Record<string, AppTheme['fonts'] | undefined> = {
  default: undefined,
  pretendard: {
    display: `'Pretendard', ${KO_FALLBACK}`,
    mono: `'Pretendard', ${KO_FALLBACK}`,
    digit: `'Pretendard', ${KO_FALLBACK}`,
  },
  griun: {
    display: `'Griun', ${KO_FALLBACK}`,
    mono: `'Griun', ${KO_FALLBACK}`,
    digit: `'Griun', ${KO_FALLBACK}`,
    scale: 1.3,
  },
  gowun: {
    display: `'Gowun Batang', ${KO_FALLBACK}`,
    mono: `'Gowun Batang', ${KO_FALLBACK}`,
    digit: `'Gowun Batang', ${KO_FALLBACK}`,
  },
  gaegu: {
    display: `'Gaegu', ${KO_FALLBACK}`,
    mono: `'Gaegu', ${KO_FALLBACK}`,
    digit: `'Gaegu', ${KO_FALLBACK}`,
    // 글자가 작게 그려지는 편이라 조금 키운다
    scale: 1.15,
  },
  nanumPen: {
    display: `'Nanum Pen Script', ${KO_FALLBACK}`,
    mono: `'Nanum Pen Script', ${KO_FALLBACK}`,
    digit: `'Nanum Pen Script', ${KO_FALLBACK}`,
    scale: 1.25,
  },
};

export type FontName = keyof typeof fontSets;

export const fontNames = Object.keys(fontSets) as FontName[];

/** 글리프가 em 상자 위쪽에 치우친 폰트를 칩에서 눈으로 맞추기 위한 보정 (px) */
const CHIP_NUDGE: Partial<Record<string, number>> = {
  griun: 1,
};

/**
 * 홈에서 폰트 이름을 그 폰트로 보여줄 때 쓴다.
 * family가 없으면 default라, 부르는 쪽에서 테마 폰트를 그대로 쓰면 된다.
 */
export const fontPreview = (name: FontName) => ({
  family: fontSets[name]?.display,
  scale: fontSets[name]?.scale ?? 1,
  nudge: CHIP_NUDGE[name] ?? 0,
});

/** 폰트 프리셋을 테마에 얹은 새 테마를 만든다. 프리셋이 없으면 테마를 그대로 돌려준다. */
export const withFont = (theme: AppTheme, font: FontName | string | null): AppTheme => {
  const fonts = font ? fontSets[font] : undefined;
  return fonts ? { ...theme, fonts } : theme;
};
