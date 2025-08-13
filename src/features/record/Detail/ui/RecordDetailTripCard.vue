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
import { onMounted, ref, watch } from 'vue'
import { formatFullDateToKorean } from '@/shared/utils/format'
import type { Trip } from '@/entities/record/record.entity'

import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'

import { fetchTripById } from '../services/recordDetail.service'

const props = defineProps<{ tripId: number }>()
const trip = ref<Trip | null>(null)

const apiBaseUrl = import.meta.env.VITE_APP_API_URL

async function load() {
  const token = localStorage.getItem('accessToken') || ''
  if (!token) return
  trip.value = await fetchTripById({ token, apiBaseUrl, tripId: props.tripId })
}

onMounted(load)

watch(
  () => props.tripId,
  async () => {
    await load()
  },
  { immediate: false }
)
</script>

