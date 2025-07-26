<template>
  <div class="w-full flex flex-col gap-7">
    <TypographyHead1 class="text-left">
      여행 만들기
    </TypographyHead1>
    <div class="flex flex-col gap-4 h-[520px] overflow-scroll">
      <Input placeholder="여행 제목을 입력해주세요" />
      <div class="flex justify-between">
        <div>
          <TypographySubTitle2 class="text-moa-main-text">
            시작 날짜
          </TypographySubTitle2>
          <InputSmall type="date" />
        </div>
        <div>
          <TypographySubTitle2 class="text-moa-main-text">
            종료 날짜
          </TypographySubTitle2>
          <InputSmall type="date" />
        </div>
      </div>
      <Select placeholder="여행 지역을 선택해주세요">
        <Option />
      </Select>
      <TypographyHead3>친구 초대하기</TypographyHead3>
      <div class="flex justify-between">
        <InputMedium placeholder="이메일을 입력해주세요" />
        <ButtonSmallMain>초대하기</ButtonSmallMain>
      </div>
    </div>
    <div class="flex justify-between">
      <ButtonMediumSub @click="router.push(URL.PAGE.TRIP.TRIP_LIST)">
        <TypographyHead3>취소</TypographyHead3>
      </ButtonMediumSub>
      <ButtonMediumMain @click="router.push({ name: 'trip_detail', params: { tripId: '1' } })">
        <TypographyHead3>생성하기</TypographyHead3>
      </ButtonMediumMain>
    </div>
  </div>
</template>
<script setup>
import router from '@/app/router'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import InputMedium from '@/shared/components/atoms/input/InputMedium.vue'
import InputSmall from '@/shared/components/atoms/input/InputSmall.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import URL from '@/shared/constants/URL'
</script>
