<template>
  <TypographyHead3 class="w-full text-left py-2">
    기록하기
  </TypographyHead3>
  
  <Input 
    v-model="title"
    placeholder="제목을 입력해주세요"
  />

  <div class="flex w-full justify-between">
    <InputSmall
      v-model="record_date"
      placeholder="hello input"
      type="date"
    />
  </div>

  <Input 
    v-model="content"
    placeholder="기록을 자유롭게 작성해주세요 (최대 800자)"
  />

  <Card class="w-[30%]" />

  <div class="w-full flex justify-between gap-4">
    <ButtonMain class="w-1/2 bg-white !text-[#000000]">
      취소
    </ButtonMain>
    <ButtonMain class="w-1/2">
      완료
    </ButtonMain>
  </div>
</template>

<script setup>
import Input from '@/shared/components/atoms/input/Input.vue'
import InputSmall from '@/shared/components/atoms/input/InputSmall.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'

</script>
