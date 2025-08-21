// 지역 정보 관련 타입 정의

export interface LocationSearchResult {
  code: string;
  name: string;
  fullName: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface FavoriteLocation extends LocationSearchResult {
  addedAt: string;
  lastViewed: string;
}

export interface LocationHistory {
  code: string;
  name: string;
  viewedAt: string;
  viewCount: number;
}

// 지역 검색 결과
export interface LocationSearchResponse {
  results: LocationSearchResult[];
  total: number;
  query: string;
}

// 지역 코드 매핑
export interface LocationCodeMapping {
  [code: string]: {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
  };
}
