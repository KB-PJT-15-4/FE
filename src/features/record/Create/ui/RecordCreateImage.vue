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

    <!-- 기존 이미지 미리보기 (서버에 이미 있는 URL) -->
    <div
      v-if="existingPreviews.length > 0"
      class="grid grid-cols-2 gap-4 mt-4 mb-4"
    >
      <div
        v-for="(img, idx) in existingPreviews"
        :key="'existing-' + idx"
        class="relative inline-block"
      >
        <img
          :src="img.url"
          class="w-[150px] h-[100px] object-cover rounded-[12px] shadow"
          :alt="`기존 이미지 ${idx + 1}`"
        >
        <button
          type="button"
          class="absolute top-2 right-2 bg-black/60 rounded-full w-7 h-7 flex items-center justify-center text-white text-sm hover:scale-105 transition"
          @click="removeExisting(idx)"
        >
          <i class="bi bi-x-circle" />
        </button>
      </div>
    </div>

    <!-- 업로드된(또는 선택된) 이미지 미리보기 (새 파일들) -->
    <div
      v-if="imagePreviews.length > 0"
      class="grid grid-cols-2 gap-4 mt-4 mb-8"
    >
      <div
        v-for="(preview, index) in imagePreviews"
        :key="'new-' + index"
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
          @click="removeNew(index)"
        >
          <i class="bi bi-x-circle" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type ExistingImage = { url: string; fileName: string }

const props = defineProps<{
  modelValue?: File[]                 // 새로 선택한 파일들
  existingImages?: ExistingImage[]    // 서버에 이미 있는 기존 이미지들 (url + fileName)
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File[]): void
  // 부모가 v-model:existing-images 를 사용하므로 kebab-case로 내보냄
  (e: 'update:existing-images', value: ExistingImage[]): void
}>()

const imagePreviews = ref<string[]>([])
const selectedFiles = ref<File[]>(props.modelValue ? [...props.modelValue] : [])
const existingPreviews = ref<ExistingImage[]>(props.existingImages ? [...props.existingImages] : [])
const fileInput = ref<HTMLInputElement | null>(null)

// 파일을 미리보기 URL로 변환
const createPreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('파일을 읽는 중 오류가 발생했습니다.'))
    }
    reader.onerror = () => reject(new Error('파일을 읽는 중 오류가 발생했습니다.'))
    reader.readAsDataURL(file)
  })
}

// 선택된 파일들로부터 preview 생성
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

// 외부에서 modelValue 변경될 때 반영
watch(
  () => props.modelValue,
  (newVal) => {
    selectedFiles.value = newVal ? [...newVal] : []
    updatePreviews()
  },
  { immediate: true }
)

// 외부에서 existingImages 변경될 때 반영
watch(
  () => props.existingImages,
  (newVal) => {
    existingPreviews.value = newVal ? [...newVal] : []
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
      selectedFiles.value = [...selectedFiles.value, ...newFiles]
      imagePreviews.value = [...imagePreviews.value, ...newPreviews]
      emit('update:modelValue', selectedFiles.value)
    }

    if (fileInput.value) {
      fileInput.value.value = '' // input의 value 초기화
    }
  }
}

const removeNew = (index: number) => {
  selectedFiles.value.splice(index, 1)
  imagePreviews.value.splice(index, 1)
  emit('update:modelValue', [...selectedFiles.value])

  if (fileInput.value) {
    fileInput.value.value = '' // input의 value 초기화
  }
}

const removeExisting = (index: number) => {
  existingPreviews.value.splice(index, 1)
  // 변경된 existing 목록을 부모로 전달 (kebab-case)
  emit('update:existing-images', [...existingPreviews.value])
}
</script>
