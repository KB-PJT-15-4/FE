<template>
  <div class="w-full flex flex-col gap-5">
    <IdCard
      v-if="showIdCard"
      @close="showIdCard = false"
    />
    <DriversLicense
      v-if="showDriversLicenseCard"
      @close="showDriversLicenseCard = false"
    />
    <TypographyHead1>강민재님의 전자지갑</TypographyHead1>
    <Card
      class="flex justify-center items-center cursor-pointer"
      @click="showIdCard = true"
    >
      <TypographyHead3>주민등록증 조회</TypographyHead3>
    </Card>
    <Card
      class="flex justify-center items-center cursor-pointer"
      @click="showDriversLicenseCard = true"
    >
      <TypographyHead3>운전면허증 조회</TypographyHead3>
    </Card>
    <div>
      <TypographyHead3>나의 예매내역</TypographyHead3>
      <TypographyP2 class="text-moa-main-text">
        전자지갑으로 편하게 예매 내역을 관리하세요
      </TypographyP2>
    </div>
    <Select
      v-model="selected"
      placeholder="여행을 선택해주세요"
    >
      <Option
        v-for="trip in tripOptions"
        :key="trip.value"
        :value="trip.value"
      >
        {{ trip.label }}
      </Option>
    </Select>
    <SegmentedTab
      v-model="selectedFilter"
      :options="filterTabOptions"
    />
    <div
      v-for="reservation in userReservationListMockData"
      :key="reservation.id"
      :value="reservation"
    >
      <ReservationInfo :reservation="reservation" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

import { userReservationListMockData, userTripListMockData } from '@/entities/trip/trip.mock'

import ReservationInfo from '@/features/trip/MyReservationList/ui/ReservationInfo.vue'
import DriversLicense from '@/features/user/UserIdCard/ui/DriversLicense.vue'
import IdCard from '@/features/user/UserIdCard/ui/IdCard.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'

const selected = ref('')
const showIdCard = ref(false)
const showDriversLicenseCard = ref(false)

const tripList = userTripListMockData
const tripOptions = tripList.map((trip) => ({
  label: trip.title,
  value: trip.id,
}))

const filterTabOptions = ['전체', '항공', '숙박', '식당']
const selectedFilter = ref(filterTabOptions[0])
</script>
