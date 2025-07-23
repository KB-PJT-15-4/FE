import type { OverLay } from "@/entities/map/map.entity";

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

// Detail 페이지에 예매내역칸에 추가할 mock 데이터 추가예정