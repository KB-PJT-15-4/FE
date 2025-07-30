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
      v-for="(record, index) in recordList"
      :key="index"
      class="p-4 bg-white rounded-md shadow border space-y-2"
    >
      <div class="flex justify-between items-center">
        <div class="font-bold text-base">
          {{ record.title }}
        </div>
        <div class="flex gap-2 w-[120px]">
          <ButtonExtraSmallMain @click="editRecord(index)">
            수정
          </ButtonExtraSmallMain>
          <ButtonExtraSmallMain @click="deleteRecord(index)">
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
      <p class="text-sm text-[#626262] whitespace-pre-line">
        {{ record.content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import { formatFullDateToKorean } from '@/shared/utils/format'

const route = useRoute()
const router = useRouter()

const tripId = Number(route.params.tripId)

const recordList = ref<Array<{
  title: string
  date: string
  imageUrl?: string
  content: string
}>>([])

onMounted(() => {
  const saved = localStorage.getItem(`trip-${tripId}-records`)
  if (saved) {
    recordList.value = JSON.parse(saved)
  }
})

const goToCreate = () => {
  router.push({ name: 'record_create', params: { tripId } })
}

const editRecord = (index: number) => {
  router.push({ path: `/record/${tripId}/create`, query: { editIndex: index } })
}

const deleteRecord = (index: number) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    recordList.value.splice(index, 1)
    localStorage.setItem(`trip-${tripId}-records`, JSON.stringify(recordList.value))
  }
}
</script>
