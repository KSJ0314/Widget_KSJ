import type { DefaultTheme } from 'styled-components';

/** #rgb / #rrggbb를 rgba로. 그 외 형식은 그대로 돌려준다 */
export const withAlpha = (color: string, alpha: number) => {
  const hex = color.trim();
  if (!hex.startsWith('#')) return color;
  const body = hex.slice(1);
  const full = body.length === 3 ? body.split('').map(c => c + c).join('') : body;
  if (full.length !== 6) return color;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

/** 선은 테마의 포인트 색을 옅게 쓴다. 달력·모달·말풍선이 같은 규칙을 공유한다 */
export const lineColor = ({ theme }: { theme: DefaultTheme }) =>
  withAlpha(theme.colors.primary, 0.4);

/** 일정 막대의 배경. 색 견본도 같은 값을 써야 고른 대로 보인다 */
export const eventBg = (color: string) => withAlpha(color, 0.16);

/** 주말·공휴일 칸에 까는 배경. 글자를 가리지 않을 만큼만 옅게 */
export const restDayBg = ({ theme }: { theme: DefaultTheme }) =>
  withAlpha(theme.colors.primary, 0.025);
