import styled, { css } from 'styled-components';
import type { DefaultTheme } from 'styled-components';

/** #rgb / #rrggbb를 rgba로. 그 외 형식은 그대로 돌려준다 */
const withAlpha = (color: string, alpha: number) => {
  const hex = color.trim();
  if (!hex.startsWith('#')) return color;
  const body = hex.slice(1);
  const full = body.length === 3 ? body.split('').map(c => c + c).join('') : body;
  if (full.length !== 6) return color;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

/** 스크롤 거터 두께. Inner의 오른쪽 padding 보정에도 같은 값을 쓴다 */
const SCROLLBAR_WIDTH = 11;

/** 선은 테마의 포인트 색을 옅게 쓴다 */
const lineColor = ({ theme }: { theme: DefaultTheme }) =>
  withAlpha(theme.colors.primary, 0.4);

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  /*
   * scroll로 두면 넘치지 않아도 스크롤바가 항상 그려져 위아래 버튼이 보인다.
   * auto로 넘칠 때만 그리고, 자리 확보는 gutter에 맡긴다.
   */
  overflow-y: auto;
  scrollbar-gutter: stable;
  background: ${({ theme }) => theme.colors.background};

  scrollbar-width: thin;
  scrollbar-color: ${lineColor} transparent;

  &::-webkit-scrollbar {
    width: ${SCROLLBAR_WIDTH}px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${lineColor};
    border-radius: 999px;
  }
`;

export const Inner = styled.div<{ $pad: number }>`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: ${({ $pad }) => $pad}px;
  /* 오른쪽은 스크롤 거터가 이미 자리를 먹으므로 그만큼 뺀다 */
  padding-right: ${({ $pad }) => Math.max($pad - SCROLLBAR_WIDTH, 0)}px;
  background: ${({ theme }) => theme.colors.background};
`;

export const CalHeader = styled.div<{ $fs: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ $fs }) => $fs * 0.4}px;
  padding-bottom: ${({ $fs }) => $fs * 0.2}px;
  margin-bottom: ${({ $fs }) => $fs * 0.4}px;
`;

export const HeaderLeft = styled.div<{ $fs: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $fs }) => $fs * 0.55}px;
`;

export const MonthLabel = styled.span<{ $fs: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.03em;
  white-space: nowrap;
  /* 톱니바퀴 아이콘과 세로 중심을 맞춘다 */
  display: flex;
  align-items: center;
  line-height: 1;
`;

export const NavBtn = styled.button<{ $fs: number }>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.55;
  transition: opacity 0.15s;

  svg {
    width: ${({ $fs }) => $fs * 0.8}px;
    height: ${({ $fs }) => $fs * 0.8}px;
    display: block;
  }

  &:hover {
    opacity: 1;
  }
`;

/** 월 이름 길이가 바뀌어도 버튼이 밀리지 않게 오른쪽 끝에 붙여 둔다 */
export const NavGroup = styled.div<{ $fs: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $fs }) => $fs * 0.35}px;
`;

export const TodayBtn = styled.button<{ $fs: number }>`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs * 0.72}px;
  line-height: 1;
  letter-spacing: 0.04em;
  padding: 0;
  /* 글자 박스가 아니라 글자 자체가 SVG와 나란히 오도록 한다 */
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.55;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;

/** 톱니바퀴와 팝오버의 위치 기준 */
export const SettingsWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SettingsBtn = styled.button<{ $fs: number; $on: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  color: ${({ theme }) => theme.colors.primary};
  opacity: ${({ $on }) => ($on ? 1 : 0.5)};
  transition: opacity 0.15s;

  svg {
    width: ${({ $fs }) => $fs * 0.65}px;
    height: ${({ $fs }) => $fs * 0.65}px;
    display: block;
  }

  &:hover {
    opacity: 1;
  }
`;

export const Popover = styled.div<{ $fs: number }>`
  position: absolute;
  top: calc(100% + ${({ $fs }) => $fs * 0.5}px);
  left: 0;
  z-index: 10;
  min-width: ${({ $fs }) => $fs * 9}px;
  display: flex;
  flex-direction: column;
  gap: ${({ $fs }) => $fs * 0.5}px;
  padding: ${({ $fs }) => $fs * 0.6}px;
  border: 1px solid ${lineColor};
  border-radius: ${({ $fs }) => $fs * 0.4}px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
`;

export const PopoverHead = styled.div<{ $fs: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ $fs }) => $fs}px;
  padding-bottom: ${({ $fs }) => $fs * 0.4}px;
  border-bottom: 1px solid ${lineColor};
`;

export const PopoverTitle = styled.span<{ $fs: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs * 0.72}px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
`;

export const CloseBtn = styled.button<{ $fs: number }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ $fs }) => $fs * 0.9}px;
  line-height: 1;
  padding: 0;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.55;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;

/** 팝오버 안 설정 한 줄. 항목이 늘어나면 이걸 반복해서 쓴다 */
export const SettingRow = styled.div<{ $fs: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ $fs }) => $fs}px;
`;

export const SettingLabel = styled.span<{ $fs: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs * 0.66}px;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;

export const Switch = styled.button<{ $fs: number; $on: boolean }>`
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  width: ${({ $fs }) => $fs * 1.9}px;
  height: ${({ $fs }) => $fs}px;
  border-radius: 999px;
  border: 1px solid ${lineColor};
  transition: background 0.15s;
  background: ${({ theme, $on }) => ($on ? theme.colors.primary : 'transparent')};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: ${({ $fs, $on }) => ($on ? $fs * 1.0 : $fs * 0.12)}px;
    width: ${({ $fs }) => $fs * 0.72}px;
    height: ${({ $fs }) => $fs * 0.72}px;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: left 0.15s;
    background: ${({ theme, $on }) =>
      $on ? theme.colors.background : withAlpha(theme.colors.primary, 0.5)};
  }
`;

/**
 * 요일 줄과 날짜 칸을 한 그리드에 담아 세로선이 끊기지 않게 한다.
 * gap 1px + 배경색으로 선을 만들면 칸 높이가 제각각이어도 선이 어긋나지 않는다.
 */
export const Grid = styled.div<{ $cols: number; $rowMin: number; $dayNameH: number }>`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  grid-template-rows:
    ${({ $dayNameH }) => $dayNameH}px
    repeat(6, minmax(${({ $rowMin }) => $rowMin}px, auto));
  gap: 1px;
  background: ${lineColor};
  border: 1px solid ${lineColor};
`;

export const DayName = styled.div<{ $fs: number; $isWeekend: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs}px;
  letter-spacing: 0.06em;
  color: ${({ theme, $isWeekend }) =>
    $isWeekend ? theme.colors.primary : theme.colors.textDim};
`;

export const DayCell = styled.div<{ $pad: number }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ $pad }) => $pad}px;
  gap: ${({ $pad }) => $pad}px;
`;

export const DateRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DateNum = styled.span<{
  $fs: number;
  $isToday: boolean;
  $isDim: boolean;
  $isWeekend: boolean;
}>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs}px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ $fs }) => $fs * 1.6}px;
  height: ${({ $fs }) => $fs * 1.6}px;
  border-radius: 50%;

  color: ${({ theme, $isToday, $isDim, $isWeekend }) => {
    if ($isToday) return theme.colors.background;
    if ($isDim) return theme.colors.textDim;
    if ($isWeekend) return theme.colors.primary;
    return theme.colors.text;
  }};

  /* 오늘은 숫자에만 표시하고 칸 배경은 건드리지 않는다 */
  ${({ $isToday, theme }) =>
    $isToday &&
    css`
      background: ${theme.colors.primary};
      font-weight: 700;
    `}
`;

export const EventList = styled.div<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap}px;
`;

export const EventBar = styled.div<{ $fs: number; $color?: string; $isDim: boolean }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs}px;
  line-height: 1.35;
  padding: ${({ $fs }) => $fs * 0.18}px ${({ $fs }) => $fs * 0.35}px;
  border-radius: ${({ $fs }) => $fs * 0.3}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme, $color }) => $color ?? theme.colors.primary};
  opacity: ${({ $isDim }) => ($isDim ? 0.55 : 1)};
`;
