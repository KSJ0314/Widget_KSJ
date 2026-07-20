import { useState } from 'react';
import { useContainerSize } from '../../../hooks/useContainerSize';
import { DAYS_SHORT, MONTHS_SHORT, toDateKey } from '../../../utils/date';
import { getHolidayName } from '../../../utils/holidays';
import {
  Wrapper,
  Inner,
  CalHeader,
  NavBtn,
  MonthLabel,
  WeekRow,
  DayName,
  CellGrid,
  DayCell,
} from './MonthlyCalendar.styled';

type CellType = 'prev' | 'cur' | 'next';

/** 공휴일을 조회하려면 실제 Date가 필요해 날짜 객체까지 함께 만든다 */
const buildCells = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(year, month, i - firstDay + 1);
    const type: CellType =
      date.getMonth() === month ? 'cur' : date < new Date(year, month, 1) ? 'prev' : 'next';
    return { day: date.getDate(), date, type };
  });
};

export const MonthlyCalendar = () => {
  const { ref, width, height } = useContainerSize();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  // outer: 8*cellSize wide (7 cells + 0.5 pad × 2), 9.5*cellSize tall (header+names+6rows + pad × 2)
  const cellSize = Math.max(Math.min(width / 8, height / 9.5), 14);
  const fs = Math.max(cellSize * 0.38, 6);
  const headerFs = Math.max(cellSize * 0.44, 7);

  const cells = buildCells(year, month);

  const goPrev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const goNext = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const isToday = (day: number, type: CellType) =>
    type === 'cur' &&
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <Wrapper ref={ref}>
      <Inner $cellSize={cellSize}>
        <CalHeader $fs={headerFs}>
          <NavBtn $fs={headerFs} onClick={goPrev}>‹</NavBtn>
          <MonthLabel $fs={headerFs}>{MONTHS_SHORT[month].toUpperCase()} {year}</MonthLabel>
          <NavBtn $fs={headerFs} onClick={goNext}>›</NavBtn>
        </CalHeader>
        <WeekRow $cellSize={cellSize} $fs={fs}>
          {DAYS_SHORT.map((d, i) => (
            <DayName key={d} $cellSize={cellSize} $fs={fs} $col={i}>
              {d.toUpperCase()}
            </DayName>
          ))}
        </WeekRow>
        <CellGrid $cellSize={cellSize}>
          {cells.map((cell, idx) => {
            const holiday = getHolidayName(toDateKey(cell.date));
            return (
              <DayCell
                key={idx}
                $cellSize={cellSize}
                $fs={fs}
                $isToday={isToday(cell.day, cell.type)}
                $isDim={cell.type !== 'cur'}
                $col={idx % 7}
                $isHoliday={holiday !== null}
                data-tooltip={holiday ?? undefined}
              >
                <span>{cell.day}</span>
              </DayCell>
            );
          })}
        </CellGrid>
      </Inner>
    </Wrapper>
  );
};
