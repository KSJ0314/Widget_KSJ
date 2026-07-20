import { MONTHS_SHORT } from '../../../../../utils/date';
import { ChevronIcon } from '../../../icons';
import { SettingsPopover } from './SettingsPopover';
import { Bar, Left, MonthLabel, NavGroup, NavBtn, TodayBtn } from './MonthNavigator.styled';

interface Props {
  fs: number;
  year: number;
  month: number;
  showWeekend: boolean;
  onChangeShowWeekend: (value: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export const MonthNavigator = ({
  fs, year, month, showWeekend, onChangeShowWeekend, onPrev, onNext, onToday,
}: Props) => (
  <Bar $fs={fs}>
    <Left $fs={fs}>
      <MonthLabel $fs={fs}>
        {year} {MONTHS_SHORT[month].toUpperCase()}
      </MonthLabel>
      <SettingsPopover
        fs={fs}
        showWeekend={showWeekend}
        onChangeShowWeekend={onChangeShowWeekend}
      />
    </Left>

    <NavGroup $fs={fs}>
      <NavBtn $fs={fs} onClick={onPrev} title="이전 달">
        <ChevronIcon dir="prev" />
      </NavBtn>
      <TodayBtn $fs={fs} onClick={onToday}>Today</TodayBtn>
      <NavBtn $fs={fs} onClick={onNext} title="다음 달">
        <ChevronIcon dir="next" />
      </NavBtn>
    </NavGroup>
  </Bar>
);
