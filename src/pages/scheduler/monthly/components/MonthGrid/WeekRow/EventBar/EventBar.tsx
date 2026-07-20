import { CheckIcon } from '../../../../../icons';
import type { SchedulerLayout } from '../../../../hooks/useSchedulerLayout';
import type { WeekSegment } from '../../../../utils/weekLayout';
import { Bar, Check, Title, Time } from './EventBar.styled';

interface Props {
  segment: WeekSegment;
  /** 그 주에 보이는 칸 수. 막대의 가로 위치를 % 로 계산하는 데 쓴다 */
  cols: number;
  layout: SchedulerLayout;
  canEdit: boolean;
  onToggle: (id: string) => void;
  onOpen: (segment: WeekSegment) => void;
}

export const EventBar = ({ segment, cols, layout, canEdit, onToggle, onOpen }: Props) => {
  const { event, startIdx, span, lane, isStart } = segment;
  const { dateFs, barH, barGap, barInset } = layout;

  // 펼쳤을 때 최소 두 칸은 확보한다. 오른쪽 끝이면 왼쪽으로 당겨 칸을 넘지 않게 한다
  const hoverSpan = Math.min(Math.max(span, 2), cols);
  const hoverStart = Math.max(Math.min(startIdx, cols - hoverSpan), 0);

  return (
    <Bar
      $left={(startIdx / cols) * 100}
      $width={(span / cols) * 100}
      $hoverLeft={(hoverStart / cols) * 100}
      $hoverWidth={(hoverSpan / cols) * 100}
      $top={lane * (barH + barGap)}
      $height={barH}
      $inset={barInset}
      $fs={dateFs}
      $done={event.done}
      $canEdit={canEdit}
      $hasTime={Boolean(event.time)}
      onClick={() => canEdit && onOpen(segment)}
    >
      {isStart && (
        <Check
          $size={dateFs * 0.9}
          $fs={dateFs}
          $done={event.done}
          onClick={e => {
            e.stopPropagation();
            onToggle(event.id);
          }}
        >
          {event.done && <CheckIcon />}
        </Check>
      )}
      <Title $fs={dateFs} $done={event.done}>{event.title}</Title>
      {event.time && <Time $fs={dateFs}>{event.time}</Time>}
    </Bar>
  );
};
