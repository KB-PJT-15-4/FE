<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex justify-center items-center"
  >
    <Card class="bg-white max-w-[500px] max-h-[80vh] overflow-y-auto m-4">
      <div class="w-full flex justify-end">
        <button @click="emit('close')">
          <i class="bi bi-x text-[20px]" />
        </button>
      </div>
      <div class="flex flex-col gap-4 p-2">
        <div class="space-y-4">
          <div>
            <TypographyHead2>{{ record?.title }}</TypographyHead2>
          </div>
          <div>
            <TypographySubTitle2 class="text-[#626262]">
              {{ formatFullDateToKorean(new Date(record?.date || '')) }}
            </TypographySubTitle2>
          </div>

          <!-- 여러 장의 이미지 지원 -->
          <div
            v-if="record?.imageUrls && record.imageUrls.length > 0"
            class="space-y-2"
          >
            <img
              v-for="(imageUrl, index) in record.imageUrls"
              :key="index"
              :src="imageUrl"
              class="max-w-full h-auto rounded-md shadow-sm"
              :alt="`기록 이미지 ${index + 1}`"
            >
          </div>

          <div class="bg-gray-50 p-4 rounded-md">
            <TypographyP2 class="whitespace-pre-line leading-relaxed">
              {{ record?.content }}
            </TypographyP2>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { formatFullDateToKorean } from '@/shared/utils/format'

import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'

interface RecordDetail {
  title: string
  date: string
  imageUrls?: string[]
  content: string
}

defineProps<{
  record: RecordDetail | null
}>()

const emit = defineEmits(['close'])
</script>
