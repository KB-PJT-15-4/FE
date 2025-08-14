<template>
  <div class="w-full flex flex-col gap-5">
    <IdCard
      v-if="showIdCard && idCard"
      :id-card="idCard"
      @close="showIdCard = false"
    />
    <DriversLicense
      v-if="showDriversLicenseCard && driversLicense"
      :drivers-license="driversLicense"
      @close="showDriversLicenseCard = false"
    />
    <TypographyHead2>{{ name }}님의 전자지갑</TypographyHead2>

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
    <ButtonGhost @click="logoutFunction">
      로그아웃
    </ButtonGhost>
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
import ButtonGhost from '@/shared/components/atoms/button/ButtonGhost.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import { useRouter } from 'vue-router'

const selectedTripId = ref<string | null>(null)
const tripList = ref<TripInfo[]>([])
const selectedFilter = ref(filterTabOptions[0])
const showIdCard = ref(false)
const showDriversLicenseCard = ref(false)

const idCard = ref<UserIDCard | null>(null)
const driversLicense = ref<UserDriversLicenseCard | null>(null)
const router = useRouter()

const name = localStorage.getItem('name') || idCard.value?.name
const tripOptions = computed(() =>
  tripList.value.map((trip) => ({
    label: trip.tripName,
    value: trip.tripId,
  }))
)

async function getTripListFunction(page: number) {
  const result = await getTripList(page, 100)
  tripList.value = result.content
}

async function getIdInfoFunction() {
  const result = await getIdInfo()

  idCard.value = result.idCard
  driversLicense.value = result.driverLicense

  if (localStorage.getItem('name') !== idCard.value!.name) {
    localStorage.setItem('name', idCard.value!.name)
  }
}

function logoutFunction() {
  if (window.confirm('로그아웃하시겠습니까?')) {
    localStorage.removeItem('accessToken')
    router.replace({ name: 'login' })
  }
}

onMounted(() => {
  getTripListFunction(0)
  getIdInfoFunction()
})
</script>
