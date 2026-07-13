// Firestore 캐시 읽기/쓰기 모듈
// 문서 ID: {도시명}_{YYYYMMDD_HH} (예: 서울_2026052614)
// 같은 도시 + 같은 시간대 사용자는 동일 캐시 문서를 공유한다.

import { doc, getDoc, setDoc, type Firestore } from 'firebase/firestore';
import type { CurrentWeather, HourlyForecast } from './kmaApi';

const COLLECTION = 'weather_cache';

export interface WeatherCacheDoc {
  city: string;
  nx: number;
  ny: number;
  cachedAt: string;
  current: CurrentWeather;
  hourly: HourlyForecast[];
}

function buildDocId(city: string): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  return `${city}_${y}${m}${d}${h}`;
}

export async function getCachedWeather(db: Firestore, city: string): Promise<WeatherCacheDoc | null> {
  const docId = buildDocId(city);
  const snap = await getDoc(doc(db, COLLECTION, docId));
  if (!snap.exists()) return null;
  return snap.data() as WeatherCacheDoc;
}

export async function setCachedWeather(
  db: Firestore,
  city: string,
  nx: number,
  ny: number,
  current: CurrentWeather,
  hourly: HourlyForecast[],
): Promise<void> {
  const docId = buildDocId(city);
  const data: WeatherCacheDoc = {
    city,
    nx,
    ny,
    cachedAt: new Date().toISOString(),
    current,
    hourly,
  };
  await setDoc(doc(db, COLLECTION, docId), data);
}
