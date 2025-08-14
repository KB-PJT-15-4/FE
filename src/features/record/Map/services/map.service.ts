import type { MapLocation } from '@/entities/record/record.entity'
import { API_END_POINT } from '@/shared/utils/fetcher'

import BUSAN_IMG from '@/assets/BUSAN.jpeg'
import GANGNEUNG_IMG from '@/assets/GANGNEUNG.jpeg'
import JEJU_IMG from '@/assets/JEJU.jpeg'
import SEOUL_IMG from '@/assets/SEOUL.jpeg'

declare global {
  interface Window {
    kakao?: {
      maps: unknown
    }
  }
}

// 지역별 마커 아이콘 매핑
const MARKER_ICON_MAP: Record<string, string> = {
  BUSAN: BUSAN_IMG,
  GANGNEUNG: GANGNEUNG_IMG,
  JEJU: JEJU_IMG,
  SEOUL: SEOUL_IMG,
}

// 기본 아이콘
const DEFAULT_ICON =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'

export function normalizeKey(name = ''): string {
  return String(name).trim().toUpperCase()
}

export function getIconSrcByLocationName(locationName?: string): string {
  const key = normalizeKey(locationName ?? '')
  return MARKER_ICON_MAP[key] ?? DEFAULT_ICON
}

// 원형 마커 HTML
export function createCircleMarker(src: string, size = 36): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.style.width = `${size}px`
  wrapper.style.height = `${size}px`
  wrapper.style.borderRadius = '50%'
  wrapper.style.overflow = 'hidden'
  wrapper.style.border = '2px solid white'
  wrapper.style.boxShadow = '0 0 4px rgba(0,0,0,0.3)'
  wrapper.style.backgroundColor = '#fff'
  wrapper.style.cursor = 'pointer'

  const img = document.createElement('img')
  img.src = src
  img.alt = 'marker'
  img.style.width = '100%'
  img.style.height = '100%'
  img.style.objectFit = 'cover'

  wrapper.appendChild(img)
  return wrapper
}

// 정보 풍선 HTML
export function createInfoBalloon(item: Pick<MapLocation, 'locationName' | 'address'>): HTMLDivElement {
  const balloon = document.createElement('div')
  balloon.innerHTML = `
    <div style="position:relative; background-color:rgba(255, 255, 255, 0.7); border:1px solid #ccc; padding:10px; font-size:12px; border-radius:10px;">
      <div style="font-weight:bold; margin-bottom:4px;">${item.locationName}</div>
      <div style="margin-bottom:3px;">${item.address ?? ''}</div>
      <button id="closeOverlay" style="position:absolute; top:4px; right:6px; background:none; border:none; font-size:16px; cursor:pointer;">×</button>
    </div>
  `
  return balloon as HTMLDivElement
}

// Kakao SDK 로드
export async function ensureKakaoLoaded(appKey: string): Promise<void> {
  if (typeof window === 'undefined') return
  const hasSDK = (window.kakao) && (window.kakao.maps)
  if (hasSDK) return

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Kakao Maps SDK 로드 실패'))
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`
    document.head.appendChild(script)
  })
}

// trip-locations API (fetch 사용)
export async function fetchLocationsService(params: {
  token: string | null
}): Promise<MapLocation[]> {
  const { token } = params
  if (!token) throw new Error('No access token found')

  const { url, method } = API_END_POINT.map.getTripLocations()
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody?.message ?? 'Failed to fetch trip locations')
  }

  const data = await res.json()
  return data.data as MapLocation[]
}

