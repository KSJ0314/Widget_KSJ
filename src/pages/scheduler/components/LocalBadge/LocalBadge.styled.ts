import styled from 'styled-components';
import { lineColor, withAlpha } from '@/theme/colorUtils';
import { tooltipCss } from '@/theme/tooltip';

/** 위젯 글자 크기에 맞춰 따라간다 */
export const Badge = styled.span<{ $fs: number }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  height: ${({ $fs }) => $fs}px;
  padding: 0 ${({ $fs }) => $fs * 0.3}px;
  border: 1px solid ${lineColor};
  border-radius: 999px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $fs }) => $fs * 0.5}px;
  letter-spacing: 0.08em;
  line-height: 1;
  /* opacity를 쓰면 툴팁까지 함께 투명해진다 */
  color: ${({ theme }) => withAlpha(theme.colors.primary, 0.75)};
  cursor: default;

  ${tooltipCss}
`;
