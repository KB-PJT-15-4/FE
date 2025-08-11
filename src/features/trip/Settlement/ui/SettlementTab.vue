<template>
  <div class="flex flex-col gap-3">
    <SegmentedTab
      v-model="selectedFilter"
      :options="filterTabOptions2"
      class="my-2"
    />

    <RequestSettlement v-if="selectedFilter === filterTabOptions2[1]" />
    <SettlementHistory v-else />
  </div>
</template>

<script setup lang="ts">
import { filterTabOptions2 } from '@/entities/trip/trip.entity'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RequestSettlement from './RequestSettlement.vue'
import SettlementHistory from './SettlementHistory.vue'

const route = useRoute()
const router = useRouter()

const selectedFilter = ref(
  filterTabOptions2.find((option) => mapOptionToQueryParam(option) === route.query.type) ??
    filterTabOptions2[0]
)

watch(selectedFilter, (newFilter) => {
  const query = {
    ...route.query,
    type: mapOptionToQueryParam(newFilter),
    page: '1',
  }
  router.replace({ path: route.path, query })
})

function mapOptionToQueryParam(option: string): string | undefined {
  switch (option) {
    case '내역':
      return 'history'
    case '요청':
      return 'settle'
    default:
      return undefined
  }
}
</script>
