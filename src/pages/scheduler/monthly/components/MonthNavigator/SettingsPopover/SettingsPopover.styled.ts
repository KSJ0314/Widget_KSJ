import styled from 'styled-components';
import { withAlpha, lineColor } from '../../../../utils/styleUtils';

/** 톱니바퀴와 팝오버의 위치 기준 */
export const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const GearBtn = styled.button<{ $fs: number; $on: boolean }>`
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

export const Head = styled.div<{ $fs: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ $fs }) => $fs}px;
  padding-bottom: ${({ $fs }) => $fs * 0.4}px;
  border-bottom: 1px solid ${lineColor};
`;

export const Title = styled.span<{ $fs: number }>`
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

/** 설정 한 줄. 항목이 늘어나면 이걸 반복해서 쓴다 */
export const Row = styled.div<{ $fs: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ $fs }) => $fs}px;
`;

export const Label = styled.span<{ $fs: number }>`
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
