import styled, { keyframes, css } from 'styled-components';

const flipDown = keyframes`
  0%   { transform: rotateX(0deg); }
  100% { transform: rotateX(-90deg); }
`;

const unfold = keyframes`
  0%   { transform: rotateX(90deg); }
  100% { transform: rotateX(0deg); }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`;

export const CardsRow = styled.div<{ $size: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $size }) => Math.round($size * 0.1)}px;
`;

export const CardWrap = styled.div<{ $size: number }>`
  position: relative;
`;

export const DayLabel = styled.div<{ $size: number }>`
  position: absolute;
  top: ${({ $size }) => Math.round($size * 0.1)}px;
  left: ${({ $size }) => Math.round($size * 0.1)}px;
  font-family: ${({ theme }) => theme.fonts.digit ?? "'DM Serif Display', 'Georgia', serif"};
  font-size: ${({ $size }) => Math.round($size * 0.13)}px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.16em;
  opacity: 0.6;
  z-index: 10;
  pointer-events: none;
`;

export const CardOuter = styled.div<{ $size: number }>`
  position: relative;
  width: ${({ $size }) => Math.round($size * 1.3)}px;
  height: ${({ $size }) => Math.round($size * 1.55)}px;
  perspective: ${({ $size }) => $size * 6}px;
  border-radius: ${({ $size }) => Math.round($size * 0.07)}px;
  overflow: visible;
`;

const halfBase = css<{ $size: number }>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 2px 12px ${({ theme }) => theme.colors.primaryGlow};
`;

// 위/아래 반쪽이 맞닿는 선에서 테두리가 겹쳐 두꺼워지지 않도록 방향을 나눠 그린다
const topBorder = css<{ $size: number }>`
  ${({ theme, $size }) => theme.colors.cardBorder && css`
    border: ${Math.max(Math.round($size * 0.02), 1)}px solid ${theme.colors.cardBorder};
    border-bottom: none;
  `}
`;

const bottomBorder = css<{ $size: number }>`
  ${({ theme, $size }) => theme.colors.cardBorder && css`
    border: ${Math.max(Math.round($size * 0.02), 1)}px solid ${theme.colors.cardBorder};
    border-top: none;
  `}
`;

export const CardTop = styled.div<{ $size: number }>`
  ${halfBase}
  top: 0;
  border-radius: ${({ $size }) => Math.round($size * 0.07)}px ${({ $size }) => Math.round($size * 0.07)}px 0 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 1;
  ${topBorder}
`;

export const CardBottom = styled.div<{ $size: number }>`
  ${halfBase}
  bottom: 0;
  border-radius: 0 0 ${({ $size }) => Math.round($size * 0.07)}px ${({ $size }) => Math.round($size * 0.07)}px;
  z-index: 1;
  ${bottomBorder}
`;

export const FlipTop = styled.div<{ $size: number }>`
  ${halfBase}
  top: 0;
  border-radius: ${({ $size }) => Math.round($size * 0.07)}px ${({ $size }) => Math.round($size * 0.07)}px 0 0;
  ${topBorder}
  transform-origin: bottom center;
  z-index: 3;
  animation: ${flipDown} 0.3s ease-in forwards;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primaryGlow};
  backface-visibility: hidden;
`;

export const FlipBottom = styled.div<{ $size: number }>`
  ${halfBase}
  bottom: 0;
  border-radius: 0 0 ${({ $size }) => Math.round($size * 0.07)}px ${({ $size }) => Math.round($size * 0.07)}px;
  ${bottomBorder}
  transform-origin: top center;
  z-index: 2;
  animation: ${unfold} 0.3s ease-out 0.3s forwards;
  transform: rotateX(90deg);
  backface-visibility: hidden;
`;

export const Digit = styled.div<{ $size: number; $half: 'top' | 'bottom' }>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 200%;
  ${({ $half }) => ($half === 'top' ? 'top: 0;' : 'bottom: 0;')}
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.digit ?? "'DM Serif Display', 'Georgia', serif"};
  font-size: ${({ $size }) => Math.round($size * 0.82)}px;
  font-weight: 400;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.03em;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  user-select: none;
`;


export const Colon = styled.div<{ $size: number }>`
  font-family: ${({ theme }) => theme.fonts.digit ?? "'DM Serif Display', 'Georgia', serif"};
  font-size: ${({ $size }) => Math.round($size * 0.55)}px;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.45;
  padding: 0 ${({ $size }) => Math.round($size * 0.12)}px;
  margin-bottom: ${({ $size }) => Math.round($size * 0.04)}px;
  line-height: 1;
  letter-spacing: -0.1em;
`;
