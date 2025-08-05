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