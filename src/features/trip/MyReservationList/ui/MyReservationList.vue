<template>
  <TypographyHead3 class="pl-1">
    나의 예매내역
  </TypographyHead3>
  <SegmentedTab
    v-model="selectedSegmentOption"
    :options="filterTabOptions"
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
import { filterTabOptions } from '@/shared/constants/ReservationValue'
import { ref } from 'vue'
import ReservationInfo from './ReservationInfo.vue'

const selectedSegmentOption = ref(filterTabOptions[0])
</script>
