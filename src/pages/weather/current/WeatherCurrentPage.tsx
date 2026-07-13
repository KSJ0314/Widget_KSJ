import { useSearchParams } from 'react-router-dom';
import { db } from '../../../lib/firebase';
import { findCityByEn, findNearestCity } from '../../../data/cityMap';
import type { CityName } from '../../../data/cityMap';
import { WeatherCurrent } from './WeatherCurrent';

export const WeatherCurrentPage = () => {
  const [searchParams] = useSearchParams();

  const paramCity = searchParams.get('city');
  const paramLat = searchParams.get('lat');
  const paramLon = searchParams.get('lon');

  let city: CityName | undefined;
  if (paramCity && findCityByEn(paramCity)) {
    city = paramCity as CityName;
  } else if (paramLat && paramLon) {
    city = findNearestCity(parseFloat(paramLat), parseFloat(paramLon)).en as CityName;
  }

  return (
    <WeatherCurrent
      city={city}
      apiKey={import.meta.env.VITE_KMA_KEY}
      db={db}
    />
  );
};
