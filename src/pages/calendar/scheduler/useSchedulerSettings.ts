import { useCallback, useState } from 'react';
import { settingsStore, type SchedulerSettings } from './settingsStore';

/**
 * 컴포넌트가 설정에 접근하는 유일한 창구.
 * 저장소가 원격으로 바뀌어 load가 비동기가 되더라도 여기서만 흡수하면 된다.
 */
export const useSchedulerSettings = () => {
  // 지연 초기화라 첫 렌더부터 저장값이 반영된다 (기본값으로 깜빡이지 않는다)
  const [settings, setSettings] = useState<SchedulerSettings>(() => settingsStore.load());

  const update = useCallback((patch: Partial<SchedulerSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...patch };
      settingsStore.save(next);
      return next;
    });
  }, []);

  return { settings, update };
};
