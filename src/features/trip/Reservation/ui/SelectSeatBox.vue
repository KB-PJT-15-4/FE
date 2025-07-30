<template>
  <div class="w-full border p-3 rounded-sm my-6 flex flex-col items-center justify-center">
    <TypographySubTitle1 class="mb-3">
      {{ container }} 칸
    </TypographySubTitle1>
    <div class="w-full flex-col">
      <div
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="flex flex-row justify-between my-3"
      >
        <!-- 좌측 좌석 -->
        <div class="flex gap-5">
          <SeatButton
            :label="1"
            :seat-key="row + '1'"
          />
          <SeatButton
            :label="2"
            :seat-key="row + '2'"
          />
        </div>

        <!-- 가운데 라벨 -->
        <div class="flex items-center justify-center font-medium text-sm">
          {{ row }}
        </div>

        <!-- 우측 좌석 -->
        <div class="flex gap-5">
          <SeatButton
            :label="4"
            :seat-key="row + '4'"
          />
          <SeatButton
            :label="3"
            :seat-key="row + '3'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import SeatButton from './SeatButton.vue'

defineProps<{
  container: number
}>()
const rows = ['A', 'B', 'C', 'D', 'E', 'F']
</script>
