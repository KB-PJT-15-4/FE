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
            :src="item.hotelImageUrl"
            class="h-[40px] w-[40px]"
          >
        </div>
        <div>
          <TypographySubTitle1>{{ item.hotelName }}</TypographySubTitle1>
          <TypographyP2 class="text-moa-sub-text">
            {{ item.address }}
          </TypographyP2>
        </div>
      </div>
      <ButtonSmallMain
        @click="
          () => {
            const query: Record<string, string | number> = {
              type: ItemType.Accommodation,
              itemId: item.accomId,
              start_date: selectedStartDate,
              end_date: selectedEndDate,
            }

            router.push({
              name: 'reservation',
              params: { tripId },
              query,
            })
          }
        "
      >
        예약하기
      </ButtonSmallMain>
    </Card>
  </div>
</template>
<script setup lang="ts">
import router from '@/app/router'
import { ItemType, type AccommodationItem } from '@/entities/trip/trip.entity'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { inject, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{ availableReservationList: AccommodationItem[] }>()
const route = useRoute()
const tripId = route.params.tripId

const selectedStartDate = inject<Ref<string>>('selectedStartDate', ref(''))
const selectedEndDate = inject<Ref<string>>('selectedEndDate', ref(''))
</script>
