// 타입 정의 통합 export

// 기본 날씨 타입
export * from "./weather.types";

// API 관련 타입
export * from "./api.types";

// 지역 정보 타입
export * from "./location.types";

// 설정 관련 타입
export * from "./settings.types";

// 공통 타입
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
