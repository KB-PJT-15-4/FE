export const filterTabOptions = ['전체', '교통', '숙박', '식당']
export const filterTabOptions2 = ['내역 ', '요청']
export const locationList = ['서울', '부산', '제주', '강릉']
export const transportStationNameList = [
  '서울역',
  '부산역',
  '대구역',
  '인천역',
  '광주역',
  '대전역',
  '울산역',
]
export const timeOptions = [
  '07:30',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
]
export const containers = ['1칸', '2칸', '3칸', '4칸', '5칸', '6칸', '7칸', '8칸', '9칸', '10칸']
export const reservationTime = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
]

export enum ItemType {
  Accommodation = 'accommodation',
  Transportation = 'transportation',
  Restaurant = 'restaurant',
}

export enum StatusType {
  Scheduled = '여행 예정',
  Progress = '여행 중',
  Finished = '여행 종료',
}

export enum LocationImage {
  SEOUL = 'https://t1.daumcdn.net/news/202408/04/speaktravel/20240804090001287dbfq.jpg',
  BUSAN = 'https://lh3.googleusercontent.com/proxy/s0qhsJFOrE3Di0sZmcZ9dh7s6mlHtIEIid94pHKcmWJYqoj7v9RefB8rhTNnZpP094PUNQTnshxOPLednYZFhZ9wQwbQ3e4AUWpeBxDZxlHTx-sTGJ54G7EqNn4hafXF4g',
  JEJU = 'https://www.agoda.com/wp-content/uploads/2024/07/Jeju-Island-1244x700.jpg',
  GANGNEUNG = 'https://tletter.co.kr/files/attach/images/157/517/019/f350655e0950f384b6d8a55d47e4ab23.jpg',
}

// [마이페이지, 여행 페이지] 여행 리스트
export interface TripInfo {
  tripId: number
  tripName: string
  startDate: string
  endDate: string
  status: StatusType
  locationName: string
}

export interface UpcomingTripInfo {
  tripId: number
  title: string
  startDate: string
  endDate: string
  locationName: string
  memberCount: number
  status: string
  dday: number
}

// [여행 페이지] 여행 멤버
export interface TripMember {
  memberId: number
  memberName: string
  memberEmail: string
}

// [마이페이지, 여헹 페이지] 여행 당 예약내역 리스트
export interface UserReservationList {
  name: string
  itemId: number
  reservationId: number
  date: string
  resKind: string
  imageUrl: string
}

// [마이페이지, 여행페이지] 예매 내역 QR 보기 엔티티
interface Item {
  type: string
  status: string
}

export interface RestaurantInfoItem extends Item {
  reservationId: number
  restName: string
  address: string
  date: string
  time: string
  resNum: number
  status: string
}

export interface AccommodationInfoItem extends Item {
  reservationId: number
  hotelName: string
  address: string
  roomType: string
  checkinDay: string
  checkoutDay: string
  guests: number
  location: string
}

export interface TransportInfoItem extends Item {
  tranResId: number
  reservationId: number
  trainNo: string
  departureName: string
  arrivalName: string
  departureTime: string
  arrivalTime: string
  seatRoomNo: number
  seatNumber: string
  seatType: string
}

export interface Reservation {
  qrCodeString: string
  details: RestaurantInfoItem | AccommodationInfoItem | TransportInfoItem
}

// [여행 페이지] 예매 가능 항목
export interface ReservationItem {
  itemId: string // 예매 항목 id
  type: ItemType // 숙박, 교통, 식당
  title: string // 예매 항목 장소 이름
  imageUrl: string // 예매 항목 사진

  description?: string // 예매 가능 항목 설명(optional)
  address?: string // restaurant, accommodation 주소(optional)

  price?: number // 예매 페이지에서 띄울 인당 가격
}

// [예매 페이지] 예매하기
interface BaseReservationInfo {
  itemId: string
}

export interface AccommodationReservation extends BaseReservationInfo {
  startDate: string
  endDate: string
}

export interface TransportationReservation extends BaseReservationInfo {
  origin: string
  destination: string
  date: string

  time: string
}

export interface RestaurantReservation extends BaseReservationInfo {
  category: string
  date: string
}

export interface TransportationItem {
  transportId: number
  departureName: string
  trainNo: string
  origin?: string
  destination?: string
  startDate?: string
  startTime?: string
}

export interface AccommodationItem {
  accomId: number
  hotelName: string
  address: string
  location: string
  hotelImageUrl: string
}

export interface RestaurantItem {
  restId: number
  restName: string
  restImageUrl: string
  description: string
  address?: string
}

// [예매 페이지] 식당 카테고리
export interface RestaurantCategory {
  categoryId: number
  categoryName: string
  categoryCode: string
}

// [예매 페이지] 식당 예약 가능 시간
export interface RestaurantTimeSlot {
  time: string
  restTimeId: number
  maxNum: number
  reservedNum: number
  availableNum: number
}

// [예매 페이지] 숙박 방 타입 엔티티
export interface RoomType {
  accomResId: number
  maxGuests: number
  hotelName: string
  price: number
  roomType: string
  roomImageUrl: string
}

// [예매 페이지] 좌석 엔티티
export interface TransportationSeat {
  price: number
  seatNumber: string
  seatRoomNo: number
  seatType: string
  status: string
  tranResId: number
}

// [여행 페이지] 정산 내역
export enum SettlementDirection {
  SENT = 'sent', // 보낸 요청
  RECEIVED = 'received', // 받은 요청
}
export enum SettlementStatus {
  PENDING = '정산 진행중',
  COMPLETED = '정산 완료',
  WAITING = '정산 하기',
}

// [여행 페이지] 정산내역 리스트
export interface UserSettlement {
  expenseId: string // 정산 id
  expenseName: string
  expenseDate: string
  shareAmount: number
  received: boolean
  status: SettlementStatus
}

// [여행 페이지] 정산 현황
export interface SettlementProgressStatus {
  expenseName: string
  expenseDate: string
  amount: number
  progresses: { name: string; status: string }[]
}

// [여행 페이지] 정산 요청 멤버 내역
export interface SettleExpenses {
  memberId: number
  amount: number
}

// [여행 페이지] 정산 정보
export interface SettleInfo {
  receiverName: string // 보낼사람 이름
  shareAmount: number // 보낼 금액
  balance: number // 현재 잔액
}

// [메인페이지] 마이페이지 여행 추천 목데이터
export interface TripRecommendation {
  name: string
  imageUrl: string

  location: string
  rating: number
}

// [메인페이지] 메인페이지 피드 엔티티
export interface FeedItem {
  id: string
  user: string
  avatar: string
  action: '기록을 남겼어요' | '호텔을 예약하였어요' | '식당을 예약하였어요'
  tripId: string
  tripName: string
  extra?: string // 호텔명, 식당명 등
  place?: string
  thumb?: string
  timeISO: string
  timeText: string // '3시간 전' 같은 가독성 문자열
}
