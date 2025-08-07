<template>
  <ReservationInfoCard
    v-if="showInfoCard"
    :item-id="reservation.reservationId"
    @close="showInfoCard = false"
  />
  <Card class="flex justify-between">
    <div class="flex gap-4">
      <div class="h-[40px] w-[40px] overflow-hidden rounded-full flex justify-center items-center">
        <img
          :src="
            reservation.resKind === 'TRANSPORT'
              ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/KTX-I_in_Seoul_Station.jpg/960px-KTX-I_in_Seoul_Station.jpg'
              : reservation.imageUrl
          "
          class="h-[40px] w-[40px]"
        >
      </div>
      <div>
        <TypographySubTitle1>{{ reservation.name }}</TypographySubTitle1>
        <TypographyP2>{{ formatFullDateToKorean(new Date(reservation.date)) }}</TypographyP2>
      </div>
    </div>
    <ButtonSmallMain @click="showInfoCard = true">
      <i class="bi bi-qr-code-scan mr-1" /> QR 보기
    </ButtonSmallMain>
  </Card>
</template>
<script setup lang="ts">
import type { UserReservationList } from '@/entities/trip/trip.entity'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { formatFullDateToKorean } from '@/shared/utils/format'
import { ref } from 'vue'
import ReservationInfoCard from './ReservationInfoCard.vue'

defineProps<{ reservation: UserReservationList }>()
const showInfoCard = ref(false)
</script>
