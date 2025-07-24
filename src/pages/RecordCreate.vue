<template>
  <div class="w-full flex flex-col gap-4">
    <TypographyHead3>기록하기</TypographyHead3>

    <!-- 입력 폼 -->
    <input
      v-model="title"
      placeholder="제목을 입력해주세요"
      class="border p-2 rounded"
    >
    <input
      v-model="date"
      type="date"
      class="border p-2 rounded"
    >
    <textarea
      v-model="content"
      placeholder="기록을 자유롭게 작성해주세요 (최대 800자)"
      class="border p-2 rounded"
      rows="5"
    />

    <!-- 이미지 업로드 -->
    <input
      type="file"
      class="p-2"
      @change="handleImageUpload"
    >
    <img
      v-if="imagePreview"
      :src="imagePreview"
      class="w-full rounded"
    >

    <!-- 기록 취소, 완료 버튼 -->
    <div class="w-full flex justify-between gap-4">
      <ButtonMain
        class="w-1/2 bg-white !text-[#000000]"
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
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Card from '@/shared/components/atoms/card/Card.vue'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { mockData } from '@/entities/map/map.mock'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'

const route = useRoute()
const router = useRouter()
const tripId = Number(route.params.tripId)

const tripData = computed(() => mockData.find(trip => trip.tripId === tripId))

const title = ref('')
const date = ref('')
const content = ref('')
const imagePreview = ref('')
let imageFile = null

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

const saveRecord = () => {
  const newRecord = {
    title: title.value,
    date: date.value,
    content: content.value,
    imageUrl: imagePreview.value,
  }

  const existing = JSON.parse(localStorage.getItem(`trip-${tripId}-records`) || '[]')
  existing.push(newRecord)
  localStorage.setItem(`trip-${tripId}-records`, JSON.stringify(existing))

  router.push(`/record/${tripId}/detail`)
}

const goBack = () => {
  router.back()
}
</script>

