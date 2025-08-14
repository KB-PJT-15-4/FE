<template>
  <DateTab
    v-if="tripData"
    v-model="internalDate"
    :start-date="tripData.startDate"
    :end-date="tripData.endDate"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DateTab from '@/shared/components/molecules/tab/DateTab.vue'
import type { Trip } from '@/entities/record/record.entity'
import { fetchTripAndResolveDate } from '../services/recordDetail.service'

const props = defineProps<{ tripId: number; date: string }>()
const emit = defineEmits<{ (e: 'update:date', value: string): void }>()
const route = useRoute()
const router = useRouter()

const tripData = ref<Trip | null>(null)

const internalDate = computed({
  get: () => props.date,
  set: (val: string) => {
    emit('update:date', val)
    router.replace({ query: { ...route.query, date: val } })
  },
})

async function init() {
  try {
    const { trip, resolvedDate } = await fetchTripAndResolveDate(
      props.tripId,
      route.query.date as string | undefined
    )
    tripData.value = trip
    if (resolvedDate) emit('update:date', resolvedDate)
  } catch (e) {
    console.error('여행 데이터를 가져오는데 실패했습니다:', e)
  }
}

onMounted(() => init())
</script>

