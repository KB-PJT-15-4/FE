<template>
  <div class="flex flex-col mt-4 gap-2">
    <TypographyHead3 class="pl-1">
      예매하기
    </TypographyHead3>
    <SegmentedTab
      v-model="selectedSegmentOption"
      :options="segmentOptions"
      class="mb-2"
    />

    <ReservationTransportation v-if="selectedSegmentOption === segmentOptions[0]" />
    <ReservationAccommodation v-if="selectedSegmentOption === segmentOptions[1]" />
    <ReservationRestaurant v-if="selectedSegmentOption === segmentOptions[2]" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import { filterTabOptions } from '@/shared/constants/ReservationValue'
import ReservationAccommodation from './ReservationAccommodation.vue'
import ReservationRestaurant from './ReservationRestaurant.vue'
import ReservationTransportation from './ReservationTransportation .vue'

const segmentOptions = filterTabOptions.slice(1, 4)
const selectedSegmentOption = ref(segmentOptions[0])
</script>
