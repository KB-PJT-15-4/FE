<template>
  <div class="flex flex-col gap-2 mb-3">
    <div class="flex w-full justify-between">
      <div class="flex flex-col gap-2 w-full">
        <TypographyP1 class="pl-1">
          출발지
        </TypographyP1>
        <SelectSmall
          v-model="selectedOrigin"
          placeholder="출발지 선택"
        >
          <Option
            v-for="(location, index) in locationList"
            :key="index"
            :value="location"
          >
            {{ location }}
          </Option>
        </SelectSmall>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <TypographyP1 class="pl-1">
          도착지
        </TypographyP1>
        <SelectSmall
          v-model="selectedDestination"
          placeholder="도착지 선택"
        >
          <Option
            v-for="(location, index) in locationList"
            :key="index"
            :value="location"
          >
            {{ location }}
          </Option>
        </SelectSmall>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <TypographyP1 class="pl-1">
        출발 날짜
      </TypographyP1>
      <Input
        v-model="selectedStartDate"
        type="date"
      />
    </div>
    <div class="flex flex-col gap-2">
      <TypographyP1 class="pl-1">
        출발 시간
      </TypographyP1>
      <Select v-model="selectedStartTime">
        <Option
          v-for="(item, index) in timeOptions"
          :key="index"
        >
          {{ item }}
        </Option>
      </Select>
    </div>
  </div>
  <ButtonGhost @click="getAvailableTransportList">
    <TypographySubTitle1>검색하기</TypographySubTitle1>
  </ButtonGhost>

  <div
    v-if="!availableReservationList"
    class="w-full h-[100px] flex justify-center items-center"
  >
    <TypographySubTitle1 class="text-moa-main-text">
      교통편을 검색해보세요!
    </TypographySubTitle1>
  </div>
  <div
    v-else-if="availableReservationList.length === 0"
    class="w-full h-[100px] flex justify-center items-center"
  >
    <TypographySubTitle1 class="text-moa-main-text">
      예약 가능한 교통편이 없습니다.
    </TypographySubTitle1>
  </div>
  <FilteredTransportationList
    v-else
    :available-reservation-list="availableReservationList"
  />
</template>
<script setup lang="ts">
import { locationList, timeOptions, type TransportationItem } from '@/entities/trip/trip.entity'
import ButtonGhost from '@/shared/components/atoms/button/ButtonGhost.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import SelectSmall from '@/shared/components/atoms/input/SelectSmall.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { provide, ref } from 'vue'
import { getTransportList } from '../services/reservation.service'
import FilteredTransportationList from './FilteredTransportationList.vue'

const availableReservationList = ref<TransportationItem[] | null>(null)

const selectedOrigin = ref(locationList[0])
const selectedDestination = ref(locationList[1])

const today = new Date()
const selectedStartDate = ref(today.toISOString().split('T')[0])

const selectedStartTime = ref(timeOptions[0])
provide('selectedStartDate', selectedStartDate)
provide('selectedStartTime', selectedStartTime)
provide('selectedOrigin', selectedOrigin)
provide('selectedDestination', selectedDestination)

async function getAvailableTransportList() {
  try {
    const result = await getTransportList(
      localStorage.getItem('accessToken')!,
      selectedOrigin.value,
      selectedDestination.value,
      selectedStartDate.value,
      selectedStartTime.value
    )
    availableReservationList.value = await result.content
  } catch (e) {
    console.error(e)
    alert('예약 가능 리스트를 불러오는데 실패하였습니다.')
  }
}
</script>
