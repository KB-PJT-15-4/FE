<template>
  <div class="flex w-full flex-col gap-3">
    <TypographyHead3>예매하기</TypographyHead3>
    <ItemInfo :item="item" />
  </div>
</template>
<script setup lang="ts">
import {
  ReservationType,
  type AccommodationReservation,
  type RestaurantReservation,
  type TransportationReservation,
} from '@/entities/trip/trip.entity'
import { reservationItemInfoMockData } from '@/entities/trip/trip.mock'
import ItemInfo from '@/features/trip/Reservation/ui/ItemInfo.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tripId = route.params.tripId as string
console.log(tripId)

const type = route.query.type as string
const itemId = route.query.itemId as string
const item = reservationItemInfoMockData // 추후 itemId, type을 통해 받아올 예정

let reservationInfo: AccommodationReservation | TransportationReservation | RestaurantReservation

if (type === ReservationType.Accommodation) {
  reservationInfo = {
    itemId,
    people: Number(route.query.people),
    startDate: route.query.startDate as string,
    endDate: route.query.endDate as string,
  }
}

if (type === ReservationType.Transportation) {
  reservationInfo = {
    itemId,
    people: Number(route.query.people),
    origin: route.query.origin as string,
    destination: route.query.destination as string,
    date: route.query.startDate as string,
  }
}

if (type === ReservationType.Transportation) {
  reservationInfo = {
    itemId,
    people: Number(route.query.people),
    category: route.query.category as string,
    date: route.query.date as string,
  }
}
</script>
