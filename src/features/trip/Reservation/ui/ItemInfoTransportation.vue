<template>
  <Card>
    <div class="flex gap-4 justify-between">
      <div class="flex justify-center items-center gap-3">
        <div
          class="h-[40px] w-[40px] overflow-hidden rounded-full flex justify-center items-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/KTX-I_in_Seoul_Station.jpg/960px-KTX-I_in_Seoul_Station.jpg"
            class="h-[40px] w-[40px]"
          >
        </div>
        <TypographySubTitle1>{{ item.trainNo }}</TypographySubTitle1>
      </div>
      <di class="flex justify-between">
        <div class="flex flex-col justify-end items-end">
          <TypographyP2> {{ item.origin }} - {{ item.destination }} </TypographyP2>
          <TypographyP2>
            {{ formatFullDateToKorean(new Date(item.startDate!)) }}
            {{ item.startTime }}
          </TypographyP2>
        </div>
      </di>
    </div>
  </Card>
</template>
<script setup lang="ts">
import type { TransportationItem } from '@/entities/trip/trip.entity'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { formatFullDateToKorean } from '@/shared/utils/format'

const props = defineProps<{ item: TransportationItem }>()
</script>
