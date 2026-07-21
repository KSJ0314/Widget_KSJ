import styled from 'styled-components';
import { lineColor, withAlpha } from '@/theme/colorUtils';
import { tooltipCss } from '@/theme/tooltip';

/** LOCAL 배지와 같은 자리에 놓이므로 크기를 맞춘다 */
export const Button = styled.button<{ $fs: number }>`
  flex-shrink: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  height: ${({ $fs }) => $fs}px;
  padding: 0 ${({ $fs }) => $fs * 0.35}px;
  border: 1px solid ${lineColor};
  /* 배지와 구분되도록 알약 모양보다는 각지게 */
  border-radius: ${({ $fs }) => $fs * 0.3}px;
  background: none;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs * 0.5}px;
  letter-spacing: 0.06em;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => withAlpha(theme.colors.primary, 0.12)};
  }

  ${tooltipCss}
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 70;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: rgba(0, 0, 0, 0.4);
`;

export const Box = styled.div`
  width: 100%;
  max-width: 340px;
  box-sizing: border-box;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
`;

export const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

export const ErrorText = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 12px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 12px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const Action = styled.button<{ $primary?: boolean }>`
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 13px;
  letter-spacing: 0.04em;
  padding: 10px 18px;
  border-radius: 5px;
  transition: opacity 0.15s;

  ${({ theme, $primary }) =>
    $primary
      ? `
        border: 1px solid ${theme.colors.primary};
        background: ${theme.colors.primary};
        color: ${theme.colors.background};
      `
      : `
        border: 1px solid ${withAlpha(theme.colors.primary, 0.4)};
        background: none;
        color: ${theme.colors.textDim};
      `}

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
`;
