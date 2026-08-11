import type { RecentColor, ScheduleEvent, SchedulerSettings } from '@scheduler/types';

export interface SchedulerSnapshot {
  events: ScheduleEvent[];
  settings: SchedulerSettings;
  /** 최근에 쓴 색부터 앞에 온다 */
  recentColors: RecentColor[];
}

/**
 * 일정을 어디에 두든 같은 방식으로 다루기 위한 창구.
 * 스토어는 이 인터페이스만 알고, 어느 구현을 쓸지만 정한다.
 *
 * 구현은 만들 때 대상(고유키 등)을 붙잡아 두므로 각 메서드는 키를 받지 않는다.
 */
export interface SchedulerStorage {
  /** 변경을 구독한다. 해제 함수를 돌려준다 */
  subscribe(
    onData: (snapshot: SchedulerSnapshot) => void,
    onError: (error: unknown) => void,
  ): () => void;

  addEvent(event: ScheduleEvent): Promise<void>;
  updateEvent(event: ScheduleEvent): Promise<void>;
  removeEvent(id: string): Promise<void>;
  saveSettings(settings: SchedulerSettings): Promise<void>;
  saveRecentColors(colors: RecentColor[]): Promise<void>;
}
