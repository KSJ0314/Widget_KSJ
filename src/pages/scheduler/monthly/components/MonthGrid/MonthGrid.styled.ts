import styled from 'styled-components';
import { lineColor } from '@scheduler/utils/styleUtils';
import { weekendColor } from '@/theme/weekendColors';

/**
 * 일정 막대가 여러 칸을 가로질러야 해서 주 단위 행으로 나눈다.
 * 바깥에서 위·왼쪽 선을, 각 칸에서 오른쪽·아래 선을 그어 선이 겹치지 않게 한다.
 */
export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${lineColor};
  border-left: 1px solid ${lineColor};
`;

export const DayNameRow = styled.div<{ $cols: number; $height: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  height: ${({ $height }) => $height}px;
`;

export const DayName = styled.div<{ $fs: number; $col: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${lineColor};
  border-bottom: 1px solid ${lineColor};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs}px;
  letter-spacing: 0.06em;
  color: ${({ theme, $col }) => weekendColor($col) ?? theme.colors.textDim};
`;
