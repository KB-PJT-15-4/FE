<template>
  <div>
    <div
      v-if="isLoading"
      class="w-full h-[100vh] flex flex-col justify-center items-center gap-4"
    />

    <div
      v-else-if="reservationInfo == null"
      class="w-full pt-[100px] flex flex-col items-center"
    >
      <div
        class="border rounded-full bg-[#ff9090] h-[140px] w-[140px] mb-7 flex justify-center items-center"
      >
        <i class="bi bi-x text-[#d43a3a] font-extrabold text-[120px]" />
      </div>
      <TypographyHead1>유효하지 않은 QR 정보입니다</TypographyHead1>
      <TypographySubTitle1>예약권 정보를 확인해주세요</TypographySubTitle1>
      <ButtonMain
        class="mt-[20vh]"
        @click="router.replace({ name: 'owner' })"
      >
        <TypographyHead3>메인으로</TypographyHead3>
      </ButtonMain>
    </div>

    <div
      v-else
      class="w-full flex flex-col justify-center items-center gap-5"
    >
      <TypographyP1>본 회원 정보는 QR 인증을 통해 확인된 예약권입니다.</TypographyP1>
      <TypographyHead1 class="my-7">
        예약권 정보
      </TypographyHead1>

      <!-- 숙박 -->
      <div
        v-if="reservationInfo.type === 'ACCOMMODATION'"
        class="w-full flex flex-col justify-start items-center gap-4 h-[55vh]"
      >
        <TypographyHead3 class="mb-7">
          {{ (reservationInfo as ReservedAccommodationItem).hotelName }}
        </TypographyHead3>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            룸 타입
          </TypographyP1>
          <TypographyP1>{{ (reservationInfo as ReservedAccommodationItem).roomType }}</TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            체크인 시간
          </TypographyP1>
          <TypographyP1>
            {{
              (reservationInfo as ReservedAccommodationItem).checkinDay
            }}
          </TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            체크아웃 시간
          </TypographyP1>
          <TypographyP1>
            {{
              (reservationInfo as ReservedAccommodationItem).checkoutDay
            }}
          </TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            인원
          </TypographyP1>
          <TypographyP1>{{ (reservationInfo as ReservedAccommodationItem).guests }}명</TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            예약 상태
          </TypographyP1>
          <TypographyP1>{{ (reservationInfo as ReservedAccommodationItem).status }}</TypographyP1>
        </div>
      </div>

      <!-- 식당 -->
      <div
        v-if="reservationInfo.type === 'RESTAURANT'"
        class="w-full flex flex-col justify-start items-center gap-4 h-[55vh]"
      >
        <TypographyHead3 class="mb-7">
          {{ (reservationInfo as ReservedRestaurantItem).restName }}
        </TypographyHead3>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            예약 일자
          </TypographyP1>
          <TypographyP1>
            {{ (reservationInfo as ReservedRestaurantItem).date }}
            {{ (reservationInfo as ReservedRestaurantItem).time }}
          </TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            인원
          </TypographyP1>
          <TypographyP1>{{ (reservationInfo as ReservedRestaurantItem).resNum }}명</TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            예약 상태
          </TypographyP1>
          <TypographyP1>{{ (reservationInfo as ReservedRestaurantItem).status }}</TypographyP1>
        </div>
      </div>

      <!-- 교통 -->
      <div
        v-if="reservationInfo.type === 'TRANSPORT'"
        class="w-full flex flex-col justify-start items-center gap-4 h-[55vh]"
      >
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            열차 명
          </TypographyP1>
          <TypographyP1>{{ (reservationInfo as ReservedTransportationItem).trainNo }}</TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            예매 좌석
          </TypographyP1>
          <TypographyP1>
            {{ (reservationInfo as ReservedTransportationItem).seatRoomNo }}칸-{{
              (reservationInfo as ReservedTransportationItem).seatNumber
            }}
          </TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            출발지
          </TypographyP1>
          <TypographyP1>
            {{
              (reservationInfo as ReservedTransportationItem).departureName
            }}
          </TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            출발 시간
          </TypographyP1>
          <TypographyP1>
            {{
              (reservationInfo as ReservedTransportationItem).departureTime
            }}
          </TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            도착지
          </TypographyP1>
          <TypographyP1>
            {{
              (reservationInfo as ReservedTransportationItem).arrivalName
            }}
          </TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            도착 시간
          </TypographyP1>
          <TypographyP1>
            {{
              (reservationInfo as ReservedTransportationItem).arrivalTime
            }}
          </TypographyP1>
        </div>
        <div class="w-full flex gap-4 justify-between">
          <TypographyP1 class="font-bold">
            예약 상태
          </TypographyP1>
          <TypographyP1>{{ (reservationInfo as ReservedTransportationItem).status }}</TypographyP1>
        </div>
      </div>

      <ButtonMain @click="router.replace({ name: 'owner' })">
        <TypographyHead3>메인으로</TypographyHead3>
      </ButtonMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ReservedAccommodationItem,
  ReservedRestaurantItem,
  ReservedTransportationItem,
} from '@/entities/user/user.entity'
import { getDecodeReservationQR } from '@/features/user/Owner/services/owner.service'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const data = route.query.result as string
const reservationInfo = ref<
  ReservedAccommodationItem | ReservedRestaurantItem | ReservedTransportationItem | null
>(null)
const isLoading = ref(true)

async function getDecodeQRFunction() {
  try {
    reservationInfo.value = await getDecodeReservationQR(data)
  } catch (e) {
    console.error(e)
    reservationInfo.value = null
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getDecodeQRFunction()
})
</script>
