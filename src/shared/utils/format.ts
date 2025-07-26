// YYYY-MM-DD 날짜 -> YYYY.MM.DD 포맷팅
export function formatFullDateToKorean(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

// YYYY-MM-DDTHH:mm:ss -> YYYY.MM.DD HH:mm:ss
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`
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

// 숫자 포맷 (3자리 콤마)
export const formatNumber = (value: number) =>
  value.toLocaleString('ko-KR', { maximumFractionDigits: 0 })

// 숫자 포맷에 끝에 '원' 을 추가해서 포맷
export const formatCurrency = (value: number): string =>
  `${formatNumber(value)}원`
