import { useState } from 'react';
import { useContainerSize } from '../../../hooks/useContainerSize';
import { DAYS_SHORT, MONTHS_SHORT } from '../../../utils/date';
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

const buildCells = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells: { day: number; type: CellType }[] = [
    ...Array.from({ length: firstDay }, (_, i) => ({
      day: prevMonthDays - firstDay + 1 + i,
      type: 'prev' as CellType,
    })),
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      type: 'cur' as CellType,
    })),
  ];
  const trailing = 42 - cells.length;
  for (let i = 1; i <= trailing; i++) cells.push({ day: i, type: 'next' as CellType });
  return cells;
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
          {cells.map((cell, idx) => (
            <DayCell
              key={idx}
              $cellSize={cellSize}
              $fs={fs}
              $isToday={isToday(cell.day, cell.type)}
              $isDim={cell.type !== 'cur'}
              $col={idx % 7}
            >
              <span>{cell.day}</span>
            </DayCell>
          ))}
        </CellGrid>
      </Inner>
    </Wrapper>
  );
};
