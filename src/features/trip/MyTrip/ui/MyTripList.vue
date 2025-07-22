<template>
  <div
    v-for="(trip, index) in tripList"
    :key="index"
  >
    <Card
      class="w-full flex flex-col gap-3 my-2"
      @click="router.push({ name: 'trip_detail', params: { tripId: trip.id } })"
    >
      <div class="flex justify-between">
        <TypographyHead2>{{ trip.title }}</TypographyHead2>
        <TypographyCaption class="font-semibold">
          {{ trip.status }}
        </TypographyCaption>
      </div>
      <div class="flex justify-between">
        <TypographySubTitle2 class="text-moa-sub-text">
          {{ formatFullDateToKorean(new Date(trip.startDate)) }} -
          {{ formatFullDateToKorean(new Date(trip.endDate)) }}
        </TypographySubTitle2>
        <TypographyP1 class="font-semibold">
          {{ trip.location }}
        </TypographyP1>
      </div>
    </Card>
  </div>
</template>
<script setup>
import router from '@/app/router'
import { userTripListMockData } from '@/entities/trip/trip.mock'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatFullDateToKorean } from '@/shared/utils/format'

const tripList = userTripListMockData
</script>
