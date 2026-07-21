/** 일정 하나. 시작일만 있으면 하루짜리, end가 있으면 여러 날에 걸친다 */
export interface ScheduleEvent {
  id: string;
  /** 'YYYY-MM-DD' */
  start: string;
  /** 'YYYY-MM-DD'. 없으면 하루짜리 */
  end?: string;
  /** 'HH:mm'. 없으면 시간 없는 일정. 시간은 시작·종료 구분이 없다 */
  time?: string;
  /** 막대 색. 없으면 위젯 테마의 포인트 색을 따른다 */
  color?: string;
  title: string;
  done: boolean;
}

export interface SchedulerSettings {
  showWeekend: boolean;
}

export const DEFAULT_SETTINGS: SchedulerSettings = {
  showWeekend: true,
};

/** 색을 고르는 동안 달력에 미리 보여줄 값. 저장 전까지만 쓰인다 */
export interface ColorPreview {
  id: string;
  /** 없으면 '기본'을 고른 상태라 테마 포인트 색으로 보여준다 */
  color?: string;
}

/** 달력 한 칸이 나타내는 날짜 */
export interface DayCellData {
  date: Date;
  isCurrentMonth: boolean;
}
