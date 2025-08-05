<template>
  <div class="flex w-full flex-col gap-3">
    <TypographyHead3>예약하기</TypographyHead3>
    <ItemInfoAccommodation
      v-if="item"
      :item="item"
      class="mb-3"
    />

    <div class="h-[430px]">
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
              formatFullDateToKorean(
                new Date((reservationInfo as AccommodationReservation).endDate)
              )
            }}
          </TypographyP1>
        </div>
        <div class="flex w-full items-center justify-start mt-3">
          <TypographySubTitle2 class="w-[50px]">
            인원
          </TypographySubTitle2>
          <PersonnelTab
            v-model="selectedN"
            :personnel="6"
          />
        </div>
      </div>
      <TypographySubTitle2 class="w-[50px] mt-5">
        방 타입
      </TypographySubTitle2>
      <template v-if="availableRoom.length >= 1">
        <Card
          v-for="(room, index) in availableRoom"
          :key="index"
          class="cursor-pointer my-5 flex justify-start gap-3"
          :class="{
            'border border-moa-main': selectedRoom?.accomResId === room.accomResId,
          }"
          @click="selectedRoom = selectedRoom?.accomResId === room.accomResId ? undefined : room"
        >
          <img
            :src="'https://cdn.3hoursahead.com/v2/content/image-comp/249f076b-6ae1-4017-bb1c-35265477a616.webp'"
            class="h-[90px] rounded-sm"
          >
          <div class="w-full">
            <TypographyHead2>{{ room.roomType }}</TypographyHead2>
            <TypographyP1>최대 {{ room.maxGuests }}명</TypographyP1>
            <TypographyHead3 class="w-full text-right">
              {{ formatNumber(room.price) }}원
            </TypographyHead3>
          </div>
        </Card>
      </template>
      <TypographySubTitle2
        v-else
        class="text-moa-sub-text w-full text-center py-4"
      >
        예약 가능한 방이 없습니다.
      </TypographySubTitle2>
    </div>
  </div>
  <!-- 가격 및 결제 -->
  <div class="w-full flex justify-between">
    <TypographyHead3>결제 금액</TypographyHead3>
    <TypographyHead3 v-if="selectedRoom">
      {{ formatNumber(selectedRoom.price) }} 원
    </TypographyHead3>
    <TypographyHead3
      v-else
      class="text-moa-sub-text"
    >
      방을 먼저 선택해주세요
    </TypographyHead3>
  </div>
  <div class="w-full flex justify-between">
    <ButtonMediumSub>취소하기</ButtonMediumSub>
    <ButtonMediumMain> 예약하기 </ButtonMediumMain>
  </div>
</template>
<script setup lang="ts">
import {
  ItemType,
  type AccommodationItem,
  type AccommodationReservation,
  type RoomType,
} from '@/entities/trip/trip.entity'
import {
  getAccommodationInfo,
  getRoomList,
} from '@/features/trip/Reservation/services/reservation.service'
import ItemInfoAccommodation from '@/features/trip/Reservation/ui/ItemInfoAccommodation.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import PersonnelTab from '@/shared/components/molecules/tab/PersonnelTab.vue'
import { formatFullDateToKorean, formatNumber } from '@/shared/utils/format'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const type = route.query.type as ItemType
const tripId = route.params.tripId as string
const itemId = route.query.itemId as string
const item = ref<AccommodationItem>()

const selectedN = ref(1)
const availableRoom = ref<RoomType[]>([])
const selectedRoom = ref<RoomType>()

const reservationInfo = ref<AccommodationReservation | null>(null)
reservationInfo.value = {
  itemId,
  startDate: route.query.start_date as string,
  endDate: route.query.end_date as string,
}

async function getAccommodationInfoFunction() {
  item.value = await getAccommodationInfo(localStorage.getItem('accessToken')!, itemId)
}

async function getRoomListFunction() {
  availableRoom.value = await getRoomList(
    localStorage.getItem('accessToken')!,
    tripId,
    itemId,
    route.query.start_date as string,
    route.query.end_date as string,
    selectedN.value
  )
}

async function reservationAccommodationFunction() {}

onMounted(() => {
  getAccommodationInfoFunction()
  getRoomListFunction()
})

watch(selectedN, () => {
  getRoomListFunction()
})
</script>
