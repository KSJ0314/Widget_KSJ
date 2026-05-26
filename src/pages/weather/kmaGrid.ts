// 기상청 Lambert 투영 변환 상수 (기상청 공식 제공값, 변경 금지)
const RE = 6371.00877;  // 지구 반경 (km)
const GRID = 5.0;       // 격자 간격 (km)
const SLAT1 = 30.0;     // 표준 위도 1 (도)
const SLAT2 = 60.0;     // 표준 위도 2 (도)
const OLON = 126.0;     // 기준 경도 (도) — 한반도 중심
const OLAT = 38.0;      // 기준 위도 (도) — 한반도 중심
const XO = 43;          // 기준점 X 격자 번호
const YO = 136;         // 기준점 Y 격자 번호
const DEGRAD = Math.PI / 180.0; // 도 → 라디안 변환 계수

/**
 * 위도/경도를 기상청 격자 좌표(nx, ny)로 변환한다.
 * 기상청 API 호출 시 nx, ny 파라미터로 사용한다.
 *
 * @param lat 위도 (예: 37.5665)
 * @param lon 경도 (예: 126.9780)
 * @returns nx, ny — 기상청 5km 격자 좌표
 */
export function latLonToGrid(lat: number, lon: number): { nx: number; ny: number } {
  const re = RE / GRID; // 격자 단위로 환산한 지구 반경

  // 표준 위도, 기준 위도/경도를 라디안으로 변환
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon  = OLON * DEGRAD;
  const olat  = OLAT * DEGRAD;

  // Lambert 투영 계수 계산
  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn); // 기준점의 투영 반경

  // 입력 위도/경도를 투영 좌표로 변환
  let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn); // 해당 위도의 투영 반경
  let theta = lon * DEGRAD - olon;   // 기준 경도와의 각도 차
  if (theta > Math.PI)  theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  // 격자 번호(nx, ny) 산출
  const nx = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  const ny = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return { nx, ny };
}
