import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  DEFAULT_SETTINGS,
  type RecentColor,
  type ScheduleEvent,
  type SchedulerSettings,
} from '@scheduler/types';
import { omitUndefined } from '@scheduler/utils/omitUndefined';
import type { SchedulerSnapshot, SchedulerStorage } from './types';

/**
 * Firestore 저장 구조
 *
 *   widgets/{key}                 settings, recentColors
 *   widgets/{key}/events/{id}     일정 하나당 문서 하나
 *
 * 일정을 문서로 나눠 두면 한 건을 고쳐도 다른 일정을 건드리지 않는다.
 * 배열 한 덩어리로 두면 두 사람이 동시에 편집할 때 나중 저장이 앞의 것을 덮어쓴다.
 */
export const createRemoteStorage = (key: string): SchedulerStorage => {
  const widgetRef = doc(db, 'widgets', key);
  const eventsRef = collection(widgetRef, 'events');
  const eventRef = (id: string) => doc(eventsRef, id);

  return {
    subscribe(onData, onError) {
      // 일정과 설정이 서로 다른 곳에 있어 둘을 모아 한 번에 넘긴다
      const snapshot: SchedulerSnapshot = {
        events: [],
        settings: DEFAULT_SETTINGS,
        recentColors: [],
      };
      let gotEvents = false;
      let gotWidget = false;
      const emit = () => {
        if (gotEvents && gotWidget) onData({ ...snapshot });
      };

      const unsubEvents = onSnapshot(
        eventsRef,
        snap => {
          snapshot.events = snap.docs.map(d => d.data() as ScheduleEvent);
          gotEvents = true;
          emit();
        },
        onError,
      );

      const unsubWidget = onSnapshot(
        widgetRef,
        snap => {
          const data = snap.data();
          // 저장된 뒤에 항목이 추가됐을 수 있으니 기본값 위에 덮어쓴다
          snapshot.settings = { ...DEFAULT_SETTINGS, ...(data?.settings ?? {}) };
          snapshot.recentColors = (data?.recentColors ?? []) as RecentColor[];
          gotWidget = true;
          emit();
        },
        onError,
      );

      return () => {
        unsubEvents();
        unsubWidget();
      };
    },

    addEvent: (event: ScheduleEvent) => setDoc(eventRef(event.id), omitUndefined(event)),

    /** 통째로 덮어써야 색이나 시간을 지웠을 때 예전 값이 남지 않는다 */
    updateEvent: (event: ScheduleEvent) => setDoc(eventRef(event.id), omitUndefined(event)),

    removeEvent: (id: string) => deleteDoc(eventRef(id)),

    saveSettings: (settings: SchedulerSettings) =>
      setDoc(widgetRef, { settings }, { merge: true }),

    /** 배열은 통째로 바뀌므로 merge를 걸어도 항상 새 목록으로 대체된다 */
    saveRecentColors: (colors: RecentColor[]) =>
      setDoc(widgetRef, { recentColors: colors }, { merge: true }),
  };
};
