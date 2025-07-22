// YYYY-MM-DD 날짜 -> YYYY.MM.DD 포맷팅
export function formatFullDateToKorean(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

// 주민번호 -> 생일 YYYY.MM.DD 포맷팅
export function formatBirthDateFromId(idCardNumber: string): string {
  const year = idCardNumber.slice(0, 4)
  const month = idCardNumber.slice(4, 6)
  const day = idCardNumber.slice(6, 8)

  return `${year}.${month}.${day}`
}

// 주민번호 -> 000000-0000000 포맷팅
export function formatIdCardNumber(idCardNumber: string): string {
  return `${idCardNumber.slice(0, 6)}-${idCardNumber.slice(6, 13)}`
}

// 운전면허번호 -> 00-00-000000-00 포맷팅
export function formatDriversLicenseCardNumber(licenseNumber: string): string {
  return `${licenseNumber.slice(0, 2)}-${licenseNumber.slice(2, 4)}-${licenseNumber.slice(4, 10)}-${licenseNumber.slice(10, 12)}`
}
