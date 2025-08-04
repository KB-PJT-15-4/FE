<template>
  <div class="flex flex-col gap-2">
    <SegmentedTab
      v-model="selectedSegmentOption"
      :options="segmentOptions"
      class="my-2"
    />

    <ReservationTransportation v-if="selectedSegmentOption === segmentOptions[0]" />
    <ReservationAccommodation v-if="selectedSegmentOption === segmentOptions[1]" />
    <ReservationRestaurant v-if="selectedSegmentOption === segmentOptions[2]" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

import { filterTabOptions } from '@/entities/trip/trip.entity'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import { useRoute, useRouter } from 'vue-router'
import ReservationAccommodation from './ReservationAccommodation.vue'
import ReservationRestaurant from './ReservationRestaurant.vue'
import ReservationTransportation from './ReservationTransportation .vue'

const route = useRoute()
const router = useRouter()

const segmentOptions = filterTabOptions.slice(1, 4)
const selectedSegmentOption = ref(segmentOptions[0])

watch(selectedSegmentOption, (newVal) => {
  const categoryMap: Record<string, string> = {
    교통: 'transportation',
    숙박: 'accommodation',
    식당: 'restaurant',
  }

  const newCategory = categoryMap[newVal]
  if (!newCategory) return

  router.push({
    name: route.name as string,
    params: route.params,
    query: {
      ...route.query,
      category: newCategory,
    },
  })
})
</script>
