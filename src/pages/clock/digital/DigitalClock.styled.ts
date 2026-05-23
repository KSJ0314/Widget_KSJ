import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0.08; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.75; }
`;

const DIGIT_FONT = "'Orbitron', sans-serif";

export const ClockContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      ${({ theme }) => theme.colors.scanline} 2px,
      ${({ theme }) => theme.colors.scanline} 4px
    );
    pointer-events: none;
    z-index: 1;
  }
`;

export const ClockInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

export const TimeRow = styled.div`
  display: flex;
  align-items: baseline;
  line-height: 1;
`;

export const DigitGroup = styled.span<{ $size: number }>`
  display: inline-flex;
  gap: ${({ $size }) => Math.round($size * 0.06)}px;
`;

export const DigitSlot = styled.span<{ $size: number }>`
  font-family: ${DIGIT_FONT};
  font-size: ${({ $size }) => $size}px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow:
    0 0 ${({ $size }) => Math.round($size * 0.03)}px ${({ theme }) => theme.colors.primary},
    0 0 ${({ $size }) => Math.round($size * 0.07)}px ${({ theme }) => theme.colors.primaryGlow},
    0 0 ${({ $size }) => Math.round($size * 0.14)}px ${({ theme }) => theme.colors.primaryGlow};
  display: inline-block;
  width: 1ch;
  text-align: center;
  overflow: visible;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const Separator = styled.span<{ $size: number }>`
  font-family: ${DIGIT_FONT};
  font-size: ${({ $size }) => $size}px;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 0 ${({ $size }) => Math.round($size * 0.04)}px ${({ theme }) => theme.colors.primary};
  padding: 0 ${({ $size }) => Math.round($size * 0.14)}px;
  animation: ${blink} 1s step-start infinite;
  line-height: 1;
`;

export const AmPmLabel = styled.span<{ $size: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $size }) => Math.round($size * 0.26)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  text-shadow: 0 0 ${({ $size }) => Math.round($size * 0.05)}px ${({ theme }) => theme.colors.secondary};
  margin-left: ${({ $size }) => Math.round($size * 0.14)}px;
  align-self: flex-end;
  padding-bottom: ${({ $size }) => Math.round($size * 0.05)}px;
  letter-spacing: 0.06em;
`;

export const Divider = styled.div<{ $size: number }>`
  width: ${({ $size }) => Math.round($size * 3.6)}px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.border},
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.border},
    transparent
  );
  margin: ${({ $size }) => Math.round($size * 0.12)}px 0 ${({ $size }) => Math.round($size * 0.1)}px;
  opacity: 0.6;
`;

export const DateLabel = styled.div<{ $size: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $size }) => Math.round($size * 0.17)}px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDim};
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;
