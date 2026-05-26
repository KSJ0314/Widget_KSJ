import { useClock } from '../useClock';
import { useContainerSize } from '../../../hooks/useContainerSize';
import {
  ClockContainer,
  ClockInner,
  TimeRow,
  DigitGroup,
  DigitSlot,
  Separator,
  AmPmLabel,
  Divider,
  DateLabel,
} from './DigitalClock.styled';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const formatDate = (date: Date) =>
  `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

export const DigitalClock = () => {
  const { ref, width, height } = useContainerSize();
  const time = useClock();

  const fontSize = Math.max(Math.min(width / 7.5, height / 1.8), 12);

  const renderGroup = (digits: string) => (
    <DigitGroup $size={fontSize}>
      <DigitSlot $size={fontSize}>{digits[0]}</DigitSlot>
      <DigitSlot $size={fontSize}>{digits[1]}</DigitSlot>
    </DigitGroup>
  );

  return (
    <ClockContainer ref={ref}>
      <ClockInner>
        <TimeRow>
          {renderGroup(time.hours)}
          <Separator $size={fontSize}>:</Separator>
          {renderGroup(time.minutes)}
          <Separator $size={fontSize}>:</Separator>
          {renderGroup(time.seconds)}
          <AmPmLabel $size={fontSize}>{time.ampm}</AmPmLabel>
        </TimeRow>
        <Divider $size={fontSize} />
        <DateLabel $size={fontSize}>{formatDate(time.date)}</DateLabel>
      </ClockInner>
    </ClockContainer>
  );
};
