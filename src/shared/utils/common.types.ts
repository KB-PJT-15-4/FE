export interface Paged<T> {
  content: T[]
  totalPages?: number
  totalElements?: number
}