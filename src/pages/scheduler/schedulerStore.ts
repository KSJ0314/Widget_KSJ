import { create } from 'zustand';
import { DEFAULT_SETTINGS, type ScheduleEvent, type SchedulerSettings } from './types';
import { createRemoteStorage } from './storage/remote';
import { createLocalStorage } from './storage/local';
import type { SchedulerStorage } from './storage/types';

/** 'local'은 URL에 고유키가 없는 상태 */
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

let storage: SchedulerStorage | null = null;
let unsubscribe: (() => void) | null = null;
let currentKey: string | null = null;
/** 한 문서에 위젯이 여러 개 떠 있을 수 있어, 마지막 하나가 빠질 때만 정리한다 */
let mounted = 0;
/** currentKey 기준으로 준비가 끝났는지 */
let ready = false;

const teardown = () => {
  unsubscribe?.();
  unsubscribe = null;
  storage = null;
  ready = false;
};

type Setter = (partial: Partial<SchedulerState>) => void;
type Getter = () => SchedulerState;

/**
 * 화면을 먼저 바꾸고 저장한다. 저장에 실패하면 원래 목록으로 되돌려
 * 저장되지 않은 내용이 남아 있는 것처럼 보이지 않게 한다.
 */
const commit = async (
  set: Setter,
  get: Getter,
  nextEvents: ScheduleEvent[],
  save: (storage: SchedulerStorage) => Promise<void>,
) => {
  const target = storage;
  if (!get().canEdit || !target) return false;

  const previous = get().events;
  set({ events: nextEvents });

  try {
    await save(target);
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
    mounted += 1;
    if (ready && currentKey === widgetKey) return;

    teardown();
    currentKey = widgetKey;
    ready = true;

    storage = widgetKey ? createRemoteStorage(widgetKey) : createLocalStorage();
    set({
      source: widgetKey ? 'remote' : 'local',
      canEdit: Boolean(widgetKey),
      loading: true,
    });

    // 여러 위젯을 함께 임베드했을 때 한쪽 변경이 다른 쪽에 바로 반영되도록 구독한다
    unsubscribe = storage.subscribe(
      ({ events, settings }) => set({ events, settings, loading: false }),
      err => {
        console.warn('[scheduler] 구독 실패', err);
        set({ loading: false });
      },
    );
  },

  cleanup: () => {
    mounted = Math.max(mounted - 1, 0);
    // 아직 다른 위젯이 쓰고 있으면 구독을 끊지 않는다
    if (mounted > 0) return;

    teardown();
    currentKey = null;
  },

  setSettings: patch => {
    const previous = get().settings;
    const next = { ...previous, ...patch };
    set({ settings: next });

    storage?.saveSettings(next).catch(err => {
      console.warn('[scheduler] 설정 저장 실패', err);
      set({ settings: previous });
    });
  },

  addEvent: event =>
    commit(set, get, [...get().events, event], s => s.addEvent(event)),

  updateEvent: event =>
    commit(
      set,
      get,
      get().events.map(e => (e.id === event.id ? event : e)),
      s => s.updateEvent(event),
    ),

  removeEvent: id =>
    commit(
      set,
      get,
      get().events.filter(e => e.id !== id),
      s => s.removeEvent(id),
    ),

  toggleEvent: id => {
    const target = get().events.find(e => e.id === id);
    if (!target) return Promise.resolve(false);

    const next = { ...target, done: !target.done };
    return commit(
      set,
      get,
      get().events.map(e => (e.id === id ? next : e)),
      s => s.updateEvent(next),
    );
  },
}));
