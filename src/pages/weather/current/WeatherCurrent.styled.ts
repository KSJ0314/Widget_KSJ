import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
`;

export const Card = styled.div<{ $u: number; $w: number; $h: number }>`
  width: ${({ $w }) => $w}px;
  height: ${({ $h }) => $h}px;
  display: flex;
  flex-direction: column;
  padding: ${({ $u }) => $u}px ${({ $u }) => $u * 0.8}px;
  gap: ${({ $u }) => $u * 0.6}px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ $u }) => $u * 0.8}px;
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.accentGlow};
`;

/* 현재 날씨 영역 — 3열 그리드 (좌: 날짜+지역 / 중: 아이콘 / 우: 온도+통계) */
export const CurrentGrid = styled.div<{ $u: number }>`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${({ $u }) => $u * 0.5}px;
`;

/* 좌측: 날짜, 지역명 */
export const LeftCol = styled.div<{ $u: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $u }) => $u * 0.6}px;
`;

export const DateText = styled.span<{ $u: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $u }) => $u * 1.3}px;
  color: ${({ theme }) => theme.colors.textDim};
  letter-spacing: 0.06em;
`;

export const CityText = styled.span<{ $u: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $u }) => $u * 0.9}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.04em;
`;

/* 중앙: 아이콘 */
export const CenterCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


/* 우측: 온도 + 통계 */
export const RightCol = styled.div<{ $u: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $u }) => $u * 0.8}px;
`;

export const Temperature = styled.span<{ $u: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $u }) => $u * 2.2}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
  letter-spacing: -0.02em;
  text-shadow: 0 0 ${({ $u }) => $u * 1.2}px ${({ theme }) => theme.colors.accentGlow};
`;

/* 습도/풍속/강수를 한 줄로 나열 */
export const StatsLine = styled.div<{ $u: number; $mini: boolean }>`
  display: ${({ $mini }) => ($mini ? 'none' : 'flex')};
  align-items: center;
  gap: ${({ $u }) => $u * 0.8}px;
  font-family: ${({ theme }) => theme.fonts.display};
`;

/* 각 통계 항목: 숫자(위) + 한글 레이블(아래) */
export const StatItem = styled.div<{ $u: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $u }) => $u * 0.1}px;
`;

export const StatLabel = styled.span<{ $u: number }>`
  font-size: ${({ $u }) => $u * 0.65}px;
  color: ${({ theme }) => theme.colors.textDim};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const StatValue = styled.span<{ $u: number }>`
  font-size: ${({ $u }) => $u * 0.75}px;
  color: ${({ theme }) => theme.colors.textDim};
  font-weight: 600;
`;

/* 시간별 예보 스크롤 */
export const ForecastScroll = styled.div<{ $u: number }>`
  flex: 1;
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ $u }) => $u * 0.4}px ${({ $u }) => $u * 2}px 0;
  gap: ${({ $u }) => $u * 4}px;
  scrollbar-width: none;
  cursor: grab;
  user-select: none;
  &::-webkit-scrollbar { display: none; }
`;

export const ForecastItem = styled.div<{ $u: number; $itemW: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $u }) => $u * 0.2}px;
  flex: 0 0 ${({ $itemW }) => $itemW}px;
  padding: ${({ $u }) => $u * 0.4}px 0;
  border-radius: ${({ $u }) => $u * 0.4}px;
  font-family: ${({ theme }) => theme.fonts.display};
`;

export const ForecastTime = styled.span<{ $u: number; $mini: boolean }>`
  font-size: ${({ $u }) => $u * 0.6}px;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ $mini }) => ($mini ? 700 : 400)};
  letter-spacing: 0.04em;
  white-space: nowrap;
`;


export const ForecastTemp = styled.span<{ $u: number; $mini: boolean }>`
  font-size: ${({ $u, $mini }) => ($mini ? $u * 0.9 : $u * 0.72)}px;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  text-align: center;
`;

export const ForecastPop = styled.span<{ $u: number; $mini: boolean }>`
  display: ${({ $mini }) => ($mini ? 'none' : 'block')};
  font-size: ${({ $u }) => $u * 0.4}px;
  color: ${({ theme }) => theme.colors.textDim};
  text-align: center;
`;

export const ForecastIconWrap = styled.div<{ $u: number }>`
  margin: ${({ $u }) => $u * 0.8}px 0;
`;


/* 로딩 / 에러 */
export const StatusText = styled.div<{ $u: number }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $u }) => $u * 1.1}px;
  color: ${({ theme }) => theme.colors.textDim};
  text-align: center;
  letter-spacing: 0.08em;
`;
