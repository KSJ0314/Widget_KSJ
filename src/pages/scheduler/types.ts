/** 일정 하나. 시작일만 있으면 하루짜리, end가 있으면 여러 날에 걸친다 */
export interface ScheduleEvent {
  id: string;
  /** 'YYYY-MM-DD' */
  start: string;
  /** 'YYYY-MM-DD'. 없으면 하루짜리 */
  end?: string;
  /** 'HH:mm'. 없으면 시간 없는 일정. 시간은 시작·종료 구분이 없다 */
  time?: string;
  title: string;
  done: boolean;
}

export interface SchedulerSettings {
  showWeekend: boolean;
}

export const DEFAULT_SETTINGS: SchedulerSettings = {
  showWeekend: true,
};

/** 달력 한 칸이 나타내는 날짜 */
export interface DayCellData {
  date: Date;
  isCurrentMonth: boolean;
}
