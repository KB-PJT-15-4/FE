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
import { onMounted, ref, watch } from 'vue'
import { formatFullDateToKorean } from '@/shared/utils/format'
import Card from '@/shared/components/atoms/card/Card.vue'
import type { Trip } from '@/entities/record/record.entity'
import { fetchTripByIdViaList } from '../services/recordDetail.service'

const props = defineProps<{ tripId: number }>()
const trip = ref<Trip | null>(null)

async function load(id: number) {
  try {
    trip.value = await fetchTripByIdViaList(id)
    if (!trip.value) console.warn(`tripId ${id}에 해당하는 여행을 찾을 수 없습니다.`)
  } catch (e) {
    console.error('여행 정보 조회 실패:', e)
  }
}

onMounted(() => props.tripId && load(props.tripId))
watch(() => props.tripId, (v) => v && load(v), { immediate: false })
</script>