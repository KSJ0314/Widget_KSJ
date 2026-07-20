import { toDateKey } from '@/utils/date';
import type { ScheduleEvent } from '../../types';
import { compareEvents, covers } from '../../utils/eventOrder';

/** 한 주 안에서 일정이 차지하는 가로 구간 하나 */
export interface WeekSegment {
  event: ScheduleEvent;
  /** 그 주의 보이는 칸 기준 시작 위치 */
  startIdx: number;
  /** 몇 칸을 차지하는지 */
  span: number;
  /** 일정의 실제 시작일을 포함하는 구간인지. 체크박스는 여기에만 그린다 */
  isStart: boolean;
  lane: number;
}

const compareSegments = (
  a: Omit<WeekSegment, 'lane'>,
  b: Omit<WeekSegment, 'lane'>,
) => {
  const byEvent = compareEvents(a.event, b.event);
  if (byEvent !== 0) return byEvent;

  // 같은 순위면 왼쪽부터, 같은 자리면 긴 쪽이 위로
  return a.startIdx - b.startIdx || b.span - a.span;
};

/**
 * 주말을 숨기면 토·일이 빠진 채로 dates가 들어온다.
 * 그래서 금~월 일정은 자연히 금 조각과 월 조각으로 나뉜다.
 */
export const buildWeekSegments = (dates: Date[], events: ScheduleEvent[]): WeekSegment[] => {
  const keys = dates.map(toDateKey);
  const found: Omit<WeekSegment, 'lane'>[] = [];

  for (const event of events) {
    let i = 0;
    while (i < keys.length) {
      if (!covers(event, keys[i])) {
        i++;
        continue;
      }
      const startIdx = i;
      while (i < keys.length && covers(event, keys[i])) i++;
      found.push({
        event,
        startIdx,
        span: i - startIdx,
        isStart: keys[startIdx] === event.start,
      });
    }
  }

  found.sort(compareSegments);

  // lanes[n] = n번 레인이 이미 차지한 구간들
  const lanes: { from: number; to: number }[][] = [];

  return found.map(segment => {
    const from = segment.startIdx;
    const to = from + segment.span;

    let lane = lanes.findIndex(taken => taken.every(r => r.to <= from || r.from >= to));
    if (lane === -1) {
      lane = lanes.length;
      lanes.push([]);
    }
    lanes[lane].push({ from, to });
    return { ...segment, lane };
  });
};

export const laneCount = (segments: WeekSegment[]) =>
  segments.reduce((max, s) => Math.max(max, s.lane + 1), 0);
