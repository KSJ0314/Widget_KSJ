import { useClock } from '../useClock';
import { useContainerSize } from '../../../hooks/useContainerSize';
import {
  ClockContainer,
  ClockInner,
  TimeRow,
  Digit,
  Separator,
  AmPmLabel,
  Divider,
  DateLabel,
} from './DigitalClock.styled';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const formatDate = (date: Date) =>
  `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

export const DigitalClock = () => {
  const { ref, width, height } = useContainerSize();
  const time = useClock();

  const fontSize = Math.max(Math.min(width / 6.8, height / 2.4), 12);

  return (
    <ClockContainer ref={ref}>
      <ClockInner>
        <TimeRow>
          <Digit $size={fontSize}>{time.hours}</Digit>
          <Separator $size={fontSize}>:</Separator>
          <Digit $size={fontSize}>{time.minutes}</Digit>
          <Separator $size={fontSize}>:</Separator>
          <Digit $size={fontSize}>{time.seconds}</Digit>
          <AmPmLabel $size={fontSize}>{time.ampm}</AmPmLabel>
        </TimeRow>
        <Divider $size={fontSize} />
        <DateLabel $size={fontSize}>{formatDate(time.date)}</DateLabel>
      </ClockInner>
    </ClockContainer>
  );
};
