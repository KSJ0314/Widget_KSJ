import { css } from 'styled-components';
import { lineColor } from './colorUtils';

/**
 * data-tooltip 속성이 있는 요소에 hover하면 그 값을 말풍선으로 띄운다.
 * 브라우저 기본 title은 모양을 손댈 수 없어 대신 쓴다.
 *
 * 글자 크기는 위젯 배율과 무관하게 고정한다. 작은 임베드에서도 읽혀야 한다.
 */
export const tooltipCss = css`
  position: relative;

  &[data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    padding: 6px 11px;
    border-radius: 5px;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.3;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${lineColor};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.12s;
  }

  &[data-tooltip]:hover::after {
    opacity: 1;
  }
`;
