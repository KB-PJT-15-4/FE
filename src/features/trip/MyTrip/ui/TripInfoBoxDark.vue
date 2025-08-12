<template>
  <div class="w-full flex flex-col gap-3 my-2 bg-transparent">
    <div class="flex justify-between">
      <TypographyHead1 class="text-white text-[25px]">
        {{ trip.tripName }}
      </TypographyHead1>
      <TypographyCaption class="font-semibold text-white">
        {{ trip.status }}
      </TypographyCaption>
    </div>
    <div class="flex justify-between">
      <TypographySubTitle2 class="text-white">
        {{ formatFullDateToKorean(new Date(trip.startDate)) }} -
        {{ formatFullDateToKorean(new Date(trip.endDate)) }}
      </TypographySubTitle2>
      <TypographyP1 class="font-semibold text-white">
        {{ trip.locationName }}
      </TypographyP1>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TripInfo } from '@/entities/trip/trip.entity'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { defineProps } from 'vue'

defineProps<{ trip: TripInfo }>()
</script>
