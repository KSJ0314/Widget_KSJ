import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`;

export const Inner = styled.div<{ $cellSize: number }>`
  width: ${({ $cellSize }) => $cellSize * 8}px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ $cellSize }) => Math.round($cellSize * 0.5)}px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ $cellSize }) => Math.round($cellSize * 0.35)}px;
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.primaryGlow};

  ${({ theme, $cellSize: _ }) => theme.variant === 'paper' && css`
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.border};
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `}
`;

export const CalHeader = styled.div<{ $fs: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${({ $fs }) => $fs * 0.5}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ $fs }) => $fs * 0.4}px;
`;

export const MonthLabel = styled.span<{ $fs: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.06em;
  text-shadow: 0 0 12px ${({ theme }) => theme.colors.primaryGlow};

  ${({ theme }) => theme.variant === 'paper' && css`
    text-shadow: none;
    letter-spacing: 0.03em;
  `}
`;

export const NavBtn = styled.button<{ $fs: number }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ $fs }) => $fs * 1.5}px;
  line-height: 1;
  padding: 0 ${({ $fs }) => $fs * 0.15}px;
  opacity: 0.55;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;

export const WeekRow = styled.div<{ $cellSize: number; $fs: number }>`
  display: grid;
  grid-template-columns: repeat(7, ${({ $cellSize }) => $cellSize}px);
  margin-bottom: ${({ $fs }) => $fs * 0.25}px;

  ${({ theme }) => theme.variant === 'paper' && css`
    margin-bottom: 0;
    border-top: 1px solid ${theme.colors.border};
    border-left: 1px solid ${theme.colors.border};
  `}
`;

export const DayName = styled.div<{ $cellSize: number; $fs: number; $col: number }>`
  width: ${({ $cellSize }) => $cellSize}px;
  height: ${({ $cellSize }) => $cellSize * 0.65}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs * 0.68}px;
  letter-spacing: 0.04em;
  color: ${({ theme, $col }) =>
    $col === 0 ? theme.colors.primary : theme.colors.textDim};

  ${({ theme }) => theme.variant === 'paper' && css`
    border-right: 1px solid ${theme.colors.border};
    border-bottom: 1px solid ${theme.colors.border};
  `}
`;

export const CellGrid = styled.div<{ $cellSize: number }>`
  display: grid;
  grid-template-columns: repeat(7, ${({ $cellSize }) => $cellSize}px);

  ${({ theme }) => theme.variant === 'paper' && css`
    border-left: 1px solid ${theme.colors.border};
  `}
`;

export const DayCell = styled.div<{
  $cellSize: number;
  $fs: number;
  $isToday: boolean;
  $isDim: boolean;
  $col: number;
}>`
  width: ${({ $cellSize }) => $cellSize}px;
  height: ${({ $cellSize }) => $cellSize}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs}px;

  color: ${({ theme, $isToday, $isDim, $col }) => {
    if ($isToday) return theme.variant === 'paper' ? theme.colors.primary : theme.colors.background;
    if ($isDim) return theme.colors.textDim;
    if ($col === 0) return theme.colors.primary;
    return theme.colors.text;
  }};

  ${({ theme, $fs }) => theme.variant === 'paper' && css`
    align-items: flex-start;
    justify-content: flex-end;
    padding: 10% 10% 0 0;
    border-right: 1px solid ${theme.colors.border};
    border-bottom: 1px solid ${theme.colors.border};

    span { font-size: ${$fs * 0.82}px; }
  `}

  ${({ $isToday, theme }) => $isToday && theme.variant === 'paper' && css`
    background: ${theme.colors.todayHighlight};
    font-weight: 700;
  `}

  ${({ $isToday, theme }) =>
    $isToday && theme.variant === 'digital' &&
    css`
      &::before {
        content: '';
        position: absolute;
        inset: 10%;
        border-radius: 50%;
        background: ${theme.colors.primary};
        box-shadow: 0 0 4px ${theme.colors.primaryGlow};
      }
    `}

  span {
    position: relative;
    z-index: 1;
  }
`;
