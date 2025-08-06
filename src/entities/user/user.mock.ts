import {
  NotificationType,
  type UserDriversLicenseCard,
  type UserIDCard,
  type UserNotification,
} from './user.entity'

export const userIdCardMockData: UserIDCard = {
  idCardId: '1',
  idCardNumber: '199112311022231',
  name: '강민재',
  imageUrl:
    'https://i.namu.wiki/i/IuEKJpaTpoEz0R6t3q1mNy4gyXJzILTISJmRNyQ6ohtEF6ouOshVTNDpkxbs64ZitDjo4KSOkJ8YtP3B8V5cNg.webp',
  issueDate: '2019-09-10',
  address: '서울특별시 송파구 올림픽로 300 ',
  qrUrl:
    'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQAAAACFI5MzAAABd0lEQVR4Xu2WQY6DMAxFf9VFlhwhN6EXq1QkLkZvkiOwzALV87+HAVQ6y7ozEpZAcd7Gsr/twH4zPF8sdpCDyP4GKQDOpbZNB/gPTTTh15v76dH0Zo9wUtH0BZfxbPViPLUfIkxMtvsHiQ24ItlniKk+9TTe+LN95QLIj0b7Wah79b6ZfJsuc1rcUFLAnHiR2Cq4besTRFgQsDQtFcL6TEhLfcIILjZXhacpM9RgUpKNV3BSQB41eo8nmpFogcwGmXIKJzL6Q8PSDDgbT8GE8lSfnjSvZ7VGE2MwhTmZmB0qRW4soVEcyS8fGtrb+sQQpoO9wVbJflo1GkWKtrWcCVXLO574ktLI7FyoijKaeIt6WFQrsGo0jMiKR6SRqWQFk8J4OB/8+aDlvZnXUcR8Sg9KERdmeX7VBJCqlc1BOTfrujVDSfGVbffxtntbhhF/v3nHPsf2fsKvl0Y7xXbFZoZEEWhnaVlkdkm33ehB5LUd5CCy/0m+ANReX7vBSB26AAAAAElFTkSuQmCC',

  // 'https://i.namu.wiki/i/IuEKJpaTpoEz0R6t3q1mNy4gyXJzILTISJmRNyQ6ohtEF6ouOshVTNDpkxbs64ZitDjo4KSOkJ8YtP3B8V5cNg.webp',
}

export const userDriversLicenseMockData: UserDriversLicenseCard = {
  licenseId: '1',
  idCardNumber: '199112311022231',
  licenseNumber: '211917413301',
  name: '강민재',
  imageUrl:
    'https://i.namu.wiki/i/IuEKJpaTpoEz0R6t3q1mNy4gyXJzILTISJmRNyQ6ohtEF6ouOshVTNDpkxbs64ZitDjo4KSOkJ8YtP3B8V5cNg.webp',
  licenseType: '1종 보통',
  issueDate: '2019-09-10',
  expiryDate: '2026-09-09',
}

export const userNotificationMockData: UserNotification[] = [
  {
    id: '1',
    tripId: '2',
    type: NotificationType.SETTLE,
    sender: '강민재',
    tripName: '즐거운 부산여행',
  },
  {
    id: '2',
    tripId: '2',
    type: NotificationType.TRIP,
    sender: '강민재',
    tripName: '즐거운 부산여행',
  },
]
