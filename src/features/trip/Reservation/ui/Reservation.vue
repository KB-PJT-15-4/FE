<template>
  <div class="flex flex-col mt-4 gap-2">
    <TypographyHead3>예매하기</TypographyHead3>
    <SegmentedTab
      v-model="selectedSegmentOption"
      :options="segmentOptions"
    />
    <ReservationAccommodation v-if="selectedSegmentOption === segmentOptions[0]" />
    <ReservationRestaurant v-if="selectedSegmentOption === segmentOptions[2]" />
    <ReservationTransportation v-if="selectedSegmentOption === segmentOptions[1]" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import ReservationAccommodation from './ReservationAccommodation.vue'
import ReservationRestaurant from './ReservationRestaurant.vue'
import ReservationTransportation from './ReservationTransportation .vue'

const segmentOptions = ['숙박', '항공', '식당']
const selectedSegmentOption = ref(segmentOptions[0])
</script>
