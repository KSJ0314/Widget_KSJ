import { useEffect, useState } from 'react';
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
}

const formatRange = (start: string, end?: string) =>
  end && end !== start ? `${start} ~ ${end}` : start;

export const EventModal = ({ event, defaultDate, onSave, onDelete, onClose }: Props) => {
  const isEdit = event !== null;
  const [title, setTitle] = useState(event?.title ?? '');
  const [start, setStart] = useState(event?.start ?? defaultDate);
  const [end, setEnd] = useState(event?.end);
  const [time, setTime] = useState(event?.time);
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
