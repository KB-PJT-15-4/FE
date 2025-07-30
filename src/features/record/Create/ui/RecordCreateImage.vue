<template>
  <div>
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
      v-if="imagePreview && typeof imagePreview === 'string'"
      class="relative inline-block max-w-1/2 mt-4"
    >
      <img
        :src="imagePreview"
        class="w-[100px] h-[60px] max-w-[400px] h-auto rounded-[12px] shadow"
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
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const imagePreview = ref(props.modelValue)
const fileInput = ref<HTMLInputElement | null>(null)
let imageFile: File | null = null

watch(
  () => props.modelValue,
  (newVal) => {
    imagePreview.value = newVal
  }
)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    imageFile = file
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      imagePreview.value = result
      emit('update:modelValue', result)
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  imagePreview.value = ''
  emit('update:modelValue', '')
  imageFile = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>
