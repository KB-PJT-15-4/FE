<template>
  <div class="flex w-full flex-col gap-3">
    <TypographyHead3>예약하기</TypographyHead3>
    <ItemInfo
      :item="item"
      class="mb-3"
    />

    <div class="h-[430px]">
      <div
        v-if="type === ItemType.Transportation"
        class="flex flex-col gap-3"
      >
        <div class="flex">
          <TypographySubTitle1 class="w-[80px]">
            출발 일자
          </TypographySubTitle1>
          <TypographyP1>
            {{
              formatFullDateToKorean(new Date((reservationInfo as TransportationReservation).date))
            }}
            {{ (reservationInfo as TransportationReservation).time }}
          </TypographyP1>
        </div>
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            출발지
          </TypographySubTitle2>
          <TypographyP1>{{ (reservationInfo as TransportationReservation).origin }}</TypographyP1>
        </div>
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            도착지
          </TypographySubTitle2>
          <TypographyP1>
            {{ (reservationInfo as TransportationReservation).destination }}
          </TypographyP1>
        </div>

        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            선택 좌석
          </TypographySubTitle2>
          <TypographyP1
            v-for="(seat, index) in (reservationInfo as TransportationReservation).seat"
            :key="index"
            class="pr-3"
          >
            {{ seat }}
          </TypographyP1>
        </div>
      </div>
    </div>

    <!-- 가격 및 결제 -->
    <div class="w-full flex justify-between">
      <TypographyHead3>결제 금액</TypographyHead3>
      <TypographyHead3> {{ formatNumber(item.price! * selectedN) }} 원 </TypographyHead3>
    </div>
    <div class="w-full flex justify-between">
      <ButtonMediumSub>취소하기</ButtonMediumSub>
      <ButtonMediumMain> 예약하기 </ButtonMediumMain>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ItemType, type TransportationReservation } from '@/entities/trip/trip.entity'
import { reservationItemInfoMockData } from '@/entities/trip/trip.mock'
import ItemInfo from '@/features/trip/Reservation/ui/ItemInfo.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatFullDateToKorean, formatNumber } from '@/shared/utils/format'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tripId = route.params.tripId as string

const type = route.query.type as ItemType
const itemId = route.query.itemId as string
const item = reservationItemInfoMockData // 추후 itemId, type을 통해 받아올 예정

const selectedN = ref(1)

const reservationInfo = ref<TransportationReservation | null>(null)

reservationInfo.value = {
  itemId,
  origin: route.query.origin as string,
  destination: route.query.destination as string,
  date: route.query.start_date as string,
  seat: route.query.seat as string[],
  time: route.query.start_time as string,
}
</script>
