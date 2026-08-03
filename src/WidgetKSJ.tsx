import { useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import type { FirebaseOptions } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import { themes } from '@/theme/theme';
import { withFont } from '@/theme/fonts';
import type { FontName } from '@/theme/fonts';
import type { ThemeName } from '@/theme/theme';
import type { CityName } from '@/data/cityMap';
import { WeatherCurrent } from '@weather/current/WeatherCurrent';
import { DigitalClock } from '@clock/digital';
import { AnalogClock } from '@clock/analog';
import { FlipClock } from '@clock/flip';
import { MonthlyCalendar } from '@calendar/monthly';

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
  /**
   * 폰트 프리셋. 지정하지 않으면 테마가 정의한 폰트를 씁니다.
   * @example 'griun'
   */
  font?: FontName;
}

type LightTheme = 'lightBlue' | 'lightPink' | 'lightGreen';
type LightWhiteTheme = 'lightBlueWhite' | 'lightPinkWhite' | 'lightGreenWhite';

interface ClockProps extends BaseProps {
  widget: 'clock/digital' | 'clock/analog';
  /** 지원 테마: dark, pink, green, ivory */
  theme?: 'dark' | 'pink' | 'green' | 'ivory';
}

interface FlipClockProps extends BaseProps {
  widget: 'clock/flip';
  /** 지원 테마: dark, pink, green, ivory, light*(3종), light*White(3종) */
  theme?: 'dark' | 'pink' | 'green' | 'ivory' | LightTheme | LightWhiteTheme;
}

type PaperLightTheme = 'paperLightBlue' | 'paperLightPink' | 'paperLightGreen';

interface CalendarProps extends BaseProps {
  widget: 'calendar/monthly';
  /** 지원 테마: dark, pink, green, ivory, paper, paperLight*(3종), light*(3종) */
  theme?: 'dark' | 'pink' | 'green' | 'ivory' | 'paper' | PaperLightTheme | LightTheme;
}

interface WeatherProps extends BaseProps {
  widget: 'weather';
  /** 지원 테마: dark, pink, green, ivory, light*(3종) */
  theme?: 'dark' | 'pink' | 'green' | 'ivory' | LightTheme;
  /**
   * 도시명 (영어). 없으면 브라우저 Geolocation으로 자동 감지합니다.
   * @example 'Seoul', 'Busan', 'Naju'
   */
  city?: CityName;
  /**
   * 기상청 공공데이터포털 API 키.
   *
   * @deprecated 사용하지 않습니다. 기상청 API는 Cloudflare Worker 프록시를 경유하며
   * 인증키는 Worker 쪽에 보관합니다. 하위 호환을 위해 남겨둔 속성입니다.
   */
  weatherApiKey?: string;
  /**
   * Firebase 프로젝트 설정. 제공 시 Firestore를 캐시로 활용해 API 호출을 줄입니다.
   * 미제공 시 매번 기상청 API를 직접 호출합니다.
   * @example { apiKey: '...', projectId: '...', ... }
   */
  firebase?: FirebaseOptions;
}

export type WidgetKSJProps = ClockProps | FlipClockProps | CalendarProps | WeatherProps;
export type WidgetType = WidgetKSJProps['widget'];
export type { CityName };

const NAMED_APP = 'widget-ksj';

export const WidgetKSJ = (props: WidgetKSJProps) => {
  const { width = '100%', height = '100%' } = props;
  const theme = withFont(themes[(props.theme ?? 'dark') as ThemeName], props.font ?? null);
  const dbRef = useRef<Firestore | null>(null);

  if (props.widget === 'weather' && props.firebase && !dbRef.current) {
    const existing = getApps().find(a => a.name === NAMED_APP);
    const app = existing ?? initializeApp(props.firebase, NAMED_APP);
    dbRef.current = getFirestore(app);
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width, height }}>
        {props.widget === 'weather' && (
          <WeatherCurrent city={props.city} db={dbRef.current} />
        )}
        {props.widget === 'clock/digital' && <DigitalClock />}
        {props.widget === 'clock/analog' && <AnalogClock />}
        {props.widget === 'clock/flip' && <FlipClock />}
        {props.widget === 'calendar/monthly' && <MonthlyCalendar />}
      </div>
    </ThemeProvider>
  );
};
