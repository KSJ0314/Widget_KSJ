export interface CityEntry {
  readonly en: string;
  readonly ko: string;
  readonly lat: number;
  readonly lon: number;
}

export const CITIES = [
  // 특별시/광역시/특별자치시
  { en: 'Seoul',       ko: '서울',   lat: 37.5665, lon: 126.9780 },
  { en: 'Busan',       ko: '부산',   lat: 35.1796, lon: 129.0756 },
  { en: 'Daegu',       ko: '대구',   lat: 35.8714, lon: 128.6014 },
  { en: 'Incheon',     ko: '인천',   lat: 37.4563, lon: 126.7052 },
  { en: 'Gwangju',     ko: '광주',   lat: 35.1595, lon: 126.8526 },
  { en: 'Daejeon',     ko: '대전',   lat: 36.3504, lon: 127.3845 },
  { en: 'Ulsan',       ko: '울산',   lat: 35.5384, lon: 129.3114 },
  { en: 'Sejong',      ko: '세종',   lat: 36.4801, lon: 127.2890 },

  // 경기도
  { en: 'Suwon',       ko: '수원',   lat: 37.2636, lon: 127.0286 },
  { en: 'Seongnam',    ko: '성남',   lat: 37.4449, lon: 127.1388 },
  { en: 'Goyang',      ko: '고양',   lat: 37.6583, lon: 126.8320 },
  { en: 'Yongin',      ko: '용인',   lat: 37.2411, lon: 127.1775 },
  { en: 'Bucheon',     ko: '부천',   lat: 37.4989, lon: 126.7831 },
  { en: 'Ansan',       ko: '안산',   lat: 37.3219, lon: 126.8309 },
  { en: 'Anyang',      ko: '안양',   lat: 37.3943, lon: 126.9568 },
  { en: 'Namyangju',   ko: '남양주', lat: 37.6360, lon: 127.2165 },
  { en: 'Hwaseong',    ko: '화성',   lat: 37.1994, lon: 126.8317 },
  { en: 'Pyeongtaek',  ko: '평택',   lat: 36.9921, lon: 127.1130 },
  { en: 'Siheung',     ko: '시흥',   lat: 37.3800, lon: 126.8034 },
  { en: 'Uijeongbu',   ko: '의정부', lat: 37.7381, lon: 127.0339 },
  { en: 'Paju',        ko: '파주',   lat: 37.7601, lon: 126.7800 },
  { en: 'Gimpo',       ko: '김포',   lat: 37.6154, lon: 126.7159 },
  { en: 'Gwangmyeong', ko: '광명',   lat: 37.4784, lon: 126.8645 },
  { en: 'GwangjuGG',   ko: '광주',   lat: 37.4295, lon: 127.2551 },
  { en: 'Hanam',       ko: '하남',   lat: 37.5397, lon: 127.2147 },
  { en: 'Osan',        ko: '오산',   lat: 37.1520, lon: 127.0777 },
  { en: 'Icheon',      ko: '이천',   lat: 37.2722, lon: 127.4353 },
  { en: 'Anseong',     ko: '안성',   lat: 37.0078, lon: 127.2798 },
  { en: 'Yangju',      ko: '양주',   lat: 37.7853, lon: 127.0456 },
  { en: 'Gunpo',       ko: '군포',   lat: 37.3614, lon: 126.9352 },
  { en: 'Uiwang',      ko: '의왕',   lat: 37.3444, lon: 126.9689 },
  { en: 'Yeoju',       ko: '여주',   lat: 37.2982, lon: 127.6377 },
  { en: 'Dongducheon', ko: '동두천', lat: 37.9035, lon: 127.0607 },
  { en: 'Gwacheon',    ko: '과천',   lat: 37.4292, lon: 126.9876 },
  { en: 'Guri',        ko: '구리',   lat: 37.5943, lon: 127.1296 },
  { en: 'Pocheon',     ko: '포천',   lat: 37.8948, lon: 127.2002 },

  // 강원특별자치도
  { en: 'Chuncheon',   ko: '춘천',   lat: 37.8813, lon: 127.7298 },
  { en: 'Wonju',       ko: '원주',   lat: 37.3422, lon: 127.9202 },
  { en: 'Gangneung',   ko: '강릉',   lat: 37.7519, lon: 128.8761 },
  { en: 'Donghae',     ko: '동해',   lat: 37.5244, lon: 129.1143 },
  { en: 'Taebaek',     ko: '태백',   lat: 37.1642, lon: 128.9858 },
  { en: 'Sokcho',      ko: '속초',   lat: 38.2071, lon: 128.5919 },
  { en: 'Samcheok',    ko: '삼척',   lat: 37.4500, lon: 129.1650 },

  // 충청북도
  { en: 'Cheongju',    ko: '청주',   lat: 36.6424, lon: 127.4890 },
  { en: 'Chungju',     ko: '충주',   lat: 36.9910, lon: 127.9259 },
  { en: 'Jecheon',     ko: '제천',   lat: 37.1327, lon: 128.1908 },

  // 충청남도
  { en: 'Cheonan',     ko: '천안',   lat: 36.8151, lon: 127.1139 },
  { en: 'Gongju',      ko: '공주',   lat: 36.4465, lon: 127.1194 },
  { en: 'Boryeong',    ko: '보령',   lat: 36.3332, lon: 126.6126 },
  { en: 'Asan',        ko: '아산',   lat: 36.7898, lon: 127.0017 },
  { en: 'Seosan',      ko: '서산',   lat: 36.7850, lon: 126.4503 },
  { en: 'Nonsan',      ko: '논산',   lat: 36.1871, lon: 127.0989 },
  { en: 'Gyeryong',    ko: '계룡',   lat: 36.2742, lon: 127.2488 },
  { en: 'Dangjin',     ko: '당진',   lat: 36.8895, lon: 126.6298 },

  // 전북특별자치도
  { en: 'Jeonju',      ko: '전주',   lat: 35.8242, lon: 127.1480 },
  { en: 'Gunsan',      ko: '군산',   lat: 35.9676, lon: 126.7368 },
  { en: 'Iksan',       ko: '익산',   lat: 35.9483, lon: 126.9576 },
  { en: 'Jeongeup',    ko: '정읍',   lat: 35.5700, lon: 126.8560 },
  { en: 'Namwon',      ko: '남원',   lat: 35.4163, lon: 127.3900 },
  { en: 'Gimje',       ko: '김제',   lat: 35.8034, lon: 126.8808 },

  // 전라남도
  { en: 'Mokpo',       ko: '목포',   lat: 34.8118, lon: 126.3922 },
  { en: 'Yeosu',       ko: '여수',   lat: 34.7604, lon: 127.6622 },
  { en: 'Suncheon',    ko: '순천',   lat: 34.9506, lon: 127.4874 },
  { en: 'Naju',        ko: '나주',   lat: 35.0157, lon: 126.7108 },
  { en: 'Gwangyang',   ko: '광양',   lat: 34.9407, lon: 127.6956 },

  // 경상북도
  { en: 'Pohang',      ko: '포항',   lat: 36.0190, lon: 129.3435 },
  { en: 'Gyeongju',    ko: '경주',   lat: 35.8562, lon: 129.2247 },
  { en: 'Gimcheon',    ko: '김천',   lat: 36.1397, lon: 128.1136 },
  { en: 'Andong',      ko: '안동',   lat: 36.5684, lon: 128.7294 },
  { en: 'Gumi',        ko: '구미',   lat: 36.1195, lon: 128.3446 },
  { en: 'Yeongju',     ko: '영주',   lat: 36.8058, lon: 128.6241 },
  { en: 'Yeongcheon',  ko: '영천',   lat: 35.9733, lon: 128.9380 },
  { en: 'Sangju',      ko: '상주',   lat: 36.4153, lon: 128.1594 },
  { en: 'Mungyeong',   ko: '문경',   lat: 36.5865, lon: 128.1864 },
  { en: 'Gyeongsan',   ko: '경산',   lat: 35.8251, lon: 128.7410 },

  // 경상남도
  { en: 'Changwon',    ko: '창원',   lat: 35.2280, lon: 128.6811 },
  { en: 'Jinju',       ko: '진주',   lat: 35.1799, lon: 128.1076 },
  { en: 'Tongyeong',   ko: '통영',   lat: 34.8544, lon: 128.4330 },
  { en: 'Sacheon',     ko: '사천',   lat: 35.0036, lon: 128.0645 },
  { en: 'Gimhae',      ko: '김해',   lat: 35.2285, lon: 128.8893 },
  { en: 'Miryang',     ko: '밀양',   lat: 35.4950, lon: 128.7460 },
  { en: 'Geoje',       ko: '거제',   lat: 34.8796, lon: 128.6212 },
  { en: 'Yangsan',     ko: '양산',   lat: 35.3350, lon: 129.0377 },

  // 제주특별자치도
  { en: 'Jeju',        ko: '제주',   lat: 33.4996, lon: 126.5312 },
  { en: 'Seogwipo',    ko: '서귀포', lat: 33.2541, lon: 126.5600 },
] as const satisfies readonly CityEntry[];

export type CityName = typeof CITIES[number]['en'];

/** 영어 도시명 → CityEntry (대소문자 무시) */
export function findCityByEn(name: string): CityEntry | undefined {
  return CITIES.find(c => c.en.toLowerCase() === name.toLowerCase());
}

/** 위경도 → 가장 가까운 도시 */
export function findNearestCity(lat: number, lon: number): CityEntry {
  let nearest: CityEntry = CITIES[0];
  let minDist = Infinity;
  for (const city of CITIES) {
    const d = (city.lat - lat) ** 2 + (city.lon - lon) ** 2;
    if (d < minDist) { minDist = d; nearest = city; }
  }
  return nearest;
}
