import { create } from 'zustand';
import { doc, onSnapshot, setDoc, type Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DEFAULT_SETTINGS, type ScheduleEvent, type SchedulerSettings } from './types';
import { omitUndefined } from '@scheduler/utils/omitUndefined';

const LOCAL_KEY = 'widget-ksj:scheduler:settings';

const loadLocalSettings = (): SchedulerSettings => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    // 저장된 뒤에 항목이 추가됐을 수 있으니 기본값 위에 덮어쓴다
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

const saveLocalSettings = (settings: SchedulerSettings) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(settings));
  } catch {
    // 저장소가 막힌 환경에서도 화면 동작은 막지 않는다
  }
};

/** 'local'은 URL에 고유키가 없는 상태. 설정만 유지되고 일정은 저장할 수 없다 */
type Source = 'local' | 'remote';

interface SchedulerState {
  events: ScheduleEvent[];
  settings: SchedulerSettings;
  source: Source;
  loading: boolean;
  /** 일정을 저장할 수 있는 상태인지 */
  canEdit: boolean;

  init: (widgetKey: string | null) => void;
  cleanup: () => void;
  setSettings: (patch: Partial<SchedulerSettings>) => void;
  /** 저장에 성공했는지. 실패하면 이전 상태로 되돌린 뒤 false를 준다 */
  addEvent: (event: ScheduleEvent) => Promise<boolean>;
  updateEvent: (event: ScheduleEvent) => Promise<boolean>;
  removeEvent: (id: string) => Promise<boolean>;
  toggleEvent: (id: string) => Promise<boolean>;
}

let unsubscribe: Unsubscribe | null = null;
let currentKey: string | null = null;

/** 문서 전체를 덮어쓴다. 일정·설정이 한 문서에 있어 쓰기가 한 번으로 끝난다 */
const saveRemote = (key: string, events: ScheduleEvent[], settings: SchedulerSettings) =>
  setDoc(doc(db, 'widgets', key), {
    events: events.map(omitUndefined),
    settings,
  });

type Setter = (partial: Partial<SchedulerState>) => void;
type Getter = () => SchedulerState;

/**
 * 화면을 먼저 바꾸고 저장한다. 저장에 실패하면 원래 목록으로 되돌려
 * 저장되지 않은 내용이 남아 있는 것처럼 보이지 않게 한다.
 */
const commit = async (
  set: Setter,
  get: Getter,
  change: (events: ScheduleEvent[]) => ScheduleEvent[],
) => {
  const key = currentKey;
  if (!get().canEdit || !key) return false;

  const previous = get().events;
  const next = change(previous);
  set({ events: next });

  try {
    await saveRemote(key, next, get().settings);
    return true;
  } catch (err) {
    console.warn('[scheduler] 저장 실패', err);
    set({ events: previous });
    return false;
  }
};

export const useSchedulerStore = create<SchedulerState>((set, get) => ({
  events: [],
  settings: DEFAULT_SETTINGS,
  source: 'local',
  loading: true,
  canEdit: false,

  init: widgetKey => {
    if (unsubscribe && currentKey === widgetKey) return;

    get().cleanup();
    currentKey = widgetKey;

    if (!widgetKey) {
      set({
        events: [],
        settings: loadLocalSettings(),
        source: 'local',
        canEdit: false,
        loading: false,
      });
      return;
    }

    set({ source: 'remote', canEdit: true, loading: true });

    // 여러 위젯을 함께 임베드했을 때 한쪽 변경이 다른 쪽에 바로 반영되도록 구독한다
    unsubscribe = onSnapshot(
      doc(db, 'widgets', widgetKey),
      snap => {
        const data = snap.data();
        set({
          events: (data?.events as ScheduleEvent[]) ?? [],
          settings: { ...DEFAULT_SETTINGS, ...(data?.settings ?? {}) },
          loading: false,
        });
      },
      err => {
        console.warn('[scheduler] 구독 실패', err);
        set({ loading: false });
      },
    );
  },

  cleanup: () => {
    unsubscribe?.();
    unsubscribe = null;
    currentKey = null;
  },

  setSettings: patch => {
    const { settings, events, source } = get();
    const next = { ...settings, ...patch };
    set({ settings: next });

    if (source === 'remote' && currentKey) {
      saveRemote(currentKey, events, next).catch(err => {
        console.warn('[scheduler] 설정 저장 실패', err);
        set({ settings });
      });
    } else {
      saveLocalSettings(next);
    }
  },

  addEvent: event => commit(set, get, events => [...events, event]),

  updateEvent: event =>
    commit(set, get, events => events.map(e => (e.id === event.id ? event : e))),

  removeEvent: id => commit(set, get, events => events.filter(e => e.id !== id)),

  toggleEvent: id =>
    commit(set, get, events => events.map(e => (e.id === id ? { ...e, done: !e.done } : e))),
}));
