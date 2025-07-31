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

    <!-- 예매 / 결제 탭 -->
    <div class="flex justify-center w-full">
      <ToggleTab
        v-model="currentLabel"
        :options="toggleOptions"
      />
    </div>
    <div v-if="selectedOption === 'reservation'">
      <RecordDetailReCard :reservation-list="userReservationListMockData" />
    </div>
    <div v-else-if="selectedOption === 'credit'">
      <RecordDetailCredCard :credit-list="creditMockData" />
    </div>

    <!-- 사용자 작성 기록 및 추가 버튼 -->
    <RecordDetailCustom />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockData, userReservationListMockData, creditMockData } from '@/entities/map/map.mock'

import ToggleTab from '@/shared/components/molecules/tab/ToggleTab.vue'
import DateTab from '@/shared/components/molecules/tab/DateTab.vue'

import RecordDetailTripCard from '@/features/record/Detail/ui/RecordDetailTripCard.vue'
import RecordDetailReCard from '@/features/record/Detail/ui/RecordDetailReCard.vue'
import RecordDetailCredCard from '@/features/record/Detail/ui/RecordDetailCredCard.vue'
import RecordDetailCustom from '@/features/record/Detail/ui/RecordDetailCustom.vue'

const route = useRoute()
const router = useRouter()

const tripId = Number(route.params.tripId)
const selectedDate = ref('2025-03-24') // 날짜 선택 (추후 API 연동)

// 여행 정보
const tripData = computed(() => mockData.find((trip) => trip.tripId === tripId) ?? null)

type TabValue = 'reservation' | 'credit'

const labelForTab: Record<TabValue, string> = {
  reservation: '예매 내역',
  credit: '결제 내역',
}

const valueForLabel: Record<string, TabValue> = {
  '예매 내역': 'reservation',
  '결제 내역': 'credit',
}

const toggleOptions = Object.values(labelForTab)

const selectedOption = ref<TabValue>((route.query.tab as TabValue) || 'reservation')

const currentLabel = computed({
  get: () => labelForTab[selectedOption.value],
  set: (newLabel: string) => {
    selectedOption.value = valueForLabel[newLabel]
  },
})

watch(selectedOption, (newTab) => {
  router.replace({
    query: {
      ...route.query,
      tab: newTab,
    },
  })
})
</script>
