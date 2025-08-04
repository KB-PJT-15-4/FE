<template>
  <div
    v-for="(item, index) in availableReservationList"
    :key="index"
    class="mt-3"
  >
    <Card class="flex justify-between">
      <div class="flex gap-4 pr-5">
        <div
          class="h-[40px] w-[40px] overflow-hidden rounded-full flex justify-center items-center my-auto"
        >
          <img
            :src="item.restImageUrl"
            class="h-[40px] w-[40px] object-cover"
          >
        </div>
        <div class="w-[140px]">
          <TypographySubTitle1>{{ item.restName }}</TypographySubTitle1>
          <TypographyP2 class="text-moa-sub-text">
            {{ item.description }}
          </TypographyP2>
        </div>
      </div>
      <ButtonSmallMain
        class="m-auto"
        @click="
          () => {
            const query: Record<string, string | number> = {
              type: ItemType.Restaurant,
              itemId: item.restId,
              category: selectedCategory,
              date: selectedStartDate,
            }

            router.push({
              name: 'reservation_restaurant',
              params: { tripId },
              query,
            })
          }
        "
      >
        예약하기
      </ButtonSmallMain>
    </Card>
  </div>
</template>
<script setup lang="ts">
import router from '@/app/router'
import { ItemType, type RestaurantItem } from '@/entities/trip/trip.entity'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import { inject, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{ availableReservationList: RestaurantItem[] }>()
const route = useRoute()
const tripId = route.params.tripId

const selectedCategory = inject<Ref<string>>('selectedCategory', ref(''))
const selectedStartDate = inject<Ref<string>>('selectedStartDate', ref(''))
</script>
