<template>
  <TypographyHead3>나의 예매내역</TypographyHead3>
  <SegmentedTab
    v-model="selectedSegmentOption"
    :options="segmentOptions"
  />
  <div
    v-for="reservation in userReservationListMockData"
    :key="reservation.id"
    :value="reservation"
  >
    <ReservationInfo :reservation="reservation" />
  </div>
</template>
<script setup lang="ts">
import { userReservationListMockData } from '@/entities/trip/trip.mock'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import { ref } from 'vue'
import ReservationInfo from './ReservationInfo.vue'

const segmentOptions = ['전체', '숙박', '항공', '식당']
const selectedSegmentOption = ref(segmentOptions[0])
</script>
