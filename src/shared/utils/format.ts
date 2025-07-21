// YYYY-MM-DD 으로 date 데이터 값 받아와서 .으로 포맷팅 해야함

export function formatFullDateToKorean(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}`;
}
