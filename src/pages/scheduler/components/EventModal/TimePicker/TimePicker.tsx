import { useEffect, useState } from 'react';
import {
  Overlay,
  Box,
  Head,
  Title,
  Preview,
  Columns,
  Column,
  ColumnLabel,
  Option,
  Actions,
  Spacer,
  Button,
} from './TimePicker.styled';

interface Props {
  /** 'HH:mm'. 시간이 없으면 undefined */
  value?: string;
  onChange: (time?: string) => void;
  onClose: () => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

const pad = (n: number) => `${n}`.padStart(2, '0');

export const TimePicker = ({ value, onChange, onClose }: Props) => {
  const parsed = value?.split(':').map(Number);
  const [hour, setHour] = useState<number | null>(parsed ? parsed[0] : null);
  const [minute, setMinute] = useState(parsed ? parsed[1] : 0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const confirm = () => {
    if (hour === null) return;
    onChange(`${pad(hour)}:${pad(minute)}`);
    onClose();
  };

  const clear = () => {
    onChange(undefined);
    onClose();
  };

  return (
    <Overlay
      // 모달 안에 겹쳐 뜨므로, 전파를 막지 않으면 상세창까지 함께 닫힌다
      onClick={e => {
        e.stopPropagation();
        onClose();
      }}
    >
      <Box onClick={e => e.stopPropagation()}>
        <Head>
          <Title>시간</Title>
          <Preview>{hour === null ? '없음' : `${pad(hour)}:${pad(minute)}`}</Preview>
        </Head>

        <Columns>
          <div>
            <ColumnLabel>시</ColumnLabel>
            <Column>
              {HOURS.map(h => (
                <Option key={h} $selected={h === hour} onClick={() => setHour(h)}>
                  {pad(h)}
                </Option>
              ))}
            </Column>
          </div>
          <div>
            <ColumnLabel>분</ColumnLabel>
            <Column>
              {MINUTES.map(m => (
                <Option key={m} $selected={m === minute} onClick={() => setMinute(m)}>
                  {pad(m)}
                </Option>
              ))}
            </Column>
          </div>
        </Columns>

        <Actions>
          <Button onClick={clear}>지우기</Button>
          <Spacer />
          <Button onClick={onClose}>취소</Button>
          <Button $variant="primary" onClick={confirm} disabled={hour === null}>확인</Button>
        </Actions>
      </Box>
    </Overlay>
  );
};
