export interface RecordProps {
  record: {
    title: string
    date: string
    imageUrl?: string
    content: string
  } | null
}

export interface ApiReservationItem {
  name: string
  itemId: number
  imageUrl: string
  date: string
  createdAt: string
  resKind: string
}

export interface ApiPaymentRecord {
  paymentId: number
  paymentName: string
  paymentPrice: number
  paymentDate: string
}