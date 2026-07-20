import { useEffect, useState } from 'react';
import { DAYS_SHORT, MONTHS_SHORT, isSameDay, toDateKey } from '../../../../../utils/date';
import { ChevronIcon } from '../../../icons';
import { buildCells } from '../../../utils/calendarCells';
import {
  Overlay,
  Box,
  Head,
  MonthLabel,
  NavGroup,
  NavBtn,
  EndToggleRow,
  ToggleLabel,
  Switch,
  Grid,
  DayName,
  DayBtn,
  Hint,
} from './DatePicker.styled';

interface Props {
  start: string;
  end?: string;
  onChange: (start: string, end?: string) => void;
  onClose: () => void;
}

export const DatePicker = ({ start, end, onChange, onClose }: Props) => {
  const today = new Date();
  const [hasEnd, setHasEnd] = useState(end !== undefined);
  /** 종료일 모드에서 첫 번째로 고른 날짜. 두 번째 클릭까지 기다린다 */
  const [pending, setPending] = useState<string | null>(null);

  const [view, setView] = useState(() => {
    const [y, m] = start.split('-').map(Number);
    return { year: y, month: m - 1 };
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const goPrev = () =>
    setView(v => (v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }));
  const goNext = () =>
    setView(v => (v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }));

  const toggleEnd = () => {
    if (hasEnd) {
      // 끄면 종료일을 버린다
      setHasEnd(false);
      setPending(null);
      onChange(start, undefined);
    } else {
      setHasEnd(true);
      setPending(null);
    }
  };

  const pick = (key: string) => {
    if (!hasEnd) {
      onChange(key, undefined);
      onClose();
      return;
    }

    if (pending === null) {
      setPending(key);
      return;
    }

    // 앞선 날짜가 시작일, 나중이 종료일
    const [from, to] = pending <= key ? [pending, key] : [key, pending];
    onChange(from, from === to ? undefined : to);
    setPending(null);
    onClose();
  };

  const cells = buildCells(view.year, view.month);

  // 강조 범위: 고르는 중이면 그 한 칸만, 아니면 확정된 시작~종료
  const rangeStart = pending ?? start;
  const rangeEnd = pending ?? end ?? start;

  return (
    <Overlay onClick={onClose}>
      <Box onClick={e => e.stopPropagation()}>
        <Head>
          <MonthLabel>{view.year} {MONTHS_SHORT[view.month].toUpperCase()}</MonthLabel>
          <NavGroup>
            <NavBtn onClick={goPrev} title="이전 달"><ChevronIcon dir="prev" /></NavBtn>
            <NavBtn onClick={goNext} title="다음 달"><ChevronIcon dir="next" /></NavBtn>
          </NavGroup>
        </Head>

        <EndToggleRow>
          <ToggleLabel>종료일</ToggleLabel>
          <Switch $on={hasEnd} onClick={toggleEnd} />
        </EndToggleRow>

        <Grid>
          {DAYS_SHORT.map((day, i) => (
            <DayName key={day} $isWeekend={i === 0 || i === 6}>
              {day.toUpperCase()}
            </DayName>
          ))}

          {cells.map(({ date, isCurrentMonth }) => {
            const key = toDateKey(date);
            return (
              <DayBtn
                key={key}
                $isDim={!isCurrentMonth}
                $isToday={isSameDay(date, today)}
                $isEdge={key === rangeStart || key === rangeEnd}
                $inRange={key > rangeStart && key < rangeEnd}
                onClick={() => pick(key)}
              >
                {date.getDate()}
              </DayBtn>
            );
          })}
        </Grid>

        {hasEnd && (
          <Hint>
            {pending
              ? '끝나는 날짜를 한 번 더 누르세요.'
              : '두 날짜를 누르면 앞선 쪽이 시작일이 됩니다.'}
          </Hint>
        )}
      </Box>
    </Overlay>
  );
};
