import {
  NotificationType,
  type UserDriversLicenseCard,
  type UserIDCard,
  type UserNotification,
} from './user.entity'

export const userIdCardMockData: UserIDCard = {
  idCardNumber: '199112311022231',
  name: '강민재',
  imageUrl:
    'https://i.namu.wiki/i/IuEKJpaTpoEz0R6t3q1mNy4gyXJzILTISJmRNyQ6ohtEF6ouOshVTNDpkxbs64ZitDjo4KSOkJ8YtP3B8V5cNg.webp',
  issuedDate: '2019-09-10',
  address: '서울특별시 송파구 올림픽로 300 ',
  birthday: '2001-10-10',
}

export const userDriversLicenseMockData: UserDriversLicenseCard = {
  idCardNumber: '199112311022231',
  licenseNumber: '211917413301',
  name: '강민재',
  imageUrl:
    'https://i.namu.wiki/i/IuEKJpaTpoEz0R6t3q1mNy4gyXJzILTISJmRNyQ6ohtEF6ouOshVTNDpkxbs64ZitDjo4KSOkJ8YtP3B8V5cNg.webp',
  licenseType: '1종 보통',
  issuedDate: '2019-09-10',
  expiryDate: '2026-09-09',
  issuingAgency: '송파구청장',
}

export const userNotificationMockData: UserNotification[] = [
  {
    notificationId: 1,
    tripId: 2,
    notificationType: NotificationType.SETTLE,
    sender: '강민재',
    tripName: '즐거운 부산여행',
    expenseId: 1,
  },
  {
    notificationId: 2,
    tripId: 2,
    notificationType: NotificationType.TRIP,
    sender: '강민재',
    tripName: '즐거운 부산여행',
    expenseId: null,
  },
]
