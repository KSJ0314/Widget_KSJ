import styled, { css } from 'styled-components';
import { withAlpha, lineColor } from '../../../utils/styleUtils';

/** 모달과 같은 배율을 쓴다 */
const S = 1.3;
const px = (n: number) => `${n * S}px`;

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
  padding: ${px(14)};
  border-radius: ${px(6)};
  border: 1px solid ${lineColor};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${px(12)};
  margin-bottom: ${px(10)};
`;

export const MonthLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(12)};
  font-weight: 700;
  letter-spacing: 0.03em;
  color: ${({ theme }) => theme.colors.primary};
`;

export const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(6)};
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
    width: ${px(12)};
    height: ${px(12)};
    display: block;
  }

  &:hover {
    opacity: 1;
  }
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  /* 화살표와 붙어 보이지 않게 살짝 띄운다 */
  margin-left: ${px(4)};
  font-size: ${px(16)};
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.55;

  &:hover {
    opacity: 1;
  }
`;

export const EndToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${px(12)};
  padding-bottom: ${px(10)};
  margin-bottom: ${px(8)};
  border-bottom: 1px solid ${lineColor};
`;

export const ToggleLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(11)};
  color: ${({ theme }) => theme.colors.text};
`;

export const Switch = styled.button<{ $on: boolean }>`
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  width: ${px(30)};
  height: ${px(16)};
  border-radius: 999px;
  border: 1px solid ${lineColor};
  transition: background 0.15s;
  background: ${({ theme, $on }) => ($on ? theme.colors.primary : 'transparent')};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: ${({ $on }) => ($on ? px(15) : px(2))};
    width: ${px(11)};
    height: ${px(11)};
    border-radius: 50%;
    transform: translateY(-50%);
    transition: left 0.15s;
    background: ${({ theme, $on }) =>
      $on ? theme.colors.background : withAlpha(theme.colors.primary, 0.5)};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, ${px(30)});
`;

export const DayName = styled.div<{ $isWeekend: boolean }>`
  height: ${px(20)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(10)};
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
  height: ${px(28)};
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(11)};
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
      border-radius: ${px(4)};
    `}

  ${({ $isToday, $isEdge, theme }) =>
    $isToday &&
    !$isEdge &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.colors.primary};
      border-radius: ${px(4)};
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
  font-size: ${px(10)};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textDim};
  margin-top: ${px(10)};
`;
