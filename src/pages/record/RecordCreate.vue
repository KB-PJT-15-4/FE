<template>
  <div class="w-full flex flex-col gap-4">
    <TypographyHead3>기록하기</TypographyHead3>

    <!-- 입력 폼 -->
    <Input
      v-model="title"
      placeholder="제목을 입력해주세요"
      class="border p-2 rounded"
    />
    
    <!-- 날짜 선택 -->
    <div class="flex flex-col gap-2">
      <TypographyP1 class="pl-1">
        날짜 선택
      </TypographyP1>
      <Input
        v-model="selectedDate"
        type="date"
        class="border p-2 rounded"
      />
    </div>

    <!-- 글자수 제한 textarea -->
    <textarea
      v-model="content"
      placeholder="기록을 자유롭게 작성해주세요 (최대 800자)"
      maxlength="800"
      class="border p-2 rounded-md resize-none border-[2px]"
      rows="5"
    />

    <!-- 이미지 업로드 버튼 -->
    <div class="flex justify-start my-1">
      <button
        type="button"
        class="flex items-center justify-center w-[70px] h-[70px] rounded-[16px] bg-[#87BFFF] text-white transition-all"
        @click="triggerFileInput"
      >
        <i class="bi bi-plus-circle text-[24px] font-bold" />
      </button>

      <!-- 숨겨진 파일 input -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleImageUpload"
      >
    </div>

    <!-- 업로드된 이미지 미리보기 -->
    <div
      v-if="imagePreview"
      class="relative inline-block max-w-1/2 mt-4"
    >
      <img
        :src="imagePreview"
        class="w-full max-w-[400px] h-auto rounded-[12px] shadow"
        alt="업로드된 이미지"
      >
      <button
        type="button"
        class="absolute top-2 right-2 bg-black/60 rounded-full w-7 h-7 flex items-center justify-center text-white text-sm hover:scale-105 transition"
        @click="removeImage"
      >
        <i class="bi bi-x-circle" />
      </button>
    </div>

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

<script setup>
import { onMounted, ref, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'

const router = useRouter()
const route = useRoute()

const tripId = Number(route.params.tripId)
const editIndex = Number(route.query.editIndex)
const isEditMode = !isNaN(editIndex)

const title = ref('')
const content = ref('')

// 날짜 초기값
const today = new Date()
const selectedDate = ref(today.toISOString().split('T')[0])
provide('selectedDate', selectedDate)

const imagePreview = ref('')
const fileInput = ref(null)
let imageFile = null

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

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageFile = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  imagePreview.value = ''
  imageFile = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

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