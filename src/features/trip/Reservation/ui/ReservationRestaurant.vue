<template>
  <div class="flex flex-col gap-2 h-[180px]">
    <TypographyP1>카테고리</TypographyP1>
    <Select placeholder="카테고리를 선택해주세요">
      <Option />
    </Select>
  </div>
  <ButtonMain>검색하기</ButtonMain>
</template>
<script setup lang="ts">
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
</script>
