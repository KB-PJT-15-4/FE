<template>
  <Card
    v-if="trip"
    class="p-2 space-y-1"
  >
    <div class="flex justify-between items-start">
      <TypographyHead3>{{ trip.tripName }}</TypographyHead3>
      <TypographyP2>{{ trip.status }}</TypographyP2>
    </div>
    <div class="flex justify-between items-end">
      <TypographyP2 class="text-moa-sub-text text-sm">
        {{ formatFullDateToKorean(new Date(trip.startDate)) }} -
        {{ formatFullDateToKorean(new Date(trip.endDate)) }}
      </TypographyP2>
      <TypographyP2>{{ trip.locationName }}</TypographyP2>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { formatFullDateToKorean } from '@/shared/utils/format'
import { onMounted, ref, watch } from 'vue'

import type { Trip } from '@/entities/record/record.entity'
import Card from '@/shared/components/atoms/card/Card.vue'
import axios from 'axios'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'

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
