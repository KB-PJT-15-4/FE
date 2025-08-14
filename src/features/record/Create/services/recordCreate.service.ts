import { API_END_POINT } from '@/shared/utils/fetcher'

// 공통
function getTokenOrThrow(): string {
  const token = localStorage.getItem('accessToken')
  if (!token) throw new Error('Access token not found')
  return token
}
async function ensureOk(res: Response) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.message ?? 'Request failed')
  }
}

export type ExistingImage = { url: string; fileName: string }
export type RecordDetailDTO = {
  title: string
  recordDate: string
  content: string
  images?: ExistingImage[]
}

// RecordCreate.vue 기능 분리
export async function fetchRecordDetail(
  tripId: number,
  recordId: number
): Promise<RecordDetailDTO> {
  const token = getTokenOrThrow()
  const { url, method } = API_END_POINT.record.getRecordDetail(tripId, recordId)
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/json' },
  })
  await ensureOk(res)
  const json = await res.json()
  // API 응답이 { code, data } 
  return json?.data as RecordDetailDTO
}

// 생성용
export function buildCreateFormData(params: {
  title: string
  recordDate: string
  content: string
  imageFiles: File[]
}): FormData {
  const { title, recordDate, content, imageFiles } = params
  const formData = new FormData()
  formData.append('title', title)
  formData.append('recordDate', recordDate)
  formData.append('content', content)
  imageFiles.forEach((f) => formData.append('imageUrls', f))
  return formData
}
// 수정용
export function buildUpdateFormData(params: {
  title: string
  recordDate: string
  content: string
  existingImages: ExistingImage[]
  imageFiles: File[]
}): FormData {
  const { title, recordDate, content, existingImages, imageFiles } = params
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

// 추가
export async function createRecord(
  tripId: number,
  formData: FormData
): Promise<{ code?: string; data?: unknown }> {
  const token = getTokenOrThrow()
  const { url, method } = API_END_POINT.record.createRecord(tripId)
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      // multipart는 Content-Type 지정 금지
    },
    body: formData,
  })
  await ensureOk(res)
  return res.json().catch(() => ({}))
}

// 수정
export async function updateRecord(
  tripId: number,
  recordId: number,
  formData: FormData
): Promise<{ code?: string; data?: unknown }> {
  const token = getTokenOrThrow()
  const { url, method } = API_END_POINT.record.updateRecord(tripId, recordId)
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  await ensureOk(res)
  return res.json().catch(() => ({}))
}