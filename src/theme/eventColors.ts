import { themes } from './theme';

/**
 * 일정에 지정할 수 있는 색. 테마들의 포인트 색을 그대로 쓴다.
 * 값이 같은 테마가 여러 개라 중복은 걸러낸다.
 */
export const EVENT_COLORS: string[] = [
  ...new Set(Object.values(themes).map(t => t.colors.primary)),
];

/**
 * 고를 수 있는 색 목록.
 * 현재 테마색은 '기본'이 이미 나타내므로 뒤 목록에서 뺀다.
 */
export const selectableColors = (themePrimary: string) =>
  EVENT_COLORS.filter(c => c.toLowerCase() !== themePrimary.toLowerCase());
