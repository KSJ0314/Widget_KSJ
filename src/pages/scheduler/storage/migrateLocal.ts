import { createRemoteStorage } from './remote';
import { readLocalEvents, clearLocalEvents } from './local';

export const countLocalEvents = () => readLocalEvents().length;

/**
 * 이 브라우저에 쌓인 일정을 계정으로 옮긴다.
 * 덮어쓰지 않고 하나씩 더한다.
 *
 * 일정 id를 그대로 문서 id로 쓰므로, 중간에 끊겨 다시 실행해도 중복되지 않는다.
 * 그래서 전부 옮긴 뒤에야 로컬을 비운다.
 */
export const migrateLocalEvents = async (widgetKey: string) => {
  const events = readLocalEvents();
  if (events.length === 0) return 0;

  const storage = createRemoteStorage(widgetKey);
  for (const event of events) {
    await storage.addEvent(event);
  }

  clearLocalEvents();
  return events.length;
};
