import { useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import type { FirebaseOptions } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import { themes } from './theme/theme';
import type { ThemeName } from './theme/theme';
import type { CityName } from './data/cityMap';
import { WeatherCurrent } from './pages/weather/current/WeatherCurrent';
import { DigitalClock } from './pages/clock/digital';
import { AnalogClock } from './pages/clock/analog';
import { FlipClock } from './pages/clock/flip';
import { MonthlyCalendar } from './pages/calendar/monthly';

interface BaseProps {
  /**
   * 위젯 너비. 숫자는 px, 문자열은 CSS 값으로 적용됩니다.
   * @example 600, '100%', '50vw'
   * @default '100%'
   */
  width?: number | string;
  /**
   * 위젯 높이. 숫자는 px, 문자열은 CSS 값으로 적용됩니다.
   * @example 338, '100%'
   * @default '100%'
   */
  height?: number | string;
}

interface ClockProps extends BaseProps {
  widget: 'clock/digital' | 'clock/analog' | 'clock/flip';
  /** 지원 테마: dark, pink, green, ivory */
  theme?: 'dark' | 'pink' | 'green' | 'ivory';
}

interface CalendarProps extends BaseProps {
  widget: 'calendar/monthly';
  /** 지원 테마: dark, pink, green, ivory, paper */
  theme?: 'dark' | 'pink' | 'green' | 'ivory' | 'paper';
}

interface WeatherProps extends BaseProps {
  widget: 'weather';
  /** 지원 테마: dark, pink, green, ivory, lightBlue, lightPink, lightGreen */
  theme?: 'dark' | 'pink' | 'green' | 'ivory' | 'lightBlue' | 'lightPink' | 'lightGreen';
  /**
   * 도시명 (영어). 없으면 브라우저 Geolocation으로 자동 감지합니다.
   * @example 'Seoul', 'Busan', 'Naju'
   */
  city?: CityName;
  /**
   * 기상청 공공데이터포털 API 키.
   * 발급: https://www.data.go.kr → 기상청_단기예보 조회서비스
   */
  weatherApiKey: string;
  /**
   * Firebase 프로젝트 설정. 제공 시 Firestore를 캐시로 활용해 API 호출을 줄입니다.
   * 미제공 시 매번 기상청 API를 직접 호출합니다.
   * @example { apiKey: '...', projectId: '...', ... }
   */
  firebase?: FirebaseOptions;
}

export type WidgetKSJProps = ClockProps | CalendarProps | WeatherProps;
export type WidgetType = WidgetKSJProps['widget'];
export type { CityName };

const NAMED_APP = 'widget-ksj';

export const WidgetKSJ = (props: WidgetKSJProps) => {
  const { width = '100%', height = '100%' } = props;
  const theme = (props.theme ?? 'dark') as ThemeName;
  const dbRef = useRef<Firestore | null>(null);

  if (props.widget === 'weather' && props.firebase && !dbRef.current) {
    const existing = getApps().find(a => a.name === NAMED_APP);
    const app = existing ?? initializeApp(props.firebase, NAMED_APP);
    dbRef.current = getFirestore(app);
  }

  return (
    <ThemeProvider theme={themes[theme]}>
      <div style={{ width, height }}>
        {props.widget === 'weather' && (
          <WeatherCurrent city={props.city} apiKey={props.weatherApiKey} db={dbRef.current} />
        )}
        {props.widget === 'clock/digital' && <DigitalClock />}
        {props.widget === 'clock/analog' && <AnalogClock />}
        {props.widget === 'clock/flip' && <FlipClock />}
        {props.widget === 'calendar/monthly' && <MonthlyCalendar />}
      </div>
    </ThemeProvider>
  );
};
