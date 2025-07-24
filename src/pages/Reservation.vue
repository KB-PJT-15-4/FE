<template>
  <div class="flex w-full flex-col gap-3">
    <TypographyHead3>예매하기</TypographyHead3>
    <ItemInfo :item="item" />

    <!-- 숙박 -->
    <div v-if="type === ItemType.Accommodation">
      <TypographySubTitle1>
        입실일: {{ (reservationInfo as AccommodationReservation).startDate }}
      </TypographySubTitle1>
      <TypographySubTitle1>
        퇴실일: {{ (reservationInfo as AccommodationReservation).endDate }}
      </TypographySubTitle1>
      <TypographySubTitle1>인원: {{ reservationInfo.people }}명</TypographySubTitle1>
    </div>

    <!-- 교통 -->
    <div v-if="type === ItemType.Transportation">
      <TypographySubTitle1>
        출발지: {{ (reservationInfo as TransportationReservation).origin }}
      </TypographySubTitle1>
      <TypographySubTitle1>
        도착지:
        {{ (reservationInfo as TransportationReservation).destination }}
      </TypographySubTitle1>
      <TypographySubTitle1>
        출발일: {{ (reservationInfo as TransportationReservation).date }}
      </TypographySubTitle1>
      <TypographySubTitle1>인원: {{ reservationInfo.people }}명</TypographySubTitle1>
    </div>

    <!-- 식당 -->
    <div v-if="type === ItemType.Restaurant">
      <TypographySubTitle1>
        카테고리: {{ (reservationInfo as RestaurantReservation).category }}
      </TypographySubTitle1>
      <TypographySubTitle1>
        예약일: {{ (reservationInfo as RestaurantReservation).date }}
      </TypographySubTitle1>
      <TypographySubTitle1>인원: {{ reservationInfo.people }}명</TypographySubTitle1>
    </div>
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
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tripId = route.params.tripId as string
console.log(tripId)

const type = route.query.type as ItemType
const itemId = route.query.itemId as string
const item = reservationItemInfoMockData // 추후 itemId, type을 통해 받아올 예정

let reservationInfo: AccommodationReservation | TransportationReservation | RestaurantReservation

if (type === ItemType.Accommodation) {
  reservationInfo = {
    itemId,
    people: Number(route.query.people),
    startDate: route.query.startDate as string,
    endDate: route.query.endDate as string,
  }
}

if (type === ItemType.Transportation) {
  reservationInfo = {
    itemId,
    people: Number(route.query.people),
    origin: route.query.origin as string,
    destination: route.query.destination as string,
    date: route.query.startDate as string,
  }
}

if (type === ItemType.Restaurant) {
  reservationInfo = {
    itemId,
    people: Number(route.query.people),
    category: route.query.category as string,
    date: route.query.date as string,
  }
}
</script>
