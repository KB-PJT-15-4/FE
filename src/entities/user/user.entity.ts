export enum NotificationType {
  TRIP = 'TRIP',
  SETTLE = 'SETTLE',
}

// [마이 페이지] 주민등록증/운전면허증 통합 엔티티
export interface IdInfo {
  idCard: UserIDCard
  driverLicense: UserDriversLicenseCard
}

// [마이 페이지] 주민등록증 엔티티
export interface UserIDCard {
  idCardNumber: string // 주민번호
  name: string // 이름
  imageUrl: string // 주민등록증 이미지
  issuedDate: string // 발급일자
  address?: string /// 주민등록상 주소지
  birthday?: string
}

// [마이 페이지] 운전면허증 엔티티
export interface UserDriversLicenseCard {
  idCardNumber: string // 주민번호
  licenseNumber: string // 운전면허 번호
  name: string // 이름
  imageUrl: string // 사진
  licenseType: string // 면허 타입 (1종 대형, 1종 보통 등)
  issuedDate: string // 발급일자
  expiryDate: string // 만료일자
  issuingAgency: string // 발급 기관
}

// [알림 페이지] 알림 엔티티
export interface UserNotification {
  notificationId: number
  tripId: number
  expenseId: null | number
  notificationType: NotificationType
  sender: string // 알림 보낸 사람
  tripName: string // 여행 이름
}

// [사장님 페이지] 예약권 엔티티
interface ReservedItemType {
  type: 'ACCOMMODATION' | 'RESTAURANT' | 'TRANSPORT'
  reservationId: number
  status: string
}

export interface ReservedAccommodationItem extends ReservedItemType {
  accomId: number
  hotelName: string
  checkinDay: string
  checkoutDay: string
  guests: number
  roomType: string
}

export interface ReservedRestaurantItem extends ReservedItemType {
  restId: number
  date: string
  time: string
  resNum: number
  restName: string
}

export interface ReservedTransportationItem extends ReservedItemType {
  tranResId: number
  transportId: number
  departureName: string
  arrivalName: string
  seatRoomNo: number
  seatNumber: string
  seatType: string
  trainNo: string
  departureTime: string
  arrivalTime: string
  bookedAt: string
}
