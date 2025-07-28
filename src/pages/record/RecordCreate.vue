<template>
  <div class="w-full flex flex-col gap-4">
    <TypographyHead3>기록하기</TypographyHead3>

    <!-- 입력 폼 -->
    <Input
      v-model="title"
      placeholder="제목을 입력해주세요"
      class="border p-2 rounded"
    />
    <InputSmall
      v-model="date"
      placeholder="hello input"
      type="date"
    />

    <!-- 컴포넌트화 어떻게 해야할지 생각 -->
    <!-- 박스 크기 안늘어나게 lock 걸기, 글자수 제한 추가-->
    <textarea
      v-model="content"
      placeholder="기록을 자유롭게 작성해주세요 (최대 800자)"
      class="border p-2 rounded-md"
      rows="5"
    />

    <!-- 이미지 업로드 버튼 -->
    <div class="image-upload-container">
      <button
        type="button"
        class="image-upload-btn"
        @click="triggerFileInput"
      >
        <i class="bi bi-plus-circle" />
        <span>사진 추가</span>
      </button>

      <!-- 숨겨진 파일 input -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleImageUpload"
      >
    </div>

    <!-- 업로드된 이미지 미리보기 -->
    <div
      v-if="imagePreview"
      class="image-preview-container"
    >
      <img
        :src="imagePreview"
        class="uploaded-image"
        alt="업로드된 이미지"
      >
      <button
        type="button"
        class="remove-image-btn"
        @click="removeImage"
      >
        <i class="bi bi-x-circle" />
      </button>
    </div>

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
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import InputSmall from '@/shared/components/atoms/input/InputSmall.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'

const router = useRouter()
const route = useRoute()

const tripId = Number(route.params.tripId)
const editIndex = Number(route.query.editIndex)
const isEditMode = !isNaN(editIndex)

const title = ref('')
const date = ref('')
const content = ref('')

const imagePreview = ref('')
const fileInput = ref(null)
let imageFile = null

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem(`trip-${tripId}-records`) || '[]')
  if (isEditMode && saved[editIndex]) {
    const record = saved[editIndex]
    title.value = record.title
    date.value = record.date
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
    date: date.value,
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

  router.push({ name: 'record_detail', params: { tripId: tripId } }) // name 수정
}

const goBack = () => {
  router.back()
}
</script>

<!-- CSS Tailwind 로 리팩토링 -->
<style scoped>
/* 이미지 업로드 컨테이너 */
.image-upload-container {
  display: flex;
  justify-content: flex-start;
  margin: 2px 0;
}

/* 이미지 업로드 버튼 스타일 */
.image-upload-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 16px;
  background-color: #87bfff;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.image-upload-btn:hover {
  background-color: #5a6268;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.image-upload-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-upload-btn i {
  font-size: 24px;
  font-weight: bold;
}

.image-upload-btn span {
  display: none;
}

/* 이미지 미리보기 컨테이너 */
.image-preview-container {
  position: relative;
  display: inline-block;
  max-width: 50%;
  margin-top: 16px;
}

.uploaded-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 이미지 제거 버튼 */
.remove-image-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
}
</style>
