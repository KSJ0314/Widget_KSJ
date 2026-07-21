import { useRef } from 'react';
import { CheckIcon } from '@scheduler/icons';
import { DEFAULT_EVENT_ALPHA } from '@/theme/colorUtils';
import type { SchedulerLayout } from '@scheduler/monthly/hooks/useSchedulerLayout';
import type { WeekSegment } from '@scheduler/monthly/utils/weekLayout';
import type { ColorPreview, ScheduleEvent } from '@scheduler/types';
import { Bar, Check, Title, Time } from './EventBar.styled';

interface Props {
  segment: WeekSegment;
  /** 그 주에 보이는 칸 수. 막대의 가로 위치를 % 로 계산하는 데 쓴다 */
  cols: number;
  layout: SchedulerLayout;
  canEdit: boolean;
  colorPreview: ColorPreview | null;
  /** 끌고 있는 일정이면 흐리게 그린다 */
  dragging: boolean;
  onToggle: (id: string) => void;
  onOpen: (segment: WeekSegment) => void;
  onDragStart: (event: ScheduleEvent, x: number, y: number) => void;
  onDragMove: (x: number, y: number) => void;
  onDragEnd: () => void;
  onDragCancel: () => void;
}

/** 이만큼 움직여야 드래그로 본다. 그 전에는 클릭으로 처리한다 */
const DRAG_THRESHOLD = 4;

export const EventBar = ({
  segment, cols, layout, canEdit, colorPreview, dragging,
  onToggle, onOpen, onDragStart, onDragMove, onDragEnd, onDragCancel,
}: Props) => {
  const { event, startIdx, span, lane, isStart } = segment;
  const { dateFs, barH, barGap, barInset } = layout;

  /** 눌린 지점. 문턱을 넘기 전까지는 드래그로 보지 않는다 */
  const origin = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canEdit) return;
    origin.current = { x: e.clientX, y: e.clientY };
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const from = origin.current;
    if (!from) return;

    if (!moved.current) {
      const dist = Math.hypot(e.clientX - from.x, e.clientY - from.y);
      if (dist < DRAG_THRESHOLD) return;
      moved.current = true;
      onDragStart(event, e.clientX, e.clientY);
    }
    onDragMove(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    // 체크박스에서 시작한 포인터처럼 여기서 누르지 않은 건 무시한다
    const started = origin.current !== null;
    origin.current = null;
    if (!started) return;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    // 움직이지 않았으면 그냥 클릭이다
    if (!moved.current) {
      onOpen(segment);
      return;
    }
    moved.current = false;
    onDragEnd();
  };

  /** 브라우저가 포인터를 거둬가면 옮기지 않고 정리만 한다 */
  const handlePointerCancel = () => {
    origin.current = null;
    moved.current = false;
    onDragCancel();
  };

  // 미리보기 중인 일정이면 저장된 색 대신 고르는 중인 색으로 그린다
  const preview = colorPreview?.id === event.id ? colorPreview : null;
  const color = preview ? preview.color : event.color;
  const alpha = (preview ? preview.alpha : event.colorAlpha) ?? DEFAULT_EVENT_ALPHA;

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
      $color={color}
      $alpha={alpha}
      $dragging={dragging}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      {isStart && (
        <Check
          $size={dateFs * 0.9}
          $fs={dateFs}
          $done={event.done}
          $dragging={dragging}
          $color={color}
          // 체크박스에서는 드래그가 시작되지 않아야 한다
          onPointerDown={e => e.stopPropagation()}
          onPointerUp={e => e.stopPropagation()}
          onClick={() => onToggle(event.id)}
        >
          {event.done && <CheckIcon />}
        </Check>
      )}
      <Title $fs={dateFs} $dragging={dragging}>{event.title}</Title>
      {event.time && <Time $fs={dateFs} $dragging={dragging}>{event.time}</Time>}
    </Bar>
  );
};
