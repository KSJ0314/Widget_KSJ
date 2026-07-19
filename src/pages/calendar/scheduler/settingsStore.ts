/** 스케줄러 설정. 항목이 늘어나면 여기에 필드를 추가하면 저장까지 함께 따라간다 */
export interface SchedulerSettings {
  showWeekend: boolean;
}

export const DEFAULT_SETTINGS: SchedulerSettings = {
  showWeekend: true,
};

export interface SettingsStore {
  load: () => SchedulerSettings;
  save: (settings: SchedulerSettings) => void;
}

const STORAGE_KEY = 'widget-ksj:scheduler:settings';

/**
 * 임시 구현. 노션 페이지를 다른 기기에서 열면 설정이 따라오지 않는다.
 * 나중에 원격 저장소로 바꿀 때는 이 파일 맨 아래 settingsStore만 교체하면 된다.
 */
const localSettingsStore: SettingsStore = {
  load: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_SETTINGS;
      // 저장된 뒤에 항목이 추가됐을 수 있으니 기본값 위에 덮어쓴다
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      // 저장소가 막힌 환경에서도 기본값으로 동작한다
      return DEFAULT_SETTINGS;
    }
  },

  save: settings => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // 저장에 실패해도 화면 동작은 막지 않는다
    }
  },
};

export const settingsStore: SettingsStore = localSettingsStore;
