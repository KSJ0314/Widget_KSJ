import styled from 'styled-components';
import { lineColor } from '@/theme/colorUtils';

export const Row = styled.div<{ $fs: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $fs }) => $fs * 0.6}px;
  padding: ${({ $fs }) => $fs * 0.55}px 0;

  /* 행마다 아래에 선을 둬서 마지막 줄 밑에도 선이 남는다 */
  border-bottom: 1px solid ${lineColor};
`;

export const Check = styled.button<{ $size: number; $done: boolean; $canEdit: boolean }>`
  flex-shrink: 0;
  padding: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  cursor: ${({ $canEdit }) => ($canEdit ? 'pointer' : 'default')};
  background: ${({ theme, $done }) => ($done ? theme.colors.primary : 'transparent')};

  svg {
    width: 78%;
    height: 78%;
    display: block;
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const TitleInput = styled.input<{ $fs: number; $done: boolean }>`
  flex: 1;
  min-width: 0;
  border: none;
  background: none;
  padding: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs}px;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.text};
  opacity: ${({ $done }) => ($done ? 0.5 : 1)};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDim};
  }

  &:disabled {
    /* 읽기 전용일 때도 글자는 또렷해야 한다 */
    color: ${({ theme }) => theme.colors.text};
  }
`;
