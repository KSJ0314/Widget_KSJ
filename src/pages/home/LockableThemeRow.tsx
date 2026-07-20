import type { ReactNode } from 'react';
import { useCardRowWidth } from './useCardRowWidth';
import { ThemeRow, LockOverlay, LockText } from './Home.styled';

interface Props {
  locked: boolean;
  cardWidth: number;
  children: ReactNode;
}

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

/** 테마 카드 줄. 잠겨 있으면 카드 무리 위에만 반투명 막을 덮는다 */
export const LockableThemeRow = ({ locked, cardWidth, children }: Props) => {
  const { ref, width } = useCardRowWidth(cardWidth);

  return (
    <ThemeRow ref={ref}>
      {locked && (
        <LockOverlay $width={width}>
          <LockIcon />
          <LockText>로그인이 필요합니다</LockText>
        </LockOverlay>
      )}
      {children}
    </ThemeRow>
  );
};
