import { useEffect, useRef, useState } from 'react';
import { CARD_GAP } from './Home.styled';

/**
 * 카드가 실제로 차지하는 가로 폭을 잰다.
 * 행은 항상 화면 전체 폭이지만 카드는 220px 단위로만 채워지므로,
 * 잠금 화면을 행 전체에 씌우면 문구가 카드 무리보다 오른쪽으로 밀려 보인다.
 */
export const useCardRowWidth = (cardWidth: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const available = el.clientWidth;
      const perRow = Math.max(Math.floor((available + CARD_GAP) / (cardWidth + CARD_GAP)), 1);
      setWidth(Math.min(perRow * (cardWidth + CARD_GAP) - CARD_GAP, available));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [cardWidth]);

  return { ref, width };
};
