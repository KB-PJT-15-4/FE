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
      class="bg-white space-y-2 mb-3"
    >
      <!-- 제목 + 날짜 + 토글 -->
      <div class="flex justify-between items-center">
        <div class="font-bold text-base">
          <TypographyHead3>{{ record.title }}</TypographyHead3>
        </div>
        <div class="flex items-center gap-3">
          <TypographyP2 class="text-moa-main-text">
            {{ formatFullDateToKorean(new Date(record.recordDate)) }}
          </TypographyP2>

          <!-- 토글 버튼 -->
          <div class="relative">
            <button
              class="text-moa-main leading-none px-2"
              @click="toggleMenu(record.recordId)"
            >
              ⋯
            </button>

            <!-- 드롭다운 메뉴 -->
            <div
              v-if="openMenuId === record.recordId"
              class="absolute right-0 mt-2 w-20 bg-white border rounded-md shadow-lg z-10"
            >
              <button
                class="block w-full text-moa-main px-4 py-2"
                @click="editRecord(record.recordId)"
              >
                수정
              </button>
              <button
                class="block w-full text-moa-error px-4 py-2"
                @click="onDelete(record.recordId)"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 이미지 가로 슬라이더 -->
      <div
        v-if="record.imageUrls && record.imageUrls.length > 0"
        class="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]"
        style="-webkit-overflow-scrolling: touch"
      >
        <div
          v-for="(imageUrl, imgIndex) in record.imageUrls"
          :key="imgIndex"
          class="flex-none basis-full snap-center"
        >
          <img
            :src="imageUrl"
            class="my-3 w-full h-64 object-cover rounded-md"
            :alt="`기록 이미지 ${imgIndex + 1}`"
            loading="lazy"
          >
        </div>
      </div>

      <TypographyP1 class="text-moa-gray-text whitespace-pre-line">
        {{ record.content }}
      </TypographyP1>
    </div>

    <!-- 기록이 없는 경우 -->
    <div
      v-if="recordList.length === 0"
      class="text-center py-8 text-moa-gray-text"
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import Pagination from '@/shared/components/molecules/tab/Pagination.vue'

import type { Record } from '@/entities/record/record.entity'
import { deleteRecord, getRecords } from '../services/recordDetail.service'

const props = defineProps<{
  tripId: number
  selectedDate: string
}>()

const route = useRoute()
const router = useRouter()

const recordList = ref<Record[]>([])
const totalElements = ref(0)
const currentPage = ref<number>(Number(route.query.page) || 1)
const openMenuId = ref<number | null>(null)

function toggleMenu(recordId: number) {
  openMenuId.value = openMenuId.value === recordId ? null : recordId
}
// 외부 클릭시 닫기 기능
function onGlobalClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.relative')) openMenuId.value = null
}
document.addEventListener('click', onGlobalClick)
onBeforeUnmount(() => document.removeEventListener('click', onGlobalClick))

// route.page 동기화
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

const totalPage = computed(() => Math.ceil(totalElements.value / 2))
const paginatedRecords = computed(() => recordList.value)

async function load() {
  try {
    const page = currentPage.value - 1
    const size = 2
    const date = props.selectedDate || new Date().toISOString().split('T')[0]

    const result = await getRecords(props.tripId, page, size, date)

    recordList.value = result.content

    totalElements.value = result.totalElements
  } catch (e) {
    console.error('기록을 불러오는 중 오류:', e)
  }
}

onMounted(load)
watch([() => props.selectedDate, () => currentPage.value], load)

// RecordCreate.vue 페이지 이동
function goToCreate() {
  router.push({
    name: 'record_create',
    params: { tripId: props.tripId },
    query: { date: props.selectedDate },
  })
}

// 수정 페이지 이동
function editRecord(recordId: number) {
  router.push({
    name: 'record_create',
    params: { tripId: props.tripId },
    query: {
      editRecordId: String(recordId),
      date: props.selectedDate,
    },
  })
}

// 삭제
async function onDelete(recordId: number) {
  if (!confirm('정말 삭제하시겠습니까?')) return
  try {
    await deleteRecord(props.tripId, recordId)

    if (recordList.value.length === 1 && currentPage.value > 1) {
      currentPage.value -= 1
    } else {
      await load()
    }
    alert('기록이 성공적으로 삭제되었습니다.')
  } catch (e) {
    console.error('기록 삭제 중 오류:', e)
    alert('삭제 중 오류가 발생했습니다.')
  }
}

const refreshRecords = () => load()
defineExpose({ refreshRecords })
</script>
