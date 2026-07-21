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

/** 농도를 따로 지정하지 않은 일정이 쓰는 값 */
export const DEFAULT_EVENT_ALPHA = 0.16;
export const MIN_EVENT_ALPHA = 0.05;
/** 더 진해지면 막대 위 글자가 읽히지 않는다 */
export const MAX_EVENT_ALPHA = 0.6;

/** 일정 막대의 배경. 색 견본도 같은 값을 써야 고른 대로 보인다 */
export const eventBg = (color: string, alpha = DEFAULT_EVENT_ALPHA) =>
  withAlpha(color, alpha);

/** #rgb / #rrggbb → [r, g, b]. 다른 형식이면 null */
const parseHex = (color: string): [number, number, number] | null => {
  const body = color.trim().replace('#', '');
  const full = body.length === 3 ? body.split('').map(c => c + c).join('') : body;
  if (full.length !== 6) return null;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/**
 * color를 base 위에 alpha만큼 얹은 결과를 불투명 색 하나로 계산한다.
 *
 * 반투명 배경을 그대로 쓰면 뒤의 격자선이나 칸 배경이 비치고,
 * linear-gradient로 덮으면 브라우저 디더링 때문에 픽셀마다 색이 미세하게 흔들린다.
 */
export const tintOver = (color: string, base: string, alpha = DEFAULT_EVENT_ALPHA) => {
  const fg = parseHex(color);
  const bg = parseHex(base);
  if (!fg || !bg) return withAlpha(color, alpha);

  const mix = (i: number) => Math.round(fg[i] * alpha + bg[i] * (1 - alpha));
  const hex = (v: number) => v.toString(16).padStart(2, '0');
  return `#${hex(mix(0))}${hex(mix(1))}${hex(mix(2))}`;
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/** #rrggbb → { h: 0~360, s: 0~100, l: 0~100 }. 다른 형식이면 검정으로 본다 */
export const hexToHsl = (hex: string) => {
  const body = hex.replace('#', '');
  const full = body.length === 3 ? body.split('').map(c => c + c).join('') : body;
  const n = parseInt(full, 16);
  if (full.length !== 6 || Number.isNaN(n)) return { h: 0, s: 0, l: 0 };

  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;

  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const hslToHex = (h: number, s: number, l: number) => {
  const sat = clamp(s, 0, 100) / 100;
  const lig = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lig - c / 2;

  const [r, g, b] =
    h < 60 ? [c, x, 0] :
    h < 120 ? [x, c, 0] :
    h < 180 ? [0, c, x] :
    h < 240 ? [0, x, c] :
    h < 300 ? [x, 0, c] :
    [c, 0, x];

  const hex = (v: number) =>
    Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)}`;
};

/** 주말·공휴일 칸에 까는 배경. 글자를 가리지 않을 만큼만 옅게 */
export const restDayBg = ({ theme }: { theme: DefaultTheme }) =>
  withAlpha(theme.colors.primary, 0.025);
