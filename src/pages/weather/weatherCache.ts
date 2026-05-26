// Firestore 캐시 읽기/쓰기 모듈
// 문서 ID: {시도명}_{YYYYMMDD_HH} (예: 서울특별시_2026052614)
// 같은 시도 + 같은 시간대 사용자는 동일 캐시 문서를 공유한다.

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { CurrentWeather, HourlyForecast } from './kmaApi';

const COLLECTION = 'weather_cache';

/** Firestore에 저장/조회하는 날씨 캐시 문서 구조 */
export interface WeatherCacheDoc {
  city: string;
  nx: number;
  ny: number;
  cachedAt: string;       // ISO 8601 문자열
  current: CurrentWeather;
  hourly: HourlyForecast[];
}

/** 현재 시각 기준 캐시 문서 ID 생성 (시도명 + 날짜 + 시) */
function buildDocId(city: string): string {
  const now = new Date();
  const y   = now.getFullYear();
  const m   = String(now.getMonth() + 1).padStart(2, '0');
  const d   = String(now.getDate()).padStart(2, '0');
  const h   = String(now.getHours()).padStart(2, '0');
  return `${city}_${y}${m}${d}${h}`;
}

/**
 * 캐시 조회. 현재 시간대 문서가 존재하면 반환, 없으면 null 반환.
 */
export async function getCachedWeather(city: string): Promise<WeatherCacheDoc | null> {
  const docId = buildDocId(city);
  const snap = await getDoc(doc(db, COLLECTION, docId));
  if (!snap.exists()) return null;
  return snap.data() as WeatherCacheDoc;
}

/**
 * 날씨 데이터를 Firestore에 저장.
 */
export async function setCachedWeather(
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
