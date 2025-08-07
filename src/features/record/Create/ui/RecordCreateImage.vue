<template>
  <div>
    <!-- 이미지 업로드 버튼 -->
    <div class="flex justify-start my-1 mb-8">
      <button
        type="button"
        class="flex items-center justify-center w-[70px] h-[70px] rounded-[16px] bg-[#87BFFF] text-white transition-all hover:bg-[#6BA8E8]"
        @click="triggerFileInput"
      >
        <i class="bi bi-plus-circle text-[24px] font-bold" />
      </button>

      <!-- 숨겨진 파일 input -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        class="hidden"
        @change="handleImageUpload"
      >
    </div>

    <!-- 업로드된 이미지 미리보기 -->
    <div
      v-if="imagePreviews.length > 0"
      class="grid grid-cols-2 gap-4 mt-4 mb-8"
    >
      <div
        v-for="(preview, index) in imagePreviews"
        :key="index"
        class="relative inline-block"
      >
        <img
          :src="preview"
          class="w-[150px] h-[100px] object-cover rounded-[12px] shadow"
          :alt="`업로드된 이미지 ${index + 1}`"
        >
        <button
          type="button"
          class="absolute top-2 right-2 bg-black/60 rounded-full w-7 h-7 flex items-center justify-center text-white text-sm hover:scale-105 transition"
          @click="removeImage(index)"
        >
          <i class="bi bi-x-circle" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: File[] // string[]에서 File[]로 변경
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File[]): void
}>()

const imagePreviews = ref<string[]>([])
const selectedFiles = ref<File[]>(props.modelValue || [])
const fileInput = ref<HTMLInputElement | null>(null)

// 파일을 미리보기 URL로 변환
const createPreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('파일을 읽는 중 오류가 발생했습니다.'))
      }
    }
    reader.onerror = () => {
      reject(new Error('파일을 읽는 중 오류가 발생했습니다.'))
    }
    reader.readAsDataURL(file)
  })
}

// 파일들의 미리보기를 생성하는 함수
const updatePreviews = async () => {
  const previews: string[] = []
  
  for (const file of selectedFiles.value) {
    try {
      const preview = await createPreview(file)
      previews.push(preview)
    } catch (error) {
      console.error('미리보기 생성 중 오류:', error)
    }
  }
  
  imagePreviews.value = previews
}

watch(
  () => props.modelValue,
  (newVal) => {
    selectedFiles.value = newVal || []
    // 파일이 변경되면 미리보기도 업데이트
    updatePreviews()
  },
  { immediate: true }
)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleImageUpload = async (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files && files.length > 0) {
    const newFiles: File[] = []
    const newPreviews: string[] = []

    for (const file of Array.from(files)) {
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        alert(`${file.name}: 파일 크기는 10MB를 초과할 수 없습니다.`)
        continue
      }

      if (!file.type.startsWith('image/')) {
        alert(`${file.name}: 이미지 파일만 업로드할 수 있습니다.`)
        continue
      }

      try {
        const preview = await createPreview(file)
        newFiles.push(file)
        newPreviews.push(preview)
      } catch (error) {
        console.error('파일을 처리하는 중 오류:', error)
        alert(`${file.name}: 파일을 처리하는 중 오류가 발생했습니다.`)
      }
    }

    if (newFiles.length > 0) {
      const updatedFiles = [...selectedFiles.value, ...newFiles]
      const updatedPreviews = [...imagePreviews.value, ...newPreviews]
      
      selectedFiles.value = updatedFiles
      imagePreviews.value = updatedPreviews
      
      emit('update:modelValue', updatedFiles)
    }

    // 파일 input 초기화
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const removeImage = (index: number) => {
  imagePreviews.value.splice(index, 1)
  selectedFiles.value.splice(index, 1)
  emit('update:modelValue', selectedFiles.value)

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>