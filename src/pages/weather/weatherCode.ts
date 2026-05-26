// 기상청 SKY(하늘상태) + PTY(강수형태) 코드를 아이콘 타입과 설명 텍스트로 변환

import type { WeatherIconType } from './WeatherIcon';

/** SKY: 1=맑음 3=구름많음 4=흐림 */
/** PTY: 0=없음 1=비 2=비/눈 3=눈 4=소나기 */

export interface WeatherCondition {
  icon: WeatherIconType;
  label: string;
}

export function getCondition(sky: number, pty: number): WeatherCondition {
  // 강수형태가 있으면 강수 우선
  if (pty === 1) return { icon: 'rain',  label: '비' };
  if (pty === 2) return { icon: 'snow',  label: '비/눈' };
  if (pty === 3) return { icon: 'snow',  label: '눈' };
  if (pty === 4) return { icon: 'rain',  label: '소나기' };

  // 강수 없으면 하늘 상태 기준
  if (sky === 1) return { icon: 'sunny',        label: '맑음' };
  if (sky === 3) return { icon: 'partly_cloudy', label: '구름 많음' };
  if (sky === 4) return { icon: 'cloudy',        label: '흐림' };

  return { icon: 'cloudy', label: '알 수 없음' };
}
