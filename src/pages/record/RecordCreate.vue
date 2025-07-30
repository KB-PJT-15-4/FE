<template>
  <div class="w-full flex flex-col gap-4">
    <TypographyHead3>기록하기</TypographyHead3>

    <!-- 기록 제목, 날짜, 내용 -->
    <RecordCreateForm
      v-model:title="title"
      v-model:content="content"
    />

    <!-- 기록 이미지 추가 -->
    <RecordCreateImage v-model="imagePreview" />

    <!-- 기록 취소, 완료 버튼 -->
    <div class="w-full flex justify-between gap-4">
      <ButtonMain
        class="w-1/2 bg-white !text-black"
        @click="goBack"
      >
        취소
      </ButtonMain>
      <ButtonMain
        class="w-1/2"
        @click="saveRecord"
      >
        완료
      </ButtonMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import RecordCreateForm from '@/features/record/Create/ui/RecordCreateForm.vue'
import RecordCreateImage from '@/features/record/Create/ui/RecordCreateImage.vue'

const router = useRouter()
const route = useRoute()

const tripId = Number(route.params.tripId)
const editIndex = Number(route.query.editIndex)
const isEditMode = !isNaN(editIndex)

const title = ref('')
const content = ref('')
const today = new Date()
const selectedDate = ref(today.toISOString().split('T')[0])
provide('selectedDate', selectedDate)

const imagePreview = ref('')

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem(`trip-${tripId}-records`) || '[]')
  if (isEditMode && saved[editIndex]) {
    const record = saved[editIndex]
    title.value = record.title
    selectedDate.value = record.date || selectedDate.value
    content.value = record.content
    imagePreview.value = record.imageUrl || ''
  }
})

const saveRecord = () => {
  const newRecord = {
    title: title.value,
    date: selectedDate.value,
    content: content.value,
    imageUrl: imagePreview.value,
  }

  const existing = JSON.parse(localStorage.getItem(`trip-${tripId}-records`) || '[]')

  if (isEditMode) {
    existing[editIndex] = newRecord
  } else {
    existing.push(newRecord)
  }

  localStorage.setItem(`trip-${tripId}-records`, JSON.stringify(existing))

  router.push({ name: 'record_detail', params: { tripId: tripId } })
}

const goBack = () => {
  router.back()
}
</script>