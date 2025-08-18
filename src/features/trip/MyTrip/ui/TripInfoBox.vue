<template>
  <Card class="w-full flex flex-col gap-3 my-2">
    <div class="flex justify-between">
      <TypographyHead2>{{ trip.tripName }}</TypographyHead2>
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
        {{ convertLocationNameToKorean(trip.locationName) }}
      </TypographyP1>
    </div>
  </Card>
</template>
<script setup lang="ts">
import type { TripInfo } from '@/entities/trip/trip.entity'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { convertLocationNameToKorean, formatFullDateToKorean } from '@/shared/utils/format'
import { defineProps } from 'vue'

defineProps<{ trip: TripInfo }>()
</script>
