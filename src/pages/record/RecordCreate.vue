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
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import RecordCreateForm from '@/features/record/Create/ui/RecordCreateForm.vue'
import RecordCreateImage from '@/features/record/Create/ui/RecordCreateImage.vue'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'

import {
  buildCreateFormData,
  buildUpdateFormData,
  createRecord,
  fetchRecordDetail,
  updateRecord,
  type ExistingImage,
} from '@/features/record/Create/services/recordCreate.service'

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

// 수정 모드
async function loadDetail() {
  if (!isEditMode) return
  try {
    const detail = await fetchRecordDetail(tripId, editRecordId)
    title.value = detail.title
    recordDate.value = detail.recordDate
    content.value = detail.content
    existingImages.value = (detail.images ?? []).map((img) => ({
      url: img.url,
      fileName: img.fileName,
    }))
    imageFiles.value = []
  } catch (error: unknown) {
    console.error('기록을 불러오는 중 오류가 발생했습니다:', error)
    alert('기록을 불러오는 중 오류가 발생했습니다.')
    goBack()
  }
}

onMounted(loadDetail)

// 저장
async function saveRecord() {
  if (!title.value.trim() || !content.value.trim()) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }

  saving.value = true
  try {
    let json: { code?: string }

    if (isEditMode) {
      const formData = buildUpdateFormData({
        title: title.value,
        recordDate: recordDate.value,
        content: content.value,
        existingImages: existingImages.value,
        imageFiles: imageFiles.value,
      })
      json = await updateRecord(tripId, editRecordId, formData)
    } else {
      const formData = buildCreateFormData({
        title: title.value,
        recordDate: recordDate.value,
        content: content.value,
        imageFiles: imageFiles.value,
      })
      json = await createRecord(tripId, formData)
    }

    if (json?.code === 'S200' || json?.code === 'S201') {
      alert(isEditMode ? '기록이 성공적으로 수정되었습니다.' : '기록이 성공적으로 생성되었습니다.')
      router.push({
        name: 'record_detail',
        params: { tripId },
        query: { refresh: Date.now().toString() },
      })
    } else {
      alert('처리 중 문제가 발생했습니다.')
    }
  } catch (error: unknown) {
    console.error('기록 저장 중 오류가 발생했습니다:', error)
    alert('기록 저장 중 오류가 발생했습니다.')
  } finally {
    saving.value = false
  }
}

function goBack() {
  router.back()
}
</script>
