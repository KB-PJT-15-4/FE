<template>
  <div class="w-full flex flex-col gap-4">
    <!-- 여행 정보 카드 -->
    <RecordDetailTripCard :trip="tripData" />

    <!-- 날짜 탭 -->
    <DateTab
      v-model="selectedDate"
      start-date="2025-03-24"
      end-date="2025-03-30"
    />

    <!-- 예매 내역 카드 -->
    <RecordDetailReCard :reservation-list="userReservationListMockData" />

    <!-- 결제 내역 카드 -->
    <RecordDetailCredCard :credit-list="creditMockData" />

    <!-- 사용자 작성 기록 및 추가 버튼 -->
    <RecordDetailCustom />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mockData, userReservationListMockData, creditMockData } from '@/entities/map/map.mock'

import DateTab from '@/shared/components/molecules/tab/DateTab.vue'

import RecordDetailTripCard from '@/features/record/Detail/ui/RecordDetailTripCard.vue'
import RecordDetailReCard from '@/features/record/Detail/ui/RecordDetailReCard.vue'
import RecordDetailCredCard from '@/features/record/Detail/ui/RecordDetailCredCard.vue'
import RecordDetailCustom from '@/features/record/Detail/ui/RecordDetailCustom.vue'

const route = useRoute()
const tripId = Number(route.params.tripId)

const selectedDate = ref('2025-03-24') // 날짜 선택 ( 추후 api 연동 )

// 여행 정보 카드에 필요한 변수 ( 추후 api 연동 )
const tripData = computed(() => mockData.find((trip) => trip.tripId === tripId) ?? null)
</script>