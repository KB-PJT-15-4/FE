import type { UserReservationList, OverLay, CreditList } from "@/entities/map/map.entity";

export const mockData: OverLay[] = [
    {
        tripId: 1,
        title: "즐거운 부산여행",
        startDate: "2025-03-24",
        endDate: "2025-03-26",
        status: "여행 중",
        location: "부산",
        latitude: 35.1631,
        longitude: 129.1607,
    },
    {
        tripId: 2,
        title: "즐거운 서울여행",
        startDate: "2025-03-24",
        endDate: "2025-03-26",
        status: "여행 종료",
        location: "서울",
        latitude: 37.4979,
        longitude: 126.9828,
    },
    {
        tripId: 3,
        title: "즐거운 제주여행",
        startDate: "2025-03-24",
        endDate: "2025-03-26",
        status: "여행 예정",
        location: "제주",
        latitude: 33.451393,
        longitude: 126.570738,
    },
    {
        tripId: 4,
        title: "즐거운 서울여행 2",
        startDate: "2025-03-27",
        endDate: "2025-03-29",
        status: "여행 중",
        location: "서울",
        latitude: 37.4979,
        longitude: 126.9828,
    },
]

// 여행 예매내역
export const userReservationListMockData: UserReservationList[] = [
  {
    id: '1',
    type: 'accommodation',
    title: '모아 호텔',
    date: '2025-10-23 10:23:42',
    imageUrl:
      'https://i.namu.wiki/i/kBobJDcw7LXN0tECxpFdEy17p7UEPQglVw7517nfpfA-MA8g06OPoZR4KXRWHpkMxuDA_Yw2KczKWAWfWdnuwg.webp',
  },
  {
    id: '2',
    type: 'restaurant',
    title: '철구네 술집',
    date: '2025-10-24 10:23:42',
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/19/19/45/ad/140.jpg',
  },
  {
    id: '3',
    title: 'KTX 35',
    type: 'transportation',
    date: '2025-10-22 02:03:10',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/KTX-I_in_Seoul_Station.jpg/960px-KTX-I_in_Seoul_Station.jpg',
  },
]

// 결재내역 mock 데이터
export const creditMockData: CreditList[] = [
    {
        title: '멀티캠퍼스 베이커리',
        date: '2025-03-24',
        cost: 60000,
    }
]