import { useClock } from '@clock/useClock';
import { useContainerSize } from '@/hooks/useContainerSize';
import { DAYS_SHORT, MONTHS_SHORT } from '@/utils/date';
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

const formatDate = (date: Date) =>
  `${DAYS_SHORT[date.getDay()]}, ${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

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
