import { DEFAULT_ICON, MARKER_ICON_MAP, normalizeKey } from '@/entities/map/map.entity'
import type { MapLocation } from '@/entities/record/record.entity'
import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData } from '@/shared/utils/fetcher'

/**
 * 지역 별 아이콘 리턴
 * @param locationName 지역 이름
 * @returns 아이콘
 */
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
export function createInfoBalloon(
  item: Pick<MapLocation, 'locationName' | 'address'>
): HTMLDivElement {
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
  const hasSDK = window.kakao && window.kakao.maps
  if (hasSDK) return

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Kakao Maps SDK 로드 실패'))
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`
    document.head.appendChild(script)
  })
}

/**
 * 여행 지역 조회
 * @returns MapLocation[]
 */
export async function getTripLocations(): Promise<MapLocation[]> {
  const { url, method } = API_END_POINT.map.getTripLocations()

  const res = await api.request<ApiData<MapLocation[]>>(url, { method })
  return res.data
}
