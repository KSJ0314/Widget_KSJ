// 기상청 단기예보 조회서비스 API 호출 모듈
//
// apis.data.go.kr을 브라우저에서 직접 부르면 Origin 헤더 때문에 403이 떨어진다.
// Cloudflare Worker를 경유해 서버 대 서버로 호출하고, 인증키도 Worker 쪽에 둔다.
const BASE_URL = 'https://weather-proxy.sojung017.workers.dev';

/** 현재 날씨 데이터 (초단기실황) */
export interface CurrentWeather {
  temp: number;      // 기온 (°C)
  humidity: number;  // 습도 (%)
  windSpeed: number; // 풍속 (m/s)
  pty: number;       // 강수형태 (0=없음 1=비 2=비/눈 3=눈 4=소나기)
  rn1: string;       // 1시간 강수량
}

/** 시간별 예보 데이터 (단기예보) */
export interface HourlyForecast {
  date: string;      // 예보 날짜 (YYYYMMDD)
  time: string;      // 예보 시각 (HHmm)
  temp: number;      // 기온 (°C)
  sky: number;       // 하늘상태 (1=맑음 3=구름많음 4=흐림)
  pty: number;       // 강수형태
  pop: number;       // 강수확률 (%)
  humidity: number;  // 습도 (%)
  windSpeed: number; // 풍속 (m/s)
}

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

function toTimeStr(h: number, m: number): string {
  return `${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}`;
}

/**
 * 초단기실황 base_time 계산.
 * 매 정시 데이터가 약 10분 후 제공되므로, 현재 분이 10분 미만이면 1시간 전 데이터를 사용한다.
 */
function getNcstBaseDateTime(): { date: string; time: string } {
  const now = new Date();
  const d = new Date(now);
  if (now.getMinutes() < 10) {
    d.setHours(d.getHours() - 1);
  }
  return { date: toDateStr(d), time: toTimeStr(d.getHours(), 0) };
}

/**
 * 단기예보 base_time 계산.
 * 하루 8회 발표 (02, 05, 08, 11, 14, 17, 20, 23시).
 * 발표 후 10분부터 조회 가능하므로, 현재 시각 기준으로 가장 최근 발표 시각을 구한다.
 */
function getFcstBaseDateTime(): { date: string; time: string } {
  const BASE_HOURS = [2, 5, 8, 11, 14, 17, 20, 23];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMin  = now.getMinutes();

  let baseHour = BASE_HOURS[0];
  for (const h of BASE_HOURS) {
    if (currentHour > h || (currentHour === h && currentMin >= 10)) {
      baseHour = h;
    }
  }

  const d = new Date(now);
  if (currentHour < 2 || (currentHour === 2 && currentMin < 10)) {
    d.setDate(d.getDate() - 1);
    baseHour = 23;
  }

  return { date: toDateStr(d), time: toTimeStr(baseHour, 0) };
}

async function fetchKma(
  endpoint: string,
  params: Record<string, string | number>,
): Promise<any[]> {
  const query = new URLSearchParams({
    dataType: 'JSON',
    numOfRows: '1000',
    pageNo: '1',
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  });

  const res = await fetch(`${BASE_URL}/${endpoint}?${query}`);
  if (!res.ok) throw new Error(`기상청 API 오류: ${res.status}`);

  const json = await res.json();
  const items = json?.response?.body?.items?.item;
  if (!items) throw new Error('기상청 응답 데이터 없음');
  return items;
}

export async function fetchCurrentWeather(nx: number, ny: number): Promise<CurrentWeather> {
  const { date, time } = getNcstBaseDateTime();
  const items = await fetchKma('getUltraSrtNcst', { base_date: date, base_time: time, nx, ny });

  const map: Record<string, string> = {};
  for (const item of items) {
    map[item.category] = item.obsrValue;
  }

  return {
    temp:      parseFloat(map['T1H'] ?? '0'),
    humidity:  parseInt(map['REH']   ?? '0', 10),
    windSpeed: parseFloat(map['WSD'] ?? '0'),
    pty:       parseInt(map['PTY']   ?? '0', 10),
    rn1:       map['RN1'] ?? '0',
  };
}

export async function fetchHourlyForecast(nx: number, ny: number): Promise<HourlyForecast[]> {
  const { date, time } = getFcstBaseDateTime();
  const items = await fetchKma('getVilageFcst', { base_date: date, base_time: time, nx, ny });

  const grouped: Record<string, Record<string, string>> = {};
  for (const item of items) {
    const key = `${item.fcstDate}_${item.fcstTime}`;
    if (!grouped[key]) grouped[key] = {};
    grouped[key][item.category] = item.fcstValue;
  }

  const now = new Date();

  return Object.entries(grouped)
    .map(([key, cat]) => {
      const [d, t] = key.split('_');
      return {
        date:      d,
        time:      t,
        temp:      parseFloat(cat['TMP'] ?? '0'),
        sky:       parseInt(cat['SKY']   ?? '1', 10),
        pty:       parseInt(cat['PTY']   ?? '0', 10),
        pop:       parseInt(cat['POP']   ?? '0', 10),
        humidity:  parseInt(cat['REH']   ?? '0', 10),
        windSpeed: parseFloat(cat['WSD'] ?? '0'),
      };
    })
    .filter(f => {
      const fDate = new Date(
        `${f.date.slice(0, 4)}-${f.date.slice(4, 6)}-${f.date.slice(6, 8)}T${f.time.slice(0, 2)}:${f.time.slice(2, 4)}:00`
      );
      const diffHours = (fDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      return diffHours >= 0 && diffHours <= 24;
    })
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
}
