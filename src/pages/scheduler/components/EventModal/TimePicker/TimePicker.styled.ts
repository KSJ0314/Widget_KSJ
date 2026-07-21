import styled from 'styled-components';
import { withAlpha, lineColor } from '@scheduler/utils/styleUtils';

/** 모달과 같은 배율을 쓴다 */
const S = 1.3;
const px = (n: number) => `${n * S}px`;

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
  gap: ${px(16)};
  margin-bottom: ${px(10)};
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(12)};
  font-weight: 700;
  letter-spacing: 0.03em;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Preview = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(12)};
  color: ${({ theme }) => theme.colors.text};
`;

export const Columns = styled.div`
  display: flex;
  gap: ${px(8)};
`;

export const Column = styled.div`
  width: ${px(56)};
  height: ${px(150)};
  overflow-y: auto;
  border: 1px solid ${lineColor};
  border-radius: ${px(4)};

  scrollbar-width: thin;
  scrollbar-color: ${lineColor} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${lineColor};
    border-radius: 999px;
  }
`;

export const ColumnLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(10)};
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textDim};
  margin-bottom: ${px(4)};
`;

export const Option = styled.button<{ $selected: boolean }>`
  width: 100%;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(12)};
  padding: ${px(6)} 0;
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.background : theme.colors.text};
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : withAlpha(theme.colors.primary, 0.2)};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(6)};
  margin-top: ${px(12)};
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const Button = styled.button<{ $variant?: 'primary' }>`
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(11)};
  letter-spacing: 0.06em;
  padding: ${px(6)} ${px(11)};
  border-radius: ${px(4)};
  transition: opacity 0.15s;

  ${({ theme, $variant }) =>
    $variant === 'primary'
      ? `
        border: 1px solid ${theme.colors.primary};
        background: ${theme.colors.primary};
        color: ${theme.colors.background};
      `
      : `
        border: 1px solid ${lineColor({ theme })};
        background: none;
        color: ${theme.colors.textDim};
      `}

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: default;
    opacity: 0.35;
  }
`;
