<template>
  <ul class="flex flex-col gap-3 divide-y rounded-xl">
    <Card
      v-for="item in items"
      :key="item.id"
      class="flex gap-3 p-3"
      @click="router.push({ name: 'trip_detail', params: { tripId: item.id } })"
    >
      <div class="min-w-0 flex-1">
        <TypographyP2 class="text-[14px] leading-5">
          <span class="font-medium">{{ item.user }}</span>님이
          <button
            class="underline underline-offset-2 text-gray-900"
            @click="$emit('openTrip', item.tripId)"
          >
            {{ item.tripName }}
          </button>
          여행에{{ ' ' }}
          <template v-if="item.extra">
            <span class="font-medium"> {{ item.extra }}</span>
          </template>{{ ' ' }}
          <span class="text-gray-600"> {{ item.action }} </span>
        </TypographyP2>

        <div class="mt-1 text-[12px] text-gray-500 flex items-center gap-2">
          <span v-if="item.place">📍 {{ item.place }}</span>
          <span>·</span>
          <time :datetime="item.timeISO">{{ item.timeText }}</time>
        </div>
      </div>
    </Card>
  </ul>
</template>

<script setup lang="ts">
import type { FeedItem } from '@/entities/trip/trip.entity'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps<{ items: FeedItem[]; hasMore?: boolean }>()
defineEmits<{
  (e: 'openTrip', id: string): void
  (e: 'react', id: string): void
  (e: 'more'): void
  (e: 'all'): void
}>()
</script>
