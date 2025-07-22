// [메인페이지] 주민등록증/운전면허증 엔티티
export interface UserIDCard {
  id: string
  name: string
  imageUrl: string
  birth: string
  qrUrl?: string
}
