<template>
  <div class="w-full">
    <TripInfo :trip="trip" />
    <ToggleTab
      v-model="selectedOption"
      :options="toggleOptions"
    />
    <MyReservationList />

    <TypographyHead3>예매하기</TypographyHead3>
  </div>
</template>
<script setup lang="ts">
import { tripInformationMockData } from '@/entities/trip/trip.mock'
import MyReservationList from '@/features/trip/MyReservationList/ui/MyReservationList.vue'
import TripInfo from '@/features/trip/MyTrip/ui/TripInfo.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import ToggleTab from '@/shared/components/molecules/tab/ToggleTab.vue'
import { ref } from 'vue'

const trip = tripInformationMockData

const toggleOptions = ['예매', '정산']

const selectedOption = ref(toggleOptions[0])
</script>
