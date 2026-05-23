import { useContainerSize } from '../../../hooks/useContainerSize';
import { useAnalogTime } from './useAnalogTime';
import {
  ClockContainer,
  ClockSvg,
  Face,
  HourTick,
  MinuteTick,
  HourHand,
  MinuteHand,
  SecondHand,
  CenterDot,
  CenterHole,
} from './AnalogClock.styled';

const HOUR_INDICES = Array.from({ length: 12 }, (_, i) => i);
const MINUTE_INDICES = Array.from({ length: 60 }, (_, i) => i).filter(i => i % 5 !== 0);

const polar = (angleDeg: number, r: number) => ({
  x: 50 + r * Math.sin((angleDeg * Math.PI) / 180),
  y: 50 - r * Math.cos((angleDeg * Math.PI) / 180),
});

const hand = (angleDeg: number, length: number, tail: number) => {
  const tip = polar(angleDeg, length);
  const base = polar(angleDeg + 180, tail);
  return { x1: base.x, y1: base.y, x2: tip.x, y2: tip.y };
};

export const AnalogClock = () => {
  const { ref, width, height } = useContainerSize();
  const { hourAngle, minuteAngle, secondAngle } = useAnalogTime();

  const size = Math.min(width, height) * 0.82;

  return (
    <ClockContainer ref={ref}>
      <ClockSvg viewBox="0 0 100 100" width={size} height={size}>
        <Face cx="50" cy="50" r="48" />

        {HOUR_INDICES.map(i => {
          const a = i * 30;
          const outer = polar(a, 44);
          const inner = polar(a, 37);
          return <HourTick key={i} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y} />;
        })}

        {MINUTE_INDICES.map(i => {
          const a = i * 6;
          const outer = polar(a, 44);
          const inner = polar(a, 41.5);
          return <MinuteTick key={i} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y} />;
        })}

        <HourHand {...hand(hourAngle, 28, 6)} />
        <MinuteHand {...hand(minuteAngle, 37, 7)} />
        <SecondHand {...hand(secondAngle, 41, 9)} />

        <CenterDot cx="50" cy="50" r="2.2" />
        <CenterHole cx="50" cy="50" r="0.9" />
      </ClockSvg>
    </ClockContainer>
  );
};
