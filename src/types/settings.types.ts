// 설정 관련 타입 정의

export interface UserSettings {
  language: "ko" | "en";
  temperatureUnit: "c" | "f";
  windSpeedUnit: "mps" | "kmh";
  theme: "light" | "dark" | "system";
  accessibility: {
    highContrast: boolean;
    reduceMotion: boolean;
    fontSize: "small" | "medium" | "large";
  };
  notifications: {
    weatherAlerts: boolean;
    dailyForecast: boolean;
    airQualityWarnings: boolean;
  };
}

export interface ThemeConfig {
  light: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
  };
  dark: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface LanguageConfig {
  ko: {
    name: string;
    nativeName: string;
    flag: string;
  };
  en: {
    name: string;
    nativeName: string;
    flag: string;
  };
}
