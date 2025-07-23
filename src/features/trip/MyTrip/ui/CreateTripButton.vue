<template>
  <Card
    class="text-right cursor-pointer mb-2"
    :style="{
      backgroundImage: `url(${trip_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    @click="router.push(URL.PAGE.TRIP.CREATE)"
  >
    <TypographyHead1 class="text-white">
      여행 생성하기
    </TypographyHead1>
    <i class="bi bi-arrow-right-circle text-white text-[30px]" />
  </Card>
</template>
<script setup lang="ts">
import router from '@/app/router'
import trip_image from '@/assets/trip_image.png'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import URL from '@/shared/constants/URL'
</script>
