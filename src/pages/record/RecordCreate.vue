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
      <!-- 기존 이미지(existingImageUrls)와 새로 선택한 파일(imageFiles)을 모두 다룸 -->
      <RecordCreateImage
        v-model="imageFiles"
        v-model:existing-urls="existingImageUrls"
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

const router = useRouter()
const route = useRoute()

const tripId = Number(route.params.tripId)
const editRecordId = Number(route.query.editRecordId)
const isEditMode = !isNaN(editRecordId)

const title = ref('')
const content = ref('')
const recordDate = ref(route.query.date as string || new Date().toISOString().split('T')[0])

// 새로 업로드할 파일들
const imageFiles = ref<File[]>([])
// 기존에 서버에 있던 이미지 URL들 중 '유지할 것' 리스트
const existingImageUrls = ref<string[]>([])

const saving = ref(false)

const fetchRecord = async () => {
  if (!isEditMode) return

  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get(`http://localhost:8080/api/trips/${tripId}/records/${editRecordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.data.code === 'S200') {
      const record = response.data.data
      title.value = record.title
      recordDate.value = record.recordDate
      content.value = record.content

      // **핵심**: 기존 이미지 URL 목록을 상태로 저장(수정 화면에서 보여주고 삭제 가능하게)
      existingImageUrls.value = record.imageUrls ? [...record.imageUrls] : []
      // 새로 업로드할 파일 목록은 비워둠
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
  // (안전) 라우터 쿼리로 기존 이미지 URL이 전달되어 있는 경우 초기값으로 사용 가능
  try {
    const q = route.query.existingImageUrls as string | undefined
    if (q) {
      const parsed = JSON.parse(q)
      if (Array.isArray(parsed)) {
        existingImageUrls.value = parsed
      }
    }
  } catch (e) {
    // 무시
  }

  fetchRecord()
})

const createFormData = () => {
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('recordDate', recordDate.value)
  formData.append('content', content.value)

  // **핵심**: 기존 이미지 URL 목록을 formData에 각각 같은 key 이름으로 append
  // 백엔드의 TripRecordRequestDto.existingImageUrls(List<String>)로 바인딩 됨
  existingImageUrls.value.forEach((url) => {
    formData.append('existingImageUrls', url)
  })

  // 새로 업로드한 파일들은 기존과 동일하게 'imageUrls'로 append
  imageFiles.value.forEach((file) => {
    formData.append('imageUrls', file)
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

    const formData = createFormData()

    let response
    if (isEditMode) {
      response = await axios.put(`http://localhost:8080/api/trips/${tripId}/records/${editRecordId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
    } else {
      response = await axios.post(`http://localhost:8080/api/trips/${tripId}/records`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
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
        response?: {
          status: number
          data?: {
            message?: string
          }
        }
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
