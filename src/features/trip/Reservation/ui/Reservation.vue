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
import { onMounted, ref, watch } from 'vue'

import { filterTabOptions, ItemType } from '@/entities/trip/trip.entity'
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
  const categoryMap: Record<string, ItemType> = {
    교통: ItemType.Transportation,
    숙박: ItemType.Accommodation,
    식당: ItemType.Restaurant,
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

onMounted(() => {
  const category = route.query.category
  if (category === ItemType.Transportation) selectedSegmentOption.value = '교통'
  if (category === ItemType.Accommodation) selectedSegmentOption.value = '숙박'
  if (category === ItemType.Restaurant) selectedSegmentOption.value = '식당'
})
</script>
