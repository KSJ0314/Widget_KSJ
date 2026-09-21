/**
 * 화면에서 쓰는 폰트를 모두 불러온다. main.tsx는 이 파일 하나만 불러온다.
 * Notion 등 외부 서비스에 임베드하면 CSP로 CDN 폰트가 막히므로 모두 자체 호스팅한다.
 * 새 폰트는 `npm install @fontsource/<이름>` 후 여기에 한 줄 추가한다.
 */

// 영문 표시용
import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/700.css';
import '@fontsource/orbitron/900.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/libre-baskerville/400.css';
import '@fontsource/libre-baskerville/700.css';
import '@fontsource/dm-serif-display/400.css';

// 기본 폰트(한글 포함). @fontsource에는 한글이 든 Pretendard가 없어 제작자 패키지를 쓴다.
// 그래서 경로 모양이 @fontsource 계열과 다르다. 화면에 쓰인 글자 조각만 내려받는다.
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';

// 폰트 칩에서는 숨겼지만 이미 복사된 `&font=pretendard` 주소가 쓰는 영문 전용 Pretendard
import '@fontsource/pretendard/400.css';
import '@fontsource/pretendard/700.css';

// 한글 표시용
import '@fontsource/gowun-batang/400.css';
import '@fontsource/gowun-batang/700.css';
import '@fontsource/gaegu/400.css';
import '@fontsource/gaegu/700.css';
import '@fontsource/nanum-pen-script/400.css';

// 직접 넣은 폰트 파일(@font-face 선언)
import './fonts.css';
