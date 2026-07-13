import { useState, useEffect } from 'react';
import type { Firestore } from 'firebase/firestore';
import { latLonToGrid } from './kmaGrid';
import { fetchCurrentWeather, fetchHourlyForecast } from './kmaApi';
import { getCachedWeather, setCachedWeather } from './weatherCache';
import { findCityByEn, findNearestCity } from '../../data/cityMap';
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

export interface WeatherOptions {
  /** 영어 도시명 (예: "Seoul"). 없으면 Geolocation으로 자동 감지. */
  city?: string;
  apiKey: string;
  db?: Firestore | null;
}

export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 8000,
      maximumAge: 5 * 60 * 1000,
      enableHighAccuracy: false,
    })
  );
}

export function useWeather({ city, apiKey, db }: WeatherOptions): WeatherState {
  const [state, setState] = useState<WeatherState>({ status: 'loading', step: '위치 확인 중...' });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        let lat: number, lon: number, koCity: string;

        if (city) {
          const entry = findCityByEn(city);
          if (!entry) throw new Error(`지원하지 않는 도시입니다: ${city}`);
          ({ lat, lon, ko: koCity } = entry);
        } else {
          setState({ status: 'loading', step: '위치 확인 중...' });
          const pos = await getCurrentPosition();
          ({ latitude: lat, longitude: lon } = pos.coords);
          if (cancelled) return;
          koCity = findNearestCity(lat, lon).ko;
        }

        setState({ status: 'loading', step: '날씨 불러오는 중...' });

        if (db) {
          const cached = await getCachedWeather(db, koCity);
          if (cancelled) return;
          if (cached) {
            setState({ status: 'ok', data: { city: cached.city, current: cached.current, hourly: cached.hourly } });
            return;
          }
        }

        const { nx, ny } = latLonToGrid(lat, lon);
        const [current, hourly] = await Promise.all([
          fetchCurrentWeather(nx, ny, apiKey),
          fetchHourlyForecast(nx, ny, apiKey),
        ]);
        if (cancelled) return;

        if (db) {
          setCachedWeather(db, koCity, nx, ny, current, hourly).catch(() => {});
        }
        setState({ status: 'ok', data: { city: koCity, current, hourly } });
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
  }, [city, apiKey, db]);

  return state;
}
