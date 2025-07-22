<template>
  <Card
    v-for="(trip, index) in tripList"
    :key="index"
    class="w-full"
  >
    <TypographyHead2>{{ trip.title }}</TypographyHead2>
    <TypographyCaption>{{ trip.status }}</TypographyCaption>
    <TypographySubTitle2>
      {{ formatFullDateToKorean(new Date(trip.startDate)) }} -
      {{ formatFullDateToKorean(new Date(trip.endDate)) }}
    </TypographySubTitle2>
  </Card>
</template>
<script setup>
import { userTripListMockData } from '@/entities/trip/trip.mock'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatFullDateToKorean } from '@/shared/utils/format'

const tripList = userTripListMockData
</script>
