<template>
  <div
    v-if="filteredTrips.length > 0"
    class="mt-4 space-y-3"
  >
    <Card
      v-for="trip in filteredTrips"
      :key="trip.tripId"
      class="cursor-pointer"
      @click="goToDetail(trip.tripId)"
    >
      <div class="p-2 space-y-1">
        <div class="flex justify-between items-start">
          <div class="font-bold text-lg">
            {{ trip.title }}
          </div>
          <div class="text-sm text-black">
            {{ trip.status }}
          </div>
        </div>
        <div class="flex justify-between items-end">
          <div class="text-sm text-[#949494]">
            {{ formatFullDateToKorean(new Date(trip.startDate)) }} -
            {{ formatFullDateToKorean(new Date(trip.endDate)) }}
          </div>
          <div class="text-sm text-black">
            {{ trip.location }}
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { mockData } from '@/entities/map/map.mock'

import Card from '@/shared/components/atoms/card/Card.vue'

const props = defineProps({
  location: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const filteredTrips = computed(() =>
  mockData.filter((trip) => trip.location === props.location)
)

const goToDetail = (tripId) => {
  router.push({ name: 'record_detail', params: { tripId } })
}
</script>
