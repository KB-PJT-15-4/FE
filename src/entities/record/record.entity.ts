export interface RecordProps {
  record: {
    title: string
    date: string
    imageUrl?: string
    content: string
  } | null
}

export interface ReservationItem {
  name: string
  itemId: number
  imageUrl: string
  date: string
  createdAt: string
  resKind: string
}

export interface PaymentRecord {
  paymentId: number
  paymentName: string
  paymentPrice: number
  paymentDate: string
}

// [기록 페이지] 지도 타입
export interface Trip {
  tripId: number
  tripName: string
  status: string
  startDate: string
  endDate: string
  locationName: string
}

export interface Record {
  recordId: number
  tripId: number
  title: string
  recordDate: string
  content: string
  imageUrls?: string[]
  createdAt: string
}

// [map.service.ts] 타입
export interface MapLocation {
  locationName: string
  latitude: number
  longitude: number
  address?: string | null
}

export interface ExistingImage {
  url: string
  fileName: string
}

export interface RecordDetail {
  title: string
  recordDate: string
  content: string
  images?: ExistingImage[]
}
