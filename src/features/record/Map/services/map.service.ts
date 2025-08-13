import axios from 'axios'
import type { MapLocation } from '@/entities/record/record.entity'

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

// 마커 형태 커스텀
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

// 오버레이 
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

// 카카오맵 API 호출
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

// trip-location API 호출
export async function fetchLocationsService(params: {
  token: string | null
  apiBaseUrl: string
}): Promise<MapLocation[]> {
  const { token, apiBaseUrl } = params
  if (!token) throw new Error('No access token found')

  const res = await axios.get(`${apiBaseUrl}/api/trip-locations`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  })

  return res.data.data as MapLocation[]
}
