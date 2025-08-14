<template>
  <div class="h-[450px]">
    <div
      v-for="(trip, index) in tripList"
      :key="index"
      class="cursor-pointer"
      @click="router.push({ name: 'trip_detail', params: { tripId: trip.tripId } })"
    >
      <TripInfoBox :trip="trip" />
    </div>
  </div>
  <Pagination
    :total-page="totalPage"
    :active-page="currentPage"
  />
</template>
<script setup lang="ts">
import { type TripInfo } from '@/entities/trip/trip.entity'
import Pagination from '@/shared/components/molecules/tab/Pagination.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTripList } from '../services/myTrip.service'
import TripInfoBox from './TripInfoBox.vue'

const route = useRoute()
const router = useRouter()

const tripList = ref<TripInfo[]>([])
const totalPage = ref<number>(0)
const currentPage = computed(() => Number(route.query.page ?? 1))

async function getTripListFunction(page: number) {
  const result = await getTripList(page, 4)
  tripList.value = result.content
  totalPage.value = result.totalPages
}

watch(currentPage, async (newPage) => {
  getTripListFunction(newPage - 1)
})

onMounted(() => {
  getTripListFunction(0)
})
</script>
