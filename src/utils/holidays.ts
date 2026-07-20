import { LUNAR_HOLIDAYS } from './lunarHolidays';
import { EXTRA_HOLIDAYS } from './extraHolidays';

interface FixedHoliday {
  name: string;
  /** 이 해부터 공휴일. 없으면 제한 없음 */
  since?: number;
  /** 이 해까지 공휴일. 없으면 제한 없음 */
  until?: number;
}

/** 매년 같은 월·일인 공휴일. 'MM-DD'가 키다 */
const FIXED_HOLIDAYS: Record<string, FixedHoliday> = {
  '01-01': { name: '신정' },
  '03-01': { name: '삼일절' },
  '05-05': { name: '어린이날' },
  '06-06': { name: '현충일' },
  // 2008년에 공휴일에서 빠졌다가 2026년에 다시 지정됐다
  '07-17': { name: '제헌절', since: 2026 },
  '08-15': { name: '광복절' },
  '10-03': { name: '개천절' },
  '10-09': { name: '한글날' },
  '12-25': { name: '성탄절' },
};

/**
 * 공휴일 이름. 아니면 null.
 *
 * 우선순위는 손으로 적은 표 → 음력 → 고정 순이다.
 * 임시공휴일이나 대체공휴일이 생기면 extraHolidays.ts에 한 줄 추가하면 된다.
 */
export const getHolidayName = (dateKey: string): string | null => {
  const manual = EXTRA_HOLIDAYS[dateKey];
  if (manual) return manual;

  const lunar = LUNAR_HOLIDAYS[dateKey];
  if (lunar) return lunar;

  const fixed = FIXED_HOLIDAYS[dateKey.slice(5)];
  if (!fixed) return null;

  const year = Number(dateKey.slice(0, 4));
  if (fixed.since !== undefined && year < fixed.since) return null;
  if (fixed.until !== undefined && year > fixed.until) return null;
  return fixed.name;
};
