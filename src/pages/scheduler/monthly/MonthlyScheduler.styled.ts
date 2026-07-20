import styled from 'styled-components';
import { lineColor } from '../utils/styleUtils';

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
