import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContainerSize } from '@/hooks/useContainerSize';
import { toDateKey } from '@/utils/date';
import { useSchedulerStore } from '@scheduler/schedulerStore';
import { compareEvents, covers } from '@scheduler/utils/eventOrder';
import { PlusIcon } from '@scheduler/icons';
import { LocalBadge } from '@scheduler/components/LocalBadge';
import { EventRow } from '@scheduler/daily/components/EventRow';
import { Wrapper, Inner, List, EmptyText, Footer, NewBtn } from './DailyScheduler.styled';

/** 아직 저장되지 않은 새 행 */
interface Draft {
  key: string;
}

interface Props {
  /** 홈 미리보기처럼 URL을 쓸 수 없는 곳에서 넘긴다 */
  widgetKey?: string | null;
}

export const DailyScheduler = ({ widgetKey: keyFromProps }: Props) => {
  const { ref, width, height } = useContainerSize();
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const [searchParams] = useSearchParams();
  const widgetKey = keyFromProps ?? searchParams.get('u');

  const { events, source, init, cleanup, addEvent, updateEvent, removeEvent, toggleEvent } =
    useSchedulerStore();

  useEffect(() => {
    init(widgetKey);
    return () => cleanup();
  }, [widgetKey, init, cleanup]);

  const fs = Math.max(Math.min(width / 16, height / 12), 11);
  const pad = Math.round(fs * 1.1);

  const todayKey = toDateKey(new Date());
  const todayEvents = useMemo(
    () => events.filter(e => covers(e, todayKey)).sort(compareEvents),
    [events, todayKey],
  );

  const removeDraft = useCallback((key: string) => {
    setDrafts(prev => prev.filter(d => d.key !== key));
  }, []);

  return (
    <Wrapper ref={ref}>
      <Inner $pad={pad}>
        <List>
          {todayEvents.length === 0 && drafts.length === 0 && (
            <EmptyText $fs={fs}>오늘 일정이 없습니다</EmptyText>
          )}

          {todayEvents.map(event => (
            <EventRow
              key={event.id}
              title={event.title}
              done={event.done}
              fs={fs}
              canEdit
              isDraft={false}
              onToggle={() => toggleEvent(event.id)}
              onDelete={() => removeEvent(event.id)}
              onCommit={title => {
                if (title === event.title) return;
                updateEvent({ ...event, title });
              }}
            />
          ))}

          {drafts.map(draft => (
            <EventRow
              key={draft.key}
              title=""
              done={false}
              fs={fs}
              canEdit
              isDraft
              autoFocus
              onToggle={() => {}}
              onDelete={() => removeDraft(draft.key)}
              onCommit={async title => {
                const ok = await addEvent({
                  id: crypto.randomUUID(),
                  start: todayKey,
                  title,
                  done: false,
                });
                // 저장된 뒤에는 목록 쪽 행이 대신 그려진다
                if (ok) removeDraft(draft.key);
              }}
            />
          ))}
        </List>

        <Footer $pad={pad} $fs={fs}>
          {source === 'local' && <LocalBadge fs={fs} />}
          <NewBtn
            $fs={fs}
            onClick={() => setDrafts(prev => [...prev, { key: crypto.randomUUID() }])}
          >
            <PlusIcon />
            New
          </NewBtn>
        </Footer>
      </Inner>
    </Wrapper>
  );
};
