<template>
  <div class="w-full text-left">
    <TypographyHead3>
      우리 여행지도
    </TypographyHead3>
  </div>

  <!-- 카카오맵 API 연동 지도-->
  <Map />

  <!-- 핀 클릭시 해당 지역 여행 리스트 카드로 출력 -->
  <!-- 해당 지역 여행 mock 데이터 가져와야 함-->
  <Card>
    <div>
      TripList
    </div>
  </Card>
</template>

<script setup>
import Map from '@/shared/components/atoms/map/Map.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
</script>

<style lang="">
    
</style>