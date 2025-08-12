<template>
  <div class="flex flex-col gap-4">
    <!-- 추가 버튼 -->
    <ButtonExtraSmallMain
      class="w-[60px] text-sm"
      @click="goToCreate"
    >
      추가
    </ButtonExtraSmallMain>

    <!-- 사용자 작성 기록 -->
    <div
      v-for="record in paginatedRecords"
      :key="record.recordId"
      class="p-4 bg-white rounded-md shadow border space-y-2"
    >
      <div class="flex justify-between items-center">
        <div class="font-bold text-base">
          {{ record.title }}
        </div>
        <div class="flex gap-2 w-[100px] text-sm">
          <ButtonExtraSmallMain @click="editRecord(record.recordId)">
            수정
          </ButtonExtraSmallMain>
          <ButtonExtraSmallMain @click="deleteRecord(record.recordId)">
            삭제
          </ButtonExtraSmallMain>
        </div>
      </div>

      <div class="text-sm text-[#626262]">
        {{ formatFullDateToKorean(new Date(record.recordDate)) }}
      </div>

      <!-- 이미지 가로 슬라이더 -->
      <div
        v-if="record.imageUrls && record.imageUrls.length > 0"
        class="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]"
        style="-webkit-overflow-scrolling: touch;"
      >
        <div
          v-for="(imageUrl, imgIndex) in record.imageUrls"
          :key="imgIndex"
          class="flex-none basis-full snap-center"
        >
          <img
            :src="imageUrl"
            class="w-full h-64 object-cover rounded-md"
            :alt="`기록 이미지 ${imgIndex + 1}`"
            loading="lazy"
          >
        </div>
      </div>

      <p class="text-sm text-[#626262] whitespace-pre-line line-clamp-2">
        {{ record.content }}
      </p>
    </div>

    <!-- 기록이 없는 경우 -->
    <div
      v-if="recordList.length === 0"
      class="text-center py-8 text-gray-500"
    >
      <img
        src="/src/assets/bear.jpg"
        alt="기록 없음"
        class="w-40 h-40 object-contain mx-auto mb-2"
      >
      <TypographySubTitle1>아직 기록이 없습니다</TypographySubTitle1>
    </div>

    <!-- 페이지네이션 -->
    <Pagination
      v-if="totalPage > 1"
      :total-page="totalPage"
      :active-page="currentPage"
      class="pt-2"
    />
  </div>
</template>

<script setup lang="ts">
import { formatFullDateToKorean } from '@/shared/utils/format'
import axios from 'axios'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import Pagination from '@/shared/components/molecules/tab/Pagination.vue'

import type { Record } from '@/entities/record/record.entity'

const props = defineProps<{
  tripId: number
  selectedDate: string
}>()

const route = useRoute()
const router = useRouter()

const ITEMS_PER_PAGE = 2

const recordList = ref<Record[]>([])
const totalRecords = ref(0)

const currentPage = ref(Number(route.query.page) || 1)

watch(
  () => route.query.page,
  (newVal) => {
    const parsed = Number(newVal)
    currentPage.value = isNaN(parsed) || parsed < 1 ? 1 : parsed
  },
  { immediate: true }
)

watch(currentPage, (newPage) => {
  router.replace({ query: { ...route.query, page: String(newPage) } })
})

const totalPage = computed(() => Math.ceil(totalRecords.value / ITEMS_PER_PAGE))

const paginatedRecords = computed(() => {
  return recordList.value
})

const fetchRecords = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('Access token not found')

    const params = new URLSearchParams({
      page: String(currentPage.value - 1),
      size: String(ITEMS_PER_PAGE),
    })

    const dateParam = props.selectedDate || new Date().toISOString().split('T')[0]
    params.append('date', dateParam)

    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/trips/${props.tripId}/records?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (response.data.code === 'S200') {
      recordList.value = response.data.data.content || response.data.data
      totalRecords.value = response.data.data.totalElements || response.data.data.length || 0
    }
  } catch (error: unknown) {
    console.error('기록을 불러오는 중 오류가 발생했습니다:', error)
  }
}

onMounted(() => {
  fetchRecords()
})

watch(
  () => [props.selectedDate, currentPage.value],
  () => {
    fetchRecords()
  }
)

const goToCreate = () => {
  router.push({
    name: 'record_create',
    params: { tripId: props.tripId },
    query: { date: props.selectedDate },
  })
}

const editRecord = (recordId: number) => {
  router.push({ 
    path: `/record/${props.tripId}/create`, 
    query: { 
      editRecordId: String(recordId),
      date: props.selectedDate
    }
  })
}

const deleteRecord = async (recordId: number) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) throw new Error('Access token not found')

      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/trips/${props.tripId}/records/${recordId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.code === 'S200') {
        recordList.value = recordList.value.filter((record) => record.recordId !== recordId)
        totalRecords.value = Math.max(0, totalRecords.value - 1)

        if (currentPage.value > 1 && recordList.value.length === 0) {
          currentPage.value = currentPage.value - 1
        } else {
          fetchRecords()
        }

        alert('기록이 성공적으로 삭제되었습니다.')
      }
    } catch (error: unknown) {
      console.error('기록 삭제 중 오류가 발생했습니다:', error)
      if (error instanceof Error && error.message === 'Access token not found') {
        alert('로그인이 필요합니다.')
        router.push('/')
      }
    }
  }
}

const refreshRecords = () => {
  fetchRecords()
}

defineExpose({
  refreshRecords,
})
</script>