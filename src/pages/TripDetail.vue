<template>
  <div class="w-full flex flex-col gap-3">
    <TripInfo :trip="trip" />
    <ToggleTab
      v-model="selectedOption"
      :options="toggleOptions"
    />
    <div class="flex flex-col gap-3">
      <MyReservationList />
      <Reservation />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { tripInformationMockData } from '@/entities/trip/trip.mock'
import MyReservationList from '@/features/trip/MyReservationList/ui/MyReservationList.vue'
import TripInfo from '@/features/trip/MyTrip/ui/TripInfo.vue'
import Reservation from '@/features/trip/Reservation/ui/Reservation.vue'
import ToggleTab from '@/shared/components/molecules/tab/ToggleTab.vue'
const trip = tripInformationMockData

const toggleOptions = ['예매', '정산']
const selectedOption = ref(toggleOptions[0])
</script>
