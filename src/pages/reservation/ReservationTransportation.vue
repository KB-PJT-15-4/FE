<template>
  <div class="flex w-full flex-col gap-3">
    <TypographyHead3>예약하기</TypographyHead3>
    <ItemInfoTransportation
      v-if="item"
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
            v-for="(seat, index) in seat"
            :key="index"
            class="pr-3"
          >
            {{ seat.seatNumber }}
          </TypographyP1>
        </div>
      </div>
    </div>

    <!-- 가격 및 결제 -->
    <div class="w-full flex justify-between">
      <TypographyHead3>결제 금액</TypographyHead3>
      <TypographyHead3> {{ formatNumber(price) }} 원 </TypographyHead3>
    </div>
    <div class="w-full flex justify-between">
      <ButtonMediumSub @click="cancelReservationFunction">
        취소하기
      </ButtonMediumSub>
      <ButtonMediumMain @click="reservationTransportationFunction">
        예약하기
      </ButtonMediumMain>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ItemType,
  type TransportationItem,
  type TransportationReservation,
  type TransportationSeat,
} from '@/entities/trip/trip.entity'
import {
  cancelTransportationReservation,
  reservationTransportation,
} from '@/features/trip/Reservation/services/reservation.service'
import ItemInfoTransportation from '@/features/trip/Reservation/ui/ItemInfoTransportation.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatFullDateToKorean, formatNumber } from '@/shared/utils/format'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const type = route.query.type as ItemType
const itemId = route.query.itemId as string
const reservationId = route.query.reservation_num as string
const item = ref<TransportationItem | null>(null)

const reservationInfo = ref<TransportationReservation | null>(null)
const seat: TransportationSeat[] = JSON.parse(localStorage.getItem('seat')!)
const price = seat.reduce((acc, cur) => acc + cur.price, 0)

reservationInfo.value = {
  itemId,
  origin: route.query.origin as string,
  destination: route.query.destination as string,
  date: route.query.start_date as string,
  time: route.query.start_time as string,
}

async function reservationTransportationFunction() {
  try {
    if (window.confirm('예약하시겠습니까?')) {
      await reservationTransportation(Number(reservationId), price)

      alert('예약이 완료되었습니다. \n예매내역페이지로 이동합니다.')
      localStorage.removeItem('seat')
      router.replace({ name: 'trip_detail', query: { tab: 'reservationList' } })
    }
  } catch (e) {
    console.error(e)
    alert('예약에 실패하였습니다.')
  }
}

async function cancelReservationFunction() {
  try {
    if (window.confirm('선택한 좌석 정보가 사라집니다.\n예약을 취소하시겠습니까?')) {
      await cancelTransportationReservation(Number(reservationId))
      alert('취소가 완료되었습니다.')
      router.replace({ name: 'trip_detail', query: { tab: 'reservationList' } })
    }
  } catch (e) {
    console.error(e)
    alert('취소를 완료하지 못하였습니다.')
  }
}

function setItemInfo() {
  item.value = {
    transportId: Number(route.query.itemId),
    trainNo: route.query.trainNo as string,
    departureName: route.query.origin as string,
    origin: route.query.origin as string,
    destination: route.query.destination as string,
    startDate: route.query.start_date as string,
    startTime: route.query.start_time as string,
  }
}

onMounted(() => {
  setItemInfo()
})
</script>
