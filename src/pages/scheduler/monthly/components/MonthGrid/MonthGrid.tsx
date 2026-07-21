import { useMemo } from 'react';
import { DAYS_SHORT } from '@/utils/date';
import type { SchedulerLayout } from '../../hooks/useSchedulerLayout';
import { buildWeekSegments, laneCount, type WeekSegment } from '../../utils/weekLayout';
import type { ColorPreview, DayCellData, DragState, ScheduleEvent } from '../../../types';
import { WeekRow } from './WeekRow';
import { Body, DayNameRow, DayName } from './MonthGrid.styled';

interface Props {
  /** 6주 × (5 또는 7)칸. 숨긴 요일은 이미 걸러진 상태로 들어온다 */
  weeks: DayCellData[][];
  visibleCols: number[];
  events: ScheduleEvent[];
  layout: SchedulerLayout;
  today: Date;
  canEdit: boolean;
  colorPreview: ColorPreview | null;
  drag: DragState | null;
  onAdd: (dateKey: string) => void;
  onToggle: (id: string) => void;
  onOpen: (segment: WeekSegment) => void;
  onDragStart: (event: ScheduleEvent, x: number, y: number) => void;
  onDragMove: (x: number, y: number) => void;
  onDragEnd: () => void;
  onDragCancel: () => void;
}

export const MonthGrid = ({
  weeks, visibleCols, events, layout, today, canEdit, colorPreview, drag,
  onAdd, onToggle, onOpen, onDragStart, onDragMove, onDragEnd, onDragCancel,
}: Props) => {
  const { dayNameFs, dayNameH, rowMin, dateRowH, barH, barGap } = layout;

  const weekLayouts = useMemo(
    () =>
      weeks.map(week => {
        const segments = buildWeekSegments(week.map(d => d.date), events);
        const lanes = laneCount(segments);
        return {
          segments,
          minHeight: Math.max(rowMin, dateRowH + lanes * (barH + barGap) + barGap),
        };
      }),
    [weeks, events, rowMin, dateRowH, barH, barGap],
  );

  return (
    <Body>
      <DayNameRow $cols={visibleCols.length} $height={dayNameH}>
        {visibleCols.map(col => (
          <DayName key={col} $fs={dayNameFs} $col={col}>
            {DAYS_SHORT[col].toUpperCase()}
          </DayName>
        ))}
      </DayNameRow>

      {weeks.map((week, w) => (
        <WeekRow
          key={w}
          days={week}
          segments={weekLayouts[w].segments}
          minHeight={weekLayouts[w].minHeight}
          layout={layout}
          today={today}
          canEdit={canEdit}
          colorPreview={colorPreview}
          drag={drag}
          onAdd={onAdd}
          onToggle={onToggle}
          onOpen={onOpen}
          onDragStart={onDragStart}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
          onDragCancel={onDragCancel}
        />
      ))}
    </Body>
  );
};
