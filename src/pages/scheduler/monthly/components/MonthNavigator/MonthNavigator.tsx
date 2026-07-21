import { MONTHS_SHORT } from '@/utils/date';
import { ChevronIcon } from '@scheduler/icons';
import { LocalBadge } from '@scheduler/components/LocalBadge';
import { MergeLocalButton } from '@scheduler/components/MergeLocalButton';
import { SettingsPopover } from './SettingsPopover';
import { Bar, Left, MonthLabel, NavGroup, NavBtn, TodayBtn } from './MonthNavigator.styled';

interface Props {
  fs: number;
  year: number;
  month: number;
  showWeekend: boolean;
  /** 고유키 없이 이 브라우저에만 저장되는 상태인지 */
  isLocal: boolean;
  /** 계정에 연결된 상태면 고유키. 로컬이면 null */
  widgetKey: string | null;
  onChangeShowWeekend: (value: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export const MonthNavigator = ({
  fs, year, month, showWeekend, isLocal, widgetKey,
  onChangeShowWeekend, onPrev, onNext, onToday,
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
      {isLocal
        ? <LocalBadge fs={fs} />
        : widgetKey && <MergeLocalButton fs={fs} widgetKey={widgetKey} />}
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
