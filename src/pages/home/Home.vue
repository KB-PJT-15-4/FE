<template>
  <div class="w-full flex flex-col gap-3">
    <div class="flex flex-col">
      <div class="flex justify-between items-center -mt-4">
        <TypographyHead2>우리의 여행을</TypographyHead2>
        <div class="text-xs text-gray-500">
          {{ today }} · 맑음 ☀️ · 28℃
        </div>
      </div>
      <div class="flex justify-between">
        <TypographyHead1 class="text-moa-main text-[30px]">
          MOA
        </TypographyHead1>
        <button @click="requestNotificationPermission">
          <TypographyCaption class="text-gray-500">
            알림 권한 요청
          </TypographyCaption>
        </button>
      </div>
    </div>
    <TypographySubTitle1>다가오는 일정</TypographySubTitle1>

    <div
      class="relative w-full h-[140px] rounded-2xl overflow-hidden"
      @click="router.push({ name: 'trip_detail', params: { tripId: 1 } })"
    >
      <img
        src="https://t1.daumcdn.net/news/202408/04/speaktravel/20240804090001287dbfq.jpg"
        alt=""
        class="absolute inset-0 w-full h-full object-cover z-0"
      >
      <div class="absolute inset-0 bg-black/30 z-10" />

      <div class="absolute top-3 left-3 z-20">
        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-white/90 text-gray-900">
          D-{{ dday }}
        </span>
      </div>

      <div class="absolute bottom-3 left-3 text-white z-20">
        <div class="text-sm font-semibold">
          {{ trip.city }} · {{ trip.title }}
        </div>
        <div class="text-[11px] opacity-80">
          {{ period }} · {{ trip.people }}명
        </div>
      </div>
    </div>
    <TypographySubTitle1>{{ name }}님, 지금 이런 여행은 어때요?</TypographySubTitle1>

    <div class="relative">
      <div class="carousel no-scrollbar snap-x snap-mandatory overflow-x-auto">
        <Card
          v-for="(item, i) in tripRecommendationListMockData"
          :key="i"
          class="carousel-card snap-center shrink-0 relative rounded-2xl overflow-hidden"
          :style="{
            backgroundImage: `url(${item.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <div class="absolute inset-0 bg-black/25" />
          <div class="absolute bottom-3 left-3 text-white">
            <div class="text-lg font-semibold">
              {{ item.name }}
            </div>
            <div class="text-xs opacity-90">
              {{ item.location }} · ★ {{ item.rating }}
            </div>
          </div>
        </Card>

        <Card
          class="carousel-card snap-center shrink-0 relative rounded-2xl overflow-hidden"
          :style="{
            backgroundImage: `url(${trip_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
          @click="router.push({ name: 'create_trip' })"
        >
          <div class="flex flex-col items-end justify-end pb-4 h-full">
            <TypographyHead2 class="text-white">
              여행 생성하기
            </TypographyHead2>
          </div>
        </Card>

        >
      </div>
    </div>
    <TypographySubTitle1>친구 소식 확인하기</TypographySubTitle1>

    <FriendActivityFeed
      :items="friendFeedMock"
      @open-trip="(id: string) => router.push({ name: 'trip_detail', params: { id } })"
      @all="router.push({ name: 'friend_feed' })"
    />
  </div>
</template>

<script setup lang="ts">
import trip_image from '@/assets/trip_image.png'
import { friendFeedMock, tripRecommendationListMockData } from '@/entities/trip/trip.mock'
import FriendActivityFeed from '@/features/trip/MyTrip/ui/FriendActivityFeed.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { initFCM } from '@/shared/utils/fcm/initFCM'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const name = localStorage.getItem('name')
const router = useRouter()
const today = new Date().toLocaleDateString('ko-KR', {
  month: 'long',
  day: 'numeric',
  weekday: 'short',
})
const trip = {
  city: '부산',
  title: '혼자 부산여행',
  startDate: '2025-08-20',
  endDate: '2025-08-24',
  people: 1,
  imageUrl: 'https://images.unsplash.com/photo-1518544801976-3e188a8a1e66?q=80&w=1200',
}

const dday = computed(() => {
  const ms = new Date(trip.startDate).getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
})

const period = computed(() => {
  const s = new Date(trip.startDate)
  const e = new Date(trip.endDate)
  const fmt = (d: Date) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  return `${fmt(s)} ~ ${fmt(e)}`
})

const requestNotificationPermission = async () => {
  if (!(typeof window !== 'undefined' && 'Notification' in window)) {
    console.info('이 환경은 Notification API를 지원하지 않아요.')
    return
  }

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    console.warn('알림 권한 거부됨')
    return
  }
  await initFCM()
}
</script>

<style scoped>
.carousel {
  display: flex;
  gap: 16px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; /* iOS 가속 스크롤 */
  scroll-padding-left: 1rem; /* 첫 카드 중앙 맞추기 여백 */
}

.carousel-card {
  width: 260px; /* 카드 너비 */
  height: 150px; /* 카드 높이 */
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
