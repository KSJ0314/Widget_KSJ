import type { ComponentType } from 'react';
import type { ThemeName } from '@/theme/theme';
import { DigitalClock } from '../clock/digital';
import { AnalogClock } from '../clock/analog';
import { FlipClock } from '../clock/flip';
import { MonthlyCalendar } from '../calendar/monthly';
import { MonthlyScheduler } from '../scheduler/monthly';
import { DailyScheduler } from '../scheduler/daily';
import { WeatherCurrentPage } from '../weather/current';

export interface WidgetMeta {
  id: string;
  name: string;
  category: string;
  path: string;
  themes: ThemeName[];
  component: ComponentType;
  requiresLocation?: boolean;
  /** URL에 계정 고유키(&u=)를 붙여야 하는 위젯. 개인 데이터를 다루는 위젯만 해당한다 */
  requiresWidgetKey?: boolean;
  /** 로그인하지 않으면 쓸 수 없는 위젯. 홈에서 잠금 화면으로 가린다 */
  requiresLogin?: boolean;
  /** 미리보기를 가로가 아닌 세로 비율로 보여줄 위젯 */
  previewPortrait?: boolean;
  /** 글자가 없어 폰트를 고를 이유가 없는 위젯 */
  hideFont?: boolean;
  description?: string;
}

export const widgets: WidgetMeta[] = [
  {
    id: 'clock-digital',
    name: 'Digital Clock',
    category: 'Clock',
    path: '/clock/digital',
    themes: ['dark', 'pink', 'green', 'ivory'],
    component: DigitalClock,
  },
  {
    id: 'clock-analog',
    name: 'Analog Clock',
    category: 'Clock',
    path: '/clock/analog',
    themes: ['dark', 'pink', 'green', 'ivory'],
    component: AnalogClock,
    hideFont: true,
  },
  {
    id: 'clock-flip',
    name: 'Flip Clock',
    category: 'Clock',
    path: '/clock/flip',
    themes: [
      'dark', 'pink', 'green', 'ivory',
      'lightBlue', 'lightPink', 'lightGreen',
      'lightBlueWhite', 'lightPinkWhite', 'lightGreenWhite',
    ],
    component: FlipClock,
  },
  {
    id: 'calendar-monthly',
    name: 'Monthly Calendar',
    category: 'Calendar',
    path: '/calendar/monthly',
    themes: [
      'dark', 'pink', 'green', 'ivory', 'paper',
      'paperLightBlue', 'paperLightPink', 'paperLightGreen',
      'lightBlue', 'lightPink', 'lightGreen',
    ],
    component: MonthlyCalendar,
    previewPortrait: true,
  },
  {
    id: 'scheduler-monthly',
    name: 'Monthly Scheduler',
    category: 'Scheduler',
    path: '/scheduler/monthly',
    themes: [
      'dark', 'pink', 'green', 'ivory', 'paper',
      'paperLightBlue', 'paperLightPink', 'paperLightGreen',
      'lightBlue', 'lightPink', 'lightGreen',
    ],
    component: MonthlyScheduler,
    requiresWidgetKey: true,
    description:
      '로그인하면 일정을 관리할 수 있고, 복사되는 URL에 사용자의 고유키가 추가됩니다.\n' +
      '고유키가 있는 URL을 이용하시면 사용자의 일정이 나타납니다.\n' +
      '고유키는 로그인한 사용자만 확인할 수 있으나 URL에 노출되므로 URL이 유출되지 않도록 주의하세요!\n' +
      '로그인하지 않으면 일정 없는 달력만 표시됩니다.',
  },
  {
    id: 'scheduler-daily',
    name: 'Daily Scheduler',
    category: 'Scheduler',
    path: '/scheduler/daily',
    themes: [
      'dark', 'pink', 'green', 'ivory', 'paper',
      'paperLightBlue', 'paperLightPink', 'paperLightGreen',
      'lightBlue', 'lightPink', 'lightGreen',
    ],
    component: DailyScheduler,
    requiresWidgetKey: true,
    requiresLogin: true,
    previewPortrait: true,
    description:
      '오늘 날짜의 일정만 목록으로 보여줍니다.\n' +
      '월간 스케줄러와 같은 데이터를 쓰므로 체크 상태가 서로 연동됩니다.',
  },
  {
    id: 'weather-current',
    name: 'Weather',
    category: 'Weather',
    path: '/weather/current',
    themes: ['dark', 'pink', 'green', 'ivory', 'lightBlue', 'lightPink', 'lightGreen'],
    component: WeatherCurrentPage,
    requiresLocation: true,
    description: 'URL 복사 시 현재 위치가 자동으로 포함됩니다. 복사된 URL을 임베드하면 해당 지역 날씨로 고정됩니다.',
  },
];
