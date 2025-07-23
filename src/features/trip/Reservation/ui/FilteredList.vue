<template>
  <div
    v-for="(item, index) in availableReservationList"
    :key="index"
    class="mt-3"
  >
    <Card class="flex justify-between">
      <div class="flex gap-4">
        <div
          class="h-[40px] w-[40px] overflow-hidden rounded-full flex justify-center items-center"
        >
          <img
            :src="item.imageUrl"
            class="h-[40px] w-[40px]"
          >
        </div>
        <div>
          <TypographySubTitle1>{{ item.title }}</TypographySubTitle1>
          <TypographyP2 class="text-moa-sub-text">
            {{ item.description }}
          </TypographyP2>
        </div>
      </div>
      <ButtonSmallMain>예약하기</ButtonSmallMain>
    </Card>
  </div>
</template>
<script setup lang="ts">
import type { AvailableReservation } from '@/entities/trip/trip.entity'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'

defineProps<{ availableReservationList: AvailableReservation[] }>()
</script>
