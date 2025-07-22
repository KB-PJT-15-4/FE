import type { UserDriversLicenseCard, UserIDCard } from './user.entity'

export const userIdCardMockData: UserIDCard = {
  idCardId: '1',
  idCardNumber: '199112311022231',
  name: '강민재',
  imageUrl:
    'https://i.namu.wiki/i/IuEKJpaTpoEz0R6t3q1mNy4gyXJzILTISJmRNyQ6ohtEF6ouOshVTNDpkxbs64ZitDjo4KSOkJ8YtP3B8V5cNg.webp',
  issueDate: '2019-09-10',
  address: '서울특별시 송파구',
  qrUrl: 'https://m.site.naver.com/1N9zx',
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
