<template>
  <Card
    v-if="trip"
    class="p-2 space-y-1"
  >
    <div class="flex justify-between items-start">
      <div class="font-bold text-lg">
        {{ trip.title }}
      </div>
      <div class="text-sm text-black">
        {{ trip.status }}
      </div>
    </div>
    <div class="flex justify-between items-end">
      <div class="text-sm text-[#626262]">
        {{ formatFullDateToKorean(new Date(trip.startDate)) }} -
        {{ formatFullDateToKorean(new Date(trip.endDate)) }}
      </div>
      <div class="text-sm text-black">
        {{ trip.location }}
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { formatFullDateToKorean } from '@/shared/utils/format'
import Card from '@/shared/components/atoms/card/Card.vue'

const { trip } = defineProps<{
  trip: {
    title: string
    status: string
    startDate: string
    endDate: string
    location: string
  } | null
}>()
</script>
