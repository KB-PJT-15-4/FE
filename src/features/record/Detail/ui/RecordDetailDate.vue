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

import { fetchTripById, isValidDateInRange } from '../services/recordDetail.service'

const props = defineProps<{
  tripId: number
  date: string
}>()

const emit = defineEmits<{
  (e: 'update:date', value: string): void
}>()

const route = useRoute()
const router = useRouter()

const apiBaseUrl = import.meta.env.VITE_APP_API_URL
const tripData = ref<Trip | null>(null)

const internalDate = computed({
  get: () => props.date,
  set: (val: string) => {
    emit('update:date', val)
    router.replace({ query: { ...route.query, date: val } })
  },
})

async function loadTripAndInitDate() {
  const token = localStorage.getItem('accessToken') || ''
  if (!token) return

  const trip = await fetchTripById({ token, apiBaseUrl, tripId: props.tripId })
  if (!trip) return

  tripData.value = trip

  const queryDate = (route.query.date as string) || ''
  if (queryDate && isValidDateInRange(queryDate, trip.startDate, trip.endDate)) {
    emit('update:date', queryDate)
  } else {
    emit('update:date', trip.startDate)
  }
}

onMounted(loadTripAndInitDate)
</script>

