import type { ComponentType } from 'react';
import type { ThemeName } from '../../theme/theme';
import { DigitalClock } from '../clock/digital';
import { AnalogClock } from '../clock/analog';
import { FlipClock } from '../clock/flip';
import { MonthlyCalendar } from '../calendar/monthly';

export interface WidgetMeta {
  id: string;
  name: string;
  category: string;
  path: string;
  themes: ThemeName[];
  component: ComponentType;
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
  },
  {
    id: 'clock-flip',
    name: 'Flip Clock',
    category: 'Clock',
    path: '/clock/flip',
    themes: ['dark', 'pink', 'green', 'ivory'],
    component: FlipClock,
  },
  {
    id: 'calendar-monthly',
    name: 'Monthly Calendar',
    category: 'Calendar',
    path: '/calendar/monthly',
    themes: ['dark', 'pink', 'green', 'ivory', 'paper'],
    component: MonthlyCalendar,
  },
];
