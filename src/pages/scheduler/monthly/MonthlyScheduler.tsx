import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContainerSize } from '@/hooks/useContainerSize';
import { useSchedulerStore } from '../schedulerStore';
import { useSchedulerLayout } from './hooks/useSchedulerLayout';
import { buildCells } from '../utils/calendarCells';
import type { ScheduleEvent } from '../types';
import { MonthNavigator } from './components/MonthNavigator';
import { MonthGrid } from './components/MonthGrid';
import { EventModal } from '../components/EventModal';
import { Wrapper, Inner } from './MonthlyScheduler.styled';

/** null이면 닫힘. event가 null이면 추가, 있으면 수정 */
interface Editing {
  event: ScheduleEvent | null;
  date: string;
}

export const MonthlyScheduler = () => {
  const { ref, width, height } = useContainerSize();
  const layout = useSchedulerLayout(width, height);

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [editing, setEditing] = useState<Editing | null>(null);
  /** 색 견본에 마우스를 올린 동안만 채워진다 */
  const [hoverColor, setHoverColor] = useState<{ color?: string } | null>(null);

  const closeModal = () => {
    setEditing(null);
    setHoverColor(null);
  };

  // 미리보기는 수정 중인 일정에만 적용한다. 새로 추가하는 중이면 그릴 막대가 없다
  const colorPreview =
    editing?.event && hoverColor ? { id: editing.event.id, color: hoverColor.color } : null;

  const [searchParams] = useSearchParams();
  const widgetKey = searchParams.get('u');

  const {
    events, settings, canEdit,
    setSettings, init, cleanup, addEvent, updateEvent, removeEvent, toggleEvent,
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
          onAdd={date => setEditing({ event: null, date })}
          onToggle={toggleEvent}
          onOpen={segment => setEditing({ event: segment.event, date: segment.event.start })}
        />
      </Inner>

      {editing && (
        <EventModal
          event={editing.event}
          defaultDate={editing.date}
          onSave={async event => {
            const ok = await (editing.event ? updateEvent(event) : addEvent(event));
            if (ok) closeModal();
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
