<template>
  <div class="w-full flex flex-col gap-5">
    <IdCard
      v-if="showIdCard && idCard"
      :id-card="idCard"
      @close="showIdCard = false"
    />
    <DriversLicense
      v-if="showDriversLicenseCard"
      :drivers-license="driversLicense"
      @close="showDriversLicenseCard = false"
    />
    <TypographyHead1>강민재님의 전자지갑</TypographyHead1>

    <Card
      class="bg-white flex justify-center items-center cursor-pointer"
      @click="showIdCard = true"
    >
      <TypographyHead3><span class="text-red-500">PASS</span> 주민등록증 조회</TypographyHead3>
    </Card>
    <Card
      class="bg-white flex justify-center items-center cursor-pointer"
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
      v-model="selectedTripId!"
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

    <MyReservationList
      :trip-id="selectedTripId"
      :filter="selectedFilter"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { filterTabOptions, type TripInfo } from '@/entities/trip/trip.entity'
import { getTripList } from '@/features/trip/MyTrip/services/myTrip.service'

import DriversLicense from '@/features/user/UserIdCard/ui/DriversLicense.vue'
import IdCard from '@/features/user/UserIdCard/ui/IdCard.vue'

import type { UserDriversLicenseCard, UserIDCard } from '@/entities/user/user.entity'
import MyReservationList from '@/features/trip/MyReservationList/ui/MyReservationList.vue'
import { getIdInfo } from '@/features/user/UserIdCard/services/userIdCard.service'
import Card from '@/shared/components/atoms/card/Card.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'

const selectedTripId = ref<number | null>(null)
const tripList = ref<TripInfo[]>([])
const selectedFilter = ref(filterTabOptions[0])
const showIdCard = ref(false)
const showDriversLicenseCard = ref(false)

const idCard = ref<UserIDCard | null>(null)
const driversLicense = ref<UserDriversLicenseCard | null>(null)

const tripOptions = computed(() =>
  tripList.value.map((trip) => ({
    label: trip.tripName,
    value: trip.tripId,
  }))
)

async function getTripListFunction(page: number) {
  const result = await getTripList(localStorage.getItem('accessToken')!, page, 10)
  tripList.value = result.content
}

async function getIdInfoFunction() {
  const result = await getIdInfo(localStorage.getItem('accessToken')!)
  idCard.value = result.idCard
  driversLicense.value = result.driverLicense
}

onMounted(() => {
  getTripListFunction(0)
  getIdInfoFunction()
})
</script>
