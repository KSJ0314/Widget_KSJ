// 날씨 데이터 로딩 훅
// 흐름: geolocation → 역지오코딩(시도명) → 캐시 확인 → 없으면 기상청 API 호출 → 캐시 저장

import { useState, useEffect } from 'react';
import { latLonToGrid } from './kmaGrid';
import { fetchCurrentWeather, fetchHourlyForecast } from './kmaApi';
import { getCachedWeather, setCachedWeather } from './weatherCache';
import type { CurrentWeather, HourlyForecast } from './kmaApi';

export interface WeatherData {
  city: string;
  current: CurrentWeather;
  hourly: HourlyForecast[];
}

export type WeatherState =
  | { status: 'loading'; step: string }
  | { status: 'ok'; data: WeatherData }
  | { status: 'error'; message: string };

const CITY_SESSION_KEY = 'weather_city';

function getCachedCity(): string | null {
  try {
    return sessionStorage.getItem(CITY_SESSION_KEY);
  } catch {
    return null;
  }
}

function saveCachedCity(city: string) {
  try {
    sessionStorage.setItem(CITY_SESSION_KEY, city);
  } catch {}
}

/** 카카오 로컬 API로 역지오코딩 */
async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
      { headers: { Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_KEY}` } }
    );
    if (!res.ok) return '알 수 없는 위치';
    const data = await res.json();
    const doc = data.documents?.find((d: { region_type: string }) => d.region_type === 'H') ?? data.documents?.[0];
    return doc?.region_2depth_name ?? doc?.region_1depth_name ?? '알 수 없는 위치';
  } catch {
    return '알 수 없는 위치';
  }
}

/** 브라우저 geolocation으로 현재 위치를 가져온다 */
function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 8000,
      maximumAge: 5 * 60 * 1000,
      enableHighAccuracy: false,
    })
  );
}

export function useWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>({ status: 'loading', step: '위치 확인 중...' });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // 1. 위치 가져오기
        setState({ status: 'loading', step: '위치 확인 중...' });
        const pos = await getCurrentPosition();
        const { latitude: lat, longitude: lon } = pos.coords;
        if (cancelled) return;

        // 2. 시도명 조회 (localStorage 캐시 우선)
        const cachedCity = getCachedCity();
        let city: string;
        if (cachedCity) {
          city = cachedCity;
        } else {
          setState({ status: 'loading', step: '지역 확인 중...' });
          city = await reverseGeocode(lat, lon);
          if (cancelled) return;
          saveCachedCity(city);
        }

        // 3. Firestore 캐시 확인
        setState({ status: 'loading', step: '날씨 불러오는 중...' });
        const cached = await getCachedWeather(city);
        if (cancelled) return;

        if (cached) {
          // 캐시 히트: 저장된 데이터 바로 사용
          setState({
            status: 'ok',
            data: { city: cached.city, current: cached.current, hourly: cached.hourly },
          });
          return;
        }

        // 4. 캐시 미스: 기상청 API 호출
        const { nx, ny } = latLonToGrid(lat, lon);
        const [current, hourly] = await Promise.all([
          fetchCurrentWeather(nx, ny),
          fetchHourlyForecast(nx, ny),
        ]);
        if (cancelled) return;

        // 5. Firestore에 저장 (실패해도 위젯 동작에 영향 없음)
        setCachedWeather(city, nx, ny, current, hourly).catch(() => {});

        setState({ status: 'ok', data: { city, current, hourly } });
      } catch (e) {
        if (!cancelled) {
          const msg = e instanceof GeolocationPositionError
            ? '위치 권한이 거부되었습니다'
            : (e as Error).message ?? '날씨를 불러올 수 없습니다';
          setState({ status: 'error', message: msg });
        }
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  return state;
}
