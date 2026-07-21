import styled, { css } from 'styled-components';
import { withAlpha } from '../../../../../utils/styleUtils';
import { eventBg } from '@/theme/colorUtils';

export const Bar = styled.div<{
  $left: number;
  $width: number;
  $hoverLeft: number;
  $hoverWidth: number;
  $top: number;
  $height: number;
  $inset: number;
  $fs: number;
  $done: boolean;
  $canEdit: boolean;
  $hasTime: boolean;
  /** 일정에 지정된 색. 없으면 테마 포인트 색 */
  $color?: string;
}>`
  position: absolute;
  /* 층 자체는 클릭을 통과시킨다. 막대는 읽기 전용일 때도 hover로 제목을 펼쳐야 해서 받는다 */
  pointer-events: auto;
  cursor: ${({ $canEdit }) => ($canEdit ? 'pointer' : 'default')};
  left: calc(${({ $left }) => $left}% + ${({ $inset }) => $inset}px);
  width: calc(${({ $width }) => $width}% - ${({ $inset }) => $inset * 2}px);
  top: ${({ $top }) => $top}px;
  height: ${({ $height }) => $height}px;
  display: flex;
  align-items: center;
  gap: ${({ $fs }) => $fs * 0.35}px;
  padding: ${({ $fs }) => $fs * 0.3}px ${({ $fs }) => $fs * 0.55}px;
  box-sizing: border-box;
  border-radius: ${({ $fs }) => $fs * 0.3}px;
  background: ${({ theme, $color }) => eventBg($color ?? theme.colors.primary)};
  opacity: ${({ $done }) => ($done ? 0.55 : 1)};

  /* 잘린 제목을 읽으려고 펼친다. 가로는 최소 두 칸, 세로는 내용만큼 */
  &:hover {
    z-index: 5;
    left: calc(${({ $hoverLeft }) => $hoverLeft}% + ${({ $inset }) => $inset}px);
    width: calc(${({ $hoverWidth }) => $hoverWidth}% - ${({ $inset }) => $inset * 2}px);
    height: auto;
    min-height: ${({ $height }) => $height}px;
    opacity: 1;
    /* 아래 칸이 비쳐 보이지 않도록 불투명하게 덮는다 */
    background: ${({ theme }) => theme.colors.background};
    box-shadow:
      inset 0 0 0 1px ${({ theme, $color }) => withAlpha($color ?? theme.colors.primary, 0.45)},
      0 3px 10px rgba(0, 0, 0, 0.18);
    ${({ $hasTime, $fs }) =>
      $hasTime &&
      css`
        padding-bottom: ${$fs * 1.5}px;
      `}
  }
`;

export const Check = styled.span<{
  $size: number;
  $done: boolean;
  $fs: number;
  $color?: string;
}>`
  flex-shrink: 0;
  /* 펼쳐져 여러 줄이 되면 가운데가 아니라 첫 줄 옆에 붙어야 한다 */
  ${Bar}:hover & {
    align-self: flex-start;
    margin-top: ${({ $fs, $size }) => ($fs * 1.4 - $size) / 2}px;
  }

  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid ${({ theme, $color }) => $color ?? theme.colors.primary};
  background: ${({ theme, $done, $color }) =>
    $done ? $color ?? theme.colors.primary : 'transparent'};

  svg {
    width: 78%;
    height: 78%;
    display: block;
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const Title = styled.span<{ $fs: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs}px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 펼쳐졌을 때만 여러 줄로 흘린다 */
  ${Bar}:hover & {
    white-space: normal;
    overflow: visible;
    overflow-wrap: anywhere;
    line-height: 1.4;
  }
`;

/** 펼친 상태에서만 우측 하단에 나타난다 */
export const Time = styled.span<{ $fs: number }>`
  display: none;
  position: absolute;
  right: ${({ $fs }) => $fs * 0.55}px;
  bottom: ${({ $fs }) => $fs * 0.4}px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs * 0.9}px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};

  ${Bar}:hover & {
    display: block;
  }
`;
