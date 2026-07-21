import { toDateKey } from '@/utils/date';
import type { ScheduleEvent } from '@scheduler/types';

const parseKey = (key: string) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const daysBetween = (from: string, to: string) =>
  Math.round((parseKey(to).getTime() - parseKey(from).getTime()) / 86400000);

/**
 * 놓은 날을 시작일로 삼고, 원래 기간만큼 종료일을 다시 잡는다.
 * 하루짜리면 종료일 없이 그대로 둔다.
 */
export const moveEvent = (event: ScheduleEvent, newStart: string): ScheduleEvent => {
  if (!event.end || event.end === event.start) {
    return { ...event, start: newStart, end: undefined };
  }

  const span = daysBetween(event.start, event.end);
  const end = parseKey(newStart);
  end.setDate(end.getDate() + span);

  return { ...event, start: newStart, end: toDateKey(end) };
};
