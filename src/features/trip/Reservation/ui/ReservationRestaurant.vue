<template>
  <div class="flex flex-col gap-2 mb-3">
    <TypographyP1 class="pl-1">
      카테고리
    </TypographyP1>
    <Select
      v-model="selectedCategoryCode"
      placeholder="카테고리를 선택해주세요"
    >
      <Option
        v-for="(type, index) in categoryList"
        :key="index"
        :value="type.categoryCode"
      >
        {{ type.categoryName }}
      </Option>
    </Select>
    <TypographyP1 class="pl-1">
      예약 날짜
    </TypographyP1>
    <Input
      v-model="selectedDate"
      type="date"
    />
  </div>
  <ButtonGhost @click="getAvailableRestaurantList">
    <TypographySubTitle1>검색하기</TypographySubTitle1>
  </ButtonGhost>
  <FilteredRestaurantList
    v-if="availableReservationList.length >= 1"
    :available-reservation-list="availableReservationList"
  />
  <div
    v-else
    class="w-full h-[100px] flex justify-center items-center"
  >
    <TypographySubTitle1 class="text-moa-main-text">
      예약 가능한 교통편이 없습니다.
    </TypographySubTitle1>
  </div>
</template>
<script setup lang="ts">
import { type RestaurantCategory, type RestaurantItem } from '@/entities/trip/trip.entity'
import ButtonGhost from '@/shared/components/atoms/button/ButtonGhost.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { computed, onMounted, provide, ref } from 'vue'

import { useRoute } from 'vue-router'
import { getRestaurantCategoryList, getRestaurantList } from '../services/reservation.service'
import FilteredRestaurantList from './FilteredRestaurantList.vue'

const availableReservationList = ref<RestaurantItem[]>([])

const categoryList = ref<RestaurantCategory[]>([])
const selectedCategoryCode = ref<string>('')
const selectedCategory = computed(() =>
  categoryList.value.find((item) => item.categoryCode === selectedCategoryCode.value)
)

const today = new Date()
const selectedDate = ref(today.toISOString().split('T')[0])

const route = useRoute()
const tripId = route.params.tripId as string

provide('selectedStartDate', selectedDate)
provide('selectedCategory', selectedCategory)

async function getAvailableRestaurantList() {
  if (!selectedCategory.value) {
    alert('카테고리를 선택해주세요')
    return
  }

  const result = await getRestaurantList(
    localStorage.getItem('accessToken')!,
    tripId,
    selectedDate.value,
    selectedCategory.value?.categoryCode
  )
  availableReservationList.value = await result.content
}

async function getRestaurantCategoryListFunction() {
  try {
    const result = await getRestaurantCategoryList(localStorage.getItem('accessToken')!)
    categoryList.value = await result
  } catch (e) {
    console.error(e)
    alert('카테고리 리스트를 불러오는데 실패하였습니다.')
  }
}

onMounted(() => {
  getRestaurantCategoryListFunction()
})
</script>
