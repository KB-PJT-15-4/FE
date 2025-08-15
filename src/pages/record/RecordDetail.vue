<template>
  <div class="w-full flex flex-col gap-4">
    <!-- 여행 정보 카드 -->
    <RecordDetailTripCard :trip-id="tripId" />

    <!-- 날짜 선택 -->
    <RecordDetailDate
      v-model:date="selectedDate"
      :trip-id="tripId"
    />

    <!-- 예매 내역 -->
    <RecordDetailReCard 
      v-model:date="selectedDate"
      :trip-id="tripId"
    />

    <!-- 사용자 작성 기록 및 추가 버튼 -->
    <RecordDetailCustom 
      :trip-id="tripId"
      :selected-date="selectedDate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import RecordDetailTripCard from '@/features/record/Detail/ui/RecordDetailTripCard.vue'
import RecordDetailReCard from '@/features/record/Detail/ui/RecordDetailReCard.vue'
import RecordDetailCustom from '@/features/record/Detail/ui/RecordDetailCustom.vue'
import RecordDetailDate from '@/features/record/Detail/ui/RecordDetailDate.vue'

const route = useRoute()
const tripId = Number(route.params.tripId)
const selectedDate = ref<string>('')
</script>
