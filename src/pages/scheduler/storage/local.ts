import { DEFAULT_SETTINGS, type ScheduleEvent } from '@scheduler/types';
import type { SchedulerStorage } from './types';

const SETTINGS_KEY = 'widget-ksj:scheduler:settings';
const EVENTS_KEY = 'widget-ksj:scheduler:events';

const read = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 저장소가 막힌 환경에서도 화면 동작은 막지 않는다
  }
};

// 저장된 뒤에 항목이 추가됐을 수 있으니 기본값 위에 덮어쓴다
const loadSettings = () => ({ ...DEFAULT_SETTINGS, ...read(SETTINGS_KEY, {}) });
const loadEvents = () => read<ScheduleEvent[]>(EVENTS_KEY, []);

/**
 * 고유키가 없을 때 쓰는 저장소. 이 브라우저에만 남는다.
 *
 * 원격의 onSnapshot 자리는 storage 이벤트가 대신한다.
 * 이 이벤트는 값을 바꾼 문서에는 오지 않고 같은 출처의 다른 문서에만 오므로,
 * 노션에 위젯을 여러 개 임베드했을 때 서로 반영된다.
 */
export const createLocalStorage = (): SchedulerStorage => {
  const save = (events: ScheduleEvent[]) => write(EVENTS_KEY, events);

  return {
    subscribe(onData) {
      const emit = () => onData({ events: loadEvents(), settings: loadSettings() });
      emit();

      const onStorage = (e: StorageEvent) => {
        if (e.key === EVENTS_KEY || e.key === SETTINGS_KEY) emit();
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    },

    addEvent: async event => save([...loadEvents(), event]),

    updateEvent: async event =>
      save(loadEvents().map(e => (e.id === event.id ? event : e))),

    removeEvent: async id => save(loadEvents().filter(e => e.id !== id)),

    saveSettings: async settings => write(SETTINGS_KEY, settings),
  };
};

/** 홈의 이전 버튼이 쓴다. 옮길 게 있는지 보고, 옮긴 뒤 비운다 */
export const readLocalEvents = () => loadEvents();
export const clearLocalEvents = () => write(EVENTS_KEY, []);
