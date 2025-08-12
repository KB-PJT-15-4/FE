<template>
  <DateTab
    v-if="tripData"
    v-model="internalDate"
    :start-date="tripData.startDate"
    :end-date="tripData.endDate"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Trip } from '@/entities/record/record.entity'
import DateTab from '@/shared/components/molecules/tab/DateTab.vue'
import axios from 'axios'

const props = defineProps<{
  tripId: number
  date: string
}>()

const emit = defineEmits<{
  (e: 'update:date', value: string): void
}>()

const route = useRoute()
const router = useRouter()

const tripData = ref<Trip | null>(null)

const internalDate = computed({
  get: () => props.date,
  set: (val: string) => {
    emit('update:date', val)

    router.replace({
      query: {
        ...route.query,
        date: val,
      },
    })
  },
})

const isValidDateInRange = (date: string, startDate: string, endDate: string): boolean => {
  const targetDate = new Date(date)
  const start = new Date(startDate)
  const end = new Date(endDate)
  return targetDate >= start && targetDate <= end
}

const fetchTripData = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/trips`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = response.data
    const trip = result.data.content.find((trip: Trip) => trip.tripId === props.tripId)

    if (trip) {
      tripData.value = trip

      const queryDate = route.query.date as string
      if (queryDate && isValidDateInRange(queryDate, trip.startDate, trip.endDate)) {
        emit('update:date', queryDate)
      } else {
        emit('update:date', trip.startDate)
      }
    } else {
      console.warn(`tripId ${props.tripId}에 해당하는 여행을 찾을 수 없습니다.`)
    }
  } catch (error) {
    console.error('여행 데이터를 가져오는데 실패했습니다:', error)
  }
}

onMounted(() => {
  fetchTripData()
})
</script>
