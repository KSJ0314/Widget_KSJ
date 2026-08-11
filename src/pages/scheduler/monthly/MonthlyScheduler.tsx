import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContainerSize } from '@/hooks/useContainerSize';
import { DEFAULT_EVENT_ALPHA } from '@/theme/colorUtils';
import { useSchedulerStore } from '@scheduler/schedulerStore';
import { useSchedulerLayout } from '@scheduler/monthly/hooks/useSchedulerLayout';
import { buildCells } from '@scheduler/utils/calendarCells';
import type { DragState, ScheduleEvent } from '@scheduler/types';
import { moveEvent } from '@scheduler/utils/moveEvent';
import { MonthNavigator } from '@scheduler/monthly/components/MonthNavigator';
import { MonthGrid } from '@scheduler/monthly/components/MonthGrid';
import { EventModal } from '@scheduler/components/EventModal';
import { Wrapper, Inner, DragGhost } from './MonthlyScheduler.styled';

/** null이면 닫힘. event가 null이면 추가, 있으면 수정 */
interface Editing {
  event: ScheduleEvent | null;
  date: string;
}

interface Props {
  /** 홈 미리보기처럼 URL을 쓸 수 없는 곳에서 넘긴다 */
  widgetKey?: string | null;
}

export const MonthlyScheduler = ({ widgetKey: keyFromProps }: Props) => {
  const { ref, width, height } = useContainerSize();
  const layout = useSchedulerLayout(width, height);

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [editing, setEditing] = useState<Editing | null>(null);
  /** 색 견본에 마우스를 올린 동안만 채워진다 */
  const [hoverColor, setHoverColor] = useState<{ color?: string; alpha?: number } | null>(null);

  const closeModal = () => {
    setEditing(null);
    setHoverColor(null);
  };

  // 미리보기는 수정 중인 일정에만 적용한다. 새로 추가하는 중이면 그릴 막대가 없다
  const colorPreview =
    editing?.event && hoverColor
      ? { id: editing.event.id, color: hoverColor.color, alpha: hoverColor.alpha }
      : null;

  const [drag, setDrag] = useState<DragState | null>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: ScheduleEvent, x: number, y: number) => {
    setDrag({ event, overDate: null, startX: x, startY: y });
  };

  const handleDragMove = (x: number, y: number) => {
    // 커서를 따라가는 건 고스트뿐이라, 상태를 건드리지 않고 DOM만 옮긴다
    const ghost = ghostRef.current;
    if (ghost) ghost.style.transform = `translate(${x + 10}px, ${y}px) translateY(-50%)`;

    // 커서 아래에 막대가 겹쳐 있을 수 있으니 그 지점의 요소를 모두 훑어 칸을 찾는다
    const cell = document
      .elementsFromPoint(x, y)
      .find((el): el is HTMLElement => el instanceof HTMLElement && Boolean(el.dataset.date));
    const overDate = cell?.dataset.date ?? null;
    setDrag(prev => (prev && prev.overDate !== overDate ? { ...prev, overDate } : prev));
  };

  const handleDragEnd = () => {
    if (!drag) return;
    const { event, overDate } = drag;
    setDrag(null);

    if (!overDate || overDate === event.start) return;
    updateEvent(moveEvent(event, overDate));
  };

  const isDragging = drag !== null;

  /**
   * 막대가 포인터를 놓치는 경우가 있어(포인터 취소, 리렌더 중 이탈)
   * 창 단위로 한 번 더 받아 고스트가 남지 않게 한다.
   * 막대의 핸들러가 먼저 실행되므로 이동 처리를 가로채지 않는다.
   */
  useEffect(() => {
    if (!isDragging) return;
    const clear = () => setDrag(null);
    window.addEventListener('pointerup', clear);
    window.addEventListener('pointercancel', clear);
    return () => {
      window.removeEventListener('pointerup', clear);
      window.removeEventListener('pointercancel', clear);
    };
  }, [isDragging]);

  const [searchParams] = useSearchParams();
  const widgetKey = keyFromProps ?? searchParams.get('u');

  const {
    events, settings, recentColors, canEdit, source,
    setSettings, pushRecentColor,
    init, cleanup, addEvent, updateEvent, removeEvent, toggleEvent,
  } = useSchedulerStore();
  const { showWeekend } = settings;

  // 고유키가 있으면 Firestore를 구독하고, 없으면 설정만 localStorage에서 읽는다
  useEffect(() => {
    init(widgetKey);
    return () => cleanup();
  }, [widgetKey, init, cleanup]);

  const visibleCols = useMemo(
    () => (showWeekend ? [0, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5]),
    [showWeekend],
  );

  // 6주로 자른 뒤 각 주에서 숨긴 요일을 걸러낸다
  const weeks = useMemo(() => {
    const cells = buildCells(year, month);
    return Array.from({ length: 6 }, (_, w) =>
      cells.slice(w * 7, w * 7 + 7).filter((_, i) => visibleCols.includes(i)),
    );
  }, [year, month, visibleCols]);

  const goPrev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const goNext = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };
  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  return (
    <Wrapper ref={ref}>
      <Inner $pad={layout.pad}>
        <MonthNavigator
          fs={layout.headerFs}
          year={year}
          month={month}
          showWeekend={showWeekend}
          isLocal={source === 'local'}
          widgetKey={widgetKey}
          onChangeShowWeekend={value => setSettings({ showWeekend: value })}
          onPrev={goPrev}
          onNext={goNext}
          onToday={goToday}
        />

        <MonthGrid
          weeks={weeks}
          visibleCols={visibleCols}
          events={events}
          layout={layout}
          today={today}
          canEdit={canEdit}
          colorPreview={colorPreview}
          drag={drag}
          onAdd={date => setEditing({ event: null, date })}
          onToggle={toggleEvent}
          onOpen={segment => setEditing({ event: segment.event, date: segment.event.start })}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setDrag(null)}
        />
      </Inner>

      {drag && (
        <DragGhost
          ref={ghostRef}
          $x={drag.startX}
          $y={drag.startY}
          $width={Math.max((width - layout.pad * 2) / visibleCols.length, 40)}
          $height={layout.barH}
          $fs={layout.dateFs}
          $color={drag.event.color}
          $alpha={drag.event.colorAlpha ?? DEFAULT_EVENT_ALPHA}
        >
          {drag.event.title}
        </DragGhost>
      )}

      {editing && (
        <EventModal
          event={editing.event}
          defaultDate={editing.date}
          recentColors={recentColors}
          onSave={async event => {
            const ok = await (editing.event ? updateEvent(event) : addEvent(event));
            if (ok) {
              // 색을 고른 일정만 남긴다. '기본'은 색을 지정하지 않은 것이다
              if (event.color) {
                pushRecentColor(event.color, event.colorAlpha ?? DEFAULT_EVENT_ALPHA);
              }
              closeModal();
            }
            return ok;
          }}
          onDelete={async id => {
            const ok = await removeEvent(id);
            if (ok) closeModal();
            return ok;
          }}
          onClose={closeModal}
          onPreviewColor={setHoverColor}
        />
      )}
    </Wrapper>
  );
};
