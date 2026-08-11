import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { EVENT_COLORS } from '@/theme/eventColors';
import { DEFAULT_EVENT_ALPHA } from '@/theme/colorUtils';
import type { RecentColor, ScheduleEvent } from '@scheduler/types';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import { ColorSliders } from './ColorSliders';
import {
  Overlay,
  Box,
  Head,
  Title,
  CloseBtn,
  Field,
  FieldLabel,
  TextInput,
  PickerButton,
  Actions,
  Spacer,
  Button,
  ErrorText,
  SwatchRow,
  Swatch,
  RecentRow,
} from './EventModal.styled';

interface Props {
  /** 수정 모드면 대상 일정, 추가 모드면 null */
  event: ScheduleEvent | null;
  /** 추가 모드에서 + 를 누른 칸의 날짜 */
  defaultDate: string;
  /** 최근에 쓴 색. 최근 것부터 앞에 온다 */
  recentColors: RecentColor[];
  /** 저장에 성공했는지. 실패하면 모달을 닫지 않고 오류를 보여준다 */
  onSave: (event: ScheduleEvent) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onClose: () => void;
  /** 색을 고르는 동안 달력에 미리 보여준다. null이면 미리보기 해제 */
  onPreviewColor: (preview: { color?: string; alpha?: number } | null) => void;
}

const formatRange = (start: string, end?: string) =>
  end && end !== start ? `${start} ~ ${end}` : start;

export const EventModal = ({
  event, defaultDate, recentColors, onSave, onDelete, onClose, onPreviewColor,
}: Props) => {
  const theme = useTheme();
  const isEdit = event !== null;
  const [title, setTitle] = useState(event?.title ?? '');
  const [start, setStart] = useState(event?.start ?? defaultDate);
  const [end, setEnd] = useState(event?.end);
  const [time, setTime] = useState(event?.time);
  const [color, setColor] = useState(event?.color);
  const [alpha, setAlpha] = useState(event?.colorAlpha ?? DEFAULT_EVENT_ALPHA);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const pickColor = (next?: string) => {
    setColor(next);
    onPreviewColor({ color: next, alpha });
  };

  /** 슬라이더는 항상 구체적인 색을 만든다. 움직이는 동안 바로 보여준다 */
  const pickCustom = (nextColor: string, nextAlpha: number) => {
    setColor(nextColor);
    setAlpha(nextAlpha);
    onPreviewColor({ color: nextColor, alpha: nextAlpha });
  };

  const run = async (action: () => Promise<boolean>) => {
    setBusy(true);
    setError('');
    const ok = await action();
    setBusy(false);
    if (!ok) setError('저장에 실패했습니다. 다시 시도해 주세요.');
  };

  const save = () => {
    const trimmed = title.trim();
    if (!trimmed || busy) return;

    run(() =>
      onSave({
        id: event?.id ?? crypto.randomUUID(),
        start,
        end,
        time,
        color,
        colorAlpha: alpha === DEFAULT_EVENT_ALPHA ? undefined : alpha,
        title: trimmed,
        done: event?.done ?? false,
      }),
    );
  };

  return (
    <Overlay onClick={onClose}>
      <Box onClick={e => e.stopPropagation()}>
        <Head>
          <Title>{isEdit ? '일정 수정' : '일정 추가'}</Title>
          <CloseBtn onClick={onClose} title="닫기">×</CloseBtn>
        </Head>

        <Field>
          <FieldLabel>제목</FieldLabel>
          <TextInput
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="일정 제목"
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter') save();
            }}
          />
        </Field>

        {/* 날짜·시간 피커는 8-2b, 8-2c에서 붙인다 */}
        <Field as="div">
          <FieldLabel>날짜</FieldLabel>
          <PickerButton type="button" onClick={() => setDatePickerOpen(true)}>
            {formatRange(start, end)}
          </PickerButton>
        </Field>

        <Field as="div">
          <FieldLabel>시간</FieldLabel>
          <PickerButton type="button" onClick={() => setTimePickerOpen(true)}>
            {time ?? '없음'}
          </PickerButton>
        </Field>

        {recentColors.length > 0 && (
          <Field as="div">
            <FieldLabel>최근 사용 색상</FieldLabel>
            {/* 농도까지 같이 남겨 둬서 그때 쓰던 그대로 되살아난다 */}
            <RecentRow onMouseLeave={() => onPreviewColor({ color, alpha })}>
              {recentColors.map(c => (
                <Swatch
                  key={c.color}
                  type="button"
                  $color={c.color}
                  $alpha={c.alpha}
                  $selected={color === c.color && alpha === c.alpha}
                  data-tooltip={c.color.toUpperCase()}
                  onMouseEnter={() => onPreviewColor({ color: c.color, alpha: c.alpha })}
                  onClick={() => pickCustom(c.color, c.alpha)}
                />
              ))}
            </RecentRow>
          </Field>
        )}

        <Field as="div">
          <FieldLabel>색상</FieldLabel>
          {/* 마우스를 빼면 고른 색으로 돌아간다. 저장이나 취소 전까지 미리보기가 유지된다 */}
          <SwatchRow onMouseLeave={() => onPreviewColor({ color, alpha })}>
            {/* 맨 앞은 색 미지정. 막대는 테마 배경색(흰/검정)으로 그려진다 */}
            <Swatch
              type="button"
              $color={theme.colors.background}
              $alpha={alpha}
              $selected={color === undefined}
              $outlined
              data-tooltip="기본"
              onMouseEnter={() => onPreviewColor({ color: undefined, alpha })}
              onClick={() => pickColor(undefined)}
            />
            {EVENT_COLORS.map(c => (
              <Swatch
                key={c}
                type="button"
                $color={c}
                $alpha={alpha}
                $selected={color === c}
                data-tooltip={c.toUpperCase()}
                onMouseEnter={() => onPreviewColor({ color: c, alpha })}
                onClick={() => pickColor(c)}
              />
            ))}
          </SwatchRow>

          <ColorSliders
            color={color ?? theme.colors.primary}
            alpha={alpha}
            onChange={pickCustom}
          />
        </Field>

        {error && <ErrorText>{error}</ErrorText>}

        <Actions>
          {isEdit && (
            <Button
              $variant="danger"
              disabled={busy}
              onClick={() => run(() => onDelete(event.id))}
            >
              삭제
            </Button>
          )}
          <Spacer />
          <Button onClick={onClose} disabled={busy}>취소</Button>
          <Button $variant="primary" onClick={save} disabled={!title.trim() || busy}>
            저장
          </Button>
        </Actions>
      </Box>

      {datePickerOpen && (
        <DatePicker
          start={start}
          end={end}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
          onClose={() => setDatePickerOpen(false)}
        />
      )}

      {timePickerOpen && (
        <TimePicker
          value={time}
          onChange={setTime}
          onClose={() => setTimePickerOpen(false)}
        />
      )}
    </Overlay>
  );
};
