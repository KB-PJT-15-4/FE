<template>
  <div class="flex w-full flex-col gap-3">
    <TypographyHead3>예약하기</TypographyHead3>
    <ItemInfo
      :item="item"
      class="mb-3"
    />

    <div class="h-[430px]">
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
</template>
<script setup lang="ts">
import { ItemType, type AccommodationReservation } from '@/entities/trip/trip.entity'
import { reservationItemInfoMockData } from '@/entities/trip/trip.mock'
import ItemInfo from '@/features/trip/Reservation/ui/ItemInfo.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import PersonnelTab from '@/shared/components/molecules/tab/PersonnelTab.vue'
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

const reservationInfo = ref<AccommodationReservation | null>(null)

reservationInfo.value = {
  itemId,
  startDate: route.query.start_date as string,
  endDate: route.query.end_date as string,
}
</script>
