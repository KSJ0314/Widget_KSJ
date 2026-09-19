import { LockOverlay, LockText } from './Home.styled';

interface Props {
  locked: boolean;
}

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

/** 잠겨 있으면 미리보기 위에 반투명 막을 덮는다. 미리보기 틀 안에 둔다 */
export const LockableThemeRow = ({ locked }: Props) => {
  if (!locked) return null;

  return (
    <LockOverlay>
      <LockIcon />
      <LockText>로그인이 필요합니다</LockText>
    </LockOverlay>
  );
};
