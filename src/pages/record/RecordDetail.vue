<template>
  <div class="w-full flex flex-col gap-4">
    <!-- 여행 정보 카드 -->
    <RecordDetailTripCard :trip-id="tripId" />

    <!-- 날짜 탭 -->
    <DateTab
      v-if="tripData"
      v-model="selectedDate"
      :start-date="tripData.startDate"
      :end-date="tripData.endDate"
    />

    <!-- 예매 / 결제 탭 -->
    <div class="flex w-full">
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
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userReservationListMockData, creditMockData } from '@/entities/map/map.mock'
import axios from 'axios'
import type { Trip } from '@/entities/trip/trip.entity'

import ToggleTab from '@/shared/components/molecules/tab/ToggleTab.vue'
import DateTab from '@/shared/components/molecules/tab/DateTab.vue'

import RecordDetailTripCard from '@/features/record/Detail/ui/RecordDetailTripCard.vue'
import RecordDetailReCard from '@/features/record/Detail/ui/RecordDetailReCard.vue'
import RecordDetailCredCard from '@/features/record/Detail/ui/RecordDetailCredCard.vue'
import RecordDetailCustom from '@/features/record/Detail/ui/RecordDetailCustom.vue'

const route = useRoute()
const router = useRouter()

const tripId = Number(route.params.tripId)

// 여행 데이터 상태
const tripData = ref<Trip | null>(null)

// 선택된 날짜 (쿼리에서 가져오거나 기본값 설정)
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

// API에서 여행 데이터 가져오기
const fetchTripData = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get('http://localhost:8080/api/trips', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = response.data

    // tripId에 해당하는 여행 데이터 찾기
    const trip = result.data.content.find((trip: Trip) => trip.tripId === tripId)

    if (trip) {
      tripData.value = trip

      // 쿼리에서 날짜가 있으면 사용, 없으면 여행 시작일로 설정
      const queryDate = route.query.date as string
      if (queryDate && isValidDateInRange(queryDate, trip.startDate, trip.endDate)) {
        selectedDate.value = queryDate
      } else {
        selectedDate.value = trip.startDate
      }
    } else {
      console.warn(`tripId ${tripId}에 해당하는 여행을 찾을 수 없습니다.`)
    }
  } catch (error) {
    console.error('여행 데이터를 가져오는데 실패했습니다:', error)
  }
}


// 날짜가 여행 기간 내에 있는지 확인하는 함수
const isValidDateInRange = (date: string, startDate: string, endDate: string): boolean => {
  const targetDate = new Date(date)
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  return targetDate >= start && targetDate <= end
}

// 날짜 변경 시 URL 쿼리 업데이트
watch(selectedDate, (newDate) => {
  if (newDate) {
    router.replace({
      query: {
        ...route.query,
        date: newDate,
      },
    })
  }
})

// 탭 변경 시 URL 쿼리 업데이트
watch(selectedOption, (newTab) => {
  router.replace({
    query: {
      ...route.query,
      tab: newTab,
    },
  })
})

// 컴포넌트 마운트 시 데이터 가져오기
onMounted(() => {
  fetchTripData()
})
</script>