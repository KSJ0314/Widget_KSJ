import styled, { css } from 'styled-components';
import { lineColor } from '../../../../utils/styleUtils';
import { restDayBg, withAlpha } from '@/theme/colorUtils';
import { weekendColor, SUNDAY_COLOR } from '@/theme/weekendColors';
import { tooltipCss } from '@/theme/tooltip';

export const Row = styled.div<{ $cols: number; $minHeight: number }>`
  /* 남는 높이를 행들이 나눠 가져야 마지막 행 아래에 빈 공간이 안 남는다 */
  flex: 1;
  position: relative;
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  min-height: ${({ $minHeight }) => $minHeight}px;

  /* 펼쳐진 막대가 아래 주 위로 덮이도록 이 행을 앞으로 끌어올린다 */
  &:hover {
    z-index: 5;
  }
`;

export const Cell = styled.div<{ $pad: number; $isRestDay: boolean; $isDropTarget: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid ${lineColor};
  border-bottom: 1px solid ${lineColor};
  padding: ${({ $pad }) => $pad}px;
  background: ${props => (props.$isRestDay ? restDayBg(props) : 'transparent')};

  /* 일정을 끌어와 놓을 칸 */
  ${({ $isDropTarget, theme }) =>
    $isDropTarget &&
    css`
      background: ${withAlpha(theme.colors.primary, 0.22)};
    `}

  /* 공휴일 말풍선이 칸 밖으로 나가야 해서 hover 동안만 클리핑을 푼다 */
  &:hover {
    overflow: visible;
  }
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/** 칸에 마우스를 올렸을 때만 보인다. 편집할 수 없는 위젯에서는 렌더하지 않는다 */
export const AddBtn = styled.button<{ $fs: number }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $fs }) => $fs * 1.6}px;
  height: ${({ $fs }) => $fs * 1.6}px;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0;
  transition: opacity 0.12s;

  svg {
    width: ${({ $fs }) => $fs}px;
    height: ${({ $fs }) => $fs}px;
    display: block;
  }

  ${Cell}:hover & {
    opacity: 0.55;
  }

  &:hover {
    opacity: 1;
  }
`;

export const DateNum = styled.span<{
  $fs: number;
  $isToday: boolean;
  $isDim: boolean;
  $col: number;
  $isHoliday: boolean;
}>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs}px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* + 버튼이 없을 때도 날짜는 오른쪽에 붙어 있어야 한다 */
  margin-left: auto;
  min-width: ${({ $fs }) => $fs * 1.6}px;
  height: ${({ $fs }) => $fs * 1.6}px;
  border-radius: 50%;

  ${tooltipCss}

  color: ${({ theme, $isToday, $isDim, $col, $isHoliday }) => {
    if ($isToday) return theme.colors.background;
    if ($isDim) return theme.colors.textDim;
    if ($isHoliday) return SUNDAY_COLOR;
    return weekendColor($col) ?? theme.colors.text;
  }};

  /* 오늘은 숫자에만 표시하고 칸 배경은 건드리지 않는다 */
  ${({ $isToday, theme }) =>
    $isToday &&
    css`
      background: ${theme.colors.primary};
      font-weight: 700;
    `}
`;

/** 날짜 숫자 아래에 깔리는 층. 막대는 여기에 절대 위치로 놓인다 */
export const EventLayer = styled.div<{ $top: number }>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;
