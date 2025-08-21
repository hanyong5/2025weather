# 지역 기반 날씨 웹앱 — 기능 명세서 (개발 요청용)

## 0) 개요

- **목표**: 사용자가 지역(시/군/구 등)을 선택하면 현재/예보 날씨를 직관적으로 확인할 수 있는 웹앱
- **핵심 가치**: 빠른 응답, 명확한 정보 구조, 모바일 우선 UI, 접근성 준수

---

## 1) 범위 & 기술 스택

- **프론트**: Next.js(App Router), TypeScript, Tailwind CSS, **Shadcn UI(Radix 기반)**
- **상태/URL**: `nuqs`(검색 파라미터 동기화), 경량 로컬 상태(React state)
- **서버 작업**: Next.js **Server Components** + **Server Actions**
- **검증**: **Zod**(입력/파라미터 스키마)
- **날씨 데이터**: 외부 API(예: OpenWeatherMap / 기상청 Open API 중 하나 택1)
- **품질**: ESLint, Prettier, Vitest/RTL, Playwright

---

## 2) 핵심 사용자 흐름(Use Cases)

1. **지역 선택 → 현재 날씨 확인**

   - 검색 또는 드롭다운으로 지역 선택
   - 현재 기온/체감/습도/풍속/강수/미세먼지 요약

2. **단기 예보 확인**

   - 시간대별(3\~6시간 간격)·일별 예보 탭 전환

3. **즐겨찾기 관리**

   - 자주 보는 지역을 저장/삭제
   - 홈에서 원클릭 전환

4. **공유 & 링크 재방문**

   - URL에 지역 파라미터 유지 → 공유/직접 접근 시 동일 상태

5. **오프라인/에러 상태 대응**

   - 네트워크 장애·API 실패 시 대체 UI, 재시도

---

## 3) 화면/라우팅 구조

- `/` (홈)

  - 지역 검색/선택, 최근 조회/즐겨찾기, 현재 날씨 카드, 예보 탭

- `/location/[code]`

  - 특정 지역 상세(현재+시간별+일별, 공기질, 체감 팁)

- `/favorites`

  - 즐겨찾기 리스트, 재정렬/삭제

- `/settings`

  - 단위(°C/°F), 바람(m/s, km/h), 언어(ko/en), 접근성 옵션

> **App Router 기본 파일**:
>
> - `app/layout.tsx`(전역 UI), `app/page.tsx`(홈), `app/location/[code]/page.tsx`, `app/favorites/page.tsx`, `app/settings/page.tsx`
> - `app/api/weather/route.ts`(프록시·캐싱), `app/api/air-quality/route.ts`(선택)

---

## 4) 주요 기능 사양 (요약)

### 4.1 지역 선택

- **입력**: 검색어(한글/영문), 최근 조회 5개 노출
- **데이터 소스**: 지역 코드 테이블/JSON(시·군·구 단위)
- **상호작용**

  - 검색 시 디바운스(250ms)
  - 선택 시 URL 업데이트 `?loc=<code>`

- **컴포넌트(Shadcn)**

  - `Input`, `Command`(검색 팔레트), `Popover`, `ScrollArea`, `Badge`

### 4.2 현재 날씨

- **표시 항목**: 기온/체감, 상태 아이콘, 강수확률, 습도, 풍속/풍향, 체감 코멘트(간단 멘션)
- **데이터**: `/api/weather?loc=<code>&type=current`
- **UI**

  - 카드형: 상태 아이콘 + 수치 + 짧은 설명
  - 스켈레톤 로딩 제공

- **컴포넌트**

  - `Card`, `Separator`, `Skeleton`, `Tooltip`

### 4.3 예보(시간별/일별)

- **탭 전환**: 시간별(Hourly), 일별(Daily)
- **표시**: 시간/요일, 날씨 아이콘, 최저/최고, 강수확률, 바람
- **스크롤**: 가로 스크롤(시간별)
- **컴포넌트**

  - `Tabs`, `Card`, `ScrollArea`, `ToggleGroup`

### 4.4 공기질(선택)

- **표시**: PM10/PM2.5, 등급/색상, 간단 권고(마스크·환기 등)
- **데이터**: `/api/air-quality?loc=<code>`
- **컴포넌트**

  - `Badge`, `Alert`, `Progress`(지표 시각화)

### 4.5 즐겨찾기

- **행동**: 현재 지역 즐겨찾기 추가/삭제, 드래그로 정렬
- **저장**: 로컬(Storage) + 선택 시 서버 세션 연동 가능(옵션)
- **컴포넌트**

  - `Button`, `DropdownMenu`, `Sortable`(경량 라이브러리 동적 import)

### 4.6 설정

- **옵션**: 단위(C/F), 바람 단위, 언어, 접근성 고대비
- **영속성**: URL 기본값 + 로컬 저장
- **컴포넌트**

  - `Select`, `Switch`, `Form`, `RadioGroup`

---

## 5) 데이터 계약(타입) — 핵심만

```ts
// src/types/weather.types.ts
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
```

---

## 6) 외부 API 연동 & 내부 API(프록시)

- **이유**: 키 보호, 표준화된 응답, 캐싱 일원화
- **엔드포인트**

  - `GET /api/weather?loc=<code>&type=current|hourly|daily`
  - `GET /api/air-quality?loc=<code>`

- **요구 사항**

  - 서버에서 외부 API 호출 → 응답을 **표준 타입**으로 변환
  - **캐싱 정책**:

    - current: `s-maxage=120, stale-while-revalidate=600`
    - hourly/daily: `s-maxage=600, stale-while-revalidate=3600`

  - **에러 표준화**: `{ error: { code: string; message: string } }`
  - **환경변수**: `WEATHER_API_KEY`, `AIR_API_KEY`, `WEATHER_BASE_URL`, `AIR_BASE_URL`

---

## 7) 상호작용/상태 관리

- **URL 동기화**: `?loc=<code>&unit=c&lang=ko&tab=hourly`
- **디바운스**: 검색 입력 250ms
- **로딩**: Shadcn `Skeleton`/텍스트 플레이스홀더
- **에러**: Alert + 재시도 버튼
- **오프라인**: 네트워크 감지 후 안내 배지 표시

---

## 8) UI/UX 가이드 (Shadcn + Tailwind)

- **레이아웃**: 상단 헤더(지역 선택/즐겨찾기/설정), 콘텐츠 카드 1\~2열(모바일 1열)
- **아이콘**: 날씨 아이콘 세트(맑음/구름/비/눈/번개/안개… 키 매핑)
- **반응형**: `sm:`, `md:`, `lg:` 브레이크포인트로 카드 그리드 전환
- **접근성**:

  - 대비 기준 AA 충족, 탭 포커스 링 유지
  - 모든 인터랙션 요소 `aria-*` 라벨 부여
  - 색상만으로 정보 전달 금지(아이콘/텍스트 병행)

- **국제화(i18n)**: `ko` 기본, `en` 선택(문자열 리소스 테이블)

---

## 9) 성능 & 품질

- **Server Components 우선**(데이터 페칭/렌더)
- **동적 임포트**: 지도/차트/정렬 등 크기 큰 모듈
- **이미지 최적화**: `next/image`(아이콘 스프라이트 또는 SVG)
- **캐싱**: 내부 API 레벨 + CDN 헤더
- **웹 바이탈**: LCP<2.5s, CLS<0.1, INP<200ms 목표

---

## 10) 보안

- API 키는 서버 전용 환경변수로 관리(`NEXT_PUBLIC_` 금지)
- 외부 API 도메인 **아웃바운드 화이트리스트**
- Rate limiting(간단 IP 기반) 옵션

---

## 11) 로깅/모니터링

- **클라이언트**: 오류 이벤트 최소 수집(Sentry 선택)
- **서버**: 프록시 실패율, 외부 API 응답시간/에러 코드 기록

---

## 12) 테스트 전략

- **단위**(Vitest): 유틸/매핑/포맷터, Zod 스키마
- **통합**(RTL): 지역 선택 → 카드 렌더 → 탭 전환
- **E2E**(Playwright): 즐겨찾기 추가/삭제, 새로고침/URL 복원

---

## 13) 전달 산출물

- 리포지토리 구조 표준화(`src/components`, `src/types`, `src/app/api` 등)
- `.env.example` (필수 키/엔드포인트 명시)
- `README.md`(로컬 실행/빌드/배포 가이드)
- 간단한 **데모 데이터**(로컬 Mock 핸들러 선택)

---

## 14) 수용 기준(Acceptance Criteria)

1. 지역 선택 시 URL이 해당 지역 코드로 반영되고, 새로고침/공유 시 동일 상태가 복원된다.
2. 현재/시간별/일별 정보가 카드/탭으로 구분되어 2초 내 초기 표시(캐시 히트 시 1초 내).
3. API 오류/오프라인 시 사용자에게 명확한 메시지와 재시도 UI가 제공된다.
4. 즐겨찾기 추가/삭제/정렬이 가능하고 목록이 로컬에 지속 저장된다.
5. 접근성 검사에서 WCAG 2.1 AA 주요 기준을 충족한다.
6. 모바일(360px)\~데스크톱(1440px)까지 레이아웃이 자연스럽게 반응한다.

---

## 15) 환경 변수 정의(.env.example)

```
WEATHER_BASE_URL=https://api.openweathermap.org/data/3.0/onecall
WEATHER_API_KEY=xxxxx
AIR_BASE_URL=https://api.example-air.com/v1
AIR_API_KEY=xxxxx
DEFAULT_LANG=ko
DEFAULT_UNIT=c
```

---

## 16) 구현 체크리스트(개발자용)

- [ ] 지역 데이터 소스 구성(JSON/DB) 및 검색 인덱스
- [ ] `/api/weather` 프록시: current/hourly/daily 변환·캐싱
- [ ] `/api/air-quality` 프록시(선택)
- [ ] 홈 레이아웃 + 지역 검색 `Command` 구현, 디바운스
- [ ] 현재/예보 카드 + `Tabs` + 스켈레톤
- [ ] 즐겨찾기 저장/정렬 + URL 동기화(`nuqs`)
- [ ] 설정 페이지(단위/언어/접근성)
- [ ] 에러/오프라인 처리, 재시도 로직
- [ ] 테스트(E2E 최소 3경로), Lighthouse 90+ 달성

---
