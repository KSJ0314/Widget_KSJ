import { useEffect, useMemo, useRef, useState } from 'react';
import { useContainerSize } from '../../../hooks/useContainerSize';
import { DAYS_SHORT, MONTHS_SHORT } from '../../../utils/date';
import { events, groupByDate, toDateKey } from './events';
import { useSchedulerSettings } from './useSchedulerSettings';
import {
  Wrapper,
  Inner,
  CalHeader,
  HeaderLeft,
  NavBtn,
  NavGroup,
  TodayBtn,
  MonthLabel,
  SettingsWrap,
  SettingsBtn,
  Popover,
  PopoverHead,
  PopoverTitle,
  CloseBtn,
  SettingRow,
  SettingLabel,
  Switch,
  Grid,
  DayName,
  DayCell,
  DateRow,
  DateNum,
  EventList,
  EventBar,
} from './SchedulerCalendar.styled';

/** 6주 42칸. 전달 끝·다음달 앞도 실제 Date로 만들어 일정을 똑같이 조회한다 */
const buildCells = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(year, month, i - firstDay + 1);
    return { date, isCurrentMonth: date.getMonth() === month };
  });
};

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

/** 글자 ‹ › 는 폰트마다 앉는 위치가 달라 Today와 세로가 안 맞는다. 도형으로 그린다 */
const ChevronIcon = ({ dir }: { dir: 'prev' | 'next' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points={dir === 'prev' ? '15 5 8 12 15 19' : '9 5 16 12 9 19'} />
  </svg>
);

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const SchedulerCalendar = () => {
  const { ref, width, height } = useContainerSize();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const { settings, update } = useSchedulerSettings();
  const { showWeekend } = settings;
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // 팝오버는 바깥 클릭이나 Esc로 닫는다
  useEffect(() => {
    if (!settingsOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!settingsRef.current?.contains(e.target as Node)) setSettingsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSettingsOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [settingsOpen]);

  const base = Math.max(Math.min(width / 8, height / 9), 14);
  const pad = Math.round(base * 0.35);
  const headerFs = Math.max(base * 0.28, 7);
  const dayNameFs = Math.max(base * 0.22, 6);
  const dateFs = Math.max(base * 0.2, 5);
  const eventFs = Math.max(base * 0.2, 5);
  const cellPad = Math.max(Math.round(base * 0.06), 1);

  const dayNameH = Math.max(base * 0.34, 10);
  const headerH = headerFs * 2.1;
  // 남는 높이를 6주로 나눈 값이 칸의 기본 높이. 일정이 넘치면 이 값을 넘겨 늘어난다
  const rowMin = Math.max((height - pad * 2 - headerH - dayNameH - 9) / 6, 18);

  const cells = useMemo(() => buildCells(year, month), [year, month]);
  const eventMap = useMemo(() => groupByDate(events), []);

  const visibleCols = showWeekend ? [0, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5];
  const visibleCells = cells.filter((_, i) => visibleCols.includes(i % 7));

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
      <Inner $pad={pad}>
        <CalHeader $fs={headerFs}>
          <HeaderLeft $fs={headerFs}>
            <MonthLabel $fs={headerFs}>
              {year} {MONTHS_SHORT[month].toUpperCase()}
            </MonthLabel>
            <SettingsWrap ref={settingsRef}>
              <SettingsBtn
                $fs={headerFs}
                $on={settingsOpen}
                onClick={() => setSettingsOpen(v => !v)}
                title="설정"
              >
                <GearIcon />
              </SettingsBtn>
              {settingsOpen && (
                <Popover $fs={headerFs}>
                  <PopoverHead $fs={headerFs}>
                    <PopoverTitle $fs={headerFs}>설정</PopoverTitle>
                    <CloseBtn
                      $fs={headerFs}
                      onClick={() => setSettingsOpen(false)}
                      title="닫기"
                    >
                      ×
                    </CloseBtn>
                  </PopoverHead>
                  <SettingRow $fs={headerFs}>
                    <SettingLabel $fs={headerFs}>주말 표시</SettingLabel>
                    <Switch
                      $fs={headerFs}
                      $on={showWeekend}
                      onClick={() => update({ showWeekend: !showWeekend })}
                    />
                  </SettingRow>
                </Popover>
              )}
            </SettingsWrap>
          </HeaderLeft>
          <NavGroup $fs={headerFs}>
            <NavBtn $fs={headerFs} onClick={goPrev} title="이전 달">
              <ChevronIcon dir="prev" />
            </NavBtn>
            <TodayBtn $fs={headerFs} onClick={goToday}>Today</TodayBtn>
            <NavBtn $fs={headerFs} onClick={goNext} title="다음 달">
              <ChevronIcon dir="next" />
            </NavBtn>
          </NavGroup>
        </CalHeader>

        <Grid $cols={visibleCols.length} $rowMin={rowMin} $dayNameH={dayNameH}>
          {visibleCols.map(col => (
            <DayName key={col} $fs={dayNameFs} $isWeekend={col === 0 || col === 6}>
              {DAYS_SHORT[col].toUpperCase()}
            </DayName>
          ))}

          {visibleCells.map(({ date, isCurrentMonth }) => {
            const col = date.getDay();
            const dayEvents = eventMap.get(toDateKey(date)) ?? [];
            return (
              <DayCell key={date.getTime()} $pad={cellPad}>
                <DateRow>
                  <DateNum
                    $fs={dateFs}
                    $isToday={isSameDay(date, today)}
                    $isDim={!isCurrentMonth}
                    $isWeekend={col === 0 || col === 6}
                  >
                    {date.getDate()}
                  </DateNum>
                </DateRow>
                {dayEvents.length > 0 && (
                  <EventList $gap={cellPad}>
                    {dayEvents.map(ev => (
                      <EventBar
                        key={ev.id}
                        $fs={eventFs}
                        $color={ev.color}
                        $isDim={!isCurrentMonth}
                        title={ev.title}
                      >
                        {ev.title}
                      </EventBar>
                    ))}
                  </EventList>
                )}
              </DayCell>
            );
          })}
        </Grid>
      </Inner>
    </Wrapper>
  );
};
