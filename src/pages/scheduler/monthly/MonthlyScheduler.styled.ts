import styled from 'styled-components';
import { lineColor } from '@scheduler/utils/styleUtils';
import { tintOver, withAlpha } from '@/theme/colorUtils';

/** 스크롤 거터 두께. Inner의 오른쪽 padding 보정에도 같은 값을 쓴다 */
const SCROLLBAR_WIDTH = 11;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  /*
   * scroll로 두면 넘치지 않아도 스크롤바가 항상 그려져 위아래 버튼이 보인다.
   * auto로 넘칠 때만 그리고, 자리 확보는 gutter에 맡긴다.
   */
  overflow-y: auto;
  scrollbar-gutter: stable;
  background: ${({ theme }) => theme.colors.background};

  scrollbar-width: thin;
  scrollbar-color: ${lineColor} transparent;

  &::-webkit-scrollbar {
    width: ${SCROLLBAR_WIDTH}px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${lineColor};
    border-radius: 999px;
  }
`;

/**
 * 끌고 있는 일정을 커서 옆에 따라다니게 보여준다.
 * 여러 날 일정도 한 칸 크기로만 그린다.
 */
export const DragGhost = styled.div<{
  $x: number;
  $y: number;
  $width: number;
  $height: number;
  $fs: number;
  $color?: string;
  $alpha: number;
}>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 40;
  pointer-events: none;
  transform: translate(${({ $x }) => $x + 10}px, ${({ $y }) => $y}px) translateY(-50%);
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 ${({ $fs }) => $fs * 0.55}px;
  border-radius: ${({ $fs }) => $fs * 0.3}px;
  background: ${({ theme, $color, $alpha }) =>
    tintOver($color ?? theme.colors.primary, theme.colors.background, $alpha)};
  box-shadow:
    inset 0 0 0 1px ${({ theme, $color }) => withAlpha($color ?? theme.colors.primary, 0.55)},
    0 3px 10px rgba(0, 0, 0, 0.2);

  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs}px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Inner = styled.div<{ $pad: number }>`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: ${({ $pad }) => $pad}px;
  /* 오른쪽은 스크롤 거터가 이미 자리를 먹으므로 그만큼 뺀다 */
  padding-right: ${({ $pad }) => Math.max($pad - SCROLLBAR_WIDTH, 0)}px;
  background: ${({ theme }) => theme.colors.background};
`;
