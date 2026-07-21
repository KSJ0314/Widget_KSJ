import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { countLocalEvents, migrateLocalEvents } from '@scheduler/storage/migrateLocal';
import {
  MigrateBtn,
  ModalOverlay,
  ModalBox,
  ModalText,
  ModalActions,
  ModalButton,
} from './Home.styled';

/**
 * 로그인하기 전에 이 브라우저에 쌓아둔 일정을 계정으로 옮긴다.
 * 홈에는 위젯 미리보기가 여러 개 떠 있어 스토어를 거치지 않고 저장소를 직접 쓴다.
 */
export const LocalMigrateButton = () => {
  const { widgetKey } = useAuthStore();
  const [count, setCount] = useState(countLocalEvents);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // 로그인하지 않았거나 옮길 게 없으면 보일 이유가 없다
  if (!widgetKey || count === 0) return null;

  const run = async () => {
    setBusy(true);
    setError('');
    try {
      await migrateLocalEvents(widgetKey);
      setCount(0);
      setConfirming(false);
    } catch (err) {
      console.warn('[scheduler] 일정 이전 실패', err);
      setError('옮기지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <MigrateBtn onClick={() => setConfirming(true)}>
        이 브라우저의 일정 {count}건 옮기기
      </MigrateBtn>

      {confirming && (
        <ModalOverlay onClick={() => !busy && setConfirming(false)}>
          <ModalBox onClick={e => e.stopPropagation()}>
            <ModalText>
              이 브라우저에만 저장된 일정 {count}건을 계정으로 옮깁니다.
              <br />
              기존 일정은 지워지지 않고 함께 남습니다.
            </ModalText>
            {error && <ModalText>{error}</ModalText>}
            <ModalActions>
              <ModalButton onClick={() => setConfirming(false)} disabled={busy}>
                취소
              </ModalButton>
              <ModalButton $primary onClick={run} disabled={busy}>
                {busy ? '옮기는 중' : '옮기기'}
              </ModalButton>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
};
