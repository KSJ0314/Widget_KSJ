import styled from 'styled-components';
import { withAlpha, lineColor } from '../../../utils/styleUtils';

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
  gap: 16px;
  margin-bottom: 10px;
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Preview = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Columns = styled.div`
  display: flex;
  gap: 8px;
`;

export const Column = styled.div`
  width: 56px;
  height: 150px;
  overflow-y: auto;
  border: 1px solid ${lineColor};
  border-radius: 4px;

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
  font-size: 10px;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textDim};
  margin-bottom: 4px;
`;

export const Option = styled.button<{ $selected: boolean }>`
  width: 100%;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 12px;
  padding: 6px 0;
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
  gap: 6px;
  margin-top: 12px;
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const Button = styled.button<{ $variant?: 'primary' }>`
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  letter-spacing: 0.06em;
  padding: 6px 11px;
  border-radius: 4px;
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
