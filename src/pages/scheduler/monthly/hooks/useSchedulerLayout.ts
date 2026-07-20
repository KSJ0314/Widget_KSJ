import { useMemo } from 'react';

/**
 * 위젯 크기에서 파생되는 치수를 한곳에 모은다.
 * 값이 열 개가 넘어 각각 props로 내리면 자식 시그니처가 감당이 안 된다.
 */
export interface SchedulerLayout {
  pad: number;
  headerFs: number;
  dayNameFs: number;
  dateFs: number;
  cellPad: number;
  dayNameH: number;
  /** 일정이 없을 때 한 주가 갖는 최소 높이 */
  rowMin: number;
  barH: number;
  /** 막대 위아래 간격 */
  barGap: number;
  /** 막대 좌우 여백. 칸 경계와 닿는 쪽이라 위아래보다 좁다 */
  barInset: number;
  /** 날짜 숫자 줄이 차지하는 높이. 일정층은 이 아래에서 시작한다 */
  dateRowH: number;
}

export const useSchedulerLayout = (width: number, height: number): SchedulerLayout =>
  useMemo(() => {
    const base = Math.max(Math.min(width / 8, height / 9), 14);
    const pad = Math.round(base * 0.35);
    const headerFs = Math.max(base * 0.28, 7);
    const dateFs = Math.max(base * 0.2, 5);
    const cellPad = Math.max(Math.round(base * 0.06), 1);
    const dayNameH = Math.max(base * 0.34, 10);
    const headerH = headerFs * 2.1;

    return {
      pad,
      headerFs,
      dayNameFs: Math.max(base * 0.22, 6),
      dateFs,
      cellPad,
      dayNameH,
      // 남는 높이를 6주로 나눈 값이 칸의 기본 높이. 일정이 넘치면 이 값을 넘겨 늘어난다
      rowMin: Math.max((height - pad * 2 - headerH - dayNameH - 9) / 6, 18),
      barH: Math.max(dateFs * 1.75, 11),
      barGap: Math.max(Math.round(cellPad * 1.8), 2),
      barInset: Math.max(Math.round(cellPad * 0.9), 1),
      dateRowH: dateFs * 1.6 + cellPad * 2,
    };
  }, [width, height]);
