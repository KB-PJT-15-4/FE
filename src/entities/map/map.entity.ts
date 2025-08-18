import BUSAN_IMG from '@/assets/BUSAN.jpeg'
import GANGNEUNG_IMG from '@/assets/GANGNEUNG.jpeg'
import JEJU_IMG from '@/assets/JEJU.jpeg'
import SEOUL_IMG from '@/assets/SEOUL.jpeg'

// 지역별 마커 아이콘 매핑
export const MARKER_ICON_MAP: Record<string, string> = {
  BUSAN: BUSAN_IMG,
  GANGNEUNG: GANGNEUNG_IMG,
  JEJU: JEJU_IMG,
  SEOUL: SEOUL_IMG,
}

// 기본 아이콘
export const DEFAULT_ICON =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'

export function normalizeKey(name = ''): string {
  return String(name).trim().toUpperCase()
}
