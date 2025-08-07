export enum NotificationType {
  TRIP = 'TRIP',
  SETTLE = 'SETTLE',
}
// [메인페이지] 주민등록증 엔티티
export interface UserIDCard {
  idCardNumber: string // 주민번호
  name: string // 이름
  imageUrl: string // 주민등록증 이미지
  issuedDate: string // 발급일자
  address?: string /// 주민등록상 주소지
  birthday?: string
}

// [메인페이지] 운전면허증 엔티티
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

// [알림페이지] 알림 엔티티
export interface UserNotification {
  notificationId: number
  tripId: number
  expenseId: null | number
  notificationType: NotificationType
  sender: string // 알림 보낸 사람
  tripName: string // 여행 이름
}
