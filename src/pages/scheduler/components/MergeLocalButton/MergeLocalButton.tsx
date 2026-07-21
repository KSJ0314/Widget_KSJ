import { useState } from 'react';
import { countLocalEvents, migrateLocalEvents } from '@scheduler/storage/migrateLocal';
import { Button, Overlay, Box, Text, ErrorText, Actions, Action } from './MergeLocalButton.styled';

interface Props {
  fs: number;
  /** 이 위젯이 쓰는 계정 고유키 */
  widgetKey: string;
}

/**
 * 로그인 전에 이 자리에 쌓아둔 일정을 계정으로 옮긴다.
 *
 * 저장소는 노션 임베드와 웹 페이지가 서로 나뉘어 있어, 홈의 버튼만으로는
 * 임베드 안에 남은 일정을 볼 수 없다. 그래서 위젯 자신이 같은 자리에서 처리한다.
 */
export const MergeLocalButton = ({ fs, widgetKey }: Props) => {
  const [count, setCount] = useState(countLocalEvents);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (count === 0) return null;

  const run = async () => {
    setBusy(true);
    setError('');
    try {
      await migrateLocalEvents(widgetKey);
      setCount(0);
      setConfirming(false);
    } catch (err) {
      console.warn('[scheduler] 일정 합치기 실패', err);
      setError('옮기지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Button
        $fs={fs}
        onClick={() => setConfirming(true)}
        data-tooltip={`브라우저에 저장된 일정 ${count}건이 있습니다`}
      >
        + {count}
      </Button>

      {confirming && (
        <Overlay onClick={() => !busy && setConfirming(false)}>
          <Box onClick={e => e.stopPropagation()}>
            <Text>
              로그인 전에 저장해 둔 일정 {count}건을 계정으로 옮깁니다.
              <br />
              기존 일정은 지워지지 않고 함께 남습니다.
            </Text>
            {error && <ErrorText>{error}</ErrorText>}
            <Actions>
              <Action onClick={() => setConfirming(false)} disabled={busy}>취소</Action>
              <Action $primary onClick={run} disabled={busy}>
                {busy ? '옮기는 중' : '옮기기'}
              </Action>
            </Actions>
          </Box>
        </Overlay>
      )}
    </>
  );
};
