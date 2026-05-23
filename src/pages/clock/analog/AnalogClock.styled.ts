import styled from 'styled-components';

export const ClockContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`;

export const ClockSvg = styled.svg`
  overflow: visible;
  filter: drop-shadow(0 0 16px ${({ theme }) => theme.colors.primaryGlow});
`;

export const Face = styled.circle`
  fill: ${({ theme }) => theme.colors.surface};
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-width: 0.4;
  opacity: 0.95;
`;

export const HourTick = styled.line`
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-width: 1.5;
  stroke-linecap: round;
  opacity: 0.9;
`;

export const MinuteTick = styled.line`
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-width: 0.5;
  stroke-linecap: round;
  opacity: 0.3;
`;

export const HourHand = styled.line`
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-width: 2.8;
  stroke-linecap: round;
  filter: drop-shadow(0 0 2px ${({ theme }) => theme.colors.primary});
`;

export const MinuteHand = styled.line`
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-width: 1.6;
  stroke-linecap: round;
  filter: drop-shadow(0 0 2px ${({ theme }) => theme.colors.primary});
`;

export const SecondHand = styled.line`
  stroke: ${({ theme }) => theme.colors.secondary};
  stroke-width: 0.8;
  stroke-linecap: round;
  filter: drop-shadow(0 0 3px ${({ theme }) => theme.colors.secondary});
`;

export const CenterDot = styled.circle`
  fill: ${({ theme }) => theme.colors.secondary};
  filter: drop-shadow(0 0 4px ${({ theme }) => theme.colors.secondary});
`;

export const CenterHole = styled.circle`
  fill: ${({ theme }) => theme.colors.background};
`;
