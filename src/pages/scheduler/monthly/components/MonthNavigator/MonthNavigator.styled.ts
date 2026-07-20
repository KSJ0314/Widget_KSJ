import styled from 'styled-components';
import { lineColor } from '../../../utils/styleUtils';

export const Bar = styled.div<{ $fs: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ $fs }) => $fs * 0.4}px;
  padding-bottom: ${({ $fs }) => $fs * 0.5}px;
  margin-bottom: ${({ $fs }) => $fs * 0.4}px;
  border-bottom: 1px solid ${lineColor};
`;

export const Left = styled.div<{ $fs: number }>`
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

/** 월 이름 길이가 바뀌어도 버튼이 밀리지 않게 오른쪽 끝에 붙여 둔다 */
export const NavGroup = styled.div<{ $fs: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $fs }) => $fs * 0.35}px;
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
