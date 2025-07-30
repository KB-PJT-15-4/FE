<template>
  <div class="w-full flex flex-col justify-center">
    <ItemInfo
      :item="item"
      class="mb-3"
    />
    <div class="w-full h-[450px] overflow-y-scroll">
      <SelectSeatBox
        v-for="container in containers"
        :key="container"
        :container="container"
      />
    </div>

    <div class="flex w-full justify-between my-5">
      <TypographySubTitle1>선택 좌석</TypographySubTitle1>
      <div class="flex gap-3">
        <TypographySubTitle1
          v-for="(seat, index) in selectedSeat"
          :key="index"
        >
          {{
            seat
          }}
        </TypographySubTitle1>
      </div>
    </div>
    <div class="flex w-full justify-between">
      <ButtonMediumSub>취소</ButtonMediumSub>
      <ButtonMediumMain
        @click="
          // 좌석에 락 거는 api 호출 필요
          () => {
            const query: Record<string, string | number | string[]> = {
              type: type,
              itemId: item.itemId,
            }

            query.seat = selectedSeat
            query.start_date = selectedStartDate
            query.origin = selectedOrigin
            query.destination = selectedDestination
            query.start_time = selectedStartTime

            router.push({ name: 'reservation', params: { tripId }, query })
          }
        "
      >
        예약하기
      </ButtonMediumMain>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ItemType, type TransportationReservation } from '@/entities/trip/trip.entity'
import { reservationItemInfoMockData } from '@/entities/trip/trip.mock'
import ItemInfo from '@/features/trip/Reservation/ui/ItemInfo.vue'
import SelectSeatBox from '@/features/trip/Reservation/ui/SelectSeatBox.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tripId = route.params.tripId as string
console.log(tripId)

const type = route.query.type as ItemType
const selectedStartDate = route.query.start_date as string
const selectedStartTime = route.query.start_time as string
const selectedOrigin = route.query.origin as string
const selectedDestination = route.query.destination as string

const itemId = route.query.itemId as string
const item = reservationItemInfoMockData
const selectedSeat = ref(['A1', 'A2'])

let reservationInfo: TransportationReservation
const containers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
reservationInfo = {
  itemId,
  origin: route.query.origin as string,
  destination: route.query.destination as string,
  date: route.query.start_date as string,
  seat: selectedSeat.value,
  time: selectedStartTime,
}
</script>
