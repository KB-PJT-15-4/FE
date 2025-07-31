<template>
  <div class="flex flex-col gap-4">
    <!-- 제목 입력 -->
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

    <!-- 기록 내용 작성 -->
    <textarea
      v-model="content"
      placeholder="기록을 자유롭게 작성해주세요 (최대 800자)"
      maxlength="800"
      class="border p-2 rounded-md resize-none border-[2px]"
      rows="5"
    />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'

import Input from '@/shared/components/atoms/input/Input.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'

const title = defineModel<string>('title')
const content = defineModel<string>('content')

const selectedDate = inject('selectedDate') as Ref<string>
</script>