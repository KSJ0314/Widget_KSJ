import { isSameDay, toDateKey } from '@/utils/date';
import { getHolidayName } from '@/utils/holidays';
import { PlusIcon } from '../../../../icons';
import type { SchedulerLayout } from '../../../hooks/useSchedulerLayout';
import type { WeekSegment } from '../../../utils/weekLayout';
import type { ColorPreview, DayCellData, DragState, ScheduleEvent } from '../../../../types';
import { EventBar } from './EventBar';
import { Row, Cell, DateRow, AddBtn, DateNum, EventLayer } from './WeekRow.styled';

interface Props {
  days: DayCellData[];
  segments: WeekSegment[];
  minHeight: number;
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

export const WeekRow = ({
  days, segments, minHeight, layout, today, canEdit, colorPreview, drag,
  onAdd, onToggle, onOpen, onDragStart, onDragMove, onDragEnd, onDragCancel,
}: Props) => {
  const cols = days.length;
  const { cellPad, dateFs, dateRowH } = layout;

  return (
    <Row $cols={cols} $minHeight={minHeight}>
      {days.map(({ date, isCurrentMonth }) => {
        const col = date.getDay();
        const dateKey = toDateKey(date);
        const holiday = getHolidayName(dateKey);
        return (
          <Cell
            key={date.getTime()}
            /* 드래그 중 커서 아래 칸을 찾는 데 쓴다 */
            data-date={dateKey}
            $pad={cellPad}
            $isRestDay={col === 0 || col === 6 || holiday !== null}
            $isDropTarget={drag?.overDate === dateKey}
          >
            <DateRow>
              {canEdit && (
                <AddBtn $fs={dateFs} onClick={() => onAdd(dateKey)} title="일정 추가">
                  <PlusIcon />
                </AddBtn>
              )}
              <DateNum
                $fs={dateFs}
                $isToday={isSameDay(date, today)}
                $isDim={!isCurrentMonth}
                $col={col}
                $isHoliday={holiday !== null}
                data-tooltip={holiday ?? undefined}
              >
                {date.getDate()}
              </DateNum>
            </DateRow>
          </Cell>
        );
      })}

      <EventLayer $top={dateRowH}>
        {segments.map(segment => (
          <EventBar
            key={`${segment.event.id}-${segment.startIdx}`}
            segment={segment}
            cols={cols}
            layout={layout}
            canEdit={canEdit}
            colorPreview={colorPreview}
            dragging={drag?.event.id === segment.event.id}
            onToggle={onToggle}
            onOpen={onOpen}
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
          />
        ))}
      </EventLayer>
    </Row>
  );
};
