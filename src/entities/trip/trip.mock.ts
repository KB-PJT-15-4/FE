import {
  ItemType,
  SettlementStatus,
  StatusType,
  type ReservationItem,
  type SettlementProgressStatus,
  type TripInfo,
  type TripMember,
  type UserReservationList,
  type UserSettlement,
} from './trip.entity'

// 여행 리스트
export const userTripListMockData: TripInfo[] = [
  {
    tripId: '1',
    tripName: '즐거운 부산여행',
    startDate: '2024-10-30',
    endDate: '2024-11-03',
    status: StatusType.Progress,
    locationName: '부산',
  },
  {
    tripId: '2',
    tripName: '춘식이보러 제주도여행',
    startDate: '2024-10-30',
    endDate: '2024-11-03',
    status: StatusType.Scheduled,
    locationName: '서울',
  },
  {
    tripId: '3',
    tripName: '프랑스로 와인마시러가자',
    startDate: '2024-10-30',
    endDate: '2024-11-03',
    status: StatusType.Finished,
    locationName: '제주도',
  },
]

// [메인페이지, 여행페이지] 예매내역 여행 당 예약내역 리스트
export const userReservationListMockData: UserReservationList[] = [
  {
    id: '1',
    tripId: '1',
    type: ItemType.Accommodation,
    title: '모아 호텔',
    date: '2025-10-23 10:23:42',
    imageUrl:
      'https://i.namu.wiki/i/kBobJDcw7LXN0tECxpFdEy17p7UEPQglVw7517nfpfA-MA8g06OPoZR4KXRWHpkMxuDA_Yw2KczKWAWfWdnuwg.webp',
  },
  {
    id: '2',
    tripId: '1',
    type: ItemType.Restaurant,
    title: '철구네 술집',
    date: '2025-10-24 10:23:42',
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/19/19/45/ad/140.jpg',
  },
  {
    id: '3',
    tripId: '1',
    title: 'KTX 35',
    type: ItemType.Transportation,
    date: '2025-10-22 02:03:10',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/KTX-I_in_Seoul_Station.jpg/960px-KTX-I_in_Seoul_Station.jpg',
  },
  {
    id: '4',
    tripId: '1',
    type: ItemType.Restaurant,
    title: '철구네 술집',
    date: '2025-10-24 10:23:42',
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/19/19/45/ad/140.jpg',
  },
]

// [여헹 페이지] 여행 기본 정보
export const tripInformationMockData: TripInfo = {
  tripId: '1',
  tripName: '즐거운 부산여행',
  startDate: '2024-10-30',
  endDate: '2024-11-03',
  status: StatusType.Progress,
  locationName: '부산',
}

// [여행 페이지] 여행 멤버
export const tripMemberListMockData: TripMember[] = [
  {
    memberId: 1,
    memberName: '강민재',
    memberEmail: 'minijae011030@gmail.com',
  },
  {
    memberId: 2,
    memberName: '곽효재',
    memberEmail: 'hyo@gmail.com',
  },
  {
    memberId: 3,
    memberName: '김동연',
    memberEmail: 'dong@gmail.com',
  },
  {
    memberId: 4,
    memberName: '김미정',
    memberEmail: 'mijeong@gmail.com',
  },
  {
    memberId: 5,
    memberName: '이호진',
    memberEmail: 'hojin@gmail.com',
  },
  {
    memberId: 6,
    memberName: '정다현',
    memberEmail: 'dahyun@gmail.com',
  },
]

// [여행 페이지] 예약 가능 내역 리스트
export const availableAccommodationReservationListMockData: ReservationItem[] = [
  {
    itemId: '1',
    type: ItemType.Accommodation, // 숙박, 교통, 식당
    title: '모아 호텔', // 예매 항목 장소 이름
    description: '아늑한 모아호텔입니다', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/kBobJDcw7LXN0tECxpFdEy17p7UEPQglVw7517nfpfA-MA8g06OPoZR4KXRWHpkMxuDA_Yw2KczKWAWfWdnuwg.webp', // 예매 항목 사진
  },
  {
    itemId: '2',
    type: ItemType.Accommodation, // 숙박, 교통, 식당
    title: '시그니엘', // 예매 항목 장소 이름
    description: '잠실의 명물', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/Jvvw-ykN0duT7SbML188jyr6JMASSkCnlaPMEx6EwQsWaUys5yKkWeEbheELtYCQKUj2XazRPc5Sh0EpVGJEkw.webp', // 예매 항목 사진
  },
  {
    itemId: '3',
    type: ItemType.Accommodation, // 숙박, 교통, 식당
    title: '신라호텔', // 예매 항목 장소 이름
    description: '3성급 신라호텔입니다', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/_VdL80a6q8YfJ3ob0cH0g6M4C4u3eafyHQV8oHFnZetT7yEjHPC8hybEh7-Xwfz6H6S4EkwBn6mkLvhb7rGscQ.webp', // 예매 항목 사진
  },
]

export const availableTransportationReservationListMockData: ReservationItem[] = [
  {
    itemId: '1',
    type: ItemType.Transportation, // 숙박, 교통, 식당
    title: 'KTX 30', // 예매 항목 장소 이름
    description: '아늑한 모아호텔입니다', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/kBobJDcw7LXN0tECxpFdEy17p7UEPQglVw7517nfpfA-MA8g06OPoZR4KXRWHpkMxuDA_Yw2KczKWAWfWdnuwg.webp', // 예매 항목 사진
  },
  {
    itemId: '2',
    type: ItemType.Transportation, // 숙박, 교통, 식당
    title: 'KTX 32', // 예매 항목 장소 이름
    description: '잠실의 명물', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/Jvvw-ykN0duT7SbML188jyr6JMASSkCnlaPMEx6EwQsWaUys5yKkWeEbheELtYCQKUj2XazRPc5Sh0EpVGJEkw.webp', // 예매 항목 사진
  },
  {
    itemId: '3',
    type: ItemType.Transportation, // 숙박, 교통, 식당
    title: 'KTX 33', // 예매 항목 장소 이름
    description: '3성급 신라호텔입니다', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/_VdL80a6q8YfJ3ob0cH0g6M4C4u3eafyHQV8oHFnZetT7yEjHPC8hybEh7-Xwfz6H6S4EkwBn6mkLvhb7rGscQ.webp', // 예매 항목 사진
  },
]

export const availableRestaurantReservationListMockData: ReservationItem[] = [
  {
    itemId: '1',
    type: ItemType.Restaurant, // 숙박, 교통, 식당
    title: '빕스', // 예매 항목 장소 이름
    description: '아늑한 모아호텔입니다', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/kBobJDcw7LXN0tECxpFdEy17p7UEPQglVw7517nfpfA-MA8g06OPoZR4KXRWHpkMxuDA_Yw2KczKWAWfWdnuwg.webp', // 예매 항목 사진
  },
  {
    itemId: '2',
    type: ItemType.Restaurant, // 숙박, 교통, 식당
    title: '다모아 수산시장', // 예매 항목 장소 이름
    description: '잠실의 명물', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/Jvvw-ykN0duT7SbML188jyr6JMASSkCnlaPMEx6EwQsWaUys5yKkWeEbheELtYCQKUj2XazRPc5Sh0EpVGJEkw.webp', // 예매 항목 사진
  },
  {
    itemId: '3',
    type: ItemType.Restaurant, // 숙박, 교통, 식당
    title: '행복한그릇', // 예매 항목 장소 이름
    description: '3성급 신라호텔입니다', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/_VdL80a6q8YfJ3ob0cH0g6M4C4u3eafyHQV8oHFnZetT7yEjHPC8hybEh7-Xwfz6H6S4EkwBn6mkLvhb7rGscQ.webp', // 예매 항목 사진
  },
]

// [예약 페이지] 예약 아이템 정보
export const reservationItemInfoMockData: ReservationItem = {
  itemId: '1',
  type: ItemType.Accommodation, // 숙박, 교통, 식당
  title: '모아 호텔', // 예매 항목 장소 이름
  description: '아늑한 모아호텔입니다', // 설명(optional)
  imageUrl:
    'https://i.namu.wiki/i/kBobJDcw7LXN0tECxpFdEy17p7UEPQglVw7517nfpfA-MA8g06OPoZR4KXRWHpkMxuDA_Yw2KczKWAWfWdnuwg.webp', // 예매 항목 사진
  address: '서울특별시 송파구 올림픽로 300',
  price: 300000,
}

// [여행 페이지] 정산 내역 리스트
export const userSettlementListMockData: UserSettlement[] = [
  {
    expenseId: '1',
    expenseDate: '2025-10-30T00:00:00',
    shareAmount: 10000,
    received: false, // 보낸 요청
    status: SettlementStatus.PENDING, // 보낸 요청 정산 진행중
  },
  {
    expenseId: '2',
    expenseDate: '2025-10-30T00:00:00',
    shareAmount: 10000,
    received: false, // 보낸 요청
    status: SettlementStatus.COMPLETED, // 정산 완료
  },
  {
    expenseId: '3',
    expenseDate: '2025-10-30T00:00:00',
    shareAmount: 10000,
    received: true, // 받은 요청
    status: SettlementStatus.COMPLETED, // 정산 완료
  },
  {
    expenseId: '4',
    expenseDate: '2025-10-30T00:00:00',
    shareAmount: 10000,
    received: true, // 받은 요청
    status: SettlementStatus.WAITING, // 받은 요청 정산 미완료
  },
  {
    expenseId: '5',
    expenseDate: '2025-10-30T00:00:00',
    shareAmount: 10000,
    received: true, // 받은 요청
    status: SettlementStatus.PENDING, // 받은 요청 정산 진행중 (나는 보냈는데 다른 사람이 안보낸경우)
  },
]

export const settlementProgressStatusMockData: SettlementProgressStatus = {
  title: '점심 돼지국밥',
  date: '2025-08-03',
  amount: 108000,
  progresses: [
    { name: '카리나', status: '정산 진행중' },
    { name: '윈터', status: '정산 진행중' },
    { name: '닝닝', status: '정산 완료' },
    { name: '지젤', status: '정산 완료' },
  ],
}
