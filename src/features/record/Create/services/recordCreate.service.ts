import type { ExistingImage, Record, RecordDetail } from '@/entities/record/record.entity'
import { api } from '@/shared/utils/api'
import { API_END_POINT, type ApiData } from '@/shared/utils/fetcher'

/**
 * 기록 상세 조회
 * @param tripId 여행 id
 * @param recordId 기록 id
 * @returns
 */
export async function getRecordDetail(tripId: number, recordId: number): Promise<RecordDetail> {
  const { url, method } = API_END_POINT.record.getRecordDetail(tripId, recordId)

  const res = await api.request<ApiData<RecordDetail>>(url, { method })
  return res.data
}

/**
 * 기록 생성 시 폼 데이터 생성
 * @param title 제목
 * @param recordDate 날짜
 * @param content 본문
 * @param imageFiles 이미지 파일: File[]
 * @returns FormData
 */
export function buildCreateFormData(
  title: string,
  recordDate: string,
  content: string,
  imageFiles: File[]
): FormData {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('recordDate', recordDate)
  formData.append('content', content)
  imageFiles.forEach((f) => formData.append('imageUrls', f))

  return formData
}

/**
 * 기록 수정 시 폼 데이터 생성
 * @param title 제목
 * @param recordDate 날짜
 * @param content 본문
 * @param existingImages 존재하는 이미지 파일 리스트
 * @param imageFiles 이미지 파일: File[]
 * @returns FormData
 */
export function buildUpdateFormData(
  title: string,
  recordDate: string,
  content: string,
  existingImages: ExistingImage[],
  imageFiles: File[]
): FormData {
  const formData = new FormData()

  formData.append('title', title)
  formData.append('recordDate', recordDate)
  formData.append('content', content)

  existingImages.forEach((img) => {
    if (img?.fileName) formData.append('existingImageFileNames', img.fileName)
  })
  imageFiles.forEach((f) => formData.append('newImages', f))

  return formData
}

/**
 * 기록 추가
 * @param tripId 여행 id
 * @param formData 폼데이터
 * @returns Record
 */
export async function createRecord(tripId: number, formData: FormData): Promise<Record> {
  const { url, method } = API_END_POINT.record.createRecord(tripId)

  const res = await api.request<ApiData<Record>>(url, { method, data: formData })
  return res.data
}

/**
 * 기록 수정
 * @param tripId 여행 id
 * @param recordId 기록 id
 * @param formData 폼데이터
 * @returns Record
 */
export async function updateRecord(
  tripId: number,
  recordId: number,
  formData: FormData
): Promise<Record> {
  const { url, method } = API_END_POINT.record.updateRecord(tripId, recordId)

  const res = await api.request<ApiData<Record>>(url, { method, data: formData })
  return res.data
}
