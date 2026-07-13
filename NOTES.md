# Widget KSJ — 작업 노트

## 지금까지 한 내용

### npm 라이브러리화

| 파일 | 내용 |
|------|------|
| `src/WidgetKSJ.tsx` | 단일 래퍼 컴포넌트. widget별 discriminated union props, ThemeProvider 내장 |
| `src/index.ts` | 라이브러리 엔트리포인트. 폰트 CSS 자동 주입 포함 |
| `vite.lib.config.ts` | 라이브러리 빌드 설정 (ESM + CJS, 타입 선언, CSS JS 주입) |
| `package.json` | main/module/types/exports 필드 추가, peerDependencies 설정 |

**빌드 명령어**
```bash
npm run build       # 웹 배포용 (dist/)
npm run build:lib   # npm 배포용 (dist-lib/)
npm run deploy      # GitHub Pages 배포
```

**사용 예시 (npm 설치 후)**
```tsx
import { WidgetKSJ } from 'widget-ksj';

<WidgetKSJ widget="clock/digital" theme="dark" width={400} height={225} />
<WidgetKSJ widget="weather" theme="ivory" city="Seoul" weatherApiKey="YOUR_KEY" />
<WidgetKSJ widget="weather" theme="dark" city="Busan" weatherApiKey="YOUR_KEY" firebase={firebaseConfig} />
```

---

### 날씨 위젯 개편

| 파일 | 변경 내용 |
|------|-----------|
| `src/data/cityMap.ts` | 전국 시급 도시 85개 영문-한글-위경도 매핑. `CityName` 타입 export |
| `src/pages/weather/kmaApi.ts` | API 키를 env 대신 파라미터로 받도록 변경 |
| `src/pages/weather/weatherCache.ts` | Firestore db를 파라미터로 받도록 변경 |
| `src/pages/weather/useWeather.ts` | 카카오 API 제거, cityMap 역탐색, options 객체 방식 |
| `src/pages/weather/current/WeatherCurrent.tsx` | city, apiKey, db props 추가 |
| `src/pages/weather/current/WeatherCurrentPage.tsx` | URL 파라미터 + env 처리 레이어 (신규) |

**카카오 API 제거 → cityMap으로 대체**
- `city` prop (영문) → 내부 매핑 테이블로 위경도 변환
- Geolocation → 위경도 → 가장 가까운 도시 역탐색
- URL 파라미터: `?city=Seoul` 또는 구버전 `?lat=X&lon=Y` 모두 지원

---

### 타입 개선

- **discriminated union** — widget별로 다른 theme 타입 자동완성
  - clock: `dark | pink | green | ivory`
  - calendar: `dark | pink | green | ivory | paper`
  - weather: `dark | pink | green | ivory | lightBlue | lightPink | lightGreen`
- **`CityName`** — 85개 도시명 union 타입, city props 자동완성
- **`WidgetType`** — widget 값 union 타입 export
- **JSDoc** — 모든 props에 설명, 예시, 발급 방법 툴팁 추가
- **`weatherApiKey`** — `widget="weather"` 일 때 필수값

---

## 해야 할 것

### 1. package.json 메타데이터 추가

```json
{
  "description": "Personal widget collection — clock, calendar, weather",
  "keywords": ["widget", "clock", "weather", "react", "korean-weather"],
  "author": "KSJ0314",
  "license": "MIT"
}
```

### 2. npm 계정 생성

[https://www.npmjs.com](https://www.npmjs.com) 에서 가입.

### 3. npm 로그인

```bash
npm login
```

### 4. 라이브러리 빌드

```bash
npm run build:lib
```

### 5. npm 배포

```bash
npm publish
```

> 이후 버전 업데이트 시: `package.json`의 `version` 올린 뒤 `build:lib` → `publish`

---

## 추가로 고려할 것

- **README.md** — npmjs.com 패키지 페이지에 표시될 문서. 없으면 빈 페이지.
- **버전 관리** — props API 바꾸면 major 버전 올리기 (semver 기준)
- **경기도 광주시 도시명** — 현재 `GwangjuGG`로 되어 있음
