/**
 * 사이드바 색상 버튼 색.
 * 위젯마다 화면에서 실제로 쓰는 테마 필드가 달라,
 * 위젯이 고른 필드 이름(widgetRegistry.ts의 chipBg·chipDot)을 색으로 바꾼다.
 */

import type { AppTheme } from '@/theme/theme';
import { tintOver } from '@/theme/colorUtils';
import { TINT_ALPHA } from '@/pages/scheduler/daily/DailyScheduler.styled';

/** 색상 버튼 바탕에 쓸 테마 필드 이름 */
export type ChipBgKey = 'background' | 'surface' | 'paperSurface' | 'primaryTint';

/** 색상 버튼의 테두리·가운데 원에 쓸 테마 필드 이름 */
export type ChipDotKey = 'primary' | 'accent';

const chipBgColors: Record<ChipBgKey, (theme: AppTheme) => string> = {
  /** Digital Clock·Monthly Scheduler·Weather. 페이지 배경 위에 바로 그린다 */
  background: theme => theme.colors.background,
  /** Flip Clock·Analog Clock. 배경 위에 얹은 카드(시계 원판) 색이 화면을 채운다 */
  surface: theme => theme.colors.surface,
  /** Monthly Calendar. paper 계열은 카드(surface) 안에 달력을 그리고, 그 밖의 테마는 페이지 배경 위에 바로 그린다 */
  paperSurface: theme =>
    theme.variant === 'paper' ? theme.colors.surface : theme.colors.background,
  /** Daily Scheduler. 배경에 대표색을 아주 옅게 얹은 색을 바탕으로 쓴다 */
  primaryTint: theme =>
    tintOver(theme.colors.primary, theme.colors.background, TINT_ALPHA),
};

const chipDotColors: Record<ChipDotKey, (theme: AppTheme) => string> = {
  /** 대부분의 위젯. 글자·선·바늘에 쓰는 대표색 */
  primary: theme => theme.colors.primary,
  /** Weather. 온도·도시 이름 등 눈에 띄는 글자에 accent를 쓴다 */
  accent: theme => theme.colors.accent,
};

/** 테마 하나에서 색상 버튼의 바탕(bg)과 테두리·원(dot) 색을 구한다 */
export const chipColors = (
  theme: AppTheme,
  bgKey: ChipBgKey,
  dotKey: ChipDotKey,
): { bg: string; dot: string } => ({
  bg: chipBgColors[bgKey](theme),
  dot: chipDotColors[dotKey](theme),
});
