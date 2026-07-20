/**
 * 주말 색은 테마와 무관하게 고정한다.
 * 값은 각각 lightPink / lightBlue 테마의 포인트 색에서 가져왔다.
 */
export const SUNDAY_COLOR = '#ee8599';
export const SATURDAY_COLOR = '#7ab2d8';

/** 평일이면 null. 호출부에서 기본 글자색으로 넘어가면 된다 */
export const weekendColor = (col: number) => {
  if (col === 0) return SUNDAY_COLOR;
  if (col === 6) return SATURDAY_COLOR;
  return null;
};
