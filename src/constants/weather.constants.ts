// 날씨 관련 상수들

export const WEATHER_CONDITIONS = {
  CLEAR: 'Clear',
  CLOUDS: 'Clouds',
  RAIN: 'Rain',
  SNOW: 'Snow',
  THUNDERSTORM: 'Thunderstorm',
  DRIZZLE: 'Drizzle',
  MIST: 'Mist',
  FOG: 'Fog',
  HAZE: 'Haze',
  SMOKE: 'Smoke',
  DUST: 'Dust',
  SAND: 'Sand',
  ASH: 'Ash',
  SQUALL: 'Squall',
  TORNADO: 'Tornado'
} as const;

export const AIR_QUALITY_GRADES = {
  GOOD: 'good',
  MODERATE: 'moderate',
  UNHEALTHY: 'unhealthy',
  VERY_UNHEALTHY: 'very-unhealthy',
  HAZARDOUS: 'hazardous'
} as const;

export const WIND_DIRECTIONS = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
] as const;

export const TEMPERATURE_UNITS = {
  CELSIUS: 'c',
  FAHRENHEIT: 'f'
} as const;

export const WIND_SPEED_UNITS = {
  METERS_PER_SECOND: 'mps',
  KILOMETERS_PER_HOUR: 'kmh'
} as const;

export const LANGUAGES = {
  KOREAN: 'ko',
  ENGLISH: 'en'
} as const;

// 기본 설정값
export const DEFAULT_SETTINGS = {
  LANGUAGE: LANGUAGES.KOREAN,
  TEMPERATURE_UNIT: TEMPERATURE_UNITS.CELSIUS,
  WIND_SPEED_UNIT: WIND_SPEED_UNITS.METERS_PER_SECOND
} as const;
