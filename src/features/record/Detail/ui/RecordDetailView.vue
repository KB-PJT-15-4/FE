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
          <div
            v-if="record?.imageUrl"
            class="flex justify-center"
          >
            <img
              :src="record.imageUrl"
              class="max-w-full h-auto rounded-md shadow-sm"
              alt="기록 이미지"
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

import type { RecordProps } from '@/entities/record/record.entity'

defineProps<RecordProps>()

const emit = defineEmits(['close'])
</script>