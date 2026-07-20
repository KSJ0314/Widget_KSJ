import styled from 'styled-components';
import { withAlpha, lineColor } from '@/theme/colorUtils';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable;
  /*
   * 흰 배경 대신 테마 포인트 색을 옅게 깐다.
   * 틴트만 두면 뒤가 비쳐 홈 미리보기에서 색이 섞이므로 불투명 바탕을 함께 깐다.
   */
  background-color: ${({ theme }) => theme.colors.background};
  background-image: ${({ theme }) => {
    const tint = withAlpha(theme.colors.primary, 0.07);
    return `linear-gradient(${tint}, ${tint})`;
  }};

  scrollbar-width: thin;
  scrollbar-color: ${lineColor} transparent;

  &::-webkit-scrollbar {
    width: 11px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${lineColor};
    border-radius: 999px;
  }
`;

export const Inner = styled.div<{ $pad: number }>`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: ${({ $pad }) => $pad}px;
  padding-right: ${({ $pad }) => Math.max($pad - 11, 0)}px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmptyText = styled.p<{ $fs: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs * 0.9}px;
  color: ${({ theme }) => theme.colors.textDim};
  padding: ${({ $fs }) => $fs * 0.55}px 0;
`;

export const Footer = styled.div<{ $pad: number }>`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ $pad }) => $pad}px;
`;

export const NewBtn = styled.button<{ $fs: number }>`
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ $fs }) => $fs * 0.3}px;
  padding: ${({ $fs }) => $fs * 0.3}px ${({ $fs }) => $fs * 0.6}px;
  border: 1px solid ${lineColor};
  border-radius: ${({ $fs }) => $fs * 0.35}px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs * 0.85}px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.6;
  transition: opacity 0.15s;

  svg {
    width: ${({ $fs }) => $fs * 0.85}px;
    height: ${({ $fs }) => $fs * 0.85}px;
    display: block;
  }

  &:hover {
    opacity: 1;
  }
`;
