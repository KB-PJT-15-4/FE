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
      <TypographyP2 class="text-moa-gray-text">
        {{ formatFullDateToKorean(new Date(trip.startDate)) }} -
        {{ formatFullDateToKorean(new Date(trip.endDate)) }}
      </TypographyP2>
      <TypographyP2>{{ trip.locationName }}</TypographyP2>
    </div>
  </Card>
</template>

<script setup lang="ts">
import type { Trip } from '@/entities/record/record.entity'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { onMounted, ref, watch } from 'vue'
import { getTripInfo } from '../services/recordDetail.service'

const props = defineProps<{ tripId: number }>()
const trip = ref<Trip | null>(null)

async function getTripInfoFunction(id: number) {
  try {
    trip.value = await getTripInfo(id)
  } catch (e) {
    console.error('여행 정보 조회 실패:', e)
  }
}

watch(
  () => props.tripId,
  (v) => v && getTripInfoFunction(v),
  { immediate: false }
)

onMounted(() => {
  getTripInfoFunction(props.tripId)
})
</script>
