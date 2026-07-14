import styled, { keyframes, css, type DefaultTheme } from 'styled-components';

// 어두운 테마는 카드 배경이 어두워 테마색 그림자가 글로우처럼 보인다. 검정으로 쓴다
const outerShadowColor = (theme: DefaultTheme) =>
  theme.isDark
    ? 'rgba(0, 0, 0, 0.35)'
    : `color-mix(in srgb, ${theme.colors.primaryGlow} 15%, transparent)`;

// level(0~1)은 음영의 세기. 접합부에서 1이 된다
const shadeAt = (theme: DefaultTheme, level: number) =>
  theme.isDark
    ? `rgba(0, 0, 0, ${level * 0.1})`
    : `color-mix(in srgb, ${theme.colors.primaryGlow} ${level * 10}%, transparent)`;

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
  box-shadow: 0 1px 4px ${({ theme }) => outerShadowColor(theme)};
`;

const halfBase = css<{ $size: number }>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
`;

// 위쪽 반쪽은 접합부로 갈수록 짙어지는 음영을 얹는다 (윗변은 투명)
// 색은 테마의 primaryGlow를 color-mix로 희석해 쓴다
const topShade = css`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => `linear-gradient(
      to bottom,
      transparent 62%,
      ${shadeAt(theme, 0.3)} 85%,
      ${shadeAt(theme, 1)} 100%
    )`};
    pointer-events: none;
  }
`;

// 위/아래 반쪽이 맞닿는 선에서 테두리가 겹쳐 두꺼워지지 않도록 방향을 나눠 그린다.
// 접합선은 아래쪽 반쪽이 그리지 않으므로 위쪽만 얇게 그린다
const topBorder = css<{ $size: number }>`
  ${({ theme, $size }) => theme.colors.cardBorder && css`
    border: ${Math.max(Math.round($size * 0.02), 1)}px solid ${theme.colors.cardBorder};
    border-bottom: 1px solid ${theme.colors.border};
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
  ${topShade}
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
  ${topShade}
  transform-origin: bottom center;
  z-index: 3;
  animation: ${flipDown} 0.3s ease-in forwards;
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
