import { useEffect, useRef, useState } from 'react';
import { CheckIcon } from '@scheduler/icons';
import { Row, Check, TitleInput } from './EventRow.styled';

/** 타이핑이 멈춘 뒤 저장하기까지 기다리는 시간 */
const TYPING_PAUSE_MS = 600;

interface Props {
  title: string;
  done: boolean;
  fs: number;
  canEdit: boolean;
  /** 아직 저장된 적 없는 행. 제목이 채워져야 저장된다 */
  isDraft: boolean;
  autoFocus?: boolean;
  onCommit: (title: string) => void;
  onDelete: () => void;
  onToggle: () => void;
}

export const EventRow = ({
  title, done, fs, canEdit, isDraft, autoFocus, onCommit, onDelete, onToggle,
}: Props) => {
  const [value, setValue] = useState(title);
  /** 사용자가 고친 적이 있어야 저장한다. 처음 렌더에서 저장이 나가지 않게 막는다 */
  const dirty = useRef(false);

  // 타이핑이 멈추면 저장한다. 치는 동안에는 타이머가 계속 밀린다
  useEffect(() => {
    if (!dirty.current) return;

    const trimmed = value.trim();
    // 빈 제목인 새 행은 아직 저장하지 않는다
    if (isDraft && !trimmed) return;

    const timer = setTimeout(() => onCommit(trimmed), TYPING_PAUSE_MS);
    return () => clearTimeout(timer);
  }, [value, isDraft, onCommit]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 제목이 빈 상태에서 한 번 더 누르면 행을 지운다
    if (e.key === 'Backspace' && value === '') {
      e.preventDefault();
      onDelete();
    }
  };

  return (
    <Row $fs={fs}>
      <Check
        $size={fs * 0.95}
        $done={done}
        $canEdit={canEdit}
        onClick={() => canEdit && onToggle()}
        disabled={!canEdit}
      >
        {done && <CheckIcon />}
      </Check>
      <TitleInput
        $fs={fs}
        $done={done}
        value={value}
        placeholder={canEdit ? '할 일을 입력하세요' : ''}
        disabled={!canEdit}
        autoFocus={autoFocus}
        onChange={e => {
          dirty.current = true;
          setValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
    </Row>
  );
};
