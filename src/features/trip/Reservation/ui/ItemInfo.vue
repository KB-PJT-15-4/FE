<template>
  <Card>
    <div class="flex gap-4">
      <div class="h-[40px] w-[40px] overflow-hidden rounded-full flex justify-center items-center">
        <img
          :src="item.imageUrl"
          class="h-[40px] w-[40px]"
        >
      </div>
      <div>
        <TypographySubTitle1>{{ item.title }}</TypographySubTitle1>
        <TypographyP2 class="text-moa-sub-text">
          {{ item.address }}
        </TypographyP2>
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import type { ReservationItem } from '@/entities/trip/trip.entity'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'

defineProps<{ item: ReservationItem }>()
</script>
