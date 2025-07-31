<template>
  <div class="flex flex-col gap-4">
    <!-- 추가 버튼 -->
    <ButtonExtraSmallMain
      class="w-[60px]"
      @click="goToCreate"
    >
      추가
    </ButtonExtraSmallMain>

    <!-- 사용자 작성 기록 -->
    <div
      v-for="(record, index) in paginatedRecords"
      :key="index"
      class="p-4 bg-white rounded-md shadow border space-y-2"
    >
      <div class="flex justify-between items-center">
        <div class="font-bold text-base">
          {{ record.title }}
        </div>
        <div class="flex gap-2 w-[120px]">
          <ButtonExtraSmallMain @click="editRecord(getGlobalIndex(index))">
            수정
          </ButtonExtraSmallMain>
          <ButtonExtraSmallMain @click="deleteRecord(getGlobalIndex(index))">
            삭제
          </ButtonExtraSmallMain>
        </div>
      </div>
      <div class="text-sm text-[#626262]">
        {{ formatFullDateToKorean(new Date(record.date)) }}
      </div>
      <div v-if="record.imageUrl">
        <img
          :src="record.imageUrl"
          class="w-full rounded"
        >
      </div>
      <p class="text-sm text-[#626262] whitespace-pre-line line-clamp-2">
        {{ record.content }}
      </p>
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
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatFullDateToKorean } from '@/shared/utils/format'

import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import Pagination from '@/shared/components/molecules/tab/Pagination.vue'

const route = useRoute()
const router = useRouter()

const tripId = Number(route.params.tripId)

const ITEMS_PER_PAGE = 2

const recordList = ref<Array<{
  title: string
  date: string
  imageUrl?: string
  content: string
}>>([])

// 현재 페이지
const currentPage = ref(Number(route.query.page) || 1)

watch(
  () => route.query.page,
  (newVal) => {
    const parsed = Number(newVal)
    currentPage.value = isNaN(parsed) || parsed < 1 ? 1 : parsed
  },
  { immediate: true }
)

// currentPage가 변경되면 URL에 반영
watch(currentPage, (newPage) => {
  router.replace({ query: { ...route.query, page: String(newPage) } })
})

const totalPage = computed(() => Math.ceil(recordList.value.length / ITEMS_PER_PAGE))

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return recordList.value.slice(start, start + ITEMS_PER_PAGE)
})

const getGlobalIndex = (indexInPage: number) => {
  return (currentPage.value - 1) * ITEMS_PER_PAGE + indexInPage
}

// 기록 불러오기
onMounted(() => {
  const saved = localStorage.getItem(`trip-${tripId}-records`)
  if (saved) {
    recordList.value = JSON.parse(saved)
  }
})

// 기록 생성 페이지 이동
const goToCreate = () => {
  router.push({ name: 'record_create', params: { tripId } })
}

// 수정
const editRecord = (index: number) => {
  router.push({ path: `/record/${tripId}/create`, query: { editIndex: index } })
}

// 삭제
const deleteRecord = (index: number) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    recordList.value.splice(index, 1)
    localStorage.setItem(`trip-${tripId}-records`, JSON.stringify(recordList.value))

    if (
      (currentPage.value > 1) &&
      ((currentPage.value - 1) * ITEMS_PER_PAGE >= recordList.value.length)
    ) {
      currentPage.value = currentPage.value - 1
    }
  }
}
</script>

