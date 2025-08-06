<template>
  <div class="w-full flex flex-col gap-4">
    <!-- 여행 정보 카드 -->
    <RecordDetailTripCard :trip-id="tripId" />

    <!-- 날짜 탭 -->
    <RecordDetailDate
      v-model:date="selectedDate"
      :trip-id="tripId"
    />

    <!-- 예매 / 결제 탭 -->
    <div class="flex w-full">
      <ToggleTab
        v-model="currentLabel"
        :options="toggleOptions"
      />
    </div>

    <!-- 예매 내역 -->
    <div v-if="selectedOption === 'reservation'">
      <RecordDetailReCard 
        v-model:date="selectedDate"
        :trip-id="tripId"
      />
    </div>

    <!-- 결제 내역 -->
    <div v-else-if="selectedOption === 'credit'">
      <RecordDetailCredCard :trip-id="tripId" />
    </div>

    <!-- 사용자 작성 기록 및 추가 버튼 -->
    <RecordDetailCustom />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ToggleTab from '@/shared/components/molecules/tab/ToggleTab.vue'

import RecordDetailTripCard from '@/features/record/Detail/ui/RecordDetailTripCard.vue'
import RecordDetailReCard from '@/features/record/Detail/ui/RecordDetailReCard.vue'
import RecordDetailCredCard from '@/features/record/Detail/ui/RecordDetailCredCard.vue'
import RecordDetailCustom from '@/features/record/Detail/ui/RecordDetailCustom.vue'
import RecordDetailDate from '@/features/record/Detail/ui/RecordDetailDate.vue'

const route = useRoute()
const router = useRouter()

const tripId = Number(route.params.tripId)
const selectedDate = ref<string>('')

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