/** 하루짜리 일정 하나 */
export interface ScheduleEvent {
  id: string;
  /** 'YYYY-MM-DD' */
  date: string;
  title: string;
  /** 없으면 테마의 포인트 색을 쓴다 */
  color?: string;
}

/** 일정 추가·삭제 UI는 아직 없다. 지금은 빈 목록으로 둔다. */
export const events: ScheduleEvent[] = [];

export const toDateKey = (date: Date) => {
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
};

/** 날짜별로 묶어 둔다. 전달·다음달 칸도 같은 방식으로 조회한다 */
export const groupByDate = (list: ScheduleEvent[]) => {
  const map = new Map<string, ScheduleEvent[]>();
  for (const ev of list) {
    const bucket = map.get(ev.date);
    if (bucket) bucket.push(ev);
    else map.set(ev.date, [ev]);
  }
  return map;
};
