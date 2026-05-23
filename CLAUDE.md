# Widget KSJ

개인 위젯 컬렉션 프로젝트. 각 페이지가 곧 하나의 위젯이며, Notion 등에서 임베드로 사용한다.

## 기술 스택

- React + TypeScript + Vite
- styled-components (v6) — 스타일링
- react-router-dom (HashRouter) — 라우팅
- @fontsource/orbitron — 자체 호스팅 폰트 (Notion CSP 대응)

## 라우팅

HashRouter를 사용한다. GitHub Pages 배포 + Notion iframe 임베드 환경에서 동작하기 위해서다.

```
/#/           → 홈 (전체 위젯 목록)
/#/clock/digital  → 디지털 시계
/#/clock/analog   → 아날로그 시계
```

새 위젯 추가 시 `src/router/index.tsx`에 Route를 추가한다.

## 폴더 구조

```
src/
  hooks/               # 여러 위젯에서 공통으로 쓰는 훅
    useContainerSize.ts
  pages/
    home/              # 홈 화면 (위젯 목록)
      widgetRegistry.ts  # 위젯 목록 등록
      Home.tsx
      Home.styled.ts
      index.ts
    clock/             # 시계 카테고리
      useClock.ts        # 시계 공통 훅 (카테고리 공통)
      digital/           # 디지털 시계 위젯 (= 페이지)
        DigitalClock.tsx
        DigitalClock.styled.ts
        index.ts
      analog/            # 아날로그 시계 위젯 (= 페이지)
        useAnalogTime.ts   # 이 위젯 전용 훅
        AnalogClock.tsx
        AnalogClock.styled.ts
        index.ts
  theme/
    theme.ts           # 테마 정의 + DefaultTheme 타입 선언
    GlobalStyle.ts
    ThemeProvider.tsx
    index.ts
  router/
    index.tsx
  App.tsx
  main.tsx             # @fontsource import
```

## 위젯 파일 규칙

각 위젯은 폴더 하나로 구성한다.

| 파일 | 역할 |
|------|------|
| `WidgetName.tsx` | 컴포넌트 |
| `WidgetName.styled.ts` | styled-components 스타일 |
| `index.ts` | export |
| `useXxx.ts` | 이 위젯 전용 훅 (필요 시) |

훅 위치 기준:
- 특정 위젯에서만 쓰면 → 해당 위젯 폴더
- 같은 카테고리 위젯들이 공유하면 → 카테고리 폴더 (예: `clock/useClock.ts`)
- 여러 카테고리에서 공유하면 → `src/hooks/`

## 반응형 크기 조절

모든 위젯은 임베드 컨테이너 크기에 맞게 자동으로 스케일된다.

```ts
// src/hooks/useContainerSize.ts
const { ref, width, height } = useContainerSize();
```

컴포넌트 최상단 div에 `ref`를 달고, `width`/`height`를 기반으로 폰트 크기 등을 계산한다.

## 새 위젯 추가 방법

1. `src/pages/<category>/<widgetName>/` 폴더 생성
2. `WidgetName.tsx`, `WidgetName.styled.ts`, `index.ts` 작성
3. `src/router/index.tsx`에 Route 추가
4. `src/pages/home/widgetRegistry.ts`에 항목 추가 → 홈 화면에 자동 노출

```ts
// widgetRegistry.ts 예시
{
  id: 'category-name',
  name: 'Widget Name',
  category: 'Category',
  path: '/category/name',
  component: WidgetComponent,
}
```

## 폰트

Orbitron을 `@fontsource/orbitron`으로 자체 호스팅한다. Google Fonts CDN을 쓰지 않는 이유는 Notion 등 외부 서비스 임베드 시 CSP로 인해 외부 폰트가 차단될 수 있기 때문이다.

```ts
// main.tsx
import '@fontsource/orbitron/400.css'
import '@fontsource/orbitron/700.css'
import '@fontsource/orbitron/900.css'
```

새 폰트 추가 시 `npm install @fontsource/<font-name>`으로 설치하고 `main.tsx`에 import한다.

## 테마

`src/theme/theme.ts`에서 색상, 폰트를 관리한다. styled-components `DefaultTheme`을 확장하므로 모든 styled 컴포넌트에서 `${({ theme }) => theme.colors.primary}` 형태로 사용 가능하다.

## 배포

GitHub Pages에 배포한다. `vite.config.ts`의 `base`는 `/Widget_KSJ/`로 설정되어 있다.

```bash
npm run deploy   # 빌드 + gh-pages 브랜치에 푸시
```

배포 URL: `https://KSJ0314.github.io/Widget_KSJ/`
