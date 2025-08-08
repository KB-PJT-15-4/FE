<template>
  <div>
    <div
      v-if="reservationInfo == null"
      class="w-full h-[100vh] flex flex-col items-center pt-[100px]"
    >
      <div
        class="border rounded-full bg-[#ff9090] mb-10 h-[140px] w-[140px] flex justify-center items-center"
      >
        <i class="bi bi-x text-[#d43a3a] font-extrabold text-[120px]" />
      </div>
      <TypographyHead1>유효하지 않은 QR 정보입니다</TypographyHead1>
    </div>
    <div
      v-else
      class="w-full flex flex-col justify-center items-center gap-5"
    >
      <TypographyP1>본 회원 정보는 QR 인증을 통해 확인된 예약권입니다.</TypographyP1>
      <TypographyHead1 class="my-7">
        예약권 정보
      </TypographyHead1>
      <div
        v-if="reservationInfo!.type === 'ACCOMMODATION'"
        class="w-full flex flex-col justify-center items-center gap-4"
      >
        <TypographyHead3 class="mb-7">
          {{
            (reservationInfo as AccommodationItem).hotelName
          }}
        </TypographyHead3>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            룸 타입
          </TypographyP1>
          <TypographyP1>{{ (reservationInfo as AccommodationItem).roomType }} </TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            체크인 시간
          </TypographyP1>
          <TypographyP1>{{ (reservationInfo as AccommodationItem).checkinDay }} </TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            체크아웃 시간
          </TypographyP1>
          <TypographyP1> {{ (reservationInfo as AccommodationItem).checkoutDay }}</TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            인원
          </TypographyP1>
          <TypographyP1> {{ (reservationInfo as AccommodationItem).guests }}명</TypographyP1>
        </div>
      </div>
    </div>
    <ButtonMain
      class="mt-[20vh]"
      @click="router.replace({ name: 'owner' })"
    >
      <TypographyHead3> 메인으로</TypographyHead3>
    </ButtonMain>
  </div>
</template>
<script setup lang="ts">
import { getDecodeReservationQR } from '@/features/user/Owner/services/owner.service'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const data = route.query.result as string
const reservationInfo = ref<AccommodationItem | RestaurantItem | TransportationItem>()

interface ItemType {
  type: 'ACCOMMODATION' | 'RESTAURANT' | 'TRANSPORTATION'
  reservationId: number
  status: string
}

interface AccommodationItem extends ItemType {
  accomId: number
  hotelName: string
  checkinDay: string
  checkoutDay: string
  guests: number
  roomType: string
}

interface RestaurantItem extends ItemType {
  restId: number
  date: string
  time: string
  resNum: number
}

interface TransportationItem extends ItemType {
  tranResId: number
  transportId: number
  departure: string
  arrival: string
  seatRoomNo: number
  seatNumber: string
  seatType: string
}

async function getDecodeQRFunction() {
  reservationInfo.value = await getDecodeReservationQR(localStorage.getItem('accessToken')!, data)
}

onMounted(() => {
  getDecodeQRFunction()
})
</script>
