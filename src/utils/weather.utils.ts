// 날씨 관련 유틸리티 함수들

/**
 * 온도 단위 변환 (섭씨 ↔ 화씨)
 */
export const convertTemperature = (temp: number, from: 'c' | 'f', to: 'c' | 'f'): number => {
  if (from === to) return temp;
  
  if (from === 'c' && to === 'f') {
    return (temp * 9/5) + 32;
  } else if (from === 'f' && to === 'c') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
};

/**
 * 풍속 단위 변환 (m/s ↔ km/h)
 */
export const convertWindSpeed = (speed: number, from: 'mps' | 'kmh', to: 'mps' | 'kmh'): number => {
  if (from === to) return speed;
  
  if (from === 'mps' && to === 'kmh') {
    return speed * 3.6;
  } else if (from === 'kmh' && to === 'mps') {
    return speed / 3.6;
  }
  
  return speed;
};

/**
 * 풍향을 16방위로 변환
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * 날씨 상태에 따른 한국어 설명
 */
export const getWeatherDescription = (condition: string): string => {
  const descriptions: Record<string, string> = {
    'Clear': '맑음',
    'Clouds': '구름',
    'Rain': '비',
    'Snow': '눈',
    'Thunderstorm': '천둥번개',
    'Drizzle': '가벼운 비',
    'Mist': '안개',
    'Fog': '안개',
    'Haze': '연무',
    'Smoke': '연기',
    'Dust': '먼지',
    'Sand': '모래',
    'Ash': '재',
    'Squall': '돌풍',
    'Tornado': '토네이도'
  };
  
  return descriptions[condition] || condition;
};
