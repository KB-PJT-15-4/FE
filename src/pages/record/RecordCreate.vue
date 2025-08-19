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

import type { ExistingImage } from '@/entities/record/record.entity'
import {
  buildCreateFormData,
  buildUpdateFormData,
  createRecord,
  getRecordDetail,
  updateRecord,
} from '@/features/record/Create/services/recordCreate.service'

const router = useRouter()
const route = useRoute()

const tripId = Number(route.params.tripId)
const editRecordId = Number(route.query.editRecordId)
const isEditMode = !isNaN(editRecordId)

const title = ref<string>('')
const content = ref<string>('')
const recordDate = ref((route.query.date as string) || new Date().toISOString().split('T')[0])

// 새로 업로드할 파일들
const imageFiles = ref<File[]>([])
// 기존 이미지(미리보기 url + 서버 통신용 fileName)
const existingImages = ref<ExistingImage[]>([])

const saving = ref<boolean>(false)

// 수정 모드
async function getTripRecordDetail() {
  if (!isEditMode) return

  try {
    const detail = await getRecordDetail(tripId, editRecordId)

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

// 저장
async function saveRecord() {
  if (!title.value.trim() || !content.value.trim()) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }

  saving.value = true
  try {
    if (isEditMode) {
      const formData = buildUpdateFormData(
        title.value,
        recordDate.value,
        content.value,
        existingImages.value,
        imageFiles.value
      )

      await updateRecord(tripId, editRecordId, formData)
    } else {
      const formData = buildCreateFormData(
        title.value,
        recordDate.value,
        content.value,
        imageFiles.value
      )
      await createRecord(tripId, formData)
    }

    alert(isEditMode ? '기록이 성공적으로 수정되었습니다.' : '기록이 성공적으로 생성되었습니다.')
    router.replace({
      name: 'record_detail',
      params: { tripId },
      query: { refresh: Date.now().toString(), date: recordDate.value },
    })
  } catch (e) {
    console.error(e)
    alert('기록 저장 중 오류가 발생했습니다.')
  } finally {
    saving.value = false
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  getTripRecordDetail()
})
</script>
