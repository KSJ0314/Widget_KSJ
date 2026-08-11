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
  /** 막대 배경 농도. 없으면 DEFAULT_EVENT_ALPHA */
  colorAlpha?: number;
  title: string;
  done: boolean;
  /** 생성 시각(ms). 목록을 만든 순서대로 유지하는 데 쓴다. 옛 일정에는 없다 */
  createdAt?: number;
}

export interface SchedulerSettings {
  showWeekend: boolean;
}

export const DEFAULT_SETTINGS: SchedulerSettings = {
  showWeekend: true,
};

/** 최근에 쓴 일정 색. 농도까지 함께 남겨 고른 그대로 되살린다 */
export interface RecentColor {
  /** 소문자 hex */
  color: string;
  alpha: number;
}

/** 최근 사용 색상을 남겨 두는 최대 개수. 프리셋 줄보다 짧아 한 줄에 들어간다 */
export const MAX_RECENT_COLORS = 10;

/** 색을 고르는 동안 달력에 미리 보여줄 값. 저장 전까지만 쓰인다 */
export interface ColorPreview {
  id: string;
  /** 없으면 '기본'을 고른 상태라 테마 포인트 색으로 보여준다 */
  color?: string;
  alpha?: number;
}

/** 일정을 끌고 있는 동안의 상태 */
export interface DragState {
  event: ScheduleEvent;
  /** 커서가 올라가 있는 칸의 날짜. 칸 밖이면 null */
  overDate: string | null;
  /** 고스트가 처음 그려질 자리. 이후 이동은 DOM을 직접 건드린다 */
  startX: number;
  startY: number;
}

/** 달력 한 칸이 나타내는 날짜 */
export interface DayCellData {
  date: Date;
  isCurrentMonth: boolean;
}
