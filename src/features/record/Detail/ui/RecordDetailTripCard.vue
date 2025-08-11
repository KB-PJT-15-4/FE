<template>
  <Card
    v-if="trip"
    class="p-2 space-y-1"
  >
    <div class="flex justify-between items-start">
      <div class="font-bold text-lg">
        {{ trip.tripName }}
      </div>
      <div class="text-sm text-black">
        {{ trip.status }}
      </div>
    </div>
    <div class="flex justify-between items-end">
      <div class="text-sm text-[#626262]">
        {{ formatFullDateToKorean(new Date(trip.startDate)) }} -
        {{ formatFullDateToKorean(new Date(trip.endDate)) }}
      </div>
      <div class="text-sm text-black">
        {{ trip.locationName }}
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { formatFullDateToKorean } from '@/shared/utils/format'
import { onMounted, ref, watch } from 'vue'

import Card from '@/shared/components/atoms/card/Card.vue'
import axios from 'axios'

import type { Trip } from '@/entities/trip/trip.entity'

const props = defineProps<{
  tripId: number
}>()

const trip = ref<Trip | null>(null)

// API 호출 함수
const fetchTripData = async (id: number) => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/trips`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // 전체 목록에서 특정 tripId 찾기
    const trips: Trip[] = response.data.data.content || response.data.data
    const foundTrip = trips.find((t: Trip) => t.tripId === id)

    trip.value = foundTrip || null

    if (!foundTrip) {
      console.warn(`tripId ${id}에 해당하는 여행을 찾을 수 없습니다.`)
    }
  } catch (err) {
    console.error('여행 정보 조회 실패:', err)
  }
}

onMounted(() => {
  if (props.tripId) {
    fetchTripData(props.tripId)
  }
})

watch(
  () => props.tripId,
  (newTripId) => {
    if (newTripId) {
      fetchTripData(newTripId)
    }
  },
  { immediate: true }
)
</script>
