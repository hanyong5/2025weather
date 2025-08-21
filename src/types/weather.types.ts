// 날씨 관련 타입 정의
export interface Location {
  code: string; // 내부 지역 코드
  name: string; // 표기명 (예: 서울 강남구)
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  temp: number; // °C
  feelsLike: number; // °C
  condition: string; // 'Clear' | 'Clouds' | ...
  humidity: number; // %
  windSpeed: number; // m/s
  windDeg: number; // 0-360
  precipProb?: number; // 0-1
  icon: string; // 사용 아이콘 키
  updatedAt: string; // ISO
}

export interface HourlyForecast {
  ts: string; // ISO
  temp: number;
  precipProb?: number;
  windSpeed?: number;
  icon: string;
}

export interface DailyForecast {
  date: string; // YYYY-MM-DD
  tempMin: number;
  tempMax: number;
  precipProb?: number;
  icon: string;
}

export interface AirQuality {
  pm10: number; // µg/m3
  pm25: number; // µg/m3
  grade: "good" | "moderate" | "unhealthy" | "very-unhealthy" | "hazardous";
  updatedAt: string;
}
