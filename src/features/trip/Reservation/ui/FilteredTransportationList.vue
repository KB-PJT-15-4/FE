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
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/KTX-I_in_Seoul_Station.jpg/960px-KTX-I_in_Seoul_Station.jpg"
            class="h-[40px] w-[40px]"
          >
        </div>
        <div class="flex flex-col">
          <TypographySubTitle1>{{ item.trainNo }}</TypographySubTitle1>
          <TypographyP2 class="text-moa-sub-text">
            {{ item.departureName }}
          </TypographyP2>
        </div>
      </div>
      <ButtonSmallMain
        @click="
          () => {
            const query: Record<string, string | number> = {
              type: ItemType.Transportation,
              itemId: item.transportId,
              start_date: selectedStartDate,
              origin: selectedOrigin,
              destination: selectedDestination,
              start_time: selectedStartTime,
            }

            router.push({
              name: 'select_seat',
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
import { ItemType, type TransportationItem } from '@/entities/trip/trip.entity'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { inject, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{ availableReservationList: TransportationItem[] }>()
const route = useRoute()
const tripId = route.params.tripId

const selectedStartDate = inject<Ref<string>>('selectedStartDate', ref(''))
const selectedOrigin = inject<Ref<string>>('selectedOrigin', ref(''))
const selectedDestination = inject<Ref<string>>('selectedDestination', ref(''))
const selectedStartTime = inject<Ref<string>>('selectedStartTime', ref(''))
</script>
