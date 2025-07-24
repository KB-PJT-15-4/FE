<template>
  <div class="flex w-full flex-col gap-3">
    <TypographyHead3>예매하기</TypographyHead3>
    <ItemInfo
      :item="item"
      class="mb-3"
    />

    <div class="h-[450px]">
      <!-- 숙박 -->
      <div
        v-if="type === ItemType.Accommodation"
        class="flex flex-col gap-3"
      >
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            입실 일자
          </TypographySubTitle2>
          <TypographyP1>
            {{
              formatFullDateToKorean(
                new Date((reservationInfo as AccommodationReservation).startDate)
              )
            }}
          </TypographyP1>
        </div>
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            퇴실 일자
          </TypographySubTitle2>
          <TypographyP1>
            {{
              formatFullDateToKorean(new Date((reservationInfo as AccommodationReservation).endDate))
            }}
          </TypographyP1>
        </div>
      </div>

      <!-- 교통 -->
      <div
        v-if="type === ItemType.Transportation"
        class="flex flex-col gap-3"
      >
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
          <TypographySubTitle1 class="w-[80px]">
            출발 일자
          </TypographySubTitle1>
          <TypographyP1>
            {{
              formatFullDateToKorean(new Date((reservationInfo as TransportationReservation).date))
            }}
          </TypographyP1>
        </div>
      </div>

      <!-- 식당 -->
      <div
        v-if="type === ItemType.Restaurant"
        class="flex flex-col gap-3"
      >
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            카테고리
          </TypographySubTitle2>
          <TypographyP1>{{ (reservationInfo as RestaurantReservation).category }}</TypographyP1>
        </div>
        <div class="flex">
          <TypographySubTitle2 class="w-[80px]">
            예약 일자
          </TypographySubTitle2>
          <TypographyP1>
            {{
              formatFullDateToKorean(new Date((reservationInfo as RestaurantReservation).date))
            }}
          </TypographyP1>
        </div>
      </div>
      <div class="flex flex-col gap-3 mt-10">
        <div class="flex w-full items-center justify-start">
          <TypographySubTitle2 class="w-[50px]">
            인원
          </TypographySubTitle2>
          <PersonnelTab
            v-model="selectedN"
            :personnel="6"
          />
        </div>
        <div class="flex w-full items-center justify-start">
          <TypographySubTitle2 class="w-[50px]">
            시간
          </TypographySubTitle2>
          <div class="max-w-[310px] overflow-scroll">
            <SegmentedTab
              v-model="selectedTime"
              :options="options"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 가격 및 결제 -->
  <div class="w-full flex justify-between">
    <TypographyHead3>결제 금액</TypographyHead3>
    <TypographyHead3 v-if="type == ItemType.Accommodation || type == ItemType.Transportation">
      {{ formatNumber(item.price! * selectedN) }} 원
    </TypographyHead3>
    <TypographyHead3
      v-if="type == ItemType.Restaurant"
      class="text-moa-sub-text"
    >
      결제가 필요하지 않습니다.
    </TypographyHead3>
  </div>
  <div class="w-full flex justify-between">
    <ButtonMediumSub>취소하기</ButtonMediumSub>
    <ButtonMediumMain>예약하기</ButtonMediumMain>
  </div>
</template>
<script setup lang="ts">
import {
  ItemType,
  type AccommodationReservation,
  type RestaurantReservation,
  type TransportationReservation,
} from '@/entities/trip/trip.entity'
import { reservationItemInfoMockData } from '@/entities/trip/trip.mock'
import ItemInfo from '@/features/trip/Reservation/ui/ItemInfo.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import PersonnelTab from '@/shared/components/molecules/tab/PersonnelTab.vue'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import { formatFullDateToKorean, formatNumber } from '@/shared/utils/format'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tripId = route.params.tripId as string
console.log(tripId)

const type = route.query.type as ItemType
const itemId = route.query.itemId as string
const item = reservationItemInfoMockData // 추후 itemId, type을 통해 받아올 예정

const selectedN = ref(1)
const selectedTime = ref('10:00')
const options = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
]

let reservationInfo: AccommodationReservation | TransportationReservation | RestaurantReservation

if (type === ItemType.Accommodation) {
  reservationInfo = {
    itemId,
    startDate: route.query.startDate as string,
    endDate: route.query.endDate as string,
  }
}

if (type === ItemType.Transportation) {
  reservationInfo = {
    itemId,
    origin: route.query.origin as string,
    destination: route.query.destination as string,
    date: route.query.startDate as string,
  }
}

if (type === ItemType.Restaurant) {
  reservationInfo = {
    itemId,
    category: route.query.category as string,
    date: route.query.date as string,
  }
}
</script>
