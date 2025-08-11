<template>
  <div class="w-full flex flex-col gap-4">
    <TypographyHead3>{{ isEditMode ? '기록 수정' : '기록하기' }}</TypographyHead3>

    <div>
      <!-- 기록 제목, 날짜, 내용 -->
      <RecordCreateForm
        v-model:title="title"
        v-model:content="content"
        v-model:record-date="recordDate"
      />

      <!-- 기록 이미지 추가/기존 이미지 관리 -->
      <RecordCreateImage
        v-model="imageFiles"
        v-model:existing-images="existingImages"
      />

      <!-- 기록 취소, 완료 버튼 -->
      <div class="w-full flex justify-between gap-4">
        <ButtonMain
          class="w-1/2 bg-white !text-black"
          :disabled="saving"
          @click="goBack"
        >
          취소
        </ButtonMain>
        <ButtonMain
          class="w-1/2"
          :disabled="saving || !title.trim() || !content.trim()"
          @click="saveRecord"
        >
          {{ saving ? '저장 중...' : '완료' }}
        </ButtonMain>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import RecordCreateForm from '@/features/record/Create/ui/RecordCreateForm.vue'
import RecordCreateImage from '@/features/record/Create/ui/RecordCreateImage.vue'

type ExistingImage = { url: string; fileName: string }

const router = useRouter()
const route = useRoute()

const tripId = Number(route.params.tripId)
const editRecordId = Number(route.query.editRecordId)
const isEditMode = !isNaN(editRecordId)

const title = ref('')
const content = ref('')
const recordDate = ref((route.query.date as string) || new Date().toISOString().split('T')[0])

// 새로 업로드할 파일들
const imageFiles = ref<File[]>([])
// 기존 이미지(미리보기 url + 서버 통신용 fileName)
const existingImages = ref<ExistingImage[]>([])

const saving = ref(false)

const fetchRecord = async () => {
  if (!isEditMode) return

  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get(`http://localhost:8080/api/trips/${tripId}/records/${editRecordId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (response.data.code === 'S200') {
      const record = response.data.data as {
        title: string
        recordDate: string
        content: string
        images?: ExistingImage[]
      }

      title.value = record.title
      recordDate.value = record.recordDate
      content.value = record.content

      // 상세 DTO는 images: [{ url, fileName }]
      const images: ExistingImage[] = Array.isArray(record.images) ? record.images : []
      existingImages.value = images.map((img: ExistingImage) => ({
        url: img.url,
        fileName: img.fileName,
      }))

      // 새 업로드 목록은 비움
      imageFiles.value = []
    }
  } catch (error: unknown) {
    console.error('기록을 불러오는 중 오류가 발생했습니다:', error)
    if (error instanceof Error && error.message === 'Access token not found') {
      alert('로그인이 필요합니다.')
      router.push('/login')
    } else {
      alert('기록을 불러오는 중 오류가 발생했습니다.')
      goBack()
    }
  }
}

onMounted(() => {
  // 상세 API에서 항상 최신 데이터 로딩
  fetchRecord()
})

const createFormDataForCreate = () => {
  // POST /records : TripRecordRequestDto (imageUrls)
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('recordDate', recordDate.value)
  formData.append('content', content.value)

  imageFiles.value.forEach((file) => {
    formData.append('imageUrls', file) // ✅ 생성은 imageUrls
  })

  return formData
}

const createFormDataForUpdate = () => {
  // PUT /records/{id} : TripRecordUpdateRequestDto (existingImageFileNames, newImages)
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('recordDate', recordDate.value)
  formData.append('content', content.value)

  // 유지할 기존 이미지의 파일명만 전송
  existingImages.value.forEach((img) => {
    if (img?.fileName) {
      formData.append('existingImageFileNames', img.fileName)
    }
  })

  // 새 파일
  imageFiles.value.forEach((file) => {
    formData.append('newImages', file)
  })

  return formData
}

const saveRecord = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }

  saving.value = true
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Access token not found')

    let response
    if (isEditMode) {
      const formData = createFormDataForUpdate()
      response = await axios.put(
        `http://localhost:8080/api/trips/${tripId}/records/${editRecordId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )
    } else {
      const formData = createFormDataForCreate()
      response = await axios.post(
        `http://localhost:8080/api/trips/${tripId}/records`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )
    }

    if (response.data.code === 'S200' || response.data.code === 'S201') {
      alert(isEditMode ? '기록이 성공적으로 수정되었습니다.' : '기록이 성공적으로 생성되었습니다.')
      router.push({
        name: 'record_detail',
        params: { tripId },
        query: { refresh: Date.now().toString() }
      })
    }
  } catch (error: unknown) {
    console.error('기록 저장 중 오류가 발생했습니다:', error)
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: { status: number; data?: { message?: string } }
      }
      if (axiosError.response?.status === 400) {
        const errorMessage = axiosError.response.data?.message || '입력 데이터에 문제가 있습니다.'
        alert(`오류: ${errorMessage}`)
      }
    }
    if (error instanceof Error && error.message === 'Access token not found') {
      alert('로그인이 필요합니다.')
      router.push('/login')
    }
  } finally {
    saving.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>
