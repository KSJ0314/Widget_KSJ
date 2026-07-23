import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContainerSize } from '@/hooks/useContainerSize';
import { toDateKey } from '@/utils/date';
import { useSchedulerStore } from '@scheduler/schedulerStore';
import { compareEvents, covers } from '@scheduler/utils/eventOrder';
import type { ScheduleEvent } from '@scheduler/types';
import { PlusIcon } from '@scheduler/icons';
import { LocalBadge } from '@scheduler/components/LocalBadge';
import { MergeLocalButton } from '@scheduler/components/MergeLocalButton';
import { EventRow } from '@scheduler/daily/components/EventRow';
import { Wrapper, Inner, List, EmptyText, Footer, NewBtn } from './DailyScheduler.styled';

/**
 * 아직 저장되지 않은 새 행. 저장 때 쓸 id를 미리 정해 둔다.
 * 초안과 저장된 일정이 같은 id(=React 키)를 써서, 저장돼도 행이 새로 그려지지 않아
 * 입력 포커스가 끊기지 않는다.
 */
interface Draft {
  id: string;
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
    () =>
      events
        .filter(e => covers(e, todayKey))
        // Firestore는 문서 id 순으로 주므로, 만든 순서를 유지하려면 createdAt으로 다시 정렬한다
        .sort((a, b) => compareEvents(a, b) || (a.createdAt ?? 0) - (b.createdAt ?? 0)),
    [events, todayKey],
  );

  const removeDraft = useCallback((id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
  }, []);

  /**
   * 실제 일정과 초안을 한 배열로 합친다.
   * 이래야 초안이 저장돼 실제 일정이 될 때 같은 키가 이어져 행이 새로 그려지지 않는다.
   * (map을 둘로 나누면 React가 별개 슬롯으로 보아 키가 이어지지 않는다)
   */
  const savedIds = new Set(events.map(e => e.id));
  const rows: ({ draft: true; id: string } | { draft: false; event: ScheduleEvent })[] = [
    ...todayEvents.map(event => ({ draft: false as const, event })),
    ...drafts
      .filter(d => !savedIds.has(d.id))
      .map(d => ({ draft: true as const, id: d.id })),
  ];

  return (
    <Wrapper ref={ref}>
      <Inner $pad={pad}>
        <List>
          {rows.length === 0 && <EmptyText $fs={fs}>오늘 일정이 없습니다</EmptyText>}

          {rows.map(row =>
            row.draft ? (
              <EventRow
                key={row.id}
                title=""
                done={false}
                fs={fs}
                canEdit
                isDraft
                autoFocus
                onToggle={() => {}}
                onDelete={() => removeDraft(row.id)}
                onCommit={title => {
                  // 미리 정한 id로 저장한다. 같은 id의 실제 행이 이 행을 이어받아 포커스가 끊기지 않는다
                  addEvent({
                    id: row.id,
                    start: todayKey,
                    title,
                    done: false,
                    createdAt: Date.now(),
                  });
                }}
              />
            ) : (
              <EventRow
                key={row.event.id}
                title={row.event.title}
                done={row.event.done}
                fs={fs}
                canEdit
                isDraft={false}
                onToggle={() => toggleEvent(row.event.id)}
                onDelete={() => removeEvent(row.event.id)}
                onCommit={title => {
                  if (title === row.event.title) return;
                  updateEvent({ ...row.event, title });
                }}
              />
            ),
          )}
        </List>

        <Footer $pad={pad} $fs={fs}>
          {source === 'local'
            ? <LocalBadge fs={fs} />
            : widgetKey && <MergeLocalButton fs={fs} widgetKey={widgetKey} />}
          <NewBtn
            $fs={fs}
            onClick={() => setDrafts(prev => [...prev, { id: crypto.randomUUID() }])}
          >
            <PlusIcon />
            New
          </NewBtn>
        </Footer>
      </Inner>
    </Wrapper>
  );
};
