export interface RecordProps {
  record: {
    title: string
    date: string
    imageUrl?: string
    content: string
  } | null
}