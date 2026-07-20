import styled, { css } from 'styled-components';
import { withAlpha, lineColor } from '../../../utils/styleUtils';

/** 모달 위에 한 겹 더 뜬다. 위젯이 작아도 읽을 수 있게 고정 px를 쓴다 */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: rgba(0, 0, 0, 0.4);
`;

export const Box = styled.div`
  padding: 14px;
  border-radius: 6px;
  border: 1px solid ${lineColor};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const MonthLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: ${({ theme }) => theme.colors.primary};
`;

export const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const NavBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.55;

  svg {
    width: 12px;
    height: 12px;
    display: block;
  }

  &:hover {
    opacity: 1;
  }
`;

export const EndToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 10px;
  margin-bottom: 8px;
  border-bottom: 1px solid ${lineColor};
`;

export const ToggleLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Switch = styled.button<{ $on: boolean }>`
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  width: 30px;
  height: 16px;
  border-radius: 999px;
  border: 1px solid ${lineColor};
  transition: background 0.15s;
  background: ${({ theme, $on }) => ($on ? theme.colors.primary : 'transparent')};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: ${({ $on }) => ($on ? '15px' : '2px')};
    width: 11px;
    height: 11px;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: left 0.15s;
    background: ${({ theme, $on }) =>
      $on ? theme.colors.background : withAlpha(theme.colors.primary, 0.5)};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 30px);
`;

export const DayName = styled.div<{ $isWeekend: boolean }>`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 10px;
  letter-spacing: 0.04em;
  color: ${({ theme, $isWeekend }) =>
    $isWeekend ? theme.colors.primary : theme.colors.textDim};
`;

export const DayBtn = styled.button<{
  $isDim: boolean;
  $isToday: boolean;
  $isEdge: boolean;
  $inRange: boolean;
}>`
  height: 28px;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: ${({ theme, $isDim }) => ($isDim ? theme.colors.textDim : theme.colors.text)};

  /* 범위 안쪽은 옅게, 시작·종료일은 진하게 */
  ${({ $inRange, theme }) =>
    $inRange &&
    css`
      background: ${withAlpha(theme.colors.primary, 0.16)};
    `}

  ${({ $isEdge, theme }) =>
    $isEdge &&
    css`
      background: ${theme.colors.primary};
      color: ${theme.colors.background};
      font-weight: 700;
      border-radius: 4px;
    `}

  ${({ $isToday, $isEdge, theme }) =>
    $isToday &&
    !$isEdge &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.colors.primary};
      border-radius: 4px;
    `}

  &:hover {
    ${({ $isEdge, theme }) =>
      !$isEdge &&
      css`
        background: ${withAlpha(theme.colors.primary, 0.28)};
      `}
  }
`;

export const Hint = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 10px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textDim};
  margin-top: 10px;
`;
