import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { selectableColors } from '@/theme/eventColors';
import type { ScheduleEvent } from '../../types';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
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
} from './EventModal.styled';

interface Props {
  /** 수정 모드면 대상 일정, 추가 모드면 null */
  event: ScheduleEvent | null;
  /** 추가 모드에서 + 를 누른 칸의 날짜 */
  defaultDate: string;
  /** 저장에 성공했는지. 실패하면 모달을 닫지 않고 오류를 보여준다 */
  onSave: (event: ScheduleEvent) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onClose: () => void;
  /** 색 견본에 마우스를 올린 동안 달력에 미리 보여준다. null이면 미리보기 해제 */
  onPreviewColor: (preview: { color?: string } | null) => void;
}

const formatRange = (start: string, end?: string) =>
  end && end !== start ? `${start} ~ ${end}` : start;

export const EventModal = ({
  event, defaultDate, onSave, onDelete, onClose, onPreviewColor,
}: Props) => {
  const theme = useTheme();
  const isEdit = event !== null;
  const [title, setTitle] = useState(event?.title ?? '');
  const [start, setStart] = useState(event?.start ?? defaultDate);
  const [end, setEnd] = useState(event?.end);
  const [time, setTime] = useState(event?.time);
  const [color, setColor] = useState(event?.color);
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
    onPreviewColor({ color: next });
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

        <Field as="div">
          <FieldLabel>색상</FieldLabel>
          {/* 마우스를 빼면 고른 색으로 돌아간다. 저장이나 취소 전까지 미리보기가 유지된다 */}
          <SwatchRow onMouseLeave={() => onPreviewColor({ color })}>
            {/* 맨 앞은 색 미지정. 위젯 테마의 포인트 색을 그대로 따른다 */}
            <Swatch
              type="button"
              $color={theme.colors.primary}
              $selected={color === undefined}
              onMouseEnter={() => onPreviewColor({ color: undefined })}
              onClick={() => pickColor(undefined)}
            />
            {selectableColors(theme.colors.primary).map(c => (
              <Swatch
                key={c}
                type="button"
                $color={c}
                $selected={color === c}
                onMouseEnter={() => onPreviewColor({ color: c })}
                onClick={() => pickColor(c)}
              />
            ))}
          </SwatchRow>
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
