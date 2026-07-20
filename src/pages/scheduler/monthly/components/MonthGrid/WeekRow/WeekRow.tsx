import { isSameDay, toDateKey } from '@/utils/date';
import { getHolidayName } from '@/utils/holidays';
import { PlusIcon } from '../../../../icons';
import type { SchedulerLayout } from '../../../hooks/useSchedulerLayout';
import type { WeekSegment } from '../../../utils/weekLayout';
import type { DayCellData } from '../../../../types';
import { EventBar } from './EventBar';
import { Row, Cell, DateRow, AddBtn, DateNum, EventLayer } from './WeekRow.styled';

interface Props {
  days: DayCellData[];
  segments: WeekSegment[];
  minHeight: number;
  layout: SchedulerLayout;
  today: Date;
  canEdit: boolean;
  onAdd: (dateKey: string) => void;
  onToggle: (id: string) => void;
  onOpen: (segment: WeekSegment) => void;
}

export const WeekRow = ({
  days, segments, minHeight, layout, today, canEdit, onAdd, onToggle, onOpen,
}: Props) => {
  const cols = days.length;
  const { cellPad, dateFs, dateRowH } = layout;

  return (
    <Row $cols={cols} $minHeight={minHeight}>
      {days.map(({ date, isCurrentMonth }) => {
        const col = date.getDay();
        const holiday = getHolidayName(toDateKey(date));
        return (
          <Cell
            key={date.getTime()}
            $pad={cellPad}
            $isRestDay={col === 0 || col === 6 || holiday !== null}
          >
            <DateRow>
              {canEdit && (
                <AddBtn $fs={dateFs} onClick={() => onAdd(toDateKey(date))} title="일정 추가">
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
            onToggle={onToggle}
            onOpen={onOpen}
          />
        ))}
      </EventLayer>
    </Row>
  );
};
