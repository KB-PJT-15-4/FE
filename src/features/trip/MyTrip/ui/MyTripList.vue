<template>
  <div
    v-for="(trip, index) in tripList"
    :key="index"
    @click="router.push({ name: 'trip_detail', params: { tripId: trip.id } })"
  >
    <TripInfo :trip="trip" />
  </div>
</template>
<script setup lang="ts">
import router from '@/app/router'
import { userTripListMockData } from '@/entities/trip/trip.mock'
import TripInfo from './TripInfo.vue'

const tripList = userTripListMockData
</script>
