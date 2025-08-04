<template>
  <Card
    v-for="reservation in reservationList"
    :key="reservation.id"
    class="flex justify-between mb-2"
  >
    <div class="flex gap-4">
      <div class="h-[40px] w-[40px] overflow-hidden rounded-full flex justify-center items-center">
        <img
          :src="reservation.imageUrl"
          class="h-[40px] w-[40px]"
        >
      </div>
      <div>
        <TypographySubTitle1>{{ reservation.title }}</TypographySubTitle1>
        <TypographyP2 class="text-[#626262]">
          {{ formatFullDateToKorean(new Date(reservation.date)) }}
        </TypographyP2>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { formatFullDateToKorean } from '@/shared/utils/format'

import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import Card from '@/shared/components/atoms/card/Card.vue'

const { reservationList } = defineProps<{
  reservationList: {
    id: string
    title: string
    date: string
    imageUrl: string
  }[]
}>()
</script>
