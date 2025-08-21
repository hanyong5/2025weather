// API 응답 관련 타입 정의

// 기본 API 응답 구조
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
}

// API 에러 타입
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// 날씨 API 요청 파라미터
export interface WeatherApiParams {
  lat: number;
  lon: number;
  units?: "metric" | "imperial";
  lang?: "ko" | "en";
  exclude?: string[];
}

// OpenWeatherMap API 응답 타입 (간소화)
export interface OpenWeatherMapResponse {
  lat: number;
  lon: number;
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    wind_deg: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  };
  hourly?: Array<{
    dt: number;
    temp: number;
    weather: Array<{
      main: string;
      icon: string;
    }>;
    pop: number;
  }>;
  daily?: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<{
      main: string;
      icon: string;
    }>;
    pop: number;
  }>;
}

// 공기질 API 응답 타입
export interface AirQualityApiResponse {
  coord: { lat: number; lon: number };
  list: Array<{
    dt: number;
    main: { aqi: number };
    components: {
      pm2_5: number;
      pm10: number;
    };
  }>;
}
