<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[360px]">
      <div class="flex flex-col gap-3 mb-3 w-full">
        <div class="grid grid-cols-2 gap-3 w-full">
          <div class="flex flex-col gap-2">
            <TypographyP1 class="pl-1">
              출발지
            </TypographyP1>
            <SelectSmall
              v-model="selectedOrigin"
              placeholder="출발지 선택"
            >
              <Option
                v-for="(location, i) in transportStationNameList"
                :key="i"
                :value="location"
              >
                {{ location }}
              </Option>
            </SelectSmall>
          </div>

          <div class="flex flex-col gap-2">
            <TypographyP1 class="pl-1">
              도착지
            </TypographyP1>
            <SelectSmall
              v-model="selectedDestination"
              placeholder="도착지 선택"
            >
              <Option
                v-for="(location, i) in transportStationNameList"
                :key="i"
                :value="location"
              >
                {{ location }}
              </Option>
            </SelectSmall>
          </div>
        </div>

        <div class="flex flex-col gap-2 w-full">
          <TypographyP1 class="pl-1">
            출발 날짜
          </TypographyP1>
          <Input
            v-model="selectedStartDate"
            type="date"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2 w-full">
          <TypographyP1 class="pl-1">
            출발 시간
          </TypographyP1>
          <Select
            v-model="selectedStartTime"
            class="w-full"
          >
            <Option
              v-for="(t, i) in timeOptions"
              :key="i"
            >
              {{ t }}
            </Option>
          </Select>
        </div>
      </div>

      <ButtonGhost
        class="w-full"
        @click="getAvailableTransportList"
      >
        <TypographySubTitle1 class="w-full text-center">
          검색하기
        </TypographySubTitle1>
      </ButtonGhost>

      <div
        v-if="!availableReservationList"
        class="w-full h-[100px] flex justify-center items-center"
      >
        <TypographySubTitle1 class="text-moa-main-text text-center">
          교통편을 검색해보세요!
        </TypographySubTitle1>
      </div>

      <div
        v-else-if="availableReservationList.length === 0"
        class="w-full h-[100px] flex justify-center items-center"
      >
        <TypographySubTitle1 class="text-moa-main-text text-center">
          예약 가능한 교통편이 없습니다.
        </TypographySubTitle1>
      </div>

      <div
        v-else
        class="max-h-[140px] overflow-auto w-full"
      >
        <FilteredTransportationList :available-reservation-list="availableReservationList" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  timeOptions,
  transportStationNameList,
  type TransportationItem,
} from '@/entities/trip/trip.entity'
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

const selectedOrigin = ref(transportStationNameList[0])
const selectedDestination = ref(transportStationNameList[1])

const today = new Date()
const selectedStartDate = ref(today.toISOString().split('T')[0])

const selectedStartTime = ref(timeOptions[0])
provide('selectedStartDate', selectedStartDate)
provide('selectedStartTime', selectedStartTime)
provide('selectedOrigin', selectedOrigin)
provide('selectedDestination', selectedDestination)

async function getAvailableTransportList() {
  if (selectedOrigin.value === selectedDestination.value) {
    alert('출발지와 도착지는 달라야합니다.')
    return
  }
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
