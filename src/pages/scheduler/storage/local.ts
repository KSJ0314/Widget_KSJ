import { DEFAULT_SETTINGS, type SchedulerSettings } from '@scheduler/types';
import type { SchedulerStorage } from './types';

const SETTINGS_KEY = 'widget-ksj:scheduler:settings';

const loadSettings = (): SchedulerSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    // 저장된 뒤에 항목이 추가됐을 수 있으니 기본값 위에 덮어쓴다
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

const saveSettings = (settings: SchedulerSettings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // 저장소가 막힌 환경에서도 화면 동작은 막지 않는다
  }
};

/**
 * 고유키가 없을 때 쓰는 저장소.
 * 지금은 설정만 담고 일정은 저장하지 않는다. 일정까지 다루는 건 다음 단계에서 붙인다.
 */
export const createLocalStorage = (): SchedulerStorage => ({
  subscribe(onData) {
    onData({ events: [], settings: loadSettings() });
    return () => {};
  },

  addEvent: async () => {},
  updateEvent: async () => {},
  removeEvent: async () => {},

  saveSettings: async settings => saveSettings(settings),
});
