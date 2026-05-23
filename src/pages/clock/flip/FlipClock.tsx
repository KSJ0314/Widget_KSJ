import { useState, useEffect, useRef } from 'react';
import { useContainerSize } from '../../../hooks/useContainerSize';
import {
  Wrapper,
  CardsRow,
  CardWrap,
  CardOuter,
  CardTop,
  CardBottom,
  FlipTop,
  FlipBottom,
  DayLabel,
  Digit,
} from './FlipClock.styled';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const pad = (n: number) => String(n).padStart(2, '0');

const useFlipClock = () => {
  const now = new Date();
  const [time, setTime] = useState({ h: now.getHours(), m: now.getMinutes(), day: now.getDay() });
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setTime({ h: d.getHours(), m: d.getMinutes(), day: d.getDay() });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

interface FlipCardProps {
  value: string;
  size: number;
  dayLabel?: string;
}

const FlipCard = ({ value, size, dayLabel }: FlipCardProps) => {
  const prevRef = useRef(value);
  const [flipping, setFlipping] = useState(false);
  const [displayCurrent, setDisplayCurrent] = useState(value);
  const [displayPrev, setDisplayPrev] = useState(value);

  useEffect(() => {
    if (value !== prevRef.current) {
      setDisplayPrev(prevRef.current);
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplayCurrent(value);
        setFlipping(false);
        prevRef.current = value;
      }, 620);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <CardWrap $size={size}>
      <CardOuter $size={size}>
        {dayLabel && <DayLabel $size={size}>{dayLabel}</DayLabel>}
        <CardTop $size={size}>
          <Digit $size={size} $half="top">{displayCurrent}</Digit>
        </CardTop>
        <CardBottom $size={size}>
          <Digit $size={size} $half="bottom">{displayCurrent}</Digit>
        </CardBottom>
        {flipping && (
          <>
            <FlipTop $size={size}>
              <Digit $size={size} $half="top">{displayPrev}</Digit>
            </FlipTop>
            <FlipBottom $size={size}>
              <Digit $size={size} $half="bottom">{displayCurrent}</Digit>
            </FlipBottom>
          </>
        )}
      </CardOuter>
    </CardWrap>
  );
};

export const FlipClock = () => {
  const { ref, width, height } = useContainerSize();
  const { h, m, day } = useFlipClock();
  const size = Math.max(Math.min(width * 0.28, height * 0.72), 48);

  return (
    <Wrapper ref={ref}>
      <CardsRow $size={size}>
        <FlipCard value={pad(h)} size={size} dayLabel={DAYS[day]} />
        <FlipCard value={pad(m)} size={size} />
      </CardsRow>
    </Wrapper>
  );
};
