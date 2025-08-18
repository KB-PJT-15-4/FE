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
        <RequestNotificationButton />
      </div>
    </div>
    <TypographySubTitle1>다가오는 일정</TypographySubTitle1>
    <UpcomingTrip />

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
            <TypographyHead3 class="text-white">
              여행 생성하기
            </TypographyHead3>
          </div>
        </Card>
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
import UpcomingTrip from '@/features/trip/MyTrip/ui/UpcomingTrip.vue'
import RequestNotificationButton from '@/features/user/Notification/ui/RequestNotificationButton.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { useRouter } from 'vue-router'

const name = localStorage.getItem('name')
const router = useRouter()

const today = new Date().toLocaleDateString('ko-KR', {
  month: 'long',
  day: 'numeric',
  weekday: 'short',
})
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
