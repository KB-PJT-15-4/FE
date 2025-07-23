import type { AvailableReservation, TripInfo, UserReservationList } from './trip.entity'

// 여행 리스트
export const userTripListMockData: TripInfo[] = [
  {
    id: '1',
    title: '즐거운 부산여행',
    startDate: '2024-10-30',
    endDate: '2024-11-03',
    status: '여행 중',
    location: '부산',
  },
  {
    id: '2',
    title: '춘식이보러 제주도여행',
    startDate: '2024-10-30',
    endDate: '2024-11-03',
    status: '여행 예정',
    location: '서울',
  },
  {
    id: '3',
    title: '프랑스로 와인마시러가자',
    startDate: '2024-10-30',
    endDate: '2024-11-03',
    status: '여행 종료',
    location: '제주도',
  },
]

// [메인페이지, 여행페이지] 예매내역 여행 당 예약내역 리스트
export const userReservationListMockData: UserReservationList[] = [
  {
    id: '1',
    tripId: '1',
    type: 'accommodation',
    title: '모아 호텔',
    date: '2025-10-23 10:23:42',
    imageUrl:
      'https://i.namu.wiki/i/kBobJDcw7LXN0tECxpFdEy17p7UEPQglVw7517nfpfA-MA8g06OPoZR4KXRWHpkMxuDA_Yw2KczKWAWfWdnuwg.webp',
  },
  {
    id: '2',
    tripId: '1',
    type: 'restaurant',
    title: '철구네 술집',
    date: '2025-10-24 10:23:42',
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/19/19/45/ad/140.jpg',
  },
  {
    id: '3',
    tripId: '1',
    title: 'KTX 35',
    type: 'transportation',
    date: '2025-10-22 02:03:10',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/KTX-I_in_Seoul_Station.jpg/960px-KTX-I_in_Seoul_Station.jpg',
  },
]

// [여헹 페이지] 여행 기본 정보
export const tripInformationMockData: TripInfo = {
  id: '1',
  title: '즐거운 부산여행',
  startDate: '2024-10-30',
  endDate: '2024-11-03',
  status: '여행 중',
  location: '부산',
}

// [여행 페이지] 예약 가능 내역 리스트
export const availableReservationListMockData: AvailableReservation[] = [
  {
    itemId: '1',
    type: 'accommodation', // 숙박, 항공, 식당
    title: '모아 호텔', // 예매 항목 장소 이름
    description: '아늑한 모아호텔입니다', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/kBobJDcw7LXN0tECxpFdEy17p7UEPQglVw7517nfpfA-MA8g06OPoZR4KXRWHpkMxuDA_Yw2KczKWAWfWdnuwg.webp', // 예매 항목 사진
  },
  {
    itemId: '2',
    type: 'accommodation', // 숙박, 항공, 식당
    title: '시그니엘', // 예매 항목 장소 이름
    description: '잠실의 명물', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/Jvvw-ykN0duT7SbML188jyr6JMASSkCnlaPMEx6EwQsWaUys5yKkWeEbheELtYCQKUj2XazRPc5Sh0EpVGJEkw.webp', // 예매 항목 사진
  },
  {
    itemId: '3',
    type: 'accommodation', // 숙박, 항공, 식당
    title: '신라호텔', // 예매 항목 장소 이름
    description: '3성급 신라호텔입니다', // 설명(optional)
    imageUrl:
      'https://i.namu.wiki/i/_VdL80a6q8YfJ3ob0cH0g6M4C4u3eafyHQV8oHFnZetT7yEjHPC8hybEh7-Xwfz6H6S4EkwBn6mkLvhb7rGscQ.webp', // 예매 항목 사진
  },
]
