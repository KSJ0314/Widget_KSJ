import type { ScheduleEvent } from '@scheduler/types';

/** 'YYYY-MM-DD'는 사전순 비교가 곧 날짜순 비교라 문자열 그대로 비교한다 */
export const covers = (event: ScheduleEvent, dateKey: string) =>
  dateKey >= event.start && dateKey <= (event.end ?? event.start);

/** 위에 놓일수록 작은 값. 여러 날 → 시간 있음 → 시간 없음 순으로 쌓는다 */
export const rank = (event: ScheduleEvent) => {
  if (event.end && event.end !== event.start) return 0;
  return event.time ? 1 : 2;
};

/**
 * 월간·데일리가 공유하는 정렬 기준.
 * 0을 주면 순서를 유지하므로, 시간 없는 일정끼리는 추가한 순서 그대로 남는다.
 */
export const compareEvents = (a: ScheduleEvent, b: ScheduleEvent) => {
  const diff = rank(a) - rank(b);
  if (diff !== 0) return diff;

  if (a.time && b.time && a.time !== b.time) return a.time < b.time ? -1 : 1;
  return 0;
};
